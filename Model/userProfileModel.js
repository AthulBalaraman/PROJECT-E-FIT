const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectID } = require('bson')

module.exports = {

  getUserOrders:(userId)=>{
    return new Promise(async(resolve,reject)=>{
      let orders = await db.get().collection(collection.ORDER).find({user:ObjectID(userId)}).toArray()
      resolve(orders)
    })
  }
}