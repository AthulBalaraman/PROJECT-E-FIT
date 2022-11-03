const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')

module.exports ={

  viewProductDetails:(categoryId)=>{
    return new Promise(async (resolve,reject)=>{
      let category = await db.get().collection(collection.CATEGORIES).findOne({_id:ObjectId(categoryId)})
      let CATEGORYNAME = await category.newCategoryName
        let product = db.get().collection(collection.PRODUCTS).find({categoryName:CATEGORYNAME}).toArray()
        resolve(product)
    })
  },

}