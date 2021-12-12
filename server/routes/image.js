const router = require("express").Router();
const {
    uploadtoTemp
} = require("../controllers/imageController");

router.post('/upload', uploadtoTemp);

module.exports = router;