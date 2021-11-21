const router = require("express").Router();
const {login,Signup} = require("../controllers/userController")


/* AUTHENTICATION ROUTES */
router.post('/login',login);

router.post('/Signup', Signup);

module.exports = router;