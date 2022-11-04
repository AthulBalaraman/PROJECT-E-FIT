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
};
