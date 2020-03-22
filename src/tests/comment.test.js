
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';
import mockData from './mockData';

dotenv.config();

const { expect } = chai;
chai.use(chaiHttp);

const testRejectRequest = () => {
  describe('Test comment on a request', () => {
    it('returns 200 on a user signed in successfully', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginUserWithLineManager2)
        .end((err, res) => {
          expect(res.body).to.have.property('message').that.equals('Successfully login');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('returns 200 on a user signed in successfully', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/myRequest')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('should return 201 on successful comment on a request ', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/comment?requestId=7')
        .send(mockData.comment)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('message').that.equals('comment successfully added');
          done();
        });
    });

    it('should return 422 on invalid comment ', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/comment/?requestId=6')
        .send(mockData.InvalidComment)
        .end((err, res) => {
          expect(res.status).to.equal(422);
        });
      done();
    });

    it('should return 422 when there is no comment', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/comment/?requestId=6')
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.equals(' comment is required');
        });
      done();
    });

    it('should return 200 when comment deleted', (done) => {
      chai
        .request(app)
        .delete('/api/v1/trips/comment?commentId=1')
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('message').that.equals('Comment deleted successfully!');
          done();
        });
    });

    it('should return 422, when commentId is not a number', (done) => {
      chai
        .request(app)
        .delete('/api/v1/trips/comment?commentId=x')
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.equals('wrong commentId input,commentId should be a number');
          done();
        });
    });

    it('should return 404 when no comment found to be deleted', (done) => {
      chai
        .request(app)
        .delete('/api/v1/trips/comment?commentId=100')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('error').that.equals('no comment found');
        });
      done();
    });

    it('returns 200 on a user signed in successfully', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginM)
        .end((err, res) => {
          expect(res.body).to.have.property('message').that.equals('Successfully login');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should return 403 for non authorized comment on a request ', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/comment?requestId=7')
        .send(mockData.comment)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('error').that.equals('Unauthorized: you are not authorized to perform this operation');
        });
      done();
    });
    it('should return 404 when no comment found ', (done) => {
      chai
        .request(app)
        .delete('/api/v1/trips/comment?commentId=1000')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('error').that.equals('no comment found');
        });
      done();
    });
  });
};
export default testRejectRequest;
