import models from '../db/models';

export default class commentController {
  static async createComment(req, res) {
    const commenterId = req.user.id;
    const { comment } = req.body;
    const { requestId } = req.query;

    await models.Comment.create({
      commenterId,
      requestId,
      comment,
    });
    return res.status(201).json({
      status: 201,
      message: 'comment successfully added',
    });
  }

  static async deleteComment(req, res) {
    const { commentId } = req.query;
    await models.Comment.destroy({
      where: { id: commentId },
    });
    return res.status(200).json({
      status: 200,
      message: 'Comment deleted successfully!',
    });
  }
}
