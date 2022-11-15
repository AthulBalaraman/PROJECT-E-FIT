const userProfileModel = require('../Model/userProfileModel')
const cartModel = require('../Model/userCart')
const wishListModel = require('../Model/userWishListModel')
const category = require('../Model/adminCategory')
const viewOrders = async(req,res)=>{
let orders = await userProfileModel.getUserOrders(req.session.user._id)
let cartCount = null;
let wishListCount = null
if (req.session.user) {
  cartCount = await cartModel.getCartCount(req.session.user._id);
  wishListCount = await wishListModel.getWishListCount(req.session.user._id)
}

category.displayCategory().then((category) => {
  let userData = req.session.user;
  res.render("user/viewOrdersPage", {
    admin:false,
    user:true,
    userData,
    cartCount,
    category,
    wishListCount,
    orders
  });
});
}

module.exports ={
  viewOrders
}