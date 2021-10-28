const nodemailer = require('nodemailer');
const Message = require('../models/Message');
const { contactUsValidations } = require('../validations');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

module.exports.sendMessage = async (req, res) => {
    for (const field in req.body) {
        if (Object.hasOwnProperty.call(req.body, field)) {
            req.body[field] = req.body[field].trim();
            if (field === "email") {
                req.body[field] = req.body[field].toLowerCase();
            }
        }
    }

    const { name, email, message } = req.body;

    const { error } = contactUsValidations.validate(req.body);

    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ errorMessages });
    }

    mailOptions = {
        to: email,
        subject: `New message from ${name}`,
        text: message
    }

    try {
        const newMessage = await new Message(req.body);
        await newMessage.save();
        
        transport.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log(error);
                return res.send("error");
            }
            console.log(response.messageId);
            res.status(200).json({ message: 'Thank you for contacting us, we will respond as soon as possible!' });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ error: "An error has occured please try again" });
    }
}
