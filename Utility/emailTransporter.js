const nodemailer = require('nodemailer');
require('dotenv').config();

const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.error('Error with email configuration:', error);
    } else {
      console.log('Email server is ready to take messages:', success);
    }
  });

  return transporter;
};

module.exports = createTransporter;
