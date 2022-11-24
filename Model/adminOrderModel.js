const db = require('../config/connection')
const collection = require('../config/collection')
const { resolveContent } = require('nodemailer/lib/shared')
module.exports ={
  showOrder:()=>{
    return new Promise((resolve,reject)=>{
      let orderList  = db.get().collection(collection.ORDER).find().toArray()
      resolve(orderList)
    })
  }
}