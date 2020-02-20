import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const generateTokens = (payload) => jwt.sign(payload, process.env.SECRETKEY);

export default generateTokens;
