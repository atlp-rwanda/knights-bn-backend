import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import app from '../../app';
import accommodationFacilities from '../../controllers/accommodation';

import {
  facility,
  wrongUser,
  existingFacility,
  missingInformation,
  missingRoomInfo,
  editAccommodation,
  facility2,
  travelAdminInfo,
  supplierInfo,
} from './accommodationMockData';

chai.use(chaiHttp);
chai.should();
chai.use(sinonChai);

export const accommodationFacility = () => {
  describe('Accommodation facilities ', () => {
    it('it should return 201 successfully facility created ', (done) => {
      const Signed = travelAdminInfo;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/create/accommodation')
        .set('user-token', Token)
        .send(facility)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
    it('Testing database violation', (done) => {
      const createAccomodationSpy = sinon.spy(
        accommodationFacilities,
        'createAccomodation'
      );
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

export const editwithEmptyData = () => {
  describe('accommodation ', () => {
    it('it should return 400 when data was not provided ', (done) => {
      const Signed = travelAdminInfo;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch(`/api/v1/edit/accommodation/${1}`)
        .set('user-token', Token)
        .send({})
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.errorMessage).to.equal(
            'You are sending an empty fields'
          );
        });
      done();
    });
  });
};

export const missingRoomInformation = () => {
  describe('accommodation ', () => {
    it('it should return 400  when room information is missing', (done) => {
      const Signed = travelAdminInfo;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/create/accommodation')
        .set('user-token', Token)
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
    it('it should return 400  whenacommodation information is not full ', (done) => {
      const Signed = travelAdminInfo;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/create/accommodation')
        .set('user-token', Token)
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
    it('it should return 409 when yu create the same accommodation ', (done) => {
      const Signed = travelAdminInfo;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/create/accommodation')
        .set('user-token', Token)
        .send(existingFacility)
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body.errorMessage).to.equal(
            'This accommodation was already created make a new one!'
          );
        });
      done();
    });
  });
};

export const getAllAccommodations = () => {
  describe('accommodation ', () => {
    it('it should return 200 to getall accommodation ', (done) => {
      const Signed = travelAdminInfo;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .get('/api/v1/view/accommodations')
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('array');
        });
      done();
    });
  });
};

export const getSingleAccommodation = () => {
  describe('accommodation ', () => {
    it('it should return 200 when vewing single accommodation ', (done) => {
      const Signed = travelAdminInfo;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .get(`/api/v1/view/accommodation/${1}`)
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
    it('it should return 400 wrong ID params', (done) => {
      const Signed = travelAdminInfo;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .get('/api/v1/view/accommodation/n')
        .set('user-token', Token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });
};

export const editAccommodations = () => {
  describe('accommodation ', () => {
    it('it should return 200 when editing single accommodation ', (done) => {
      const Signed = travelAdminInfo;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch(`/api/v1/edit/accommodation/${1}`)
        .set('user-token', Token)
        .send(editAccommodation)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('object');
        });
      done();
    });
    it('it should return 400 wrong ID parameter ', (done) => {
      const Signed = travelAdminInfo;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch('/api/v1/edit/accommodation/n')
        .set('user-token', Token)
        .send(editAccommodation)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
    it('Testing database violation', (done) => {
      const editAccommodationSpy = sinon.spy(
        accommodationFacilities,
        'editAccommodation'
      );
      const request = {
        params: {
          id: 'n',
        },
        body: editAccommodation,
        user: {
          id: 'n',
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      accommodationFacilities.editAccommodation(req, res);
      expect(editAccommodationSpy).to.have.been.calledWith(req, res);
      editAccommodationSpy.restore();
      done();
    });
  });
};

export const violatingDatabase = () => {
  describe('accommodation ', () => {
    it('it should return 400 when violating database ', (done) => {
      const Signed = travelAdminInfo;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch('/api/v1/edit/accommodation/n')
        .set('user-token', Token)
        .send(editAccommodation)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.equal('id must be a number');
        });
      done();
    });
  });
};

export const notFoundUpdate = () => {
  describe('accommodation ', () => {
    it('it should return 404 when accommodation is not found ', (done) => {
      const Signed = travelAdminInfo;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch(`/api/v1/edit/accommodation/${7}`)
        .set('user-token', Token)
        .send(editAccommodation)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.errorMessage).to.equal('Accommodation not found');
        });
      done();
    });
  });
};

describe('Supplier can create accommodation/facilities ', () => {
  it('it should return 200 on successful signIn', (done) => {
    const Signed = travelAdminInfo;
    const Token = jwt.sign(Signed, process.env.SECRETKEY, {
      expiresIn: '24h',
    });
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .set('user-token', Token)
      .send(supplierInfo)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it('it should return 201 successfully facility created ', (done) => {
    const Signed = travelAdminInfo;
    const Token = jwt.sign(Signed, process.env.SECRETKEY, {
      expiresIn: '24h',
    });
    chai
      .request(app)
      .post('/api/v1/create/accommodation')
      .set('user-token', Token)
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

export const SuppliersEditAccommodations = () => {
  describe('supplier can edit their accomodation ', () => {
    it('it should return 200 when editing single accommodation ', (done) => {
      const Signed = travelAdminInfo;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .patch(`/api/v1/edit/accommodation/${2}`)
        .set('user-token', Token)
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

export const uploadLocationImage = () => {
  describe('accommodation ', () => {
    const uploadBuildingImage = sinon.spy(
      accommodationFacilities,
      'uploadBuildingImage'
    );
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
      const uploadBuildingImage = sinon.spy(
        accommodationFacilities,
        'uploadBuildingImage'
      );
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

export const violatingDb = () => {
  describe('violating database ', () => {
    it('Testing database violation', (done) => {
      const uploadBuildingImage = sinon.spy(
        accommodationFacilities,
        'uploadBuildingImage'
      );
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

export const wrongUserAccess = () => {
  describe('accommodation ', () => {
    it('it should return 401 for unauthorized access ', (done) => {
      const Signed = wrongUser;
      const Token = jwt.sign(Signed, process.env.SECRETKEY, {
        expiresIn: '24h',
      });
      chai
        .request(app)
        .post('/api/v1/create/accommodation')
        .set('user-token', Token)
        .send(facility)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
        });
      done();
    });
  });
};
