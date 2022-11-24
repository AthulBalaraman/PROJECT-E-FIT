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

    updatePassword:(newPassword,user)=>{
      console.log("user",user);
      return new Promise(async(resolve,reject)=>{
        newPassword = await bcrypt.hash(newPassword,10)

            db.get().collection(collection.USER_CREDENTIALS).updateOne({_id:ObjectID(user._id)},
            {
              $set:{
  
                userpassword:newPassword
              }
            }
            )
            resolve()
          })
        },

        getOrderProductDetails:(orderId)=>{
          return new Promise(async(resolve,reject)=>{
            let orders = await db.get().collection(collection.ORDER).aggregate([
              {
                $match:{_id:ObjectID(orderId)}
              },
              {
                $unwind:'$products'
              },
              {
                $lookup:{
                  from:collection.PRODUCTS,
                  localField:'products.item',
                  foreignField:'_id',
                  as:'orderProducts'
                }
              },
              {
                $project:{
                  _id:0,
                  orderProducts:1
                }
              }
            ]).toArray()
            console.log('this is orders',orders);
            resolve(orders)
          })
        },


        getOneProduct :(orderId)=>{
        
          return new Promise(async(resolve,reject)=>{
              let oneProduct = await db.get().collection(collection.ORDER).aggregate([
                  {
                      $match:{_id:ObjectID(orderId)}
                  },
                  {
                      $unwind:'$products'
                  },
                  {
                      $lookup:{
                          from:collection.PRODUCTS,
                          localField:'products.item',
                          foreignField:'_id',
                          as:'orderproducts'
                      }
                  },
                  {
                      $project:{
                          orderproducts:1
                      }
                  }
              ]).toArray()
              console.log("length",oneProduct.length);
              resolve(oneProduct)
              
              
          })
      }
        }
       
  

