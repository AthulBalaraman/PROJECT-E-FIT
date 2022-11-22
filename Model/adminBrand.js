const db = require("../config/connection");
const collection = require("../config/collection");
const { ObjectID } = require("bson");

module.exports = {
  insertbrand: (newBrand) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collection.BRANDS)
        .insertOne(newBrand)
        .then((data) => {
          resolve.apply(data);
        });
    });
  },

  displayBrand: () => {
    return new Promise(async (resolve, reject) => {
      let brandDetails = await db
        .get()
        .collection(collection.BRANDS)
        .find()
        .toArray();
      resolve(brandDetails);
    });
  },

  deleteBrand: (deletebrand) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collection.BRANDS)
        .deleteOne({ _id: ObjectID(deletebrand) })
        .then((response) => {
          resolve(response);
        });
    });
  },
  checkProducts:(brandId)=>{
    return new Promise(async(resolve,reject)=>{
      let brandDetails = await db.get().collection(collection.BRANDS).findOne({ _id:ObjectID(brandId)})
      let products  = await db.get().collection(collection.PRODUCTS).find({brandName:brandDetails.newBrandName}).toArray()
      console.log('the products of this category is',products);
      resolve(products)
    })
  }
};
