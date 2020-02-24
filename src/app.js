import express, { request } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';
import passport from 'passport';
import swaggerDefinition from './docs/swaggerDefinition';
import users from './routes/users';
import trips from './routes/trips';
import translator from './translator';

const app = express();
const newSwaggerDef = {
  swaggerDefinition,
  apis: [`${__dirname}/models/*.js`, `${__dirname}/routes/*.js`],
};

const swaggerSpec = swaggerJsDoc(newSwaggerDef);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(translator);
app.get('/', (req, res) => res.json(res.__('Welcome to Barefoot Nomad')));
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', users);
app.use('/api/v1', trips);

export default app;
