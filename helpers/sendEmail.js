const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "lesia.soloviova@meta.ua" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
