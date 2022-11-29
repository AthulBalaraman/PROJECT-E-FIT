const db = require("../config/connection");
const collection = require("../config/collection");
const { ObjectId } = require("mongodb");

module.exports = {
  insertProduct: (imageID, newProduct) => {
    newProduct.sellingPrice = parseInt(newProduct.sellingPrice)
    newProduct.actualPrice = parseInt(newProduct.actualPrice)
    newProduct.weight = parseInt(newProduct.weight)
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collection.PRODUCTS)
        .insertOne(imageID, newProduct)
        .then((data) => {
          resolve.apply(data);
        });
    });
  },

  displayProducts: () => {
    return new Promise(async (resolve, reject) => {
      let ProductDetails = await db
        .get()
        .collection(collection.PRODUCTS)
        .find()
        .toArray();
      resolve(ProductDetails);
    });
  },

  deleteProduct: (deleteProduct) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collection.PRODUCTS)
        .deleteOne({ _id: ObjectId(deleteProduct) })
        .then((response) => {
          resolve(response);
        });
    });
  },

  getProductDetails: (productId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCTS)
        .findOne({ _id: ObjectId(productId) })
        .then((product) => {
          resolve(product);
        });
    });
  },

  updateProductDetails: (productId, productDetails, image) => {
    productDetails.sellingPrice = parseInt(productDetails.sellingPrice)
    productDetails.actualPrice = parseInt(productDetails.actualPrice)
    productDetails.weight = parseInt(productDetails.weight)
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCTS)
        .updateOne(
          { _id: ObjectId(productId) },
          {
            $set: {
              productName: productDetails.productName,
              actualPrice: productDetails.actualPrice,
              sellingPrice: productDetails.sellingPrice,
              categoryName: productDetails.categoryName,
              brandName: productDetails.brandName,
              weight: productDetails.weight,
              productQuantity: productDetails.productQuantity,
              productDescription: productDetails.productDescription,
              picture: image,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },
};
