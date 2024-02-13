const nodemailer = require('nodemailer');
const nodemailerConfig = require('../config/nodemailerConfig');

const sendMail = async (to, subject, body) => {
  try {
    const transporter = nodemailer.createTransport(nodemailerConfig);
    const emailOptions = {
      from: nodemailerConfig.auth.user,
      to,
      subject,
      body
    };
    await transporter.sendMail(emailOptions);
    console.log('Email sent successfully');
  } catch(error) {
    console.log('Error sending email:', error);
  }
}

module.exports = { sendMail };