import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();

const usersignIn = () => {
  describe('Athentication.(POST) ', () => {
    it('it should return 200 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginSuccessfully)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('it should return 404 if email is not registered', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.youhaveNoAccount)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
    it('it should return 400 for invalid password', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.invalidCredentials)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
    it('it should return 400 if no password provided', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.missingIinformation)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });
};

export default usersignIn;
