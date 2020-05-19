import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();

const searchRequests = () => {
  describe('search a request', () => {
    const Signed = mockData.loginSuccessfully;
    const Token = jwt.sign(Signed, process.env.SECRETKEY, {
      expiresIn: '24h',
    });
    const managerSigned = mockData.managerLogin;
    const managerToken = jwt.sign(managerSigned, process.env.SECRETKEY, {
      expiresIn: '24h',
    });
    it('it should return 400 when a user forget to enter his target search', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?filterKey')
        .set('user-token', Token)
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.be.equal('please enter your target key');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?origin=Kigali')
        .set('user-token', Token)
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?requestId=2')
        .set('user-token', Token)
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?type=two_way')
        .set('user-token', Token)
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?reason=partner engagment')
        .set('user-token', Token)
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?destination=Kampa')
        .set('user-token', Token)
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?status=pending')
        .set('user-token', Token)
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?origin=Kigali')
        .set('user-token', Token)
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 404 when there is no results found for Kagorora Messi', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?origin=KagororaMessi')
        .set('user-token', Token)
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.be.equal('no results found');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?origin=Kigali')
        .set('user-token', managerToken)
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 200 when search result are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?requesterId=1')
        .set('user-token', managerToken)
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('search results');
          done();
        });
    });
    it('it should return 404 when when there is no results found for the Manager', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/search?origin=KagororaMessi')
        .set('user-token', managerToken)
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.be.equal('no results found');
          done();
        });
    });
    it('it should return 200 when Pending Request available', (done) => {
      const managerSigned02 = mockData.managerLogin3;
      const managerToken02 = jwt.sign(managerSigned02, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .get('/api/v1/trips/pendingApproval')
        .set('user-token', managerToken02)
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.be.equal('Pending requests');
          done();
        });
    });
  });
};

export default searchRequests;
