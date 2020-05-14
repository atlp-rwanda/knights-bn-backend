import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();

const superAdminInfo = {
  email: 'superadmin@barefootnomad.com',
  password: 'Niyonkuru@1',
};

const testUserRoles = () => {
  describe('USER ROLE SETTINGS | FAULTY REQUESTS', () => {
    it('should sign in the a normal user', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.regularStaffLogin)
        .end((err, res) => {
          expect(res.body.status).to.be.equal(200);
          expect(res.body.message).to.be.equal('Successfully login');
        });
      done();
    });

    it('should throw 403 if it\'s not super admin ', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/users/setUserRole?email=${mockData.updatableUser.email}`)
        .send(mockData.newRole)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.be.equal(403);
        });
      done();
    });
  });

  describe('USER ROLE SETTINGS | CORRECT REQUESTS', () => {
    it('should update an existing user', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.superAdminLogin)
        .end((err, res) => {
          const { token } = res.body;
          chai
            .request(app)
            .patch(`/api/v1/users/setUserRole?email=${mockData.updatableUser.email}`)
            .send(mockData.newRole)
            .set('token', token)
            .end((eror, resp) => {
              expect(resp.body).to.be.an('object');
              expect(resp.body.status).to.be.equal(200);
              expect(resp.body.message).to.be.equal('User successfully updated!');
              done();
            });
        });
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
    it('should throw 404 if email is wrong', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/users/setUserRole?email=${mockData.wrongUser.email}`)
        .send(mockData.newRole)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.be.equal(404);
          expect(res.body.error).to.be.equal(`User  ${mockData.wrongUser.email} is not found!`);
        });
      done();
    });
  });
};

export default testUserRoles;
