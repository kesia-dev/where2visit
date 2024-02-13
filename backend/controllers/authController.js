const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

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
    });

    await user.save();

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

    return res.status(200).json({ userId: user._id, "token": token });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

