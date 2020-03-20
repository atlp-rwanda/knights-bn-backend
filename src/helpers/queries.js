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

  static async verifyAccom(whereQuery, entity) {
    const result = await entity
      .findOne({ where: whereQuery });
    return result;
  }

  static async update(updateData, whereQuery, entity) {
    await entity.update(updateData, { where: whereQuery });
  }
}

export default accommodationQueries;

