import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import localStorage from 'localStorage';
import app from '../../app';
import {
  facility, wrongUser,
  existingFacility,
  missingInformation,
  missingRoomInfo,
  editAccommodation,
  travelToken,
} from './accommodationMockData';

chai.use(chaiHttp);
chai.should();

export const accommodationFacility = () => {
  describe('Accommodation facilities ', () => {
    before((done) => {
      localStorage.setItem('token', travelToken);
      done();
    });
    it('it should return 201 successfully facility created ', (done) => {
      chai
        .request(app)
        .post('/api/v1/create/accommodation')
        .send(facility)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
  });
};

export const missingRoomInformation = () => {
  describe('accommodation ', () => {
    before((done) => {
      localStorage.setItem('token', travelToken);
      done();
    });

    it('it should return 400  when information is missing', (done) => {
      chai
        .request(app)
        .post('/api/v1/create/accommodation')
        .send(missingRoomInfo)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.equal('"accommodationName" is required');
          done();
        });
    });

  });
};

export const missingInfomation = () => {
  describe('accommodation ', () => {
    before((done) => {
      localStorage.setItem('token', travelToken);
      done();
    });
    it('it should return 400  when information is not full ', (done) => {
      chai
        .request(app)
        .post('/api/v1/create/accommodation')
        .send(missingInformation)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });
};

export const createThesame = () => {
  describe('accommodation ', () => {
    before((done) => {
      localStorage.setItem('token', travelToken);
      done();
    });
    it('it should return 409 when you create thesame accommodation ', (done) => {
      chai
        .request(app)
        .post('/api/v1/create/accommodation')
        .send(existingFacility)
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body.errorMessage).to.equal('This accommodation was already created make a new one!');
          done();
        });
    });
  });
};

export const getAllAccommodations = () => {
  describe('accommodation ', () => {
    before((done) => {
      localStorage.setItem('token', travelToken);
      done();
    });
    it('it should return 200 to get all accommodation ', (done) => {
      chai
        .request(app)
        .get('/api/v1/view/accommodations')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('array');
        });
      done();
    });
  });
};

export const wrongUserAccess = () => {
  describe('accommodation ', () => {
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(wrongUser)
        .end((err, res) => {
          localStorage.setItem('token', res.body.token);
          done();
        });
    });

    it('it should return 401 for unauthorized access ', (done) => {
      chai
        .request(app)
        .post('/api/v1/create/accommodation')
        .send(facility)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
        });
      done();
    });
  });
};

export const getSingleAccommodation = () => {
  describe('accommodation ', () => {
    before((done) => {
      localStorage.setItem('token', travelToken);
      done();
    });
    it('it should return 200 when viewing single accommodation ', (done) => {
      chai
        .request(app)
        .get(`/api/v1/view/accommodation/${1}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('object');
        });
      done();
    });
  });
};

export const editAccommodations = () => {
  describe('accommodation ', () => {
    before((done) => {
      localStorage.setItem('token', travelToken);
      done();
    });

    it('it should return 200 when editing single accommodation ', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/edit/accommodation/${1}`)
        .send(editAccommodation)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('object');
        });
      done();
    });

    it('it should return 500 when violating ', (done) => {
      chai
        .request(app)
        .patch('/api/v1/edit/accommodation/n')
        .send(editAccommodation)
        .end((err, res) => {
          expect(res.statusCode).to.equal(500);
          expect(res.body.name).to.equal('SequelizeDatabaseError');
        });
      done();
    });
  });
};

export const editwithEmptyData = () => {
  describe('accommodation ', () => {
    before((done) => {
      localStorage.setItem('token', travelToken);
      done();
    });
    it('it should return 400 when data was not provided ', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/edit/accommodation/${1}`)
        .send({})
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.errorMessage).to.equal('You are sending with empty fields');
        });
      done();
    });
  });
};

export const violatingDatabase = () => {
  describe('accommodation ', () => {
    before((done) => {
      localStorage.setItem('token', travelToken);
      done();
    });


    it('it should return 500 when violating database ', (done) => {
      chai
        .request(app)
        .patch('/api/v1/edit/accommodation/n')
        .send(editAccommodation)
        .end((err, res) => {
          expect(res.statusCode).to.equal(500);
          expect(res.body.name).to.equal('SequelizeDatabaseError');
        });
      done();
    });
  });
};

export const uploadLocationImage = () => {
  describe('accommodation ', () => {
    before((done) => {
      localStorage.setItem('token', travelToken);
      done();
    });

    it('it should return 200 when successfully image uploaded ', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/upload/accommodation/${1}`)
        .type('form')
        .attach('imageOfBuilding', fs.readFileSync('src/tests/mockImages/test.png'), 'test.png')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('image uploaded successfully');
        });
      done();
    });
  });
};

export const notFoungUpload = () => {
  describe('accommodation ', () => {
    before((done) => {
      localStorage.setItem('token', travelToken);
      done();
    });


    it('it should return 404 when accommodation is not found ', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/upload/accommodation/${7}`)
        .type('form')
        .attach('imageOfBuilding', fs.readFileSync('src/tests/mockImages/test.png'), 'test.png')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.errorMessage).to.equal('Accommodation not found');
        });
      done();
    });
  });
};

export const notFoundUpdate = () => {
  describe('accommodation ', () => {
    before((done) => {
      localStorage.setItem('token', travelToken);
      done();
    });

    it('it should return 404 when accommodation is not found ', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/edit/accommodation/${7}`)
        .send(editAccommodation)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.errorMessage).to.equal('Accommodation not found');
        });
      done();
    });
  });
};
export const violatingDb = () => {
  describe('violating ', () => {
    before((done) => {
      localStorage.setItem('token', travelToken);
      done();
    });

    it('it should return 500 when violating database ', (done) => {
      chai
        .request(app)
        .patch('/api/v1/upload/accommodation/n')
        .type('form')
        .attach('imageOfBuilding', fs.readFileSync('src/tests/mockImages/test.png'), 'test.png')
        .end((err, res) => {
          expect(res.statusCode).to.equal(500);
          expect(res.body.name).to.equal('SequelizeDatabaseError');
        });
      done();
    });
  });
};
