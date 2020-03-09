import Sequelize from 'sequelize';
import models from '../db/models';

const {
  Op,
} = Sequelize;

class oneWayTripHelper {
  static async searchManager() {
    const isManager = await models.User.findOne({ where: { role: 'manager' } });
    return isManager;
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

export default oneWayTripHelper;
