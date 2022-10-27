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

  // dologin:(admindata)=>{
  //   return new Promise(async(resolve,reject)=>{
  //     let loginstatus = false
  //     let response = {}
  //     let admin = await db.get().collection('details').findOne({username:admindata.username})
      
  //     if(admin)
  //     {
  //       bcrypt.compare(admindata.password,admin.password).then((status)=>{
  //         if(status)
  //         {
  //           response.user=admin
  //           response.status=true
  //           resolve(response)
  //         }
  //         else
  //         {
  //           resolve({status:false})
  //         }
  //       })
  //     }
  //     else{
  //       resolve({status:false})
  //     }
  //   })
  // },
  


  // insertuser:(userdata)=>{
  //   return new Promise(async(resolve,reject)=>{
  //       userdata.userPassword = await bcrypt.hash(userdata.userPassword,10)
  //       userdata.userConfirmPassword = await bcrypt.hash(userdata.userConfirmPassword,10)
  //        db.get().collection('userdatacollection').insertOne(userdata).then((data)=>{
  //         resolve.apply(data)
  //        })
  //   })
  // },
