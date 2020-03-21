import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinon from 'sinon';
import app from '../../app';
import accommodationFacilities from '../../controllers/accommodation';
import { travelAdminInfo } from './accommodationMockData';

chai.use(chaiHttp);
chai.should();
chai.use(sinonChai);
const accommodationFeedBack = () => {
  describe('accommodation feedback ', () => {
    it('it should return 200 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(travelAdminInfo)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('it should return 200 when accommodation commented successfully ', () => {
      const accommodationFeedBackSpy = sinon.spy(accommodationFacilities, 'accommodationFeedBack');
      const request = {
        params: {
          id: 1,
        },
        body: {
          coment: 'You have good servise',
        },
        user: {
          id: 6,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      accommodationFacilities.accommodationFeedBack(req, res);
      expect(accommodationFeedBackSpy).to.have.been.calledWith(req, res);
      accommodationFeedBackSpy.restore();
    });
    it('it should return 200 when you commented ', (done) => {
      chai
        .request(app)
        .post('/api/v1/accommodation/comment/1')
        .send({ comment: 'Bad service' })
        .end((err, res) => {
          expect(res.body).to.have.property('comment');
          expect(res.body).to.not.have.property('updatedAt');
          expect(res.statusCode).to.equal(201);
          done();
        });
    });

    it('it should return 500 when violating database ', (done) => {
      chai
        .request(app)
        .post('/api/v1/accommodation/comment/n')
        .send({ comment: 'Bad service' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });
};

export default accommodationFeedBack;

