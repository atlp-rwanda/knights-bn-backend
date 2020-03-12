import { requestIdParamsSchema } from '../helpers/validationSchemas';


export default async (req, res, next) => {
  try {
    const { requestId } = req.query;
    const { error } = requestIdParamsSchema.validate({ requestId });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
};
