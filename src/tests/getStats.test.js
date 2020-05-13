import chai from 'chai';
import chaiHttp from 'chai-http';
import httpMocks from 'node-mocks-http';
import jwt from 'jsonwebtoken';
import app from '../app';
import requests from '../controllers/request';
import mockData from './mockData';

chai.use(chaiHttp);
const { expect } = chai;
let multiWayRequest;

const testGetStats = () => {
  describe('Test get stats', () => {
    const Signed = mockData.reguralUser;
    const Token = jwt.sign(Signed, process.env.SECRETKEY, {
      expiresIn: '24h',
    });
    it('should return OK when a two-way request is created', async () => {
      const request = httpMocks.createRequest({
        user: { id: 10 },
        body: {
          origin: 'Kigali',
          destination: 'Kampala',
          departureDate: '2020-01-01',
          returnDate: '2020-01-10',
          accommodation: 'A Hotel',
          reason: 'Having fun',
        },
      });
      const response = httpMocks.createResponse();
      await requests.createTwoWayTrip(request, response);
      expect(response.statusMessage).to.equal('OK');
    });
    it('should return 201 when a multi-city request is created', async () => {
      const request = httpMocks.createRequest({
        user: { id: 11 },
        body: mockData.multiCityTrip,
      });
      const response = httpMocks.createResponse();
      await requests.createMultiCityRequest(request, response);
      const responseBody = response._getJSONData();
      multiWayRequest = responseBody.data.id;
      expect(responseBody)
        .to.have.property('status')
        .that.equals(201);
      expect(responseBody)
        .to.have.property('message')
        .that.equals('Your request has successfully created');
      expect(responseBody)
        .to.have.property('data')
        .that.is.an('object');
    });
    it('should return OK when a two-way trip request is approved', async () => {
      const request = httpMocks.createRequest({
        params: { requestId: 10 },
        user: { id: 10 },
      });
      const response = httpMocks.createResponse();
      await requests.approveRequest(request, response);
      expect(response.statusMessage).to.equal('OK');
    });
    it('should return OK when a multi-way trip request is approved', async () => {
      const request = httpMocks.createRequest({
        params: { requestId: multiWayRequest },
        user: { id: 10 },
      });
      const response = httpMocks.createResponse();
      await requests.approveRequest(request, response);
      expect(response.statusMessage).to.equal('OK');
    });
    it('should return 200 if stats successfully retrieved', (done) => {
      const date = '2020-01-01';
      const path = `/api/v1/trips/stats/${date}`;
      chai
        .request(app)
        .get(path)
        .set('user-token', Token)
        .end((error, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body)
            .to.have.property('message')
            .that.equals('Success.');
          expect(res.body.data).to.have.property('From');
          expect(res.body.data).to.have.property('To');
          expect(res.body.data)
            .to.have.property('Time interval')
            .that.includes('Last');
          expect(res.body.data).to.have.property('Trips made');
          done();
        });
    });
  });
};
export default testGetStats;
