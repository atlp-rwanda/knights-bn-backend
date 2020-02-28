import jwt from 'jsonwebtoken';

const usePasswordHashToMakeToken = ({
  password: passwordHash,
  id,
}) => {
  const secret = `${passwordHash}`;
  const token = jwt.sign({ id }, secret, {
    expiresIn: 3600, // 1 hour
  });
  return token;
};

export default usePasswordHashToMakeToken;
