const Joi = require('joi')
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(8).required().email(),
        password: Joi.string().min(8).required()
    })
    return schema.validate(data)
}
module.exports.loginValidation = loginValidation