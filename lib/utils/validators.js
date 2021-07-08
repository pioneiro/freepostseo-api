import Joi from "joi";

// password regular expression
const passwordRegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

// schema of registration details
const registrationSchema = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordRegExp).required(),
});

// schema of login details
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordRegExp).required(),
});

// schema of password
const passwordSchema = Joi.object({
  password: Joi.string().pattern(passwordRegExp).required(),
});

const validateRegistration = (user) => registrationSchema.validate(user);
const validateLogin = (user) => loginSchema.validate(user);
const validatePassword = (password) => passwordSchema.validate(password);

export { validateRegistration, validateLogin, validatePassword };
