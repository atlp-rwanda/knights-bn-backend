import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = !req.headers.token ? req.params.token : req.headers.token;
  if (!token) {
    return res.status(401).json({ error: 'Access denied. no token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = decoded;

    next();
  } catch (ex) {
    return res.status(401).json({ error: 'invalid token.' });
  }
  return (token);
};
export default {
  auth,
};
