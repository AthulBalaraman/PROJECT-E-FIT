const db = require('../config/connection')
const collection = require('../config/collection')
const bcrypt = require('bcrypt')

module.exports={
  insertUserCredentials:(newUser)=>{
    return new Promise(async(resolve,reject)=>{
      newUser.userpassword = await bcrypt.hash(newUser.userpassword,10)
      newUser.userconfirmpassword = await bcrypt.hash(newUser.userconfirmpassword,10)
      db.get().collection(collection.USER_CREDENTIALS).insertOne(newUser).then((data)=>{
        resolve.apply(data)
      })
    })
  },

  checkUserLogin:(userCheck)=>{
    return new Promise(async(resolve,reject)=>{
      let response = {}
      let user = await db.get().collection(collection.USER_CREDENTIALS).findOne({useremail:userCheck.useremail})

      if(user)
      {
        bcrypt.compare(userCheck.password,user.userpassword).then((status)=>{
          if(status)
          {
            response.status = true
            resolve(response)
          }
          else
          {
            resolve({status:false})
          }
        })
      }  
      else{
        resolve({status:false})
      }
    })
  }
  }
