const cartModel = require("../Model/userCart");
const category = require('../Model/adminCategory')
const checkOut = require('../Model/userCheckout')

const { response } = require("express");


const showCartPage = async (req,res)=>{
  let products = await cartModel.getCartProducts(req.session.user._id)
  let cartCount = null 
  let total = await checkOut.getTotalAmount(req.session.user._id)
  if(req.session.user){
    cartCount = await cartModel.getCartCount(req.session.user._id)
    
  }
  
  console.log('cart products ============ >>>> ',products[0].productDetails);
  category.displayCategory().then((category)=>{
    
    let userData = req.session.user
    let userDetails = req.session.user._id
 
    res.render('user/userCartShowPage',{admin:false,user:true,category,userData,products,userDetails,cartCount,total})
  })
  
}
const addToCart = (req,res)=>{

  let productid = req.body.productId
  console.log(productid)
  cartModel.addToCart(productid,req.session.user._id).then(()=>{
    // res.redirect('/viewProductDetails')
    res.json({status:true})
  })
}

const changeProductQuantity = (req,res,next)=>{
  cartModel.changeProductQuantity(req.body).then(()=>{
  res.json(response)
  })
}


module.exports = {
showCartPage,
addToCart,
changeProductQuantity
};
