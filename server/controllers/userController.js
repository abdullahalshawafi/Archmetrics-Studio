const User = require('../models/user');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    login: async (req, res) => {
        const {
            username,
            password
        } = req.body;
        User.findOne({
            username: username
        }).then((user) => {
            if (!user) return res.json({
                error: "Username Doesn't Exist"
            })
            else {
                bcrypt.compare(password, user.password).then((match) => {
                    if (!match) return res.json({
                        error: "Wrong Password"
                    })
                    else {
                        const accesstoken = sign({
                            username: user.username
                        }, process.env.AccessToken)
                        return res.status(200).json({
                            token: accesstoken
                        })
                    }
                })
            }
        })

    },

    Signup: async (req, res) => {
        try {
            const {
                email,
                password,
                username
            } = req.body;

            let result = await User.findOne({
                username
            })
            if (!result) {
                bcrypt.hash(password, 10).then(async (hashed) => {
                    const Data = {
                        username: username,
                        email: email,
                        password: hashed,
                    }
                    try {
                        const user = await User.create(Data);
                    } catch (error) {
                        res.json({
                            error: error.message
                        })
                    }
                }, res).then((result) => {
                    res.json({
                        success: "The email is signed up successful"
                    })

                }).catch((err) => res.json({
                    error: err.message
                }));
            } else {
                return res.json({
                    error: "this username has been used before"
                });
            }


        } catch (error) {
            return res.json({
                error: error.message
            });
        }

    }
}