import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const decodeToken = (token) => jwt.verify(token, process.env.SECRETKEY);

export default decodeToken;
