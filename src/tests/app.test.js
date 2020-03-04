import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

const checkRoute = () => {
  describe('Non existing route.(POST) ', () => {
    it('it should return 404 on non existing route', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/route')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('error').equals('Not Found!');
          done();
        });
    });
  });
};

export default checkRoute;
