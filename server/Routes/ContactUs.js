const router = require("express").Router();
const mailController = require("../controllers/contactUsController");
const Validations = require("../validations");


router.post('/', async (req, res) => {
    try {
        mailController.sendMessage(req, res);
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;