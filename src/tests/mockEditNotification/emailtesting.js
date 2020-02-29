// eslint-disable-next-line import/no-extraneous-dependencies
import chai, { expect } from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mockResponse } from 'mock-req-res';

import editEventHandler from '../../events/editEvent';

const eventEmail = () => {
  describe('Edit notification ', () => {
    it(' Test email notification ', (done) => {
      const data = {
        userId: 7,
        managerId: 6,
        title: 'request reson',
        id: 4,
        res: mockResponse(),
      };
      // eslint-disable-next-line no-unused-expressions
      expect(editEventHandler(data)).to.be.ok;
      done();
    });
  });
};

export default eventEmail;
