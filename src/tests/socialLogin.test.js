/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;
const testResponseBody = (err, res) => {
  if (res.body.created === true) expect(res.body).to.have.property('status').that.equals(201);
  else expect(res.body).to.have.property('status').that.equals(200);
  expect(res.body).to.have.property('message').that.is.a('string');
  expect(res.body.method).to.satisfy((method) => method === 'google' || method === 'facebook');
  expect(res.body).to.have.property('firstName').that.is.a('string');
  expect(res.body).to.have.property('lastName').that.is.a('string');
  expect(res.body).to.have.property('email').that.is.a('string');
  expect(res.body).to.have.property('token').that.is.a('string');
};
describe('Test Google login', () => {
  it('should return 201 if a new user', (done) => {
    chai
      .request(app)
      .get('/api/v1/auth/test/google')
      .end((err, res) => {
        testResponseBody(err, res);
      });
    done();
  });
  it('should return 200 if user already exists', (done) => {
    chai
      .request(app)
      .get('/api/v1/auth/test/google')
      .end((err, res) => {
        testResponseBody(err, res);
      });
    done();
  });
});
describe('Test Facebook login', () => {
  it('should return 201 if a new user', (done) => {
    chai
      .request(app)
      .get('/api/v1/auth/test/facebook')
      .end((err, res) => {
        testResponseBody(err, res);
      });
    done();
  });
  it('should return 200 if user already exists', (done) => {
    chai
      .request(app)
      .get('/api/v1/auth/test/facebook')
      .end((err, res) => {
        testResponseBody(err, res);
      });
    done();
  });
});
