import { rateValidator } from '../helpers/validationSchemas';

export default async (req, res, next) => {
  try {
    const { rate } = req.body;
    const { error } = rateValidator.validate({ rate });
    if (error) throw error;
    return next();
  } catch (error) {
    const wrongInput = error.details[0].message
      .replace('"', ' ')
      .replace('"', '');
    return res.status(422).json({
      status: 422,
      error: wrongInput,
    });
  }
};
