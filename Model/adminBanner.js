const db = require("../config/connection");
const collection = require("../config/collection");
const { ObjectID } = require("bson");

module.exports = {
  inserBanner: (bannerImageId, newBanner) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collection.BANNER)
        .insertOne(bannerImageId, newBanner)
        .then((data) => {
          resolve.apply(data);
        });
    });
  },

  showBanner: () => {
    return new Promise(async (resolve, reject) => {
      let banners = await db
        .get()
        .collection(collection.BANNER)
        .find()
        .toArray();
      resolve(banners);
    });
  },

  deleteBanner: (bannerId) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.BANNER)
        .deleteOne({ _id: ObjectID(bannerId) })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },
};
