import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import mockData from './mockData';
import app from '../app';
import isObjectEmpty from '../helpers/isObjectEmpty';
import requestControllers from '../controllers/request';
import requestMock from '../mockData/requestMock';

chai.use(chaiHttp);
const { expect } = chai;
let requestIdToEdit;
const testEditRequest = () => {
  describe('User can edit open request', () => {
    it('should return 422 if user has no manager ', (done) => {
      const Signed = mockData.managerLogin2;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .set('user-token', Token)
        .send({
          origin: 'Kigali',
          destination: 'Kampala',
          departureDate: '2023-01-11',
          returnDate: '2023-01-15',
          reason: 'Having fun',
          accommodation: 'Z campus',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body)
            .to.have.property('error')
            .that.equals(
              'you currently have no lineManager, please go to update your profile'
            );
          done();
        });
    });
    it('should return 201 on successful created request ', (done) => {
      const Signed = mockData.loginNewUser;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .set('user-token', Token)
        .send({
          origin: 'Kigali',
          destination: 'Kampala',
          departureDate: '2023-01-11',
          returnDate: '2023-01-15',
          reason: 'Having fun',
          accommodation: 'Z campus',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should return 200 on an Empty update body .', (done) => {
      const Signed = mockData.loginNewUser;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      const path = `/api/v1/trips/edit/${requestIdToEdit}`;
      chai
        .request(app)
        .patch(path)
        .set('user-token', Token)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body)
            .to.have.property('error')
            .that.equals('Empty request body.');
          done();
        });
    });
    it('it should return 200 if requests exists', (done) => {
      const Signed = mockData.loginNewUser;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .get('/api/v1/trips/myRequest')
        .set('user-token', Token)
        .end((err, res) => {
          requestIdToEdit = res.body.allMyRequest[0].id;
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('List of requests');

          done();
        });
    });
    it('should return 200 on successful edit', (done) => {
      const path = `/api/v1/trips/edit/${requestIdToEdit}`;
      const Signed = mockData.loginNewUser;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch(path)
        .set('user-token', Token)
        .send({
          origin: 'Kigali',
          destination: 'Uganda',
          reason: 'Lets test it now now now',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('returns 200 if the request rejected/closed ', async (done) => {
      const Signed = mockData.managerLogin;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch(`/api/v1/trips/reject?requestId=${requestIdToEdit}`)
        .set('user-token', Token)
        .end((error, res) => {
          expect(res.status).to.equal(200);
          expect(res.body)
            .to.have.property('message')
            .equals('The request successfully rejected');
        });
      done();
    });
    it.skip('should return 200 when trying to edit a closed request', (done) => {
      const Signed = mockData.loginNewUser;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      const path = `/api/v1/trips/edit/${requestIdToEdit}`;
      chai
        .request(app)
        .patch(path)
        .set('user-token', Token)
        .send(mockData.editRequest)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body)
            .to.have.property('error')
            .that.equals('Sorry, the request was closed!');
          done();
        });
    });

    it.skip('should return 404 on a not found request', (done) => {
      const requestId = 1000;
      const path = `/api/v1/trips/edit/${requestId}`;
      const Signed = mockData.loginNewUser;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch(path)
        .set('user-token', Token)
        .send(mockData.editRequest)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body)
            .to.have.property('error')
            .that.equals('Request not found!');
          done();
        });
    });
    it('should return true if object is empty', (done) => {
      const userInfo = {};
      const isUserInfoEmpty = isObjectEmpty(userInfo);
      expect(isUserInfoEmpty).to.equal(true);
      done();
    });
  });
};
export default testEditRequest;
