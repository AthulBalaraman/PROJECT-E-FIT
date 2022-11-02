const db = require('../config/connection')
const collection = require('../config/collection')




module.exports = {

  displayProducts:()=>{
    return new Promise(async(resolve,reject)=>{
        let productDetails = await db.get().collection(collection.PRODUCTS).find().toArray()
        resolve(productDetails)
    })
  }

 
}



