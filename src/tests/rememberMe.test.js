import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import localStorage from 'localStorage';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();

const remembered = () => {
  describe('UserProfile settings ', () => {
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginNewUser)
        .end((err, res) => {
          localStorage.setItem('token', res.body.token);
          done();
        });
    });

    it('it should return 200 when profile information strored in cookies successfull  ', (done) => {
      chai
        .request(app)
        .get('/api/v1/remembered')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.property('firstName');
          expect(res.body.message).to.equal('Your profile information is saved successfully');
        });
      done();
    });
    it('it should return 500 when you are violating database ', (done) => {
      localStorage.setItem('token', mockData.wrongPerson);
      chai
        .request(app)
        .get('/api/v1/remembered')
        .end((err, res) => {
          expect(res.body.error).to.be.an('object');
          expect(res.statusCode).to.equal(500);
        });
      done();
    });
  });
};

export default remembered;
