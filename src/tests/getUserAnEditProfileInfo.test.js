import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import localStorage from 'localStorage';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinon from 'sinon';
import app from '../app';
import mockData from './mockData';
import profileImage from '../controllers/userProfile';
import { requesterToken } from './accommodation/accommodationMockData';

chai.use(chaiHttp);
chai.should();
chai.use(sinonChai);

const userProfile = () => {
  describe('UserProfile settings ', () => {
    before((done) => {
      localStorage.setItem('token', requesterToken);
      done();
    });
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

    it('it should return 200 when successfully profile image uploaded ', async () => {
      const changeMyProfileInfoStub = sinon.spy(profileImage, 'changeMyProfileInfo');
      const request = {
        file: {
          url: 'https://via.placeholder.com/300.png/09f/fff',
        },
        body: {},
        user: {
          id: 5,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      profileImage.changeMyProfileInfo(req, res);
      expect(changeMyProfileInfoStub).to.have.been.calledWith(req, res);
      changeMyProfileInfoStub.restore();
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
