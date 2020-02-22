import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
class tokenGenerator {
  static createToken(email, firstName, lastName) {
    const token = jwt.sign({ email, firstName, lastName }, process.env.SECRETKEY);
    return token;
  }
}

export default tokenGenerator;
