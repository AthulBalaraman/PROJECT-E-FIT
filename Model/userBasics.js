const db = require("../config/connection");
const collection = require("../config/collection");
const bcrypt = require("bcrypt");

module.exports = {
  insertUserCredentials: (verified, username, useremail, userpassword) => {
    return new Promise(async (resolve, reject) => {
      userpassword = await bcrypt.hash(userpassword, 10);
      console.log(userpassword);
      db.get()
        .collection(collection.USER_CREDENTIALS)
        .insertOne({ verified, username, useremail, userpassword })
        .then((data) => {
          resolve(data);
        });
    });
  },

  checkUserLogin: (userCheck) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let user = await db
        .get()
        .collection(collection.USER_CREDENTIALS)
        .findOne({ useremail: userCheck.useremail });

      if (user) {
        if (user.verified == 1) {
          bcrypt
            .compare(userCheck.password, user.userpassword)
            .then((status) => {
              if (status) {
                response.status = true;
                response.user = user
                resolve(response);
              } else {
                resolve({ status: false });
              }
            });
        } else {
          resolve({ status: false });
        }
      } else {
        resolve({ status: false });
      }
    });
  },

  updateverified: (userID) => {
    return new Promise(async(resolve, reject) => {
      let user = await db.get().collection(collection.USER_CREDENTIALS).findOne({_id:userID}) // added this + aync await
     await db.get()
        .collection(collection.USER_CREDENTIALS)
        .updateOne(
          { _id: userID },
          {
            $set: {
              verified: 1,
            },
          }
        )
        .then((response) => {
          response.user = user //added this
          resolve(response);
        });
    });
  },
};
