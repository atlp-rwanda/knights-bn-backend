import models from '../db/models';

export default async (req, res, next) => {
  const user = await models.User.findOne({ where: { id: req.user.id } });
  if (user.role !== 'traveladmin' && user.role !== 'supplier') {
    return res.status(401).json({ status: 401, errorMessage: 'Not allowed to access this page' });
  }
  next();
};
