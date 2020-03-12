import models from '../db/models';

const { Accommodation } = models;
class accomodationHelper {
  static async searchAccomodation(id) {
    const getAccomodation = await Accommodation.findOne({ where: { id } });
    return getAccomodation;
  }
}
export default accomodationHelper;
