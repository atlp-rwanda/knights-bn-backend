import chai from 'chai';
import chaiHttp from 'chai-http';
import localStorage from 'localStorage';
import app from '../app';
import returnTripMock from '../mockData/twoWayTrip';
import mockData from './mockData';

chai.use(chaiHttp);

const { expect } = chai;
const { validTrip, invalidTrip } = returnTripMock;

const testTwoWayTrip = () => {
  describe('Test /trips/returnTrip', () => {
    it('it should return 200 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginSuccessfully)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
        });
      done();
    });
    it('should return 200 on successful created request ', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .send(validTrip)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message').that.equals('request created on success!');
          expect(res.body).to.have.property('status').that.equals('pending');
        });
      done();
    });
    it('should return 422 on invalid trip', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .send(invalidTrip)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').which.is.not.empty;
        });
      done();
    });
    it('should return 422 if selected date collides with the previous requested trip', (done) => {
      const tripRequest = {
        origin: 'Kigali',
        destination: 'Kampala',
        departureDate: '2020-02-20',
        returnDate: '2020-03-20',
        accommodation: 'XYZ campus',
        reason: 'Having fun',
        passportNumber: '12345677'
      };
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .send(tripRequest)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.equals("Departure date should be chosen from today's date and has to not collide with your previous requested trip!");
        });
      done();
    });
    it('should return 422 if return date set is before the departure date', (done) => {
      const tripRequest = {
        origin: 'Kigali',
        destination: 'Kampala',
        returnDate: '2020-02-20',
        departureDate: '2020-03-20',
        accommodation: 'XYZ campus',
        reason: 'Having fun',
        passportNumber: '12345677'
      };
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .send(tripRequest)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.equals("Returning date has to be the day after your departure's date!");
        });
      done();
    });
    it('should return 401 if no token ', (done) => {
      localStorage.removeItem('token', 0);
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .send(mockData.user1)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equals(401);
          expect(res.body).to.have.property('error').equals('no token provided!');
        });
      done();
    });
  });
};
export default testTwoWayTrip;
