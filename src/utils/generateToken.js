import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const generateToken = (payload) => jwt.sign(payload, process.env.SECRETKEY);

export default generateToken;
