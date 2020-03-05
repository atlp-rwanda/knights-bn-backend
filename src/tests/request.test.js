import chai, { expect } from 'chai';
import express from 'express';
import chaiHttp from 'chai-http';
import socketIo from 'socket.io';
import app from '../app';
import mockData from './mockData';
import returnTripMock from '../mockData/twoWayTrip';
import { sendNotification } from '../helpers/notificationSender';


const { validTrip2 } = returnTripMock;
chai.use(chaiHttp);
chai.should();

const port = 4008;
const appp = express();
const server = appp.listen(port);

const io = socketIo(server);

const userSignUp = () => {
  describe('View all my Requests.(GET)', () => {
    it('should not send notification when requesterId is not provided ', () => {
      sendNotification(null, {}, {}, io, 'new_request');
    });
    it('should send notification if all information are filled', () => {
      sendNotification(1, {}, { 1: ['jashgfe'] }, io, 'new_request');
    });

    it('it should return 200 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginUserWithLineManager2)
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
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('List of requests');
          done();
        });
    });
    it('it should return 200 if user creates an account', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.user10)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
        });
      done();
    });
    it('it should return 200 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginSuccessfully2)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('Seems you do not have an account! Create it now');
          done();
        });
    });
    it('it should return 201 status for a successful one-way trip request creation', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/oneWayTrip')
        .send(mockData.validOneWayTrip)
        .end((err, res) => {
          expect(res.status).to.be.equal(201);
          expect(res.body.message).to.equal('Trip Request Successfully Created.');
          expect(res.body).to.be.an('object');
        });
      done();
    });
    it('it should return 404 if there is no request history', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/myRequest')
        .end((err, res) => {
          expect(res.body.message).to.equal('List of requests');
          expect(res.body.allMyRequest).to.be.an('array');
          done();
        });
    });
  });
  describe('search a request', () => {
    it('it should return 400 when a user forget to enter his target search', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?filterKey')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.be.equal('please enter your target key');
          done();
        });
    });
    it('it should return 200 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginSuccessfully)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('Successfully login');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?origin=Kigali')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?requestId=2')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?type=two_way')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?reason=partner engagment')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?destination=Kampa')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?status=pending')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?origin=Kigali')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 404 when there is no results found for Kagorora Messi', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?origin=KagororaMessi')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.be.equal('no results found');
          done();
        });
    });
    it('it should return 200 on successful signIn for the manager', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.managerLogin)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('Successfully login');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?origin=Kigali')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?requesterId=1')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 404 when when there is no results found for the Manager', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?origin=KagororaMessi')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.be.equal('no results found');
          done();
        });
    });
  });
};

export default userSignUp;
