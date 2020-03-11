import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import {
  nonExistingUser, ExistingUser,
  validRate, invalidRate,
} from './accommodationMockData';

chai.use(chaiHttp);
chai.should();

const rateAccomodation = () => {
  describe('rate accomodation', () => {
    it('it should return 404 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(nonExistingUser)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('Seems you do not have an account! Create it now');
          done();
        });
    });

    it('it should return 200 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(ExistingUser)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('Successfully login');
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('it should return 200 on view all accommodation', (done) => {
      chai
        .request(app)
        .get('/api/v1/view/accommodations')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });

    it('it should return 201 on successful rate of accomodation', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/edit/accommodation/rate/${1}`)
        .send(validRate)
        .end((err, res) => {
          console.log(res.body);
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('your rating was updated successfully ');
          done();
        });
    });

    it('it should return 422 on invalid rate', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/edit/accommodation/rate/${1}`)
        .send(invalidRate)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
};

export default rateAccomodation;
