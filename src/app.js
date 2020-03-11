/* eslint-disable no-underscore-dangle */

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import passport from 'passport';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import sessions from 'express-session';
import swaggerDefinition from './docs/swaggerDefinition';
import users from './routes/users';
import trips from './routes/trips';
import chats from './routes/chat';
import translator from './translator';
import accommodationRouter from './routes/accommodation';
import events from './helpers/eventConnect';
import decodeToken from './helpers/decodeToken';
import io from './helpers/ioServerHelper';

dotenv.config();
const app = express();
// server
const connectedClients = {};
io.use(async (socket, next) => {
  const { token } = socket.handshake.query;
  if (token) {
    const decoded = decodeToken(token, process.env.SECRETKEY);
    const userData = decoded;
    if (!userData.error) {
      const clientKey = Number.parseInt(userData.id, 10);
      connectedClients[clientKey] = connectedClients[clientKey] || [];
      connectedClients[clientKey].push(socket.id);
    }
  }
  next();
});
app.use((req, res, next) => {
  req.io = io;

  req.connectedClients = connectedClients;
  next();
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
events();
const newSwaggerDef = {
  swaggerDefinition,
  apis: [`${__dirname}/models/*.js`, `${__dirname}/routes/*.js`],
};

const swaggerSpec = swaggerJsDoc(newSwaggerDef);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
multer({ dest: 'uploads/' });
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.use(sessions({
  secret: process.env.SECRETKEY,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 14 * 24 * 3600 * 1000,
    sameSite: true,
  },
}));
app.use(passport.initialize());

app.use(translator);
app.get('/', (req, res) => res.json(res.__('Welcome to Barefoot Nomad')));
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', users);
app.use('/api/v1', trips);
app.use('/api/v1', accommodationRouter);
app.use('/api/v1', chats);

app.use((req, res) => res.status(404).send({
  status: 404,
  error: 'Not Found!',
}));

export default app;
