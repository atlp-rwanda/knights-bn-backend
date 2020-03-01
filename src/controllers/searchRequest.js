import environment from 'dotenv';
import models from '../db/models';
import Sequelize from 'sequelize';
import requestFilter from '../helpers/filterRequest'
const {
  Op, where, cast, col
} = Sequelize;

environment.config();

export default class requestController {
    static async filterTrips(req, res) {
        try {  
          let searchQuery; 
           if (req.query.requestId) {
              const { requestId} = req.query;
              searchQuery = requestFilter('id', requestId);
            } else if (req.query.requesterId) {
              const { requesterId} = req.query;
              searchQuery = requestFilter('requesterId', requesterId);    
            } else if (req.query.type) {      
              const { type} = req.query;
              searchQuery = requestFilter('type', type);    
            }else if (req.query.status) {
              const { status} = req.query;
              searchQuery = requestFilter('status', status);  
            }else if (req.query.reason) {
              const { reason} = req.query;
              searchQuery = requestFilter('reason', reason);          
            }else if (req.query.origin) {
              const { origin} = req.query;
              searchQuery = requestFilter('origin', origin);     
            }else if (req.query.destination) {
              const { destination} = req.query;
              searchQuery = requestFilter('destination', destination);   
            }   else{return res.status(400).json({ error: 'please enter your target key'});}
        
              if (req.user.role === 'requester') {
               const searchResults = await models.Request.findAll({
                  where: {                   
                    requesterId: req.user.id,
                    [Op.or]: searchQuery
                  },
                  
                });
                if (searchResults.length<=0){
                  return res.status(404).json({
                    status: 404,
                    message:'no results found',
                  });
                }
                return res.status(200).json({
                  status: 200,
                  message:'search results',
                  data: searchResults
                });
              }else if (req.user.role === 'manager'){
                const searchResults = await models.Request.findAll({
                  where: {
                    managerId: req.user.id,
                    [Op.or]: searchQuery
                  },
                });
                if (searchResults.length<=0){
                  return res.status(404).json({
                    status: 404,
                    message:'no results found',
                  });
                }
                return res.status(200).json({
                  status: 200,
                  message:'search results',
                  data: searchResults
                });
        
              }
          }     catch(error){
            return res.status(500).json({
                error: error.message,
                })
            }
        }
}
