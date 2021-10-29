const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string()
        .min(3)
        .max(40)
        .regex(/^[a-zA-Z\s\-]+$/)
        .required()
        .messages({
            'string.empty': "Name field is required!",
            'string.min': "Name must have at least 3 characters!",
            'string.max': "Name must be less than 40 characters!",
            'string.pattern.base': "Invalid name",
        }),

    email: Joi.string()
        .email()
        .max(100)
        .required().messages({
            'string.empty': "Email field is required!",
            'string.email': "Invalid email",
            'string.max': "Email must be less than 100 characters!",
        }),

    message: Joi.string()
        .max(1000)
        .required()
        .messages({
            'string.empty': "Message field is required!",
            'string.max': "Message must be less than 1000 characters!",
        }),
}).options({ abortEarly: false });