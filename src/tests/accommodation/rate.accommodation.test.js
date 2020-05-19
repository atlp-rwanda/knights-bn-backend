import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../app';

import {
  nonExistingUser,
  ExistingUser,
  validRate,
  invalidRate,
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
          expect(res.body.error).to.equal(
            'Seems you do not have an account! Create it now'
          );
          done();
        });
    });

    it('it should return 200 on view all accommodation', (done) => {
      const Signed = ExistingUser;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .get('/api/v1/view/accommodations')
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });

    it('it should return 201 on successful rate of accomodation', (done) => {
      const Signed = ExistingUser;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch(`/api/v1/edit/accommodation/rate/${1}`)
        .set('user-token', Token)
        .send(validRate)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal(
            'your rating was updated successfully '
          );
          done();
        });
    });

    it('it should return 422 on invalid rate', (done) => {
      const Signed = ExistingUser;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch(`/api/v1/edit/accommodation/rate/${1}`)
        .set('user-token', Token)
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
