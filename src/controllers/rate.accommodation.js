import models from '../db/models';
import Rates from '../helpers/rateQueries';

export default class rateAccommodation {
  static async rateExistingAccomodation(req, res) {
    try {
      const accommodationId = parseInt(req.params.id);
      const { rate } = req.body;
      const userId = req.user.id;
      const user = await models.Rate.findOne({ where: { userId: `${userId}` } });
      if (!user) await models.Rate.create({ accommodationId, userId, rate });
      else await Rates.update(userId, accommodationId, rate);
      res.status(200).json({ status: 200, message: 'your rating was updated successfully ' });
      const numberOfRatings = (await models.Rate.findAll()).length;
      const arrayOfRatings = await models.Rate.findAll({ attributes: ['rate'], raw: true });
      let totalrating = 0;
      arrayOfRatings.map((rate) => { totalrating += rate.rate; return arrayOfRatings; });
      const average = (totalrating / numberOfRatings).toFixed(1);
      await models.Accommodation.update({ rate: average }, { where: { id: accommodationId } });
      return res.status(200).json({ status: 200, message: 'you successfuly rated the accomodation ' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
