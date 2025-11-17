const nodemail = require("nodemailer");

const transport = nodemail.createTransport({
    host: 'sandbox.smtp.mailtrap.io',          // Mailtrap SMTP host
    port: 587,                         // SMTP port
    auth:{
        user:'1940ba17da2571',
        pass:'bb96c1b390516b'
    }
});


module.exports = transport;