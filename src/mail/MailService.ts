const nodemailer = require("nodemailer");

import config from "../config";

interface MailOptions {
    to: String,
    subject: String,
    text?: String,
    html?: String
}

const sendMail = async (options: MailOptions) => {
    try {
      const transporter = nodemailer.createTransport({
        host: config.email_host,
        port: config.email_port,
        secure: false,
        auth: {
          user: config.email_username,
          pass: config.email_password
        }
      });
      
      let mailOptions;

      if (options.text) {
        mailOptions = {
          from: config.email_username,
          to: options.to,
          subject: options.subject,
          text: options.text
        };
      } else if (options.html) {
        mailOptions = {
          from: config.email_username,
          to: options.to,
          subject: options.subject,
          html: options.html
        };
      }
      
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);

    } catch (error) {
      console.log(error);
    }
  }

export { sendMail }