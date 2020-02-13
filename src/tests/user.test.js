import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();
const userSignUp = () => {
  describe('Create a user account.(POST) ', () => {
    it('it should return 201 on successful signup', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.user1)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          done();
        });
    });
    it('it should return 409 if user exists', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.user1)
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body.error).to.equal('user already exits. Please try again with a different email or passportNumber address');
          done();
        });
    });
    it('it should return 422 for invalid firstName', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.incorectFirstName)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.error).to.equal('firstName should have a minimum of 3 characters, no symbols allowed and no space inbetween');
          done();
        });
    });
    it('it should return 422 for invalid lastName', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.incorectlastName)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.error).to.equal('lastName should have a minimum of 3 characters, no symbols allowed and no space inbetween');
          done();
        });
    });
    it('it should return 422 for invalid email', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.incorectEmail)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.error).to.equal(' email must be a valid email');
          done();
        });
    });
    it('it should return 422 for invalid email', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(mockData.invalidPassport)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.error).to.equal('passportNumber should be made of 8 or 9 alphanumeric characters, no symbols allowed and no space inbetween');
          done();
        });
    });
  });
  describe('reset user password via email.(POST) ', () => {
    it('it should return 422 for invalid input', (done) => {
      chai
        .request(app)
        .post('/api/v1/reset_pw/user')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          done();
        });
    });
    it('it should return 422 for invalid new email password input', (done) => {
      chai
        .request(app)
        .patch('/api/v1/password/reset/id/token')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          done();
        });
    });
    it('it should return 401 for invalid password', (done) => {
      chai
        .request(app)
        .patch('/api/v1/password/reset/id/token')
        .send(mockData.newPassword)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          done();
        });
    });
    it('it should return 422 for invalid new email confirmationPassword input', (done) => {
      chai
        .request(app)
        .patch('/api/v1/password/reset/id/token')
        .send(mockData.invalidNewPassword1)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          done();
        });
    });
    it('it should return 200 when the email is send', (done) => {
      chai
        .request(app)
        .post('/api/v1/reset_pw/user')
        .send(mockData.email)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('it should return 404 when the user does not exist in the system', (done) => {
      chai
        .request(app)
        .post('/api/v1/reset_pw/user')
        .send({ email: 'codenightt@gmail.com' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
    it('it should return 401 for the invalid token', (done) => {
      chai
        .request(app)
        .patch('/api/v1/password/reset/1/token')
        .send(mockData.newPassword)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          done();
        });
    });
    it('it should return 202 when password is successfully ', (done) => {
      const { token } = mockData.token;
      chai
        .request(app)
        .patch(`/api/v1/password/reset/1/${token}`)
        .send(mockData.newPassword)
        .end((err, res) => {
          expect(res.statusCode).to.equal(202);
          done();
        });
    });
  });
};

export default userSignUp;
