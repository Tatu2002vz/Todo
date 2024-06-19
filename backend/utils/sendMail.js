const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.APP_PASSWORD_USER,
    pass: process.env.APP_PASSWORD_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = async (data) => {
  const { to, subject, html } = data;
  console.log(data);
  if (!to) throw new Error("Email invalid");
  try {
    const info = await transporter.sendMail({
      from: '"TODO WEB 👻" <tavantu2002vz@gmail.com>', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      html: html, // html body
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendMail;
