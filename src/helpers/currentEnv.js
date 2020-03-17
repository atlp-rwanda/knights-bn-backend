import environment from 'dotenv';

environment.config();
const localHost = process.env.LOCAL_HOST;
const cloudHost = process.env.HOST_NAME;

const currentEnv = () => {
  const host = (process.env === 'production') ? cloudHost : localHost;
  const url = `${host}/api/v1/trips/myRequest`;
  return url;
};

export default currentEnv;
