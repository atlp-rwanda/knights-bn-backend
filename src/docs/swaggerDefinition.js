const swaggerDefinition = {
  info: {
    title: 'Barefoot Nomad',
    version: '1.0.0',
    description: 'Barefoot Nomad - Making travel and accomodation easy and convenient.',
  },
  host: 'https://knights-bn-backend-staging.herokuapp.com',
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
