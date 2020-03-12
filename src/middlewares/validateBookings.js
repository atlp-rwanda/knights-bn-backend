import Joi from 'joi';

const validateBookings = (data) => {
  const schema = {
    userId: Joi.number(),
    accomodationId: Joi.number().required(),
    roomName: Joi.number().required(),
    checkinDate: Joi.date().min('now').iso().required(),
    checkoutDate: Joi.date()
      .iso()
      .greater(Joi.ref('checkinDate'))
      .required(),
  };

  return Joi.validate(data, schema);
};
export default validateBookings;
