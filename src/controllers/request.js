import environment from 'dotenv';
import sgMail from '@sendgrid/mail';
import lodash from 'lodash';
import models from '../db/models';
import getTodayDate from '../helpers/getTodayDate';
import isObjectEmpty from '../helpers/isObjectEmpty';
import oneWayTripHelper from '../helpers/oneWayTrip';
import { echoNotification } from '../helpers/notificationSender';
import sendEmail from '../helpers/sendEmail';
import handleError from '../helpers/errorHandler';
import addNotification from '../helpers/addNotification';
import Request from '../helpers/Request';
import User from '../helpers/userQueries';
import compareDates from '../helpers/compareDates';

environment.config();
export default class requestsController {
  static async createOneWayTrip(req, res) {
    try {
      const { id } = req.user;
      const requesterId = id;

      const {
        origin, destination, departureDate, reason, accommodation,
      } = req.body;

      const isManager = await oneWayTripHelper.searchManager();
      const managerId = isManager.id;
      const theRequest = await oneWayTripHelper.searchTripRequest(requesterId, Date.parse(departureDate), destination);
      if (theRequest.length !== 0) {
        return res.status(409).json({
          error: 'Sorry! This request already exists. Please double-check your departure date and destination.',
        });
      }
      const newTripRequest = await models.Request.create({
        managerId,
        requesterId,
        origin,
        destination,
        status: 'pending',
        type: 'one_way',
        departureDate,
        accommodation,
        reason,
      });
      const { dataValues } = newTripRequest;
      return res.status(201).json({ message: 'Trip Request Successfully Created.', ...lodash.omit(dataValues, ['updatedAt', 'createdAt', 'returnDate', 'cities']) });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  static async createTwoWayTrip(req, res) {
    try {
      const { id } = req.user;
      const {
        origin, destination, departureDate, returnDate, reason, accommodation,
      } = req.body;

      const userData = await models.User.findOne({
        where: { id: `${id}` },
      });
      if (userData.lineManager === null) {
        return res.status(422).json({
          status: res.statusCode,
          error: 'you currently have no lineManager, please go to update your profile',
        });
      }
      const manager = await models.User.findOne({
        where: { email: `${userData.lineManager}` },
      });
      const managerId = manager.dataValues.id;
      const request = await models.Request.create({
        managerId,
        requesterId: userData.id,
        origin,
        destination,
        status: 'pending',
        type: 'two_way',
        departureDate,
        returnDate,
        accommodation,
        reason,
      });

      const isRequestEmpty = isObjectEmpty(request);
      const {
        id: requestId, requesterId, type, status,
      } = request;

      if (isRequestEmpty === false) {
        sgMail.setApiKey(process.env.BN_API_KEY);
        const msg = {
          to: `${manager.dataValues.email}`,
          from: 'no-reply@brftnomad.com',
          subject: 'Barefoot Travel Request',
          text: `${request.dataValues.reason}`,
          html: `<p><strong>Dear ${manager.dataValues.firstName}<strong>
              <br><br>
              <p>This is to inform you that a new request was made by:<p>
              <br>Name of the requester: ${userData.FirstName} ${userData.lastName}
              <br>Reason: ${request.dataValues.reason}
              <br>Request Type: ${request.dataValues.type}
              <br>Destination: ${request.dataValues.destination}
              <br>DepartureDate: ${request.dataValues.departureDate}
              <br>ReturnDate: ${request.dataValues.returnDate}
              <br>Barefoot Nomad Team<br>
              <br>Thank you<br>
              </p>`,
        };
        sgMail.send(msg);
        const newNotification = await models.Notification.create({
          requesterId: id,
          managerId,
          status: 'non_read',
          message: 'a new request was made',
          type: 'new_request',
          owner: 'manager',
        });
        echoNotification(req, newNotification, 'new_request', managerId);
        return res.status(201).json({
          message: 'request created with success!',
          data: {
            requestId,
            requesterId,
            managerId: manager.id,
            type,
            reason,
            origin,
            destination,
            status,
            departureDate,
            returnDate,
          },
        });
      } return res.status(500).json({
        error: "can't create the request, retry please!",
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  static async findAllMyRequest(req, res) {
    try {
      const allMyRequest = await models.Request.findAll({
        where: {
          requesterId: req.user.id,
        },
        include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment', 'createdAt'],
          },
        ],
      });
      if (allMyRequest.length !== 0) {
        return res.status(200).json({ message: 'List of requests', allMyRequest });
      }
      return res.status(404).json({ message: 'No request found', allMyRequest });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  static async pendingApproval(req, res) {
    if (req.user.role !== 'manager') {
      return res.status(403).json({ error: 'access denied' });
    }
    try {
      const pendingRequests = await models.Request.findAll({
        where: {
          managerId: req.user.id,
          status: 'pending',
        },
        include: [{
          model: models.Comment,
        }],
      });
      if (pendingRequests.length !== 0) {
        return res.status(200).json({ message: 'Pending requests', pendingRequests });
      }
      return res.status(404).json({ message: 'No Pending request available' });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }

  static async rejectRequest(req, res) {
    try {
      const { requestId } = req.query;
      const managerId = req.user.id;
      const manager = await User.getManager(managerId);
      if (!manager) throw 'Unauthorized access!';
      const request = await Request.isRequestBelongsToManager(requestId, managerId);
      if (!request) throw 'Request not found!';
      const requestStatus = request.status;
      if (requestStatus === 'rejected') throw 'The request was rejected before!';
      if (requestStatus === 'pending') {
        await Request.updateStatus(request, 'rejected');
      }
      if (requestStatus === 'approved') {
        const { departureDate } = request;
        const todayDate = getTodayDate();
        const isTodayDateAfterTheTripStartDate = compareDates(todayDate, departureDate);
        if (isTodayDateAfterTheTripStartDate) throw "Sorry can't reject ! The user is now on trip.";
        await Request.updateStatus(request, 'rejected');
      }
      res.status(200).json({
        message: 'The request successfully rejected',
        requestId,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  static async createMultiCityRequest(req, res) {
    try {
      const requester = await models.User.findOne({ where: { id: req.user.id } });
      if (requester.lineManager === null) return res.status(400).json({ status: 404, error: 'Update your profile to include your line manager email' });
      const { lineManager } = requester;
      const manager = await models.User.findOne({ where: { email: lineManager } });
      if (manager === 'null') return res.status(404).json({ status: 404, error: 'It seems your manager is not avilable in the system' });
      req.body.requesterId = req.user.id;
      req.body.managerId = manager.id;
      req.body.status = 'pending';
      const multiCity = await models.Request.create(req.body);
      return res.status(201).json({ status: 201, message: 'Your request has successfully created', data: multiCity });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  }

  static async editRequest(req, res) {
    try {
      const { requestId } = req.params;
      const requesterId = req.user.id;
      const request = await Request.isRequestBelongsToRequester(requestId, requesterId);

      if (!request) throw 'Request not found!';
      if (request.status !== 'pending') throw 'Sorry, the request was closed!';
      const updatedRequest = await Request.updateRequest(requestId, req.body);
      return res.status(200).json({
        message: 'successfully updated',
        updatedRequest,
      });
    } catch (error) {
      return handleError(res, error);
    }
  }

  static async approveRequest(req, res) {
    try {
      const { requestId } = req.params;
      const managerId = req.user.id;
      const manager = await User.getManager(managerId);
      if (!manager) throw 'Unauthorized access!';
      const request = await Request.isRequestBelongsToManager(requestId, managerId);
      if (!request) throw 'Request not found!';
      const todayDate = getTodayDate();
      if (todayDate >= request.departureDate) throw 'The request start date is due.';
      if (request.status === 'approved') throw 'The request was approved before!';
      await Request.updateStatus(request, 'approved');
      const requester = await User.getUser('id', request.requesterId);
      sendEmail(process.env.BN_EMAIL_NO_REPLY, requester, request);
      const newNotification = await addNotification(requester, 'approved_request');
      echoNotification(req, newNotification, 'approved_request', requester.id);
      res.status(200).json({
        message: 'The request successfully approved',
        requestId,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  static async getSpecificRequest(req, res) {
    try {
      const { requestId } = req.params;
      const requesterId = req.user.id;
      const request = await Request.isRequestBelongsToRequester(requestId, requesterId);
      if (!request) throw 'Request not found!';
      res.status(200).json({ message: 'Request details:', request });
    } catch (error) {
      handleError(res, error);
    }
  }
}
