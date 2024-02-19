const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const sendMailController = require('../controllers/sendMailController');

const TOKEN_SECRET = process.env.TOKEN_SECRET;

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { nanoid } = await import('nanoid'); // to generate short unique IDs for email verification links
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationLink = nanoid();

    const user = new User({
      username,
      email,
      emailVerified: false,
      password: hashedPassword,
      emailVerificationLink: verificationLink,
      resetLink: null,
      resetLinkExpiration: null
    });

    await user.save();

    // lets send the email for verification

    const verificationUrl = `http://localhost:${process.env.PORT}/auth/verify/${verificationLink}`;
    const emailSubject = "Where2Visit - Email Verification";
    const emailBody = `Click the following link to verify your email: ${verificationUrl}`;

    await sendMailController.sendMail(user.email, emailSubject, emailBody);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, TOKEN_SECRET);

    return res.status(200).json({ userId: user._id, userName: user.username, email: user.email, verified: user.emailVerified, "token": token });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { verificationCode } = req.params;
    // find user by verificationCode
    const user = await User.findOne({ emailVerificationLink: verificationCode });
    if (!user) return res.status(404).json({ error: 'Invalid Verification Code' });
    // update the user
    user.emailVerified = true;
    //user.emailVerificationLink = null; //ideally would've liked to remove this, but not removing the verification link for now as it's causing schema issues. Inquire about later.
    await user.save();
    return res.redirect("http://localhost:3000?alert_type=info&alert_info=Email%20verified%20successfully");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { nanoid } = await import('nanoid'); // to generate short unique IDs
    const { email } = req.body;

    // find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const resetCode = nanoid();
    // update the user with resetCode
    user.resetLink = resetCode;
    user.resetLinkExpiration = Date.now() + 86400000 // 1 day for now;
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetCode}`; // figure out a better way to point to the front-end app.
    const emailSubject = `Where2Visit - Password Reset`;
    const emailBody = `Click the following link to reset your password: ${resetUrl}`;;

    await sendMailController.sendMail(user.email, emailSubject, emailBody);

    return res.status(200).json({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { resetCode } = req.params;
    const { password } = req.body;

    //find user by resetCode (resetLink property on schema)
    const user = await User.findOne({ resetLink: resetCode });
    if (!user || user.resetLinkExpiration < Date.now()) return res.status(404).json({ error: 'Invalid or expired reset code' });
    console.log("Found user:", user);

    // hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // update user
    user.password = hashedPassword;
    user.resetLink = null;
    user.resetLinkExpiration = null;
    await user.save();

    return res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};