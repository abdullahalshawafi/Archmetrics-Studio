const { verify } = require("jsonwebtoken")


const ValidateToken = (req, res, next) => {
    const accessToken = req.header(process.env.header)
    if (!accessToken) res.json({ error: "User is not logged in" })
    else
        try {
            const validtoken = verify(accessToken, process.env.AccessToken)
            req.user = validtoken;
            if (validtoken) return next()
        } catch (err) {

            return res.json({ error: err })
        }
}

module.exports = { ValidateToken }