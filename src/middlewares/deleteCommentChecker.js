import commentQuery from '../helpers/commentQueries';

const checkAuthorizedCommenter = async (req, res, next) => {
  const commenterId = req.user.id;
  const { commentId } = req.query;
  if (isNaN(commentId)) {
    return res.status(422).json({
      status: 422,
      error: 'wrong commentId input,commentId should be a number',
    });
  }
  const comment = await commentQuery.getComment('id', commentId);
  if (!comment) {
    return res.status(404).json({
      status: 404,
      error: 'no comment found',
    });
  }

  if (comment.commenterId !== commenterId) {
    return res.status(404).json({
      status: 403,
      error: 'Not authorized: only the comment author can delete the comment',
    });
  }
  return next();
};

export default checkAuthorizedCommenter;
