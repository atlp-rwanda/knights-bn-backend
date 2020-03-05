import JoiBase from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
import models from '../db/models';
import getTodayDate from '../utils/getTodayDate';

export default async (req, res, next) => {
  try {
    const {
      origin, destination, departureDate, returnDate, reason, accommodation,
    } = req.body;

    const { id } = req.user;

    const Joi = JoiBase.extend(JoiDate);
    const schema = Joi.object({
      origin: Joi.string().required(),
      destination: Joi.string().required(),
      departureDate: Joi.date().format('YYYY-MM-DD').required(),
      returnDate: Joi.date().format('YYYY-MM-DD').required(),
      reason: Joi.string().max(256).required(),
      accommodation: Joi.string().required(),
    });

    const isOriginDiffersFromDestination = (origin, destination) => {
      if (origin != destination) return true;
      return false;
    };
    const isReturnDateValid = (departureTime, returnDate) => (returnDate > departureTime);

    const isTravelDateValid = async (travelDate) => {
      const todayDate = new Date(getTodayDate());
      travelDate = new Date(travelDate);

      if (travelDate >= todayDate) {
        // check whether travelDate is set after the prev requested trip.
        const latestRequest = await models.Request.findAll({
          where: {
            requesterId: id,
          },
          limit: 1,
          order: [['returnDate', 'DESC']],
          raw: true,
        });
        let latestRequestDate;
        if (!latestRequest.length) return true;

        latestRequestDate = new Date(latestRequest[0].departureDate);
        if (travelDate > latestRequestDate) return true;
        return false;
      } return false;
    };
    const { error } = schema.validate({
      origin, destination, departureDate, returnDate, reason, accommodation,
    });
    if (error) {
      return res.status(422).json({
        status: res.statusCode,
        error: error.message,
      });
    }
    const condition1 = isOriginDiffersFromDestination(origin, destination);
    const condition2 = isReturnDateValid(departureDate, returnDate);
    const condition3 = await isTravelDateValid(departureDate);
    if (condition1 === true && condition2 === true && condition3 === false) {
      return res.status(422).json({
        status: res.statusCode,
        error: "Departure date should be chosen from today's date and has to not collide with your previous requested trip!",
      });
    }
    if (condition1 === true && condition3 === true && condition2 === false) {
      return res.status(422).json({
        status: res.statusCode,
        error: "Returning date has to be the day after your departure's date!",
      });
    }
    if (condition2 === true && condition3 === true && condition1 === false) {
      return res.status(422).json({
        status: res.statusCode,
        error: 'Origin has to differ from destination.',
      });
    }
    if ((condition1 && condition2 && condition3) === true) next();
    else {
      (error) => res.status(422).json({
        status: res.statusCode,
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
