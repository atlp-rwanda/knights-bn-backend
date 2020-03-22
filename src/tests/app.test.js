import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import io from 'socket.io-client';
import dotenv from 'dotenv';
import app from '../app';

chai.use(chaiHttp);
chai.should();
dotenv.config();

const clientToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoid2lsbGlhbS5pc2hpbXdlQGFuZGVsYS5jb20iLCJyb2xlIjoibWFuYWdlciIsImZpcnN0TmFtZSI6IldpbGxpYW0iLCJsYXN0TmFtZSI6IklzaGltd2UiLCJpYXQiOjE1ODQ4MDkwMjJ9.FEnICPezHKpjKGLkoN7J942KrwWMoas1cToIjbBC93w';
const clientToken2 = ' ';

const port = process.env.PORT || 4000;
const BASE_URL = `http://localhost:${port}`;
const checkRoute = () => {
  describe('test app.js', () => {
    describe('Non existing route.(POST) ', () => {
      let socket;
      beforeEach((done) => {
        socket = io.connect(BASE_URL, { query: { token: clientToken } }, {
          'reconnection delay': 0,
          'reopen delay': 0,
          'force new connection': true,
          transports: ['websocket'],
        });
        socket.on('connect', () => {
          done();
        });
      });
      it('it should welcome if url is valid', (done) => {
        chai
          .request(app)
          .get('/')
          .end((err, res) => {
            expect(res.body).to.equals('Welcome to Barefoot Nomad');
            done();
          });
      });
      it('should fail to connect if no token provided', (done) => {
        socket = io.connect('http://localhost:4000', { query: { token: clientToken2 } });
        socket.on('disconnect', () => {
        });
        done();
      });
      it('it should display 404 for non existing endpoint', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/route')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body).to.have.property('error').equals('Not Found!');
            done();
          });
      });
      afterEach((done) => {
        if (socket.connected) {
          socket.disconnect();
        }
        done();
      });
    });
  });
};

export default checkRoute;
