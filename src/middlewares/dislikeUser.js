import { Accommodation, sequelize } from '../db/models';
import likeUnlikeUser from '../helpers/likeAndDislike';

export const searchIndisLike = async (req, res, next) => {
  const { likesUsers, dislikeUsers } = await Accommodation
    .findOne({ where: { id: req.params.id } });
  const error = likeUnlikeUser(dislikeUsers, req.user.id, req, likesUsers);
  if (error.length > 0) return res.status(409).json(error[0]);
  return next();
};

export const searchInLike = async (req, res, next) => {
  const { likes } = await Accommodation
    .findOne({ where: { id: req.params.id } });
  req.nextUsers.forEach(async (userId) => {
    if (userId === req.user.id) {
      await Accommodation.update(
        {
          likes: likes - 1,
          likesUsers: sequelize.fn('array_remove', sequelize.col('likesUsers'), req.user.id),
        },
        { where: { id: req.params.id } },
      );
    }
  });
  return next();
};
