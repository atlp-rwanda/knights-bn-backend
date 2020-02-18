import jwt from 'jsonwebtoken';
import environment from 'dotenv';
import models from '../db/models';

environment.config();

export default class usersController {

  static async findAllMyRequest(req, res) {
    try{                
    const allMyRequest = await models.Request.findAll({
        where: { userId: `${req.user.userId}` },
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
