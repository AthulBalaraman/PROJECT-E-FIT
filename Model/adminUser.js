const db = require("../config/connection");
const collection = require("../config/collection");

module.exports = {
  displayUser: () => {
    return new Promise(async (resolve, reject) => {
      let UserDetails = await db
        .get()
        .collection(collection.USER_CREDENTIALS)
        .find()
        .toArray();
      resolve(UserDetails);
    });
  },
};
