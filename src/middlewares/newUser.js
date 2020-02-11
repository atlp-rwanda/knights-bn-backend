import userValidation from '../helpers.js/userValidation';

class userValidate {
  static signUp(req, res, next) {
    const result = userValidation.SignUpschema.validate({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      passportNumber: req.body.passportNumber,
    });

    if (!result.error) {
      req.user = result;
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
      if (`${result.error.details[0].path[0]}` === 'passportNumber') {
        return res.status(422).json({
          status: 422,
          error: 'passportNumber should be made of 8 or 9 alphanumeric characters, no symbols allowed and no space inbetween',
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
}

export default userValidate;
