import jwt from 'jsonwebtoken';
import environment from 'dotenv';
import models from '../db/models';
import sgMail from '@sendgrid/mail';

environment.config();

export default class usersController {

  static async createTwoWayTrip(req,res) {
    try{
        const {
            userId, origin, destination, departureDate, returnDate, reason, accommodation, passportNumber
          } = req.body;
       
          const managerId = await models.User.findOne({
            where : { role: 'manager'}
        }).then((manager) => manager.id);        
          if(passportNumber){
            await models.User.update(
                {passport: passportNumber},
                {where : { id: userId}}
              )
        }
          
      const request = await models.Request.create({
        managerId,
        requesterId: userId,
        origin,
        destination,
        type: 'two_way',
        accommodation,
        departureDate,
        returnDate,
        reason}).then((request) => request);
         
        if(request){  
          const IntendedManager = await models.User.findAll({
            where: { id: `${request.dataValues.managerId}` },
          }); 
          const User = await models.User.findAll({
            where: { id: `${request.dataValues.requesterId}` },
          }); 

          sgMail.setApiKey(process.env.BN_API_KEY);
          const msg = {
            to: `${IntendedManager[0].dataValues.email}`,
            from: 'no-reply@brftnomad.com',
            subject: 'Barefoot Travel Request',
            text: `${request.dataValues.reason}`,
            html: `<p><strong>Dear ${IntendedManager[0].dataValues.firstName}<strong>
            <br><br>
            <p>This is to inform you that a new request was made by:<p>
            <br>Name of the requester: ${User[0].firstName} ${User[0].lastName}
            <br>Reason: ${request.dataValues.reason}
            <br>Request Type: ${request.dataValues.type}
            <br>Destination: ${request.dataValues.destination}
            <br>DepartureDate: ${request.dataValues.departureDate}
            <br>ReturnDate: ${request.dataValues.returnDate}
            <br>Barefoot Nomad Team<br>
            <br>Thank you<br>
            </p>`,
         }
        sgMail.send(msg);
 
          const newNotification = await models.Notification.create({
            requesterId: userId,
            managerId,
            status: false,
            message: 'a new request was made',
            type: 'new_request'});

            const sendNotification = (receiverId, data, connectedClients, io, type) => {
              if (!receiverId) {
                io.emit(type, data);
              } else if (connectedClients[receiverId.toString()]) {
                connectedClients[receiverId.toString()].forEach(element => {
                  io.to(element).emit(type, data);
                });
              }
            }
            const echoNotification = (req, notification, type, manager) => {
              notification = notification.get({ plain: true });
              sendNotification(manager, notification, req.connectedClients, req.io, type);
            };


            echoNotification(req, newNotification, 'new_request', managerId);

          return res.status(200).json({
            message: 'request created on success!',
            origin,
            destination,
            departureDate,
            returnDate,
            reason,
            requestId: request.id,
            requestType: request.type,
            status: request.status,
                });              
          }
    } 
    catch(error){
        return res.status(500).json({
            error: error,
            });
        }
      }

  static async findAllMyRequest(req, res) {
    try{                
    const allMyRequest = await models.Request.findAll({
        where: { requesterId: `${req.user.userId}` },
      });
    if(allMyRequest.length !== 0){
      return res.status(200).json({ message: 'List of requests', allMyRequest });
    } else{
      return res.status(404).json({ message: 'No request found', allMyRequest });
    }    
    }catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message
    });
    }
  }
}
