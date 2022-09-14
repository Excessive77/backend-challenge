const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');
const { htmlToText } = require('html-to-text');
const dotenv = require('dotenv');

class Email {
    constructor(to) {
        this.to = to;
    }

    newTransport() {
        return nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
                user: 'apikey',
                pass: process.env.SENDGRID_API_KEY,
            },
        });
    }

    async send(name) {
        const html = pug.renderFile(
            path.join(__dirname, '..', 'views', 'emails', 'welcome.pug'),
            {
                name,
            }
        );

        await this.newTransport().sendMail({
            from: process.env.MAIL_FROM,
            to: this.to,
            subject: 'Welcome to your account',
            html,
            text: htmlToText(html),
        });
    }

    async sendWelcome(name) {
        await this.send(name);
    }
}

module.exports = { Email };
