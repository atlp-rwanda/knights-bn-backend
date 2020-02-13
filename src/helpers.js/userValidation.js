import Joi from '@hapi/joi';
import PasswordComplexity from 'joi-password-complexity';

const complexityOptions = {
  min: 8,
  max: 20,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  requirementCount: 2,
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
    .regex(/^[a-zA-Z0-9]{8,9}$/)
    .required(),
});

export default {
  SignUpschema,
};
