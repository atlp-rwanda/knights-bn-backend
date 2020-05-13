import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import jwt from 'jsonwebtoken';
import app from '../../app';
import { travelAdminInfo } from './accommodationMockData';

chai.use(chaiHttp);
chai.should();
chai.use(sinonChai);

const mostTravelledCities = () => {
  describe('Most travelled destinations ', () => {
    it('it should return 200 when most travelled destinations are shown ', (done) => {
      const Signed = travelAdminInfo;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .get('/api/v1/most/traveled')
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.mostTraveled).to.be.an('array');
        });
      done();
    });
  });
};

export default mostTravelledCities;
