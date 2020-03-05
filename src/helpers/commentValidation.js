import Joi from '@hapi/joi';

const commentSchema = Joi.object().keys({
  comment: Joi.string()
    .min(3)
    .max(300)
    .trim()
    .required(),
});

export default {
  commentSchema,
};
