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

