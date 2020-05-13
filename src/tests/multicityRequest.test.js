import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();

const multicityRequest = () => {
  describe('Multicity request ', () => {
    it('should return 200 on successful created request ', (done) => {
      const Signed = mockData.loginNewUser;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/request/multicity')
        .set('user-token', Token)
        .send(mockData.multiCityRequest)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal(
            'Your request has successfully created'
          );
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
    it('should return 409 when you have pending request ', (done) => {
      const Signed = mockData.loginNewUser;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/request/multicity')
        .set('user-token', Token)
        .send(mockData.multiCityRequest)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.error).to.equal(
            'You still have pending request just wait for approval'
          );
          done();
        });
    });
    it('should return 400 when there is something missing ', (done) => {
      const Signed = mockData.loginNewUser;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/request/multicity')
        .set('user-token', Token)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('"origin" is required');
          done();
        });
    });
    it('should return 400 when there is something missing ', (done) => {
      const Signed = mockData.loginNewUser;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/request/multicity')
        .set('user-token', Token)
        .send(mockData.missingCities)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should return 400 when there is something missing in cities fields ', (done) => {
      const Signed = mockData.loginNewUser;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/request/multicity')
        .set('user-token', Token)
        .send(mockData.validateDate3)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should return 400 when there is something missing ', (done) => {
      const Signed = mockData.loginNewUser;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/request/multicity')
        .set('user-token', Token)
        .send(mockData.validateDate1)
        .end((err, res) => {
          expect(res.body.error).to.equal(
            'Make sure that the date you choose is near by this year'
          );
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
};

export default multicityRequest;
