import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import app from '../../app';
import accommodationFacilities from '../../controllers/accommodation';
import { travelAdminInfo } from './accommodationMockData';

chai.use(chaiHttp);
chai.should();
chai.use(sinonChai);
const accommodationFeedBack = () => {
  describe('accommodation feedback ', () => {
    const Signed = travelAdminInfo;
    const Token = jwt.sign(Signed, process.env.SECRETKEY, {
      expiresIn: '24h',
    });
    it('it should return 200 when accommodation commented successfully ', () => {
      const accommodationFeedBackSpy = sinon.spy(
        accommodationFacilities,
        'accommodationFeedBack'
      );
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
        .set('user-token', Token)
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
        .set('user-token', Token)
        .send({ comment: 'Bad service' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });
};

export default accommodationFeedBack;
