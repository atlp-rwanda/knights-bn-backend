import environment from 'dotenv';
import models from '../db/models';

environment.config();

export default class usersController {

  static async createTwoWayTrip(req,res) {
    try{
        const {
            id, origin, destination, departureDate, returnDate, reason, accommodation, passportNumber
          } = req.body;
          
        const managerId = await models.User.findOne({
            where : { role: 'manager'}
        }).then((manager) => manager.id);        
          if(passportNumber){
            await models.User.update(
                {passport: passportNumber},
                {where : { id}}
              )
        }
          
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
        
        if(request.length != 0){
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
                })
        }
    } 
    catch(error){
        return res.status(500).json({
            error: error.errors[0],
            })
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
}
