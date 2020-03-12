import Sequelize from 'sequelize';
import models from '../db/models';

const {
  Op,
} = Sequelize;

class TripHelper {
  static async searchManager() {
    const isManager = await models.User.findOne({ where: { role: 'manager' } });
    return isManager;
  }

  static async searchRequest(id) {
    const isRequest = await models.Request.findOne({ where: { id } });
    return isRequest;
  }

  static async searchTripRequest(requesterId, departureDate, destination) {
    const existingRequest = await models.Request.findAll({
      where: {
        [Op.and]: [
          { requesterId },
          { departureDate },
          { destination },
        ],
      },
    });
    return existingRequest;
  }
}

export default TripHelper;
