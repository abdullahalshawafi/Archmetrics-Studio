const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });

            if (!user) {
                return res.json({
                    error: "Invalid username or password"
                });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.json({
                    error: "Invalid username or password"
                });
            }

            const accessToken = sign({ username }, process.env.AccessToken);

            return res.status(200).json({
                token: accessToken
            });

        } catch (error) {
            return res.json({
                error: error.message
            });
        }
    },

    signup: async (req, res) => {
        try {
            const {
                email,
                password,
                username
            } = req.body;

            const result = await User.findOne({ username }) || await User.findOne({ email });

            if (result) {
                return res.json({
                    error: "This user already exists"
                });
            }

            const user = await User.create(req.body);

            user.password = await bcrypt.hash(password, 10);

            await user.save();

            res.json({
                success: "User signed up successfully"
            });

        } catch (error) {
            return res.json({
                error: error.message
            });
        }
    }
}