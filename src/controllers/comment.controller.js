import models from '../db/models';
import { echoNotification } from '../helpers/notificationSender';
import TripHelper from '../helpers/TripHelper';
import currentEnv from '../helpers/currentEnv';

export default class commentController {
  static async createComment(req, res) {
    try {
      const commenterId = req.user.id;
      const { comment } = req.body;
      const { requestId } = req.query;
      const isRequest = await TripHelper.searchRequest(requestId);
      const { requesterId } = isRequest;
      const newComment = await models.Comment.create({ commenterId, requestId, comment });
      if (newComment) {
        const newNotification = await models.Notification.create({
          requesterId,
          managerId: newComment.commenterId,
          status: 'non_read',
          message: `<a href="${currentEnv()}" target="_blank" onClick="javascript:document.location.reload(true)">New comment made on your request </a>`,
          type: 'new_comment',
          owner: 'requester',
        });
        echoNotification(req, newNotification, 'new_comment', requesterId);
        return res.status(201).json({
          status: 201,
          message: 'comment successfully added',
        });
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
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
