const db = require('../config/connection')
const collection = require('../config/collection')

module.exports={
  insertUserCredentials:(newUser)=>{
    return new Promise(async(resolve,reject)=>{
      db.get().collection(collection.USER_CREDENTIALS).insertOne(newUser).then((data)=>{
        resolve.apply(data)
      })
    })
  }
  }

