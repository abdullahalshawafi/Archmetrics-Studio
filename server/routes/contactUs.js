const router = require('express').Router();
const { sendMessage } = require('../controllers/contactUsController');

router.post('/send', sendMessage);

module.exports = router;
