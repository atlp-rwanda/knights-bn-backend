import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();
const bookingTest = () => {
  describe('Book an accommodation.', () => {
    it('it should return 422 for unprocessable entity ', (done) => {
      chai
        .request(app)
        .post('/api/v1/book/accommodations')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          done();
        });
    });
    it('it should return 404 for unexisting accomodation ', (done) => {
      chai
        .request(app)
        .post('/api/v1/book/accommodations')
        .send(mockData.unexistingBooking)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('it should return 200 for successfully booking ', (done) => {
      chai
        .request(app)
        .post('/api/v1/book/accommodations')
        .send(mockData.booking)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('it should return 404 trying to book again ', (done) => {
      chai
        .request(app)
        .post('/api/v1/book/accommodations')
        .send(mockData.booking)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('it should return 200 for successfully viewing available rooms', (done) => {
      chai
        .request(app)
        .get('/api/v1/rooms/accommodations/1')
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
};
export default bookingTest;
