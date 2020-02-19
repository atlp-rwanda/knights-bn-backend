import PasswordComplexity from 'joi-password-complexity';
import Joi from '@hapi/joi';

const complexityOptions = {
  min: 8,
  max: 20,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  requirementCount: 2,
};

const resetPassword = Joi.object().keys({
  newPassword: PasswordComplexity(complexityOptions)
    .trim()
    .required(),
  confirmPassword: PasswordComplexity(complexityOptions)
    .trim()
    .required(),
});
const sendEmail = Joi.object().keys({
  email: Joi.string().email().trim().required(),
});
export default {
  resetPassword, sendEmail,
};
