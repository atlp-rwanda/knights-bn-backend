import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import localStorage from 'localStorage';
import fs from 'fs';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();

const userProfile = () => {
  describe('UserProfile settings ', () => {
    it('it should return 200 and user object when user is authorized', (done) => {
      chai
        .request(app)
        .get('/api/v1/user/profile')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.user).to.be.an('object');
        });
      done();
    });

    it('it should return 200 and object of user object for updated successfully ', (done) => {
      chai
        .request(app)
        .patch('/api/v1/edit/user/profile')
        .send(mockData.updateProfile)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.user).to.be.an('object');
        });
      done();
    });

    it('it should return 200 and object of user object for updated successfully ', (done) => {
      chai
        .request(app)
        .patch('/api/v1/edit/user/profile')
        .send(mockData.updateProfile)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.user).to.be.an('object');
        });
      done();
    });

    it('it should return 200 when successfully profile image uploaded ', (done) => {
      chai
        .request(app)
        .patch('/api/v1/edit/user/profile')
        .type('form')
        .attach('profileImage', fs.readFileSync('src/tests/mockImages/test.png'), 'test.png')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
        });
      done();
    });

    it('it should return 500 when wrong format image is uploaded ', (done) => {
      chai
        .request(app)
        .patch('/api/v1/edit/user/profile')
        .type('form')
        .attach('profileImage', fs.readFileSync('src/tests/mockImages/fakeimage.txt'), 'fakeimage.txt')
        .end((err, res) => {
          expect(res.statusCode).to.equal(500);
        });
      done();
    });


    it('it should return 500 when is not a right person to update profile ', (done) => {
      localStorage.setItem('token', mockData.wrongPerson);
      chai
        .request(app)
        .patch('/api/v1/edit/user/profile')
        .send(mockData.updateProfile)
        .end((err, res) => {
          expect(res.statusCode).to.equal(500);
        });
      done();
    });

    it('it should return 500 when is not a right person to view profile information ', (done) => {
      localStorage.setItem('token', mockData.wrongPerson);
      chai
        .request(app)
        .get('/api/v1/user/profile')
        .end((err, res) => {
          expect(res.statusCode).to.equal(500);
        });
      done();
    });
  });
};

export default userProfile;
