import Joi from 'joi';

const validateBookings = (req, res, next) => {
  const schema = {
    userId: Joi.number(),
    accomodationId: Joi.number().required(),
    roomName: Joi.string().required(),
    checkinDate: Joi.date().min('now').iso().required(),
    checkoutDate: Joi.date()
      .iso()
      .greater(Joi.ref('checkinDate'))
      .required(),
  };

  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return res.status(422).json({ status: 422, error: `${error.details[0].message}` });
  }
  next();
};
export default validateBookings;
