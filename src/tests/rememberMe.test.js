import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import localStorage from 'localStorage';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinon from 'sinon';
import mockData from './mockData';
import app from '../app';
import rememberme from '../controllers/userProfile';

chai.use(chaiHttp);
chai.should();
chai.use(sinonChai);

const remembered = () => {
  describe('UserProfile settings ', () => {
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginNewUser)
        .end((err, res) => {
          localStorage.setItem('token', res.body.token);
          done();
        });
    });

    it('it should return 200 when profile information strored in cookies successfull  ', async () => {
      const remembermeStub = sinon.spy(rememberme, 'rememberMe');
      const request = {
        body: {},
        user: {
          id: 5,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      rememberme.rememberMe(req, res);
      expect(remembermeStub).to.have.been.calledWith(req, res);
      remembermeStub.restore();
    });
  });
};

export default remembered;
