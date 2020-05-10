import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import app from '../app';

chai.use(chaiHttp);
chai.should();
chai.use(sinonChai);

const superAdminInfo = {
  email: 'superadmin@barefootnomad.com',
  password: 'Niyonkuru@1',
};

const regularUser = {
  email: 'alain.maxime@gmail.com',
  password: 'Niyonkuru@1',
};

const user = {
  email: 'alain.maxime@gmail.com',
};

const user2 = {
  email: 'alain.maximee@gmail.com',
};

const superAdmin = () => {
  describe('superAdmin can view all the users', () => {
    it('should return 200 for successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(regularUser)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
    it('should return 200 for viewing all the users', (done) => {
      chai
        .request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          expect(res.body.status).to.equal(401);
          expect(res.body)
            .to.have.property('errorMessage')
            .that.equals('Not allowed to access this page');
        });
      done();
    });
    it('should return 200 for successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(superAdminInfo)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
    it('should return 200 for viewing all the users', (done) => {
      chai
        .request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(res.body)
            .to.have.property('Users')
            .to.be.an('array');
        });
      done();
    });

    it('should return 200 for viewing one user', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/alain.maxime@gmail.com')
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('User');
          done();
        });
    });
    it('should return 404 for viewing one user', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/alain.maxime2@gmail.com')
        .end((err, res) => {
          expect(res.body)
            .to.have.property('error')
            .that.equals('no user found matching that email');
          done();
        });
    });
  });
};

export default superAdmin;
