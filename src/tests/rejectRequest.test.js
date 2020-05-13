import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import app from '../app';
import mockData from './mockData';
import isObjectEmpty from '../helpers/isObjectEmpty';

dotenv.config();

const { expect } = chai;
chai.use(chaiHttp);

const testRejectRequest = () => {
  describe('Test /trips/reject', () => {
    it('returns 403 if a user is not a manager', (done) => {
      const Signed = mockData.loginX;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch(`/api/v1/trips/reject?requestId=${2}`)
        .set('user-token', Token)
        .end((error, response) => {
          expect(response.status).to.equal(403);
          expect(response.body)
            .to.have.property('error')
            .equals('Unauthorized access!');
          done();
        });
    });
    it('returns 404 if requestId not found', (done) => {
      const Signed = mockData.managerLogin;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch(`/api/v1/trips/reject?requestId=${2000}`)
        .set('user-token', Token)
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect(response.body)
            .to.have.property('error')
            .equals('Request not found!');
          done();
        });
    });
    it('returns 422 on a request with invalid id', (done) => {
      const Signed = mockData.managerLogin;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch(`/api/v1/trips/reject?requestId=${'x'}`)
        .set('user-token', Token)
        .end((error, response) => {
          expect(response.status).to.equal(422);
          expect(response.body).to.have.property('error');
          done();
        });
    });
    it('returns 200 if request has successfully rejected ', async (done) => {
      const Signed = mockData.managerLogin;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch(`/api/v1/trips/reject?requestId=${2}`)
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
        });
      done();
    });
    it('returns 200 on a request with already rejected status', (done) => {
      const Signed = mockData.managerLogin;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch(`/api/v1/trips/reject?requestId=${2}`)
        .set('user-token', Token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
        });
      done();
    });
    it('returns 405 on a request with approved status', (done) => {
      const Signed = mockData.managerLogin;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch(`/api/v1/trips/reject?requestId=${3}`)
        .set('user-token', Token)
        .end((error, response) => {
          expect(response.status).to.equal(405);
          expect(response.body)
            .to.have.property('error')
            .equals("Sorry can't reject ! The user is now on trip.");
          done();
        });
    });
    it('returns 200 if request was approved but yet its start date not today ', (done) => {
      const Signed = mockData.managerLogin;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch(`/api/v1/trips/reject?requestId=${4}`)
        .set('user-token', Token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body)
            .to.have.property('message')
            .equals('The request successfully rejected');
        });
      done();
    });
    it('should return true if object is empty', (done) => {
      const userInfo = {};
      const isUserInfoEmpty = isObjectEmpty(userInfo);
      expect(isUserInfoEmpty).to.equal(true);
      done();
    });
  });
};
export default testRejectRequest;
