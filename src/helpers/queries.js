class accommodationQueries {
  static async getAccommodation(_attr, value, entity) {
    let accommodation;
    switch (_attr) {
      case 'id':
        accommodation = await entity.findOne({
          where: { id: value },
        });
        break;
      default:
        accommodation = null;
        break;
    }
    return accommodation;
  }
}
export default accommodationQueries;
