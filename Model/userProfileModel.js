const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectID } = require('bson')

module.exports = {

  getUserOrders:(userId)=>{
    return new Promise(async(resolve,reject)=>{
      let orders = await db.get().collection(collection.ORDER).find({userId:ObjectID(userId)}).toArray()
      resolve(orders)
    })
  },

  editUserProfile:(userDetails,userData)=>{
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_CREDENTIALS)
        .updateOne(
          { _id: ObjectID(userData._id) },
          {
            $set: {
              username: userDetails.username,
              useremail: userDetails.useremail,
              address: userDetails.address,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },

  findUser:(userID)=>{
    return new Promise(async(resolve,reject)=>{
      console.log('this is user id',userID);
      let user = await db.get().collection(collection.USER_CREDENTIALS).findOne({_id:ObjectID(userID)})
      resolve(user)
      })
    }
  }
  

