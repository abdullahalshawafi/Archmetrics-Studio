//import Mail SMTP
var nodemailer = require('nodemailer');
var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.Mail_User,
        pass: process.env.Mail_Pass
    }
});


module.exports.SendMessage = async (req, res) => {
    const { firstname, lastname, email, message } = req.body;
    mailOptions = {
        to: email,
        subject: `New message from ${firstname} ${lastname}`,
        html: message
    }
    try {
        mail.sendMail(mailOptions, async function (error, response) {
            try {
                if (error) {
                    return res.end("error");
                } else {
                    return res.status(200).json({ message: 'Thank u for contact us , we will respond as soon as possible' });
                }
            } catch (error) {
                console.log(error.message);
            }
        });
    }
    catch (err) {
        return res.json({ err: "Email is not Correct" })
    }
}
