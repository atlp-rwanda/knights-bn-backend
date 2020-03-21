
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { travelAdminInfo } from './accommodationMockData';

chai.use(chaiHttp);
chai.should();
const uploadEmptyImage = () => {
  describe('accommodation uplod empty image ', () => {
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

    it('it should return 400 when no image uploaded ', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/upload/accommodation/${1}`)
        .type('form')
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
        });
      done();
    });
  });
};

export default uploadEmptyImage;
