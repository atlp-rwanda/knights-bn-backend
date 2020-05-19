import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../app';
import { travelAdminInfo } from './accommodationMockData';

chai.use(chaiHttp);
chai.should();
const uploadEmptyImage = () => {
  describe('accommodation uplod empty image ', () => {
    it('it should return 400 when no image uploaded ', (done) => {
      const Signed = travelAdminInfo;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch(`/api/v1/upload/accommodation/${1}`)
        .set('user-token', Token)
        .type('form')
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
        });
      done();
    });
  });
};

export default uploadEmptyImage;
