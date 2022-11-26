const db = require('../config/connection')
const collection = require('../config/collection')
const { resolveContent } = require('nodemailer/lib/shared')
module.exports ={
  showOrder:()=>{
    return new Promise((resolve,reject)=>{
      let orderList  = db.get().collection(collection.ORDER).find().toArray()
      resolve(orderList)
    })
  },
  checkPlacedOrders:()=>{
    return new Promise(async(resolve,reject)=>{
      let orderplaced = await db.get().collection(collection.ORDER).find({status:'Placed'}).toArray()
      let orderPlacedLength  = orderplaced.length
      resolve(orderPlacedLength)
    })
  }
}