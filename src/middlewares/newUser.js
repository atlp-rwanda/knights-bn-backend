import {SignUpschema, resetPassword, sendEmail } from '../helpers.js/userValidation';

class userValidate {
  static signUp(req, res, next) {
    const result = SignUpschema.validate({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      passportNumber: req.body.passportNumber,
    });

    if (!result.error) {
      next();
    } else {
      if (`${result.error.details[0].path[0]}` === 'firstName') {
        return res.status(422).json({
          status: 422,
          error: 'firstName should have a minimum of 3 characters, no symbols allowed and no space inbetween',
        });
      } if (`${result.error.details[0].path[0]}` === 'lastName') {
        return res.status(422).json({
          status: 422,
          error: 'lastName should have a minimum of 3 characters, no symbols allowed and no space inbetween',
        });
      }
      if (`${result.error.details[0].path[0]}` === 'passport') {
        return res.status(422).json({
          status: 422,
          error: 'passport number should be made of 8 or 9 alphanumeric characters, no symbols allowed and no space inbetween',
        });
      }
      const wrongInput = result.error.details[0].message
        .replace('"', ' ')
        .replace('"', '');
      return res.status(422).json({
        status: 422,
        error: wrongInput,
      });
    }
  }

  static reset(req, res, next) {
    const result = resetPassword.validate({
      newPassword: req.body.newPassword,
      confirmPassword: req.body.confirmPassword,
    });
    if (!result.error) {
      req.user = result;
      next();
    } else if (`${result.error.details[0].path[0]}` === 'newPassword') {
      return res.status(422).json({
        status: 422,
        error: 'password should contain at least one uppercase letter,one small letter, one special character, one number and one  and should be at minimum 6characters',
      });
    } else if (`${result.error.details[0].path[0]}` === 'confirmPassword') {
      return res.status(422).json({
        status: 422,
        error: 'password should contain at least one uppercase letter,one small letter, one special character, one number and one  and should be at minimum 6characters',
      });
    }
  }

  static sendEmail(req, res, next) {
    const result = sendEmail.validate({
      email: req.body.email,
    });
    if (!result.error) {
      req.user = result;
      next();
    } else if (`${result.error.details[0].path[0]}` === 'email') {
      return res.status(422).json({
        status: 422,
        error: 'invalid user email',
      });
    }
  }
}

export default userValidate;
