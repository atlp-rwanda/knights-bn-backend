import jwt from 'jsonwebtoken';
import localStorage from 'localStorage';

const verifyToken = async (req, res, next) => {
  try {  
    const token = localStorage.getItem('token');
   
    if (!token) {
      res.status(401).json({
        status: 401,
        error: 'no token provided!',
      });
      return;
    }
    const decoded = await (jwt.verify(token, process.env.SECRETKEY));    
    if (!decoded) {
      res.status(401).send({
        status: res.statusCode,
        error: 'Unauthorized Access',
      });
    }
    req.body.id = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({
      status: res.statusCode,
      error: err.message,
    });
  }
};
export default verifyToken;
