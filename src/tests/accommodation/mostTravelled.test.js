import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import localStorage from 'localStorage';
import sinonChai from 'sinon-chai';
import app from '../../app';
import { travelToken } from './accommodationMockData';

chai.use(chaiHttp);
chai.should();
chai.use(sinonChai);

const mostTravelledCities = () => {
  describe('Most travelled destinations ', () => {
    before((done) => {
      localStorage.setItem('token', travelToken);
      done();
    });
    it('it should return 200 when most travelled destinations are shown ', (done) => {
      chai
        .request(app)
        .get('/api/v1/most/traveled')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.mostTraveled).to.be.an('array');
        });
      done();
    });
  });
};

export default mostTravelledCities;
