const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')

module.exports = {

  insertProduct:(imageID,newProduct)=>{
    return new Promise(async(resolve,reject)=>{
      db.get().collection(collection.PRODUCTS).insertOne(imageID,newProduct).then((data)=>{
        resolve.apply(data)
      })
    })
  },

  displayProducts:()=>{
    return new Promise(async(resolve,reject)=>{
      let ProductDetails = await db.get().collection(collection.PRODUCTS).find().toArray()
      resolve(ProductDetails)
    })
  },

  deleteProduct:(deleteProduct)=>{
    return new Promise(async(resolve,reject)=>{
      db.get().collection(collection.PRODUCTS).deleteOne({_id:ObjectId(deleteProduct)}).then((response)=>{
        resolve(response)
      })
    })
  }

}