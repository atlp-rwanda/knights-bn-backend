import jwt from 'jsonwebtoken';

const usePasswordHashToMakeToken = ({
  password: passwordHash,
  id: userId,
}) => {
  const secret = `${passwordHash}`;
  const token = jwt.sign({ userId }, secret, {
    expiresIn: 3600, // 1 hour
  });
  return token;
};

export default usePasswordHashToMakeToken;
