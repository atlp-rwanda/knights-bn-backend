import dotenv from 'dotenv';

dotenv.config();
const localSwagger = process.env.LOCAL_HOST;
const herokuSwagger = 'localhost:4000';

const swaggerDefinition = {
  info: {
    title: 'Barefoot Nomad',
    version: '1.0.0',
    description: 'Barefoot Nomad - Making travel and accomodation easy and convenient.',
  },
  host: process.env === 'development' ? localSwagger : herokuSwagger,
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
