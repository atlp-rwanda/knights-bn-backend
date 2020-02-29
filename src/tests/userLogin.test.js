import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();
const usersignIn = () => {
  describe('Athentication.(POST) ', () => {
    it('it should return 201 on successful signup', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.userX)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('Please go to your email address to verify your account.');
          done();
        });
    });
    it('it should return 200 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginX)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
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
    it('it should return 401 for invalid password', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.invalidCredentials)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          done();
        });
    });
    it('it should return 401 if no password provided', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.missingIinformation)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          done();
        });
    });
  });
  describe('User Logout', () => {
    it('it should return 200 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.login1)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
        });
      done();
    });
    it('it should return 200 on successful logout', (done) => {
      chai
        .request(app)
        .patch('/api/v1/auth/logout')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('Logout successfully');
          done();
        });
    });
    it('it should return 401 on trying to logout when you are not logged in', (done) => {
      chai
        .request(app)
        .patch('/api/v1/auth/logout')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.error).to.equal('you are not logged in');
          done();
        });
    });
    it('it should return 200 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.user1)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('Successfully login');
          done();
        });
    });
  });
};
export default usersignIn;
