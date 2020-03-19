import dotenv from 'dotenv';

dotenv.config();
const localSwagger = process.env.LOCAL_HOST;
const herokuSwagger = process.env.HOST_NAME;

const swaggerDefinition = {
  info: {
    title: 'Barefoot Nomad',
    version: '1.0.0',
    description: 'Barefoot Nomad - Making travel and accommodation easy and convenient.',
  },
  host: (process.env === 'production') ? herokuSwagger : localSwagger,
  basePath: '/api/v1',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};
export default swaggerDefinition;
