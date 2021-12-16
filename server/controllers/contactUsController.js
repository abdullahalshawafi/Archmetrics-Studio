const nodemailer = require('nodemailer');
const Message = require('../models/Message');
const contactUsValidations = require('../validations/contactUsValidations');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
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

        const html = `
            <div style="font-family: system-ui">
                <h3>From: ${name}, 	&lt;${email}&gt;</h3>
                <p style="font-size: 1.25rem;white-space: pre;">${message}</p>
            </div>
        `;

        mailOptions = {
            from: process.env.MAIL_EMAIL,
            to: process.env.MAIL_EMAIL,
            subject: `New message from ${name}`,
            html
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
