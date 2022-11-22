const db = require("../config/connection");
const collection = require("../config/collection");
const { ObjectId } = require("mongodb");

module.exports = {
  insertcategory: (newcategory) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collection.CATEGORIES)
        .insertOne(newcategory)
        .then((data) => {
          resolve.apply(data);
        });
    });
  },

  displayCategory: () => {
    return new Promise(async (resolve, reject) => {
      let CategoriesDetails = await db
        .get()
        .collection(collection.CATEGORIES)
        .find()
        .toArray();
      resolve(CategoriesDetails);
    });
  },

  deleteCategory: (deleteCategory) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collection.CATEGORIES)
        .deleteOne({ _id: ObjectId(deleteCategory) })
        .then((response) => {
          resolve(response);
        });
    });
  },

  checkProducts:(categoryId)=>{
    return new Promise(async(resolve,reject)=>{
      let categoryDetails = await db.get().collection(collection.CATEGORIES).findOne({ _id:ObjectId(categoryId)})
      let products  = await db.get().collection(collection.PRODUCTS).find({categoryName:categoryDetails.newCategoryName}).toArray()
      console.log('the products of this category is',products);
      resolve(products)
    })
  }
};
