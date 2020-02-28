import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';
import returnTripMock from '../mockData/twoWayTrip';

const { validTrip2 } = returnTripMock;
chai.use(chaiHttp);
chai.should();

const userSignUp = () => {
  describe('View all my Requests.(GET) ', () => {
    it('it should return 200 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.user1)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should return 200 on successful created request ', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .send(validTrip2)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message').that.equals('request created on success!');
          expect(res.body).to.have.property('status').that.equals('pending');
          done();
        });
    });

    it('it should return 200 if requests exists', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/myRequest')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('List of requests');
        });
      done();
    });
    it('it should return 201 if user exists', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.user10)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          done();
        });
    });
    it('it should return 200 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginSuccessfully2)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('it should return 404 if there is no request history', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/myRequest')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('No request found');
        });
      done();
    });
  });
  describe('view pending request', () => {
    it('it should return 403 when a normal user try to access the link', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/pendingApproval')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          done();
        });
    });
    it('it should return 200 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.managerLogin)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('it should return 200 on successful retrieving pendingApproval', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/pendingApproval')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('it should return 200 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.managerLogin2)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('it should return 404 when there is no pendingApproval', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/pendingApproval')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });
};

export default userSignUp;
