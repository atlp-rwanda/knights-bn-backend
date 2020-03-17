import models from '../db/models';
import UserQuery from '../helpers/userQueries';

const checkAuthorizedCommenter = async (req, res, next) => {
  const commenterId = req.user.id;
  const { requestId } = req.query;
  if (isNaN(requestId)) {
    return res.status(422).json({ status: 422, error: 'please provide the Id of the request, Id must be a number' });
  }
  const requestInfo = await models.Request.findOne({ where: { id: requestId } });
  if (!requestInfo) return res.status(404).json({ status: 404, error: 'request does not exist' });
  const { requesterId } = requestInfo;
  const requester = await UserQuery.getUser('id', requesterId);
  const { lineManager } = requester.dataValues;
  const manager = await UserQuery.getUser('email', lineManager);
  if (commenterId !== requesterId && commenterId !== manager.dataValues.id) {
    return res.status(403).json({ status: 403, error: 'Unauthorized: you are not authorized to perform this operation' });
  }
  return next();
};

export default checkAuthorizedCommenter;
