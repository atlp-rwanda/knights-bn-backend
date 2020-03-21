import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import app from '../../app';
import { travelAdminInfo } from './accommodationMockData';

chai.use(chaiHttp);
chai.should();
chai.use(sinonChai);

const mostTravelledCities = () => {
  describe('Most travelled destinations ', () => {
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
