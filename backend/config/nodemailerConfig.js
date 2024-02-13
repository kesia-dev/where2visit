module.exports = {
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_HOST_PORT,
  secure: process.env.NODEMAILER_AUTH_IS_SECURE === 'true',
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASS,
  },
};