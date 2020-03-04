import Schema from '../helpers/commentValidation';

class commentValidate {
  static comment(req, res, next) {
    const result = Schema.commentSchema.validate({
      comment: req.body.comment
    });

    if (!result.error) {
      next();
    } else {
      const wrongInput = result.error.details[0].message
        .replace('"', ' ')
        .replace('"', '');
      return res.status(422).json({
        status: 422,
        error: wrongInput
      });
    }
  }
}

export default commentValidate;
