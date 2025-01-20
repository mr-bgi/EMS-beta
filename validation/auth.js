const Joi = require('joi');


const validator = (schema) => (payload)=> schema.validate(payload,{abortEarly:false});

const register = Joi.object({
    first_name: Joi.string().min(1).max(50).required(),
    last_name: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('user', 'admin').required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
})

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})
module.exports ={
    validator,
    register,
    login
}