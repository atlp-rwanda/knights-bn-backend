import models from '../db/models';
const updateRequest = async (requestId, updates) => {  

    let updatesToArray = Object.entries(updates) ;
  
    for (const [key, value] of updatesToArray) {
      if(key === ('status' || 'createdAt' || 'updatedAt' ||'managerId' || 'requesterId' || 'id' || 'type')) continue;
      if(value){
        const update = {};
          update[`${key}`] = value;
         await models.Request.update(
                {...update},
                { where : {id: requestId} }
              )
        }
      }
      return await models.Request.findOne({
        where : { id : requestId}
      })      
  }

  export default updateRequest;
