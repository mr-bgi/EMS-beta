const Joi = require('joi');

const validator = (schema) => (payload) => 
schema.validate(payload, {abortEarly: false}); 

const departmentSchema = Joi.object({
    name : Joi.string().required(),
    department_head: Joi.required()
});

module.exports = validator(departmentSchema);

