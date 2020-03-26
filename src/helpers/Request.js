/* eslint-disable no-restricted-syntax */
import models, { Sequelize } from '../db/models';

const { Op, fn } = Sequelize;

export default class Request {
  static isRequestBelongsToRequester(requestId, requesterId) {
    return models.Request.findOne(
      {
        where: { id: requestId, requesterId },
        include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment', 'createdAt'],
          },
        ],
      },
    );
  }

  static getAllRequests(requesterId) {
    return models.Request.findAll({ where: { requesterId } });
  }

  static isRequestBelongsToManager(requestId, managerId) {
    return models.Request.findOne(
      { where: { id: requestId, managerId } },
    );
  }

  static updateStatus(request, status) {
    return models.Request.update(
      { status },
      { where: { id: request.id } },
    );
  }

  static updateRequest(requestId, updates) {
    const updatesToArray = Object.entries(updates);
    const fixedCols = ['status', 'createdAt', 'updatedAt', 'managerId', 'requesterId', 'id', 'type'];
    for (const [key, value] of updatesToArray) {
      if (fixedCols.includes(key)) continue;
      if (value) {
        const update = {};
        update[`${key}`] = value;
        models.Request.update(
          { ...update },
          { where: { id: requestId } },
        );
      }
    }
    return models.Request.findOne({
      where: { id: requestId },
    });
  }

  static getTripsMade(userId, startingDate) {
    return models.Request.findAll({
      where: {
        status: 'approved',
        [Op.or]: [{ requesterId: userId }, { managerId: userId }],
        departureDate: { [Op.gte]: startingDate },
        returnDate: { [Op.lt]: fn('NOW') },
      },
    });
  }
}
