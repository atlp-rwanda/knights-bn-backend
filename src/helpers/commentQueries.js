import models from '../db/models';

class CommentQuery {
  static async getComment(_attr, value) {
    let comment;
    switch (_attr) {
      case 'id':
        comment = await models.Comment.findOne({
          where: { id: value },
        });
        break;
      default:
        comment = null;
        break;
    }
    return comment;
  }
}
export default CommentQuery;
