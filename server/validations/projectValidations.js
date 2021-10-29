const Joi = require('joi');

module.exports = Joi.object({
    title: Joi.string()
        .min(3)
        .max(40)
        .required()
        .messages({
            'string.empty': "Title field is required!",
            'string.min': "Title must have at least 3 characters!",
            'string.max': "Title must be less than 40 characters!",
        }),

    description: Joi.string()
        .max(2000)
        .required()
        .messages({
            'string.empty': "Description field is required!",
            'string.max': "Description must be less than 2000 characters!",
        }),

    images: Joi.array(),
    link: Joi.string(),
}).options({ abortEarly: false });