import dotenv from 'dotenv';

dotenv.config();

const swaggerDefinition = {
  info: {
    title: 'Barefoot Nomad',
    version: '1.0.0',
    description: 'Barefoot Nomad - Making travel and accomodation easy and convenient.',
  },
  host: process.env.HOST_NAME,
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
