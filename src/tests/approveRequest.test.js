
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;
let requestIdToEdit;

const testApproveRequest = () => {
  describe('Manager can approve the request', () => {
    it('should return 200 when a regular user logs in', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'ishimwewil005@gmail.com',
          password: 'Password@1',
        })
        .end((err, res) => {
          expect(res.body).to.have.property('status').that.equals(200);
          expect(res.body).to.have.property('message').that.equals('Successfully login');
          expect(res.body).to.have.property('token');
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
    it('it should return 200 if requests exists', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/myRequest')
        .end((err, res) => {
          requestIdToEdit = res.body.allMyRequest[0].id;
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('List of requests');

          done();
        });
    });
    it('should return 403 if a user is not a manager', (done) => {
      const randomId = 5;
      const path = `/api/v1/trips/approve/${randomId}`;
      chai
        .request(app)
        .patch(path)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.have.property('error').that.equals('Unauthorized access!');

          done();
        });
    });
    it('should return 200 when manager logs in', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'william.ishimwe@andela.com',
          password: 'Password@1',
        })
        .end((err, res) => {
          expect(res.body).to.have.property('status').that.equals(200);
          expect(res.body).to.have.property('message').that.equals('Successfully login');
          expect(res.body).to.have.property('token');
          done();
        });
    });
    it('should return 404 if a request not found', (done) => {
      const randomId = 555;
      const path = `/api/v1/trips/approve/${randomId}`;
      chai
        .request(app)
        .patch(path)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('error').that.equals('Request not found!');
          done();
        });
    });
    it('should return 200 when a request is approved', (done) => {
      const path = `/api/v1/trips/approve/${requestIdToEdit}`;
      chai
        .request(app)
        .patch(path)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('message').that.equals('The request successfully approved');
          done();
        });
    });
    it('should return 200 when the request was approved before', (done) => {
      const path = `/api/v1/trips/approve/${requestIdToEdit}`;
      chai
        .request(app)
        .patch(path)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('error').that.equals('The request was approved before!');
          done();
        });
    });
  });
};

export default testApproveRequest;
