import { Accommodation } from '../db/models';
import getOne from '../helpers/queries';

export const findAccommodation = async (req, res, next) => {
  try {
    const whereQuery = { id: req.params.id, userId: req.user.id };
    const accommodation = await getOne
      .verifyAccom(whereQuery, Accommodation);
    if (accommodation === null) {
      return res.status(404)
        .json({ status: 404, errorMessage: 'Accommodation not found' });
    }
    req.accommodation = accommodation;
    return next();
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};

export const isFound = async (req, res, next) => {
  const findAccomodation = await getOne.getAccommodation('id', req.params.id, Accommodation);
  if (findAccomodation === null) {
    return res.status(404).json({ status: 404, message: 'accomodation not found' });
  }
  return next();
};

