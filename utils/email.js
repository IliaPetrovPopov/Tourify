const { convert } = require('html-to-text');
const nodemailer = require('nodemailer');
// const Transport = require('nodemailer-brevo-transport');
const pug = require('pug');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Ilia Popov <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    // return nodemailer.createTransport(
    //   new Transport({ apiKey: process.env.BREVO_API_KEY })
    // );
    // }

    return nodemailer.createTransport({
      host: process.env.BREVO_HOST,
      port: process.env.BREVO_PORT,
      auth: {
        user: process.env.BREVO_LOGIN,
        pass: process.env.BREVO_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html, {
        wordwrap: 150,
      }),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Tourify Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (will expire after 10 minutes)'
    );
  }
};
