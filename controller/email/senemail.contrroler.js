const nodemailer = require("nodemailer");

async function sendEmail(destination , message){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: process.env.PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'medomaged84@gmail.com', // generated ethereal user
            pass: '01015776658', // generated ethereal password
        },
    });
    await transporter.sendMail({
        from: 'medomaged84@gmail.com', // sender address
        to: destination, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html:message, // html body
    });
}
module.exports = sendEmail;
