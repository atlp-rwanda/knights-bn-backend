import environment from 'dotenv';
import sgMail from '@sendgrid/mail';
import models from '../db/models';
import getTodayDate from '../utils/getTodayDate';
import isObjectEmpty from '../utils/isObjectEmpty';
import Sequelize from 'sequelize';
import { echoNotification } from '../helpers/notificationSender';

const {
  Op, where, cast, col
} = Sequelize;

environment.config();

export default class usersController {

  static async createTwoWayTrip(req,res) {
    try{
      const { id } = req.user; 
      const {
        origin, destination, departureDate, returnDate, reason, accommodation,
      } = req.body;
      
        const UserData = await models.User.findOne({
            where : { id: `${id}`,
          }
        });
          

        if(UserData.lineManager == null){
          return res.status(422).json({
            status: 422,
            error: 'you currently have no lineManager, please go to update your profile'
          });
        }

        const manager = await models.User.findOne({
          where : { email: `${UserData.lineManager}`,
        }
      });

      const managerId = manager.dataValues.id;

      const request = await models.Request.create({
        managerId,
        requesterId: id,
        origin,
        destination,
        status:'pending',
        type: 'two_way',
        departureDate,
        returnDate,
        accommodation,
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
            to: `${manager.dataValues.email}`,
            from: 'no-reply@brftnomad.com',
            subject: 'Barefoot Travel Request',
            text: `${request.dataValues.reason}`,
            html: `<p><strong>Dear ${manager.dataValues.firstName}<strong>
            <br><br>
            <p>This is to inform you that a new request was made by:<p>
            <br>Name of the requester: ${UserData.FirstName} ${UserData.lastName}
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
          requesterId: id,
          managerId,
          status: 'non_read',
          message: 'a new request was made',
          type: 'new_request'});

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
        where: { requesterId: `${req.user.id}` },
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
  static async pendingApproval(req, res) {
    if (req.user.role !== 'manager')
    {
      return res.status(403).json({ error: 'access denied'});

    }
    try{          
    const pendingRequests = await models.Request.findAll({
        where: { managerId: req.user.id,
      status:'pending'
      },
      });       
    if(pendingRequests.length !== 0){
      return res.status(200).json({ message: 'Pending requests', pendingRequests });
    } else{
      return res.status(404).json({ message: 'No Pending request available'});
    }    
    }catch (error) {
    res.status(500).json({
      status: 500,
      error: error
    });
    }
  }
  static async rejectRequest(req, res) {
    try{
        const { requestId } = req.query;
        const managerId = req.user.id;
                
        const manager = await models.User.findOne(
            { 
                where: { id : managerId, role : 'manager'}
            }
        );
        if(manager){
            const request = await models.Request.findAll(
                {
                    where: {
                        id: requestId,
                        managerId
                    }
                }
            );
            
            let isRequestEmpty = isObjectEmpty(request)

            if(isRequestEmpty === false){
                let requestStatus = request[0].status;

                if(requestStatus === 'pending'){
                    const updatedRequest = await models.Request.update(
                        { status: 'rejected' },
                        { where : { id: requestId } }
                    );
                    let isUpdatedRequestEmpty = isObjectEmpty(updatedRequest);
                    if(isUpdatedRequestEmpty === false){
                        return res.status(200).json({
                            message: 'The request successfully rejected',
                            requestId,
                            requestStatus: updatedRequest[0].status
                        })
                    }
                }
                else if (requestStatus === 'rejected'){
                    return res.status(200).json({
                        message: 'The request was rejected before!',
                        requestId,
                        requestStatus
                    })
                }
                else if( requestStatus === 'approved'){
                    let departureDate = request[0].departureDate;
                    let todayDate = getTodayDate();
                    const compareDate = (todayDate, departureDate) => {
                        return (new Date(todayDate) > new Date(departureDate)) ? true : false;
                    }
                    const tripStarted = compareDate(todayDate,departureDate);
                    
                    if(tripStarted){
                        res.status(405).json({
                            message: "Sorry can't reject ! The user is now on trip."

                        })
                    } else {
                        const updatedRequest = await models.Request.update(
                            { status: 'rejected' },
                            { where : { id: requestId } }
                        );
                        let isUpdatedRequestEmpty = isObjectEmpty(updatedRequest);
                        if(isUpdatedRequestEmpty === false){
                            res.status(200).json({
                                message: 'The request successfully rejected',
                                requestId,
                                requestStatus: updatedRequest[0].status
                            })
                        }
                    }
                }
            } else res.status(404).json({
                error: 'Request not found!'
            })
            
        } else res.status(403).json({
            error: 'Unauthorized access!'
        })
        

    } catch (error) {
        res.status(500).json({
            error: error.message
            })
        }
    }

  static async createMultiCityRequest(req,res){
   try{
    const requester = await models.User.findOne({where:{id:req.user.id}});
    if(requester.lineManager === null) return res.status(400).json({status:404, error:'Update your profile to include your line manager email'})
    const {lineManager} = requester;
    const manager = await models.User.findOne({where:{email:lineManager}});
    if(manager === 'null') return res.status(404).json({status:404, error:'It seems your manager is not avilable in the system'})
    req.body.requesterId = req.user.id;
    req.body.managerId = manager.id;
    req.body.status = 'pending';
    const multiCity = await models.Request.create(req.body);
    return res.status(201).json({status:201, message:'Your request has successfully created', data:multiCity});
   }catch(error){
    return res.status(500).json({status:500, error});
   }
  }
  
}
