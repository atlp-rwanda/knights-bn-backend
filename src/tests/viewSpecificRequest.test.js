import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
const { expect } = chai;
let requestToView;
const testViewRequest = () => {
  describe('A user can view his/her request', () => {
    const Signed = mockData.reguralUser;
    const Token = jwt.sign(Signed, process.env.SECRETKEY, {
      expiresIn: '24h',
    });
    it('it should return 200 if requests exists', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/myRequest')
        .set('user-token', Token)
        .end((err, res) => {
          requestToView = res.body.allMyRequest[0].id;
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('List of requests');

          done();
        });
    });
    it('it should return 200 if request is successfully retrieved', (done) => {
      const path = `/api/v1/trips/request/${requestToView}`;
      chai
        .request(app)
        .get(path)
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('Request details:');
          expect(res.body)
            .to.have.property('request')
            .that.is.an('object');
          done();
        });
    });
    it('should return 404 if a request not found', (done) => {
      const randomId = 555;
      const path = `/api/v1/trips/request/${randomId}`;
      chai
        .request(app)
        .get(path)
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body)
            .to.have.property('error')
            .that.equals('Request not found!');
          done();
        });
    });
  });
};

export default testViewRequest;
