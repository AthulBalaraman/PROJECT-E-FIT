const cartModel = require("../Model/userCart");
const category = require('../Model/adminCategory')
const checkOut = require('../Model/userCheckout')
const wishListModel = require('../Model/userWishListModel')

const { response } = require("express");


const showCartPage = async (req,res)=>{
  let products = await cartModel.getCartProducts(req.session.user._id)
  let cartCount = null 
  let wishListCount = null
  let total = 0
  if(products.length>0){
    total = await checkOut.getTotalAmount(req.session.user._id)
  }

  let TOTAL = total[0]?total[0].total:0
  if(req.session.user){
    cartCount = await cartModel.getCartCount(req.session.user._id)
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
  
  category.displayCategory().then((category)=>{
    
    let userData = req.session.user
    if(products.length<0)
    {
        TOTAL = 0 
    }
    let userDetails = req.session.user._id
    res.render('user/userCartShowPage',{admin:false,user:true,category,userData,products,userDetails,cartCount,TOTAL,wishListCount})
  })
  
}
const addToCart = (req,res)=>{

  let productid = req.body.productId
  cartModel.addToCart(productid,req.session.user._id).then(()=>{
    res.json({status:true})
  })
}

const changeProductQuantity = (req,res,next)=>{

  cartModel.changeProductQuantity(req.body).then(async(response)=>{
    total = await checkOut.getTotalAmount(req.session.user._id)
    
    response.total = total
     res.json(response)
  })
}

const removeCartProduct = (req,res)=>{
 cartModel.removeCartProduct(req.body).then((response)=>{
  res.json(response)
 })
}


module.exports = {
showCartPage,
addToCart,
changeProductQuantity,
removeCartProduct
};
