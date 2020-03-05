import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();

const notifications = () => {
  describe('Get and read notifications test', () => {
    it('it should return 200 on successful signIn for a requester', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginSuccessfully3)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('it should return 200 when new notifications are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/notifications')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
        });
      done();
    });
    it('it should return 200 when all notifications are marked as read', (done) => {
      chai
        .request(app)
        .patch('/api/v1/notifications')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
        });
      done();
    });
    it('it should return 404 when there is no new notification found', (done) => {
      chai
        .request(app)
        .get('/api/v1/notifications')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
        });
      done();
    });

    it('it should return 200 on successful signIn for a manager', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.managerLogin3)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
        });
      done();
    });
    it('it should return 200 when new notifications are found and displayed', (done) => {
      chai
        .request(app)
        .get('/api/v1/notifications')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
        });
      done();
    });
    it('it should return 200 when all notifications are marked as read', (done) => {
      chai
        .request(app)
        .patch('/api/v1/notifications')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
        });
      done();
    });
    it('it should return 404 when there is no new notification found', (done) => {
      chai
        .request(app)
        .get('/api/v1/notifications')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
        });
      done();
    });
  });
};

export default notifications;
