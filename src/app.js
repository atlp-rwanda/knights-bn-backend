import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerDefinition from './docs/swaggerDefinition';


const app = express();

const newSwaggerDef = {
  swaggerDefinition,
  apis: [`${__dirname}/models/*.js`, `${__dirname}/routes/*.js`],
};

const swaggerSpec = swaggerJsDoc(newSwaggerDef);

app.use('/api/v1', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
