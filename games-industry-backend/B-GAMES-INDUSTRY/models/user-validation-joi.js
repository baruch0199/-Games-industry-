const joi = require("joi");

const validateUser = (user) => {
  const joiSchema = joi.object({
    name: joi.string().min(3).max(50),
    email: joi
      .string()
      .min(6)
      .max(50)
      .required()
      .regex(/[a-zA-z1-9]+@[a-zA-z]+\.\w{2,3}/),
    password: joi
      .string()
      .min(6)
      .max(8)
      .required()
      .regex(
        /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8}/
      ),
    admin: joi.boolean(),
  });
  return joiSchema.validate(user);
};

module.exports = validateUser;
