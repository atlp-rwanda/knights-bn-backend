import models from '../db/models';

export default class commentController {

    static async createComment(req,res) {
        try{
    
          const commenterId = req.user.id; 
          const { comment } = req.body;
          const { requestId } = req.query;
          
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
