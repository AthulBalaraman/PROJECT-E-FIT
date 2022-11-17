const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectID } = require('bson')
const bcrypt = require('bcrypt')

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
      let user = await db.get().collection(collection.USER_CREDENTIALS).findOne({_id:ObjectID(userID)})
      resolve(user)
      })
    },

    updatePassword:(body,user)=>{
      return new Promise(async(resolve,reject)=>{

        body.currentPassword = await bcrypt.hash(body.currentPassword,10)
        body.password = await bcrypt.hash(body.password,10)
        console.log(body);
        console.log(user.userpassword);
        console.log(body.currentPassword);
       
         bcrypt.compare(user.userpassword,body.currentPassword).then((status)=>{
          console.log(status);
          if(status)
          {
            console.log(' correct password');
            db.get().collection(collection.USER_CREDENTIALS).updateOne({_id:ObjectID(user)},
            {
              $set:{
  
                userpassword:body.password
              }
            }
            )
            resolve()
          }
         else
         {
          console.log('eneter correct password');
         }
         
        })
     
       
        })
       
      }
    }
  
  

