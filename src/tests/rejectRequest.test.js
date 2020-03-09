import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';
import mockData from './mockData';
import isObjectEmpty from '../utils/isObjectEmpty';

dotenv.config();

const { expect } = chai;
chai.use(chaiHttp);

const testRejectRequest = () => {
  describe('Test /trips/reject', () => {
    it('returns 200 on a user signed in successfully', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginX)
        .end((err, res) => {
          expect(res.body).to.have.property('message').that.equals('Successfully login');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('returns 403 if a user is not a manager', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/trips/reject?requestId=${2}`)
        .end((error, response) => {
          expect(response.status).to.equal(403);
          expect(response.body).to.have.property('error').equals('Unauthorized access!');
          done();
        });
    });
    it('returns 200 on a manager signed in successfully', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'eugene.munyampundu@gmail.com',
          password: 'Niyonkuru@1'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('message').that.equals('Successfully login');
          done();
        });
    });
    it('returns 404 if requestId not found', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/trips/reject?requestId=${2000}`)
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect(response.body).to.have.property('error').equals('Request not found!');
          done();
        });
    });
    it('returns 200 if request has successfully rejected ', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/trips/reject?requestId=${2}`)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('message').equals('The request successfully rejected');
          done();
        });
    });
    it('returns 200 on a request with already rejected status', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/trips/reject?requestId=${2}`)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
    it('returns 405 on a request with approved status', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/trips/reject?requestId=${3}`)
        .end((error, response) => {
          expect(response.status).to.equal(405);
          expect(response.body).to.have.property('message').equals("Sorry can't reject ! The user is now on trip.");
          done();
        });
    });
    it('returns 500 on a request with invalid id', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/trips/reject?requestId=${'x'}`)
        .end((error, response) => {
          expect(response.status).to.equal(500);
          expect(response.body).to.have.property('error');
          done();
        });
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
