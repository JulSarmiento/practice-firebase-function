require("dotenv").config();
const path = require("path");
const fs = require("fs");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});
admin.initializeApp();

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1337d3a8b41090",
    pass: "b4e823b5a4ca09",
  },
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // getting dest email by query string
    const {dest} = req.query;

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: dest,
      subject: "Sending Email using Firebase",
      html, // email content in HTML
    };

    // returning email
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.send(error.toString());
      }
      return res.send("Sended");
    });
  });
});
