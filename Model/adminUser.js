const db = require("../config/connection");
const collection = require("../config/collection");
const { ObjectID } = require("bson");

module.exports = {
  displayUser: () => {
    return new Promise(async (resolve, reject) => {
      let UserDetails = await db
        .get()
        .collection(collection.USER_CREDENTIALS)
        .find()
        .toArray();
      resolve(UserDetails);
    });
  },

  blockUser:(userID)=>{
    return new Promise((resolve,reject)=>{
      db.get().collection(collection.USER_CREDENTIALS).updateOne({_id:ObjectID(userID)},{
        $set:{
          state:'blocked'
        }
      }).then((response)=>{
        resolve(response)
      })
    })
  },

 
  unblockUser:(userID)=>{
    return new Promise((resolve,reject)=>{
      db.get().collection(collection.USER_CREDENTIALS).updateOne({_id:ObjectID(userID)},{
        $set:{
          state:'active'
        }
      }).then((response)=>{
        resolve(response)
      })
    })
  }
};
