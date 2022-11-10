const productDetails = require("../Model/userFrontDIsplay");
const cartModel = require("../Model/userCart");
const category = require('../Model/adminCategory')
const checkOut = require('../Model/userCheckout')
const wishListModel = require('../Model/userWishListModel')

const showProductDetails = async (req, res) => {
  let productId = req.query.id;
  let product = await productDetails.viewProductDetails(productId);
  let cartCount = null 
  let wishListCount = null

  if(req.session.user){
    cartCount = await cartModel.getCartCount(req.session.user._id)
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
  category.displayCategory().then((category)=>{
    let userData = req.session.user
    res.render("user/productDetails", { admin: false,user:true, product,category,cartCount,wishListCount,userData });
  })
  
};

module.exports = {
  showProductDetails,
};
