import mocks from 'node-mocks-http';

const response = mocks.createResponse();
const requestMock = {
  response,
  request: {
    body: {
    }
  }
};

export default requestMock;
