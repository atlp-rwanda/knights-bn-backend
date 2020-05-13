import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();

const notifications = () => {
  describe('Get and read notifications test', () => {
    it('should return 201 on successful created request ', (done) => {
      const Signed = mockData.loginSuccessfully3;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });

      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .set('user-token', Token)
        .send(mockData.validOneWayTrip)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('it should return 200 when new notifications are found and displayed', (done) => {
      const Signed = mockData.managerLogin3;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .get('/api/v1/notifications')
        .set('user-token', Token)
        .send()
        .end((err, res) => {
          expect(res.body.message).to.equal('Your notifications');
          done();
        });
    });
    it('it should return 200 when all notifications are marked as read', (done) => {
      const Signed = mockData.managerLogin3;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch('/api/v1/notifications')
        .set('user-token', Token)
        .send()
        .end((err, res) => {
          expect(res.body.message).to.equal('You have no unread notification');
          done();
        });
    });
  });
};

export default notifications;
