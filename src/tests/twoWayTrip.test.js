import chai from 'chai';
import chaiHttp from 'chai-http';
import localStorage from 'localStorage';
import app from '../app';
import returnTripMock from '../mockData/twoWayTrip';
import mockData from './mockData';

chai.use(chaiHttp);

const { expect } = chai;
const {
  requestDateSetInThePast, requestWithDepartureDateSetAfterReturnDate,
  requestWithMissedComponent, requestWithSimilarOriginAndDestination,
} = returnTripMock;

const testTwoWayTrip = () => {
  describe('Create a two-way-trip request', () => {
    it('it should return 200 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'knights@gmail.com',
          password: 'Niyonkuru@1',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should return 422 if user has no manager ', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
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
          expect(res.body).to.have.property('error').that.equals('you currently have no lineManager, please go to update your profile');
          done();
        });
    });
    it('it should return 200 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginUserWithLineManager2)
        .end((err, res) => {
          localStorage.setItem('token', res.body.token);
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should return 201 on successful created request ', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
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
          expect(res.body).to.have.property('message').that.equals('request created with success!');
          expect(res.body.data).to.have.property('status').that.equals('pending');
          done();
        });
    });
    it('should return 422 on invalid request body', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .send(requestWithMissedComponent)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 422 when similar origin and destination', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .send(requestWithSimilarOriginAndDestination)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.equals('Origin has to differ from destination.');
          done();
        });
    });
    it('should return 422 if departure date > return date', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .send(requestWithDepartureDateSetAfterReturnDate)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.equals("Returning date has to be the day after your departure's date!");
          done();
        });
    });
    it('should return 422 when departureDate is set in the past', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .send(requestDateSetInThePast)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.equals('Please select travel date starting from today.');
          done();
        });
    });
    it('should return 409 on a conflicting trip request', () => {
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
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
          expect(res.body).to.have.property('error').that.equals('conflicting trip request.');
        });
    });
    it('should return 401 if no token ', (done) => {
      localStorage.removeItem('token', 0);
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .send(mockData.user1)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equals(401);
          expect(res.body).to.have.property('error').equals('you are not logged in');
          done();
        });
    });
  });
};
export default testTwoWayTrip;
