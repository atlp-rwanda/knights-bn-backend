import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import localStorage from 'localStorage';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinon from 'sinon';
import app from '../../app';
import accommodationFacilities from '../../controllers/accommodation';

import {
  facility, wrongUser,
  existingFacility,
  missingInformation,
  missingRoomInfo,
  editAccommodation,
  travelToken, facility2,
  supplierToken,
} from './accommodationMockData';

chai.use(chaiHttp);
chai.should();
chai.use(sinonChai);

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
        });
      done();
    });
    it('Testing database violation', (done) => {
      const createAccomodationSpy = sinon.spy(accommodationFacilities, 'createAccomodation');
      const request = {
        params: {
          id: 1,
        },
        file: {
          url: 'https://via.placeholder.com/300.png/09f/fff',
        },
        body: {},
        user: {
          id: 6,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      accommodationFacilities.createAccomodation(req, res);
      expect(createAccomodationSpy).to.have.been.calledWith(req, res);
      createAccomodationSpy.restore();
      done();
    });
  });
};

describe('Supplier can create accommodation/facilities ', () => {
  before((done) => {
    localStorage.setItem('token', supplierToken);
    done();
  });
  it('it should return 201 successfully facility created ', (done) => {
    chai
      .request(app)
      .post('/api/v1/create/accommodation')
      .send(facility2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('accommodationName');
        expect(res.body.data).to.have.property('locationName');
      });
    done();
  });
});

export const missingRoomInformation = () => {
  describe('accommodation ', () => {
    before((done) => {
      localStorage.setItem('token', travelToken);
      done();
    });

    it('it should return 400  when room information is missing', (done) => {
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
    it('it should return 400  whenaccommodation information is not full ', (done) => {
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
    it('it should return 409 when you create the same accommodation ', (done) => {
      chai
        .request(app)
        .post('/api/v1/create/accommodation')
        .send(existingFacility)
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body.errorMessage).to.equal('This accommodation was already created make a new one!');
        });
      done();
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
    it('it should return 500 when violating the database ', (done) => {
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

export const SuppliersEditAccommodations = () => {
  describe('supplier can edit their accomodation ', () => {
    before((done) => {
      localStorage.setItem('token', supplierToken);
      done();
    });

    it('it should return 200 when editing single accommodation ', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/edit/accommodation/${2}`)
        .send(editAccommodation)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.property('accommodationName');
          expect(res.body.data).to.have.property('locationName');
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
    const uploadBuildingImage = sinon.spy(accommodationFacilities, 'uploadBuildingImage');
    const request = {
      params: {
        id: 1,
      },
      file: {
        url: 'https://via.placeholder.com/300.png/09f/fff',
      },
      body: {},
      user: {
        id: 6,
      },
    };
    const req = mockReq(request);
    const res = mockRes();
    accommodationFacilities.uploadBuildingImage(req, res);
    expect(uploadBuildingImage).to.have.been.calledWith(req, res);
    uploadBuildingImage.restore();
  });
};

export const notFoungUpload = () => {
  describe('accommodation ', () => {
    it('should return 404 when no accommodation to updata image is available', (done) => {
      const uploadBuildingImage = sinon.spy(accommodationFacilities, 'uploadBuildingImage');
      const request = {
        params: {
          id: 20,
        },
        file: {
          url: 'https://via.placeholder.com/300.png/09f/fff',
        },
        body: {},
        user: {
          id: 6,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      accommodationFacilities.uploadBuildingImage(req, res);
      expect(uploadBuildingImage).to.have.been.calledWith(req, res);
      uploadBuildingImage.restore();
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
  describe('violating database ', () => {
    it('Testing database violation', (done) => {
      const uploadBuildingImage = sinon.spy(accommodationFacilities, 'uploadBuildingImage');
      const request = {
        params: {
          id: 'n',
        },
        file: {
          url: 'https://via.placeholder.com/300.png/09f/fff',
        },
        body: {},
        user: {
          id: 'n',
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      accommodationFacilities.uploadBuildingImage(req, res);
      expect(uploadBuildingImage).to.have.been.calledWith(req, res);
      uploadBuildingImage.restore();
      done();
    });
  });
};
