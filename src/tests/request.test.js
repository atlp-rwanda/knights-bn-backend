import chai, { expect } from 'chai';
import express from 'express';
import chaiHttp from 'chai-http';
import socketIo from 'socket.io';
import jwt from 'jsonwebtoken';
import app from '../app';
import mockData from './mockData';
import returnTripMock from '../mockData/twoWayTrip';
import { sendNotification } from '../helpers/notificationSender';
import events from '../helpers/eventConnect';

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

    it('should send a message', () => {
      events();
    });
    it('should return 201 on successful created request ', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .set('user-token', Token)
        .send(validTrip2)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body)
            .to.have.property('message')
            .that.equals('request created with success!');
          expect(res.body.data)
            .to.have.property('status')
            .that.equals('pending');
          done();
        });
    });

    it('it should return 200 if requests exists', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .get('/api/v1/trips/myRequest')
        .set('user-token', Token)
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
    it('it should return 201 status for a successful one-way trip request creation', (done) => {
      const Signed = mockData.loginSuccessfully;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/oneWayTrip')
        .set('user-token', Token)
        .send(mockData.validOneWayTrip)
        .end((err, res) => {
          expect(res.status).to.be.equal(201);
          done();
        });
    });
    it('it should return 404 if there is no request history', (done) => {
      const Signed = mockData.loginSuccessfully;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .get('/api/v1/trips/myRequest')
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.body.message).to.equal('List of requests');
          expect(res.body.allMyRequest).to.be.an('array');
          done();
        });
    });
  });
};

export default userSignUp;
