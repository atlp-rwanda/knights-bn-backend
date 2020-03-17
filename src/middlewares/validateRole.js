import Joi from '@hapi/joi';

export default async (req, res, next) => {
  try {
    const { role } = req.body;
    const schema = Joi.object().keys({
      role: Joi.string().min(3).max(30).required()
        .valid(
          'superAdmin',
          'traveladmin',
          'travelTeamMember',
          'manager',
          'requester',
        ),
    }).messages({
      'string.base': 'Role should be a type of text',
      'string.empty': 'This field cannot be an empty',
      'string.min': 'Role  should have a minimum length {#limit}',
      'string.max': 'Role should have a maximum length of {#limit}',
      'any.required': 'This is a required field',
    });

    const { error } = schema.validate({ role }, { abortEarly: false });

    if (error) return res.status(422).json({ error: error.message });
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
