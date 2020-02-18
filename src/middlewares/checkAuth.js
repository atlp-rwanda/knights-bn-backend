import jwt from 'jsonwebtoken';
import localStorage from 'localStorage';

const auth = (req, res, next) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'you are not logged in'
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(500).json({ error });
  }
  return token;
};
export default {
  auth
};
