import JoiBase from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
import _ from 'lodash';
import errorHandler from '../helpers/errorHandler';

const Joi = JoiBase.extend(JoiDate);
const validateStatsDate = (req, res, next) => {
  try {
    const { date } = req.params;
    if (_.isEmpty(date)) throw 'Empty request !';
    const schema = {
      query: Joi.object({
        date: Joi.date().format('YYYY-MM-DD').max('now').required(),
      }),
    };
    const { error } = schema.query.validate({ date });
    if (error) throw error;
    next();
  } catch (error) {
    return errorHandler(res, error);
  }
};

export default validateStatsDate;
