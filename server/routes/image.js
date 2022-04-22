const router = require("express").Router();
const { uploadToTemp } = require("../controllers/imageController");
const { isAuth } = require("../middleware/authMiddleware");

router.post("/upload", isAuth, uploadToTemp);

module.exports = router;
