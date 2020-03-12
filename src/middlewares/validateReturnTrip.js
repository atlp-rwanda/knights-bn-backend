import models from '../db/models';
import getTodayDate from '../helpers/getTodayDate';
import {
  editRequestSchema,
  createTwoWayTripSchema,
} from '../helpers/validationSchemas';
import isObjectEmpty from '../helpers/isObjectEmpty';

let conflictingTripRequest;

export default async (req, res, next) => {
  try {
    let schema;
    let address;
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      reason,
      accommodation,
    } = req.body;
    const todayDate = new Date(getTodayDate());
    const reqDepartureDate = new Date(departureDate);
    const reqReturnDate = new Date(returnDate);


    const urlSections = req.urlPathSections;
    if (urlSections) address = urlSections[urlSections.length - 2] || null;

    if (address === 'edit') {
      const isRequestEmpty = isObjectEmpty(req.body);
      if (isRequestEmpty === true) throw ('Empty request');
      else schema = editRequestSchema;
    } else schema = createTwoWayTripSchema;

    const {
      error,
    } = schema.validate({
      origin,
      destination,
      departureDate,
      returnDate,
      reason,
      accommodation,
    });

    if (error) throw error;
    else if (origin === destination) throw 'similar origin and destination';
    else if (reqReturnDate < reqDepartureDate) throw 'departureDate > returnDate';
    else if (reqDepartureDate < todayDate) throw 'past departure date';
    else if (departureDate || returnDate) {
      const requests = await models.Request.findAll({
        where: {
          requesterId: req.user.id,
        },
        raw: true,
      });
      requests.map((request) => {
        if (((request.departureDate <= reqDepartureDate) && (reqDepartureDate <= request.returnDate))
          || ((request.departureDate <= reqReturnDate) && (reqReturnDate <= request.returnDate))) {
          if (request.type === 'one_way') {
            const {
              createdAt,
              updatedAt,
              returnDate,
              cities,
              ...otherTripInfo
            } = request;
            conflictingTripRequest = otherTripInfo;
          } else if (request.type === 'two_way') {
            const {
              createdAt,
              updatedAt,
              cities,
              ...otherTripInfo
            } = request;
            conflictingTripRequest = otherTripInfo;
          } else if (request.type === 'multi_way') {
            const {
              createdAt,
              updatedAt,
              ...otherTripInfo
            } = request;
            conflictingTripRequest = otherTripInfo;
          }
          throw 'conflicting trip';
        }
      });
    }
    next();
  } catch (error) {
    if (error === 'Empty request') {
      return res.status(200).json({
        error: 'Empty request body.',
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(422).json({
        status: res.statusCode,
        error: error.message,
      });
    }
    if (error === 'similar origin and destination') {
      return res.status(422).json({
        status: res.statusCode,
        error: 'Origin has to differ from destination.',
      });
    }
    if (error === 'departureDate > returnDate') {
      return res.status(422).json({
        status: res.statusCode,
        error: "Returning date has to be the day after your departure's date!",
      });
    }
    if (error === 'past departure date') {
      return res.status(422).json({
        status: res.statusCode,
        error: 'Please select travel date starting from today.',
      });
    }
    if (error === 'conflicting trip') {
      return res.status(422).json({
        status: res.statusCode,
        error: 'conflicting trip request.',
        conflictingTripRequest,
      });
    }
    return res.status(500).json({
      error: error.message,
    });
  }
};
