import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import io from 'socket.io-client';
import app from '../app';

chai.use(chaiHttp);
chai.should();

const clientToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoid2lsbGlhbS5pc2hpbXdlQGFuZGVsYS5jb20iLCJyb2xlIjoibWFuYWdlciIsImZpcnN0TmFtZSI6IldpbGxpYW0iLCJsYXN0TmFtZSI6IklzaGltd2UiLCJpYXQiOjE1ODQ4MDkwMjJ9.FEnICPezHKpjKGLkoN7J942KrwWMoas1cToIjbBC93w';

const checkRoute = () => {
  describe('Non existing route.(POST) ', () => {
    describe('test app.js', () => {
      let socket;
      beforeEach((done) => {
        socket = io.connect('http://localhost:4000', { query: { token: clientToken } });
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
        socket.disconnect();
        done();
      });
    });
  });
};

export default checkRoute;
