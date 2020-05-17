import 'dotenv/config';
import express from 'express';
import bodyParser from "body-parser";
const nodemailer = require('nodemailer')
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.post('/sendemail', (req, res, next) => {
    const { to, subject, html } = req.body
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to,
        subject,
        html
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).send('error')
        }
        else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Sent Successfully')
        }
    });
})





app.listen(process.env.PORT, () => {
    console.log(`Server Is Listening On ${process.env.PORT}!`);
});