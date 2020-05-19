import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinon from 'sinon';
import accommodationFacilities from '../../controllers/accommodation';
import app from '../../app';

import { travelToken, supplierToken } from './accommodationMockData';

chai.use(chaiHttp);
chai.should();
chai.use(sinonChai);

const likeUnlikeaccommodationFacility = () => {
  describe('like/unlike accommodation facilities ', () => {
    const Token = travelToken;
    it('it should return 201 ', (done) => {
      chai
        .request(app)
        .post('/api/v1/accommodation/dislike/1')
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('dislikes');
          done();
        });
    });
    it('it should return 201 ', (done) => {
      chai
        .request(app)
        .post('/api/v1/accommodation/like/1')
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('likes');
          done();
        });
    });

    it('it should return 201 ', (done) => {
      chai
        .request(app)
        .post('/api/v1/accommodation/like/1')
        .set('user-token', supplierToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('likes');
          done();
        });
    });

    it('it should return 409 ', (done) => {
      chai
        .request(app)
        .post('/api/v1/accommodation/like/1')
        .set('user-token', supplierToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          done();
        });
    });
    it('it should return 201 ', (done) => {
      chai
        .request(app)
        .post('/api/v1/accommodation/dislike/2')
        .set('user-token', travelToken)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.have.property('dislikes');
          done();
        });
    });

    it('it should return 409 ', (done) => {
      chai
        .request(app)
        .post('/api/v1/accommodation/dislike/2')
        .set('user-token', travelToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          done();
        });
    });
    it('it should return 201 ', (done) => {
      chai
        .request(app)
        .post('/api/v1/accommodation/dislike/1')
        .set('user-token', travelToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('dislikes');
          done();
        });
    });
    it('it should return 201 ', (done) => {
      chai
        .request(app)
        .post('/api/v1/accommodation/like/17')
        .set('user-token', travelToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('accomodation not found');
          done();
        });
    });
    it('it should return 201 ', (done) => {
      chai
        .request(app)
        .post('/api/v1/accommodation/dislike/30')
        .set('user-token', travelToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('accomodation not found');
          done();
        });
    });

    it('Testing database violation', (done) => {
      const likeAccommodationSpy = sinon.spy(
        accommodationFacilities,
        'likeAccommodation'
      );
      const request = {
        params: {
          id: 'n',
        },
        user: {
          id: 'n',
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      accommodationFacilities.likeAccommodation(req, res);
      expect(likeAccommodationSpy).to.have.been.calledWith(req, res);
      likeAccommodationSpy.restore();
      done();
    });

    it('it should return 201 ', (done) => {
      chai
        .request(app)
        .post('/api/v1/accommodation/like/n')
        .set('user-token', travelToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.equal('id must be a number');
          done();
        });
    });
  });
};

export default likeUnlikeaccommodationFacility;
