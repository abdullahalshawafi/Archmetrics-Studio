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

    client: Joi.string()
        .min(3)
        .max(40)
        .required()
        .messages({
            'string.empty': "Client field is required!",
            'string.min': "Client must have at least 3 characters!",
            'string.max': "Client must be less than 40 characters!",
        }),

    date: Joi.string()
        .min(3)
        .max(40)
        .required()
        .messages({
            'string.empty': "Project date field is required!",
        }),

    description: Joi.string()
        .max(2000)
        .required()
        .messages({
            'string.empty': "Description field is required!",
            'string.max': "Description must be less than 2000 characters!",
        }),

    cover: Joi.string()
        .required()
        .messages({
            'string.empty': "You must upload a cover image for your project!",
        }),

    images: Joi.array()
        .required()
        .min(1)
        .messages({
            'array.min': "You must upload images for your project!",
        }),

    services: Joi.array()
        .required()
        .min(1)
        .messages({
            'array.min': "You must add the services used in this project!",
        }),
    link: Joi.string(),
}).options({ abortEarly: false });