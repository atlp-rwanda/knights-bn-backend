import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';
import mockData from './mockData';
import returnTripMock from '../mockData/twoWayTrip';

const { validTrip3 } = returnTripMock;

dotenv.config();

const { expect } = chai;
chai.use(chaiHttp);

const testRejectRequest = () => {
  describe('Test comment on a request', () => {
    it('returns 200 on a user signed in successfully', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginUserWithLineManager2)
        .end((err, res) => {
          expect(res.body).to.have.property('message').that.equals('Successfully login');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should return 200 on successful created request ', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .send(validTrip3)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message').that.equals('request created on success!');
          expect(res.body).to.have.property('status').that.equals('pending');
        });
      done();
    });
    it('should return 201 on successful comment on a request ', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/comment/?requestId=6')
        .send(mockData.comment)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('message').that.equals('comment successfully added');
        });
      done();
    });
    it('should return 201 on successful comment on a request ', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/comment/?requestId=1')
        .send(mockData.InvalidComment)
        .end((err, res) => {
          expect(res.status).to.equal(422);
        });
      done();
    });
    it('returns 200 on a user signed in successfully', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginM)
        .end((err, res) => {
          expect(res.body).to.have.property('message').that.equals('Successfully login');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should return 201 on successful comment on a request ', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/comment/?requestId=6')
        .send(mockData.comment)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('error').that.equals('Unauthorized: you are not authorized to perform this operation');
        });
      done();
    });
  });
};
export default testRejectRequest;
