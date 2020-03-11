import models from '../db/models';

export default class Rates {
  static update(userId, accommodationId, rate) {
    return models.Rate.update({ rate }, { where: { userId, accommodationId } });
  }
}
