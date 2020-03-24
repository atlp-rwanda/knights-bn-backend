import getTodayDate from '../helpers/getTodayDate';
import {
  editRequestSchema,
  createTwoWayTripSchema,
} from '../helpers/validationSchemas';
import isObjectEmpty from '../helpers/isObjectEmpty';
import getConflictingRequest from '../helpers/getConflictingRequest';
import Request from '../helpers/Request';
import getUrlAddress from '../helpers/getUrlAddress';

let conflictingRequest;

export default async (req, res, next) => {
  try {
    let schema;
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
    const address = getUrlAddress(urlSections);
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
      const requests = await Request.getAllRequests(req.user.id);
      requests.map((request) => {
        if (((request.departureDate <= reqDepartureDate)
        && (reqDepartureDate <= request.returnDate))
          || ((request.departureDate <= reqReturnDate) && (reqReturnDate <= request.returnDate))) {
          conflictingRequest = getConflictingRequest(request);
          throw 'conflicting trip';
        }
      });
    }
    return next();
  } catch (error) {
    if (error === 'Empty request') {
      res.status(200).json({
        error: 'Empty request body.',
      });
    }
    if (error.name === 'ValidationError') {
      res.status(422).json({
        status: res.statusCode,
        error: error.message,
      });
    }
    if (error === 'similar origin and destination') {
      res.status(422).json({
        status: res.statusCode,
        error: 'Origin has to differ from destination.',
      });
    }
    if (error === 'departureDate > returnDate') {
      res.status(422).json({
        status: res.statusCode,
        error: "Returning date has to be the day after your departure's date!",
      });
    }
    if (error === 'past departure date') {
      res.status(422).json({
        status: res.statusCode,
        error: 'Please select travel date starting from today.',
      });
    }
    if (error === 'conflicting trip') {
      res.status(409).json({
        status: res.statusCode,
        error: 'conflicting trip request.',
        conflictingRequest,
      });
    }
    return res.status(500).json({
      error: error.message,
    });
  }
};
