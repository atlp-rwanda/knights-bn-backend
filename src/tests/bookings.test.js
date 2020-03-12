import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';
import mockData from './mockData';

dotenv.config();

const { expect } = chai;
chai.use(chaiHttp);

const bookAccomodation = () => {
  describe('Book an accomodation facility', () => {
    it('returns 201 on Booking successfully', (done) => {
      chai
        .request(app)
        .post('/api/v1/book/accommodations')
        .send(mockData.booking)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          done();
        });
    });
  });
};
export default bookAccomodation;
