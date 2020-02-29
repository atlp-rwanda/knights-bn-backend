import Joi from '@hapi/joi';
import PasswordComplexity from 'joi-password-complexity';

const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 5,
};
const SignUpschema = Joi.object().keys({
  firstName: Joi.string()
    .regex(/^[a-zA-Z]{3,30}$/)
    .trim()
    .required(),
  lastName: Joi.string()
    .regex(/^[a-zA-Z]{3,30}$/)
    .trim()
    .required(),
  email: Joi.string()
    .lowercase()
    .email()
    .trim()
    .required(),
  password: PasswordComplexity(complexityOptions)
    .trim()
    .required(),
  gender: Joi.string()
    .lowercase()
    .valid('male', 'female')
    .trim()
    .required(),
  passportNumber: Joi.string()
    .lowercase()
    .trim()
    .min(8)
    .max(9)
    .required()
});
const resetPassword = Joi.object().keys({
  newPassword: PasswordComplexity(complexityOptions)
    .trim()
    .required(),
  confirmPassword: PasswordComplexity(complexityOptions)
    .trim()
    .required()
});
const sendEmail = Joi.object().keys({
  email: Joi.string()
    .lowercase()
    .email()
    .trim()
    .required()
});
export default {
  SignUpschema,
  sendEmail,
  resetPassword
};
