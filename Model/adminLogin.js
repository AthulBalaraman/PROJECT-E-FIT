const db = require('../config/connection')
const bcrypt = require('bcrypt')
const collection = require('../config/collection')



module.exports={
  dologin:(admindata)=>{
    return new Promise(async(resolve,reject)=>{
      let loginstatus = false
      let response = {}
      let admin = await db.get().collection(collection.ADMIN_CREDENTIALS).findOne({userName:admindata.adminusername})
      
      if(admin)
      {
        bcrypt.compare(admindata.adminpassword,admin.Password).then((status)=>{
          if(status)
          {
            console.log('login success')
            response.user=admin
            response.status=true
            resolve(response)
          }
          else
          {
            
            console.log('password wrong')
            resolve({status:false})
          }
        })
      }
      else{
        console.log('user not found')
        resolve({status:false})
      }
    })
  }
}
  