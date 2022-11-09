const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')

module.exports = {
  getTotalAmount:(userId)=>{
    return new Promise(async(resolve,reject)=>{
      let total = await db.get().collection(collection.CART).aggregate([
        {
          $match:{user:ObjectId(userId)}
        },
        {
          $unwind:'$products'
        },
        {
          $project:{
            item:'$products.item',
            quantity:'$products.quantity'
          }
        },
        {
          $lookup:{
            from:collection.PRODUCTS,
            localField:'item',
            foreignField:'_id',
            as:'product'

          }
        },
        {
         $project:{
          item:1,
          quantity:1,
          productDetails:{$arrayElemAt:['$product',0]}
        
         }
        },
        {
          $group:{            
            _id:null,
            total:{
              $sum:{$multiply:['$quantity','$productDetails.sellingPrice']}
            }
          }
        }

      ]).toArray()
      console.log(total);
      resolve(total)
  })
  }
}