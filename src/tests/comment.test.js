import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import app from '../app';
import mockData from './mockData';

dotenv.config();

const { expect } = chai;
chai.use(chaiHttp);

const testRejectRequest = () => {
  describe('Test comment on a request', () => {
    it('returns 200 when my request successfully retrieved', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .get('/api/v1/trips/myRequest')
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('should return 201 on successful comment on a request ', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/comment?requestId=7')
        .set('user-token', Token)
        .send(mockData.comment)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body)
            .to.have.property('message')
            .that.equals('comment successfully added');
        });
      done();
    });

    it('should return 422 on invalid comment ', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/comment/?requestId=6')
        .set('user-token', Token)
        .send(mockData.InvalidComment)
        .end((err, res) => {
          expect(res.status).to.equal(422);
        });
      done();
    });

    it('should return 422 when there is no comment', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/comment/?requestId=6')
        .set('user-token', Token)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body)
            .to.have.property('error')
            .that.equals(' comment is required');
        });
      done();
    });

    it.skip('should return 200 when comment deleted', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .delete('/api/v1/trips/comment?commentId=1')
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(res.body)
            .to.have.property('message')
            .that.equals('Comment deleted successfully!');
          done();
        });
    });

    it('should return 422, when commentId is not a number', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .delete('/api/v1/trips/comment?commentId=x')
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body)
            .to.have.property('error')
            .that.equals('wrong commentId input,commentId should be a number');
          done();
        });
    });

    it('should return 404 when no comment found to be deleted', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .delete('/api/v1/trips/comment?commentId=100')
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body)
            .to.have.property('error')
            .that.equals('no comment found');
        });
      done();
    });

    it('returns 200 on a user signed in successfully', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .set('user-token', Token)
        .send(mockData.loginM)
        .end((err, res) => {
          expect(res.body)
            .to.have.property('message')
            .that.equals('Successfully login');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should return 403 for non authorized comment on a request ', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/trips/comment?requestId=7')
        .set('user-token', Token)
        .send(mockData.comment)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body)
            .to.have.property('error')
            .that.equals(
              'Unauthorized: you are not authorized to perform this operation',
            );
        });
      done();
    });
    it('should return 404 when no comment found ', (done) => {
      const Signed = mockData.loginUserWithLineManager2;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .delete('/api/v1/trips/comment?commentId=1000')
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body)
            .to.have.property('error')
            .that.equals('no comment found');
        });
      done();
    });
  });
};
export default testRejectRequest;
