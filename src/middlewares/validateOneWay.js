import JoiBase from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
export default async (req, res, next) => {
  try {

    const {
       origin, destination, departureDate, reason, accommodation
    } = req.body;

    const Joi = JoiBase.extend(JoiDate);
    let schema = Joi.object({
      origin: Joi.string().required().trim(),
      destination: Joi.string().required().trim(),
      departureDate: Joi.date().format('YYYY-MM-DD').required(),
      reason: Joi.string().max(256).required().trim(),
      accommodation: Joi.string().required().trim(),
    });
    const isOriginDiffersFromDestination = (origin, destination) => {
      if( origin != destination) return true;
      else return false;
    }
    const destinationCondition = isOriginDiffersFromDestination(origin, destination);
    const today = new Date;
    const { error } = schema.validate({ origin, destination, departureDate, reason, accommodation });
    if (error) {
      return res.status(422).json({
        status: res.statusCode,
        error: error.message,
      });
    }else if (destinationCondition === false ){
      return res.status(422).json({message: "Departure place has to differ from destination."});
    }else if(Date.parse(departureDate) < Date.parse(today)){
      return res.status(422).json({Error: 'Departure date can only be chosen based on the today\'s date.'})
    };
  
    next();
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
