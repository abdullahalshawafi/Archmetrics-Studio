const { verify } = require("jsonwebtoken");

const isAuth = (req, res, next) => {
    const accessToken = req.header(process.env.header);
    if (!accessToken) {
        res.json({ error: "User is not logged in" });
    }
    else {
        try {
            const validToken = verify(accessToken, process.env.AccessToken);

            if (validToken) {
                req.user = validToken;
            }

            return next();
        } catch (err) {
            return res.json({ error: err });
        }
    }
}

module.exports = { isAuth };