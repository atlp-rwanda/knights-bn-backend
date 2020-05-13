import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import jwt from 'jsonwebtoken';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();
chai.use(sinonChai);

const superAdmin = () => {
  describe('superAdmin can view all the users', () => {
    it('should return 401 for forbidden viewing all the users', (done) => {
      const Signed = mockData.loginSuccessfully3;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .get('/api/v1/users')
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.body.status).to.equal(401);
          expect(res.body)
            .to.have.property('errorMessage')
            .that.equals('Not allowed to access this page');
        });
      done();
    });
    it('should return 200 for viewing all the users', (done) => {
      const Signed = mockData.superAdminLogin;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .get('/api/v1/users')
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(res.body)
            .to.have.property('Users')
            .to.be.an('array');
        });
      done();
    });

    it('should return 200 for viewing one user', (done) => {
      const Signed = mockData.superAdminLogin;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .get('/api/v1/users/alain.maxime@gmail.com')
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('User');
          done();
        });
    });
    it('should return 404 for viewing one user', (done) => {
      const Signed = mockData.superAdminLogin;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .get('/api/v1/users/alain.maxime2@gmail.com')
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.body)
            .to.have.property('error')
            .that.equals('no user found matching that email');
          done();
        });
    });
  });
};

export default superAdmin;
