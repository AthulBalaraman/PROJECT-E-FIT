const productDetails = require('../Model/userFrontDIsplay')

const showProductDetails = async(req,res)=>{
  let productId = req.query.id
  console.log(productId)
  let product = await productDetails.viewProductDetails(productId)

  res.render('user/productDetails',{admin:false,product})
}

module.exports = {
  showProductDetails
}

// router.get('/updateUser',async(req,res)=>{

//   let userid = req.query.id
//   console.log(userid);
//   let user = await adminhelper.getUserDetails(userid)
  
//   if(req.session.loggedin){
//     res.render('pages/updateUser',{admin:true,user})
//   }
//   else{
//     res.render('pages/adminLogin',{admin:true,user:false})
//   }
 
// })
