const db = require("../config/connection");
const collection = require("../config/collection");
const { ObjectID } = require("bson");

module.exports = {
  displayProducts: () => {
    return new Promise(async (resolve, reject) => {
      let productDetails = await db
        .get()
        .collection(collection.PRODUCTS)
        .find()
        .toArray();
      resolve(productDetails);
    });
  },

  viewProductDetails: (productId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCTS)
        .findOne({ _id: ObjectID(productId) })
        .then((product) => {
          resolve(product);
        });
    });
  },


};
