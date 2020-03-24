import environment from 'dotenv';
import lodash from 'lodash';
import emiter from 'events';
import moment from 'moment';
import models from '../db/models';
import getTodayDate from '../helpers/getTodayDate';
import isObjectEmpty from '../helpers/isObjectEmpty';
import TripHelper from '../helpers/TripHelper';
import { echoNotification } from '../helpers/notificationSender';
import sendEmail from '../helpers/sendEmail';
import handleError from '../helpers/errorHandler';
import addNotification from '../helpers/addNotification';
import Request from '../helpers/Request';
import User from '../helpers/userQueries';
import compareDates from '../helpers/compareDates';
import editEventHandler from '../events/editEvent';
import handlerSuccess from '../helpers/handleSuccess';

environment.config();
moment.locale('en-ca');

export default class requestsController {
  static async createOneWayTrip(req, res) {
    try {
      const { id } = req.user;
      const requesterId = id;
      const {
        origin, destination, departureDate, reason, accommodation,
      } = req.body;
      const isManager = await TripHelper.searchManager();
      const managerId = isManager.id;
      const theRequest = await TripHelper.searchTripRequest(requesterId, Date.parse(departureDate), destination);
      if (theRequest.length !== 0) {
        return res.status(409).json({ error: 'Sorry! This request already exists. Please double-check your departure date and destination.' });
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
      const userData = await models.User.findOne({ where: { id: `${id}` } });
      if (userData.lineManager === null) throw 'you currently have no lineManager, please go to update your profile';
      const manager = await models.User.findOne({ where: { email: `${userData.lineManager}` } });
      const managerId = manager.dataValues.id;
      const request = await models.Request.create({
        managerId, requesterId: userData.id, origin, destination, status: 'pending', type: 'two_way', departureDate, returnDate, accommodation, reason,
      });
      const isRequestEmpty = isObjectEmpty(request);
      const {
        id: requestId, requesterId, type, status,
      } = request;
      if (isRequestEmpty === false) {
        const emailTitle = 'This is to inform you that a new request was made by:';
        sendEmail(process.env.BN_EMAIL_NO_REPLY, manager, request, 'New request was made', emailTitle);
        const newNotification = await models.Notification.create({
          requesterId: id, managerId, status: 'non_read', message: 'a new request was made', type: 'new_request', owner: 'manager',
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
      } throw 'can\'t create the request, retry please!';
    } catch (error) { handleError(res, error); }
  }

  static async findAllMyRequest(req, res) {
    try {
      const allMyRequest = await models.Request.findAll({
        where: { requesterId: req.user.id },
        include: [{ model: models.Comment, attributes: ['id', 'comment', 'createdAt'] }],
      });
      if (allMyRequest) { return res.status(200).json({ message: 'List of requests', allMyRequest }); }
      return res.status(404).json({ message: 'No request found', allMyRequest });
    } catch (error) { return res.status(500).json({ status: 500, error: error.message }); }
  }

  static async pendingApproval(req, res) {
    if (req.user.role !== 'manager') { return res.status(403).json({ error: 'access denied' }); }
    try {
      const pendingRequests = await models.Request.findAll({
        where: { managerId: req.user.id, status: 'pending' },
        include: [{ model: models.Comment }],
      });
      const pendingRequestLength = pendingRequests.length;
      if (pendingRequestLength > 0) { return res.status(200).json({ message: 'Pending requests', pendingRequests }); }
      return res.status(404).json({ message: 'No Pending request available' });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
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
      if (requestStatus === 'pending') { return await Request.updateStatus(request, 'rejected'); }
      if (requestStatus === 'approved') {
        const { departureDate } = request;
        const todayDate = getTodayDate();
        const isTodayDateAfterTheTripStartDate = compareDates(todayDate, departureDate);
        if (isTodayDateAfterTheTripStartDate) throw "Sorry can't reject ! The user is now on trip.";
        return await Request.updateStatus(request, 'rejected');
      } return res.status(200).json({ message: 'The request successfully rejected', requestId });
    } catch (error) { return handleError(res, error); }
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
      const FireEvent = new emiter.EventEmitter();
      FireEvent.on('editEvent', editEventHandler);
      FireEvent.emit('editEvent', {
        managerId: updatedRequest.managerId,
        title: updatedRequest.reason,
        id: requestId,
        user: req.user,
      });
      return res.status(200).json({ message: 'successfully updated', updatedRequest });
    } catch (error) { return handleError(res, error); }
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
      if (process.env.NODE_ENV !== 'test' && todayDate >= request.departureDate) throw 'The request start date is due.';
      if (request.status === 'approved') throw 'The request was approved before!';
      await Request.updateStatus(request, 'approved');
      const requester = await User.getUser('id', request.requesterId);
      const emailTitle = 'This is to inform you that your trip request has been approved';
      sendEmail(process.env.BN_EMAIL_NO_REPLY, requester, request, 'Request approved!', emailTitle);
      const newNotification = await addNotification(requester, 'approved_request');
      echoNotification(req, newNotification, 'approved_request', requester.id);
      res.status(200).json({ message: 'The request successfully approved', requestId });
    } catch (error) { handleError(res, error); }
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

  static async getStats(req, res) {
    try {
      const { date } = req.params;
      const { id } = req.user;
      let tripsCounter = 0;
      const trips = await Request.getTripsMade(id, date);
      trips.forEach((trip) => {
        trip.type === 'multi_way' ? tripsCounter += trip.cities.length : tripsCounter += 1;
      });
      const daysLeft = moment().diff(moment(date), 'days');
      const data = {
        From: moment(date).format('L'),
        To: moment().format('L'),
        'Time interval': `Last ${daysLeft} ${daysLeft > 1 ? 'days' : 'day'}`,
        'Trips made': tripsCounter,
      };
      return handlerSuccess(res, 200, 'Success.', data);
    } catch (error) {
      return handleError(res, error);
    }
  }
}
