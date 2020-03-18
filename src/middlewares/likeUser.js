import { Accommodation, sequelize } from '../db/models';
import accommodation from '../helpers/queries';
import likeUnlikeUser from '../helpers/likeAndDislike';

export const checkLike = async (req, res, next) => {
  const { likesUsers, dislikeUsers } = await accommodation
    .verifyAccom({ id: req.params.id }, Accommodation);
  const error = likeUnlikeUser(likesUsers, req.user.id, req, dislikeUsers);
  if (error.length > 0) return res.status(409).json(error[0]);
  return next();
};

export const checkDisLike = async (req, res, next) => {
  const { dislikes } = await Accommodation
    .findOne({ where: { id: req.params.id } });
  req.nextUsers.forEach(async (userId) => {
    if (userId === req.user.id) {
      await accommodation.update(
        {
          dislikes: dislikes - 1,
          dislikeUsers: sequelize.fn('array_remove', sequelize.col('dislikeUsers'), req.user.id),
        },
        { id: req.params.id }, Accommodation,
      );
    }
  });
  return next();
};
