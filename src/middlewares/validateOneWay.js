import JoiBase from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
export default async (req, res, next) => {
  try {

    const {
      userId, origin, destination, departureDate, reason, accommodation
    } = req.body;

    const Joi = JoiBase.extend(JoiDate);
    let schema = Joi.object({
      origin: Joi.string().required(),
      destination: Joi.string().required(),
      departureDate: Joi.date().format('YYYY-MM-DD').required(),
      reason: Joi.string().max(256).required(),
      accommodation: Joi.string().required(),
    });
    const isOriginDiffersFromDestination = (origin, destination) => {
      if( origin != destination) return true;
      else return false;
    }
    const destinationCondition = isOriginDiffersFromDestination(origin, destination);
    const { error } = schema.validate({ origin, destination, departureDate, reason, accommodation });
    if (error) {
      return res.status(422).json({
        status: res.statusCode,
        error: error.message,
      });
    }else if (destinationCondition === false ) return res.status(422).json({message: "Departure place has to differ from destination."});
  
    next();
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
