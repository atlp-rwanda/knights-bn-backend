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
    it('should return 201 on successful created request ', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .send({
          origin: 'Kigali',
          destination: 'Kampala',
          departureDate: '2080-01-11',
          returnDate: '2081-01-15',
          reason: 'meet Egyptians',
          accommodation: 'Egyptian Hotel',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
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
          expect(res.body.message).to.equal('Your notifications');
        });
      done();
    });
    it('it should return 200 when all notifications are marked as read', (done) => {
      chai
        .request(app)
        .patch('/api/v1/notifications')
        .send()
        .end((err, res) => {
          expect(res.body.message).to.equal('You have no unread notification');
        });
      done();
    });
  });
};

export default notifications;
