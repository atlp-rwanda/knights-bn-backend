class accommodationQueries {
  static async getAccommodation(_attr, value, entity) {
    let accommodation;
    switch (_attr) {
      case 'id':
        accommodation = await entity.findOne({
          where: { id: value },
        });

        break;
      case 'getAll':
        accommodation = await entity.findAll({
          where: {
            userId: value,
          },
          attributes: {
            exclude: ['userId', 'createdAt', 'updatedAt'],
          },
        });
        break;
      default:
        accommodation = null;
        break;
    }
    return accommodation;
  }

  static async getAOne(value1, value2, entity) {
    const result = await entity
      .findOne({ where: { accommodationName: value2, locationName: value1 } });
    return result;
  }
}

export default accommodationQueries;

