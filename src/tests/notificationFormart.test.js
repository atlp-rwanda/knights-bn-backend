import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import format from '../helpers/returnNotification';

chai.use(chaiHttp);
chai.should();
chai.use(sinonChai);

const notificationFormat = () => {
  describe('notificationFormat ', () => {
    it('Testing notificationFormat', (done) => {
      const formatSpy = sinon.spy(format);
      const notification = {
        message: 'Hello everyone',
        updatedAt: new Date(),
      };
      const url = 'https://via.placeholder.com/300.png/09f/fff';

      format(notification, url);
      formatSpy.calledOn(notification, url);
      done();
    });
  });
};

export default notificationFormat;

