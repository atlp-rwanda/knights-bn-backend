
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import localStorage from 'localStorage';
import app from '../../app';
import { travelToken } from './accommodationMockData';

chai.use(chaiHttp);
chai.should();
const uploadEmptyImage = () => {
  describe('accommodation uplod empty image ', () => {
    before((done) => {
      localStorage.setItem('token', travelToken);
      done();
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
