import models from '../db/models';
import getOne from '../helpers/queries';

const findAccommodation = async (req, res, next) => {
  try {
    const whereQuery = { id: req.params.id, userId: req.user.id };
    const accommodation = await getOne
      .verifyAccom(whereQuery, models.Accommodation);
    if (accommodation === null) {
      return res.status(404)
        .json({ status: 404, errorMessage: 'Accommodation not found' });
    }
    req.accommodation = accommodation;
    return next();
  } catch (error) {
    return res.status(500)
      .json({ error: error.name, errorMessage: `Invalid url parameter "${req.params.id}"` });
  }
};

export default findAccommodation;
