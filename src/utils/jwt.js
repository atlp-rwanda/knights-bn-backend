import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


class tokenizer {

  async signToken(user) {
    return JWT.sign({
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    }, process.env.SECRETKEY, { expiresIn: '24h' });
  }

  async decodeToken(token) {
    const data = JWT.verify(token, process.env.SECRETKEY, (err, decoded) => {
      if (err) return { error: err.message };
      return decoded;
    });
    return data;
  }
}

export default new tokenizer();
