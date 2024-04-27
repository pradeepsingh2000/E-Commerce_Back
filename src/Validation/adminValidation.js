const Joi = require('joi');

const AdminSingUpschema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().required(),
    image: Joi.string().allow(null).optional()
});

const AdminLoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

module.exports = {AdminSingUpschema,AdminLoginSchema}
