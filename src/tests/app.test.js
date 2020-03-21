import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import ioClient from 'socket.io-client';
import app from '../app';

chai.use(chaiHttp);
chai.should();

const port = 4000;
const appp = express();
const server = appp.listen(port);

const clientToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoid2lsbGlhbS5pc2hpbXdlQGFuZGVsYS5jb20iLCJyb2xlIjoibWFuYWdlciIsImZpcnN0TmFtZSI6IldpbGxpYW0iLCJsYXN0TmFtZSI6IklzaGltd2UiLCJpYXQiOjE1ODQ4MDkwMjJ9.FEnICPezHKpjKGLkoN7J942KrwWMoas1cToIjbBC93w';

const checkRoute = () => {
  describe('Non existing route.(POST) ', () => {
    it('it should return 404 on non existing route', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/route')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('error').equals('Not Found!');
          done();
        });
    });
  });
  describe('test app.js', () => {
    let clientSocket;
    const BASE_URL = `http://localhost:${port}`;
    before((done) => {
      clientSocket = ioClient.connect(BASE_URL, {
        transportOptions: {
          polling:
        { extraHeaders: { clientToken } },
        },
        'force new connection': true,
        forceNew: true,
      });
      done();
    });
    afterEach((done) => {
      clientSocket.disconnect();
      done();
    });
  });
};

export default checkRoute;
