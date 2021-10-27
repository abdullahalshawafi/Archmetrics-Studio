const router = require("express").Router();
const MailController = require("../Controllers/MailController");
const Validations = require("../Controllers/Validations");


router.get('/', async (req, res) => {
    let Result = Validations.validateEmail(req.body.email)
    if (!Result.validity) {
        return res.json(result);
    } else {
        try {
            MailController.SendMessage(req, res);        
        } catch (error) {
            res.status(500).json({ error });
        }
    }
})