import { rateValidatorId } from '../helpers/validationSchemas';
import Accomodation from '../helpers/queries';
import UserQuery from '../helpers/userQueries';
import models from '../db/models';

export default async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    if (id == null) {
      return res.status(422).json({ status: 422, error: 'please provide the id of the accommodation' });
    }
    const { error } = rateValidatorId.validate({ id });
    const accomodationInfo = await Accomodation.getAccommodation('id', id, models.Accommodation);
    const userInfo = await UserQuery.getUser('id', userId);
    if (userInfo.role === 'supplier') {
      return res.status(403).json({
        status: 403,
        error: 'suppliers can not rate accommodations',
      });
    }

    if (!accomodationInfo) {
      return res.status(404).json({
        status: 404,
        message: 'accomodation not found, please check the id again',
      });
    }
    if (error) throw error;
    return next();
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};
