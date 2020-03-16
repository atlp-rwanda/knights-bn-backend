import JoiBase from '@hapi/joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiBase.extend(JoiDate);

const editRequestSchema = Joi.object({
  origin: Joi.string(),
  destination: Joi.string(),
  departureDate: Joi.date().format('YYYY-MM-DD'),
  returnDate: Joi.date().format('YYYY-MM-DD'),
  reason: Joi.string().max(256),
  accommodation: Joi.string(),
});

const createTwoWayTripSchema = Joi.object({
  origin: Joi.string().required(),
  destination: Joi.string().required(),
  departureDate: Joi.date().format('YYYY-MM-DD').required(),
  returnDate: Joi.date().format('YYYY-MM-DD').required(),
  reason: Joi.string().max(256).required(),
  accommodation: Joi.string().required(),
});

const requestIdParamsSchema = Joi.object({
  requestId: Joi.number().required(),
});
const rateValidatorId = Joi.object({
  id: Joi.number().required(),
});

const rateValidator = Joi.object({
  rate: Joi.number().required().min(1).max(5),
});

export {
  rateValidatorId, editRequestSchema, createTwoWayTripSchema, requestIdParamsSchema, rateValidator,
};
