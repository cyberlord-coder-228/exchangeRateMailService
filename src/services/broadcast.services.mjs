import * as nodemailer from 'nodemailer';

import Database from 'better-sqlite3';
const db = new Database('users.db');

import dotenv from 'dotenv';
dotenv.config();

import * as rateControllers from '../controllers/exchangeRate.controllers.mjs';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.OAUTH_ACCESS_TOKEN
  }
});

const MAIL_RECEIVER = 'cyberlord2003@gmail.com';
const MAIL_SUBJECT = 'Hi, your weekly exchange rate report is here!';
const MAIL_BODY = `You can buy 1 USD for ${await rateControllers.getRate()}UAH`;

function sendDataTo(mail) {
  let mailOptions = {
    to: mail,
    subject: MAIL_SUBJECT,
    text: MAIL_BODY
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.error(`Error occured while sending mail to ${mail}: ${err}`);
    } else {
      console.log(`Mail sent successfully to ${mail}`);
    }
  });
}

async function notifyAllUsers() {
  const selectAllUsersQuery = "SELECT * FROM emails";
  const userMails = db.prepare(selectAllUsersQuery)
    .all()
    .map((obj) => obj['email']);
  console.log(userMails);

  for (const mail of userMails) {
    try {
      sendDataTo(mail);
    } catch(e) {
      console.error(`Error occured while sending to ${mail}.\n${e}`);
    }    
  }
}

export { notifyAllUsers };
