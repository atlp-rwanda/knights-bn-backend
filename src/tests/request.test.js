import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();

const userSignUp = () => {
  describe('View all my Requests.(GET) ', () => {
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
    it('it should return 200 if requests exists', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/myRequest')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('List of requests');
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
          done();
        });
    });
  });
};

export default userSignUp;
