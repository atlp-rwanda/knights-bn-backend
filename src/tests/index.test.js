
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../app';


chai.use(chaiHttp);
describe('SERVER CONFIG CHECK', () => {
  it('it should return 404 when the provided route does not exist', (done) => {
    chai
      .request(app)
      .post('/signupdd')
      .send()
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });
});
