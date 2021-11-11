const nodemailer = require('nodemailer');
const Message = require('../models/Message');
const contactUsValidations = require('../validations/contactUsValidations');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

module.exports.sendMessage = async (req, res) => {
    try {
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
            const errorMessages = {};
            error.details.forEach(err => { errorMessages[err.context.label] = err.message });
            return res.json({ errorMessages });
        }

        mailOptions = {
            to: email,
            subject: `New message from ${name}`,
            text: message
        }

        const newMessage = await new Message(req.body);
        await newMessage.save();

        transport.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log(error);
                return res.send("error");
            }
            console.log(response.messageId);
            res.status(200).json({ message: `Thank you ${name} for contacting us, we will respond to you as soon as possible!` });
        });
    }
    catch (err) {
        console.log(err);
        return res.json({ message: "An error has occurred please try again" });
    }
}
