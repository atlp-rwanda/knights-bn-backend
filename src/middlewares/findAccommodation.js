import models from '../db/models';
import getAOne from '../helpers/queries';

const findAccommodation = async (req, res, next) => {
  const accommodation = getAOne.getAOne('id', 'userId', req.params.id, req.user.id, models.Accommodation);
  if (await accommodation === null) {
    return res.status(404)
      .json({ status: 404, errorMessage: 'Accommodation not found' });
  }
  req.accommodation = accommodation;
  return next();
};

export default findAccommodation;
