import models from '../db/models';

export default class commentController {

static async createComment(req,res) {
    try{
        
        const commenterId = req.user.id; 
        const { comment } = req.body;
        const { requestId } = req.params;

        if(isNaN(requestId)){
          return res.status(422).json({
            status: 422,
            error: 'please provide the Id of the request, Id must be a number' 
        })
        }

        //
        const requestInfo = await models.Request.findOne({
            where: { id: requestId },
          });



          if (!requestInfo) {
              return res.status(404).json({
                  status: 404,
                  error: 'request does not exist' 
              })
            }
            
            const { requesterId } = requestInfo.dataValues;

            //
            const requester = await models.User.findOne({
              where: { id: requesterId},
            });
  

            const { lineManager } = requester.dataValues;

            //
            const Manager = await models.User.findOne({
              where: { email: lineManager},
            });
     
          if (requesterId !== commenterId && requesterId !== Manager.dataValues.id) {
            return res.status(403).json({
                status: 403,
                error: 'Unauthorized: you are not authorized to perform this operation'
            });
          }


          const newComment = await models.Comment.create({
            commenterId,
            requestId,
            comment,
          });


          
          if(newComment){
          return res.status(201).json({
              status: 201,
              message: `comment successfully added`,
          })
        }
    } 
    catch(error){
        return res.status(500).json({
            error: error,
            })
        }
  }
}
