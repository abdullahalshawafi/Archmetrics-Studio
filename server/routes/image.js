const router = require("express").Router();
const {
    uploadToTemp
} = require("../controllers/imageController");

router.post('/upload', uploadToTemp);

module.exports = router;