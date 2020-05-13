import chai from 'chai';
import chaiHttp from 'chai-http';
import localStorage from 'localStorage';
import jwt from 'jsonwebtoken';
import app from '../app';
import returnTripMock from '../mockData/twoWayTrip';
import mockData from './mockData';

chai.use(chaiHttp);

const { expect } = chai;
const {
  requestDateSetInThePast,
  requestWithDepartureDateSetAfterReturnDate,
  requestWithMissedComponent,
  requestWithSimilarOriginAndDestination,
} = returnTripMock;

const testTwoWayTrip = () => {
  describe('Create a two-way-trip request', () => {
    it('should return an error if user has no manager ', (done) => {
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
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 201 on successful created request ', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
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
          expect(res.body)
            .to.have.property('message')
            .that.equals('request created with success!');
          expect(res.body.data)
            .to.have.property('status')
            .that.equals('pending');
          done();
        });
    });
    it('should return 422 on invalid request body', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .set('user-token', Token)
        .send(requestWithMissedComponent)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 422 when similar origin and destination', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .set('user-token', Token)
        .send(requestWithSimilarOriginAndDestination)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body)
            .to.have.property('error')
            .that.equals('Origin has to differ from destination.');
          done();
        });
    });
    it('should return 422 if departure date > return date', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .set('user-token', Token)
        .send(requestWithDepartureDateSetAfterReturnDate)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body)
            .to.have.property('error')
            .that.equals(
              "Returning date has to be the day after your departure's date!"
            );
          done();
        });
    });
    it('should return 422 when departureDate is set in the past', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .set('user-token', Token)
        .send(requestDateSetInThePast)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body)
            .to.have.property('error')
            .that.equals('Please select travel date starting from today.');
          done();
        });
    });
    it('should return 409 on a conflicting trip request', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
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
          expect(res.status).to.equal(409);
          expect(res.body)
            .to.have.property('error')
            .that.equals('conflicting trip request.');
          done();
        });
    });
    it('should return 401 if no token ', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .send(mockData.user1)
        .end((err, res) => {
          expect(res.body)
            .to.have.property('status')
            .equals(401);
          expect(res.body)
            .to.have.property('error')
            .equals('you are not logged in');
          done();
        });
    });
  });
};
export default testTwoWayTrip;
