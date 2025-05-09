const nodemailer = require('nodemailer');
const net = require('net');

const emailTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    },
    hello: 'mail.edg5000.com' 
});

const options = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT
};

const client = net.createConnection(options, () => {
  console.log(`SMTP server reachable: ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}`);
  client.write('EHLO edg5000.com\r\n');
});

client.on('end', () => {
  console.log('Disconnected from server');
});

client.on('error', (err) => {
  console.error('Connection error:', err);
});

module.exports = { emailTransporter };
