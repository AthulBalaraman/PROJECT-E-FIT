const db = require("../config/connection");
const collection = require("../config/collection");
const { ObjectId } = require("mongodb");

module.exports = {
  viewProductDetails: (categoryId) => {
    return new Promise(async (resolve, reject) => {
      let category = await db
        .get()
        .collection(collection.CATEGORIES)
        .findOne({ _id: ObjectId(categoryId) });
      let CATEGORYNAME = await category.newCategoryName;
        let product = await db.get().collection(collection.PRODUCTS).aggregate([
          {$match:{categoryName: CATEGORYNAME}}
        ]).toArray()
      resolve(product);
    });
  },

  viewShopProducts:()=>{
    return new Promise(async(resolve,reject)=>{
     let shopProducts = await db.get().collection(collection.PRODUCTS).find().toArray()
     resolve(shopProducts)
    })
  }
};
