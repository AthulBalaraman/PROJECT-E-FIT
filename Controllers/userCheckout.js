const checkOutModel = require("../Model/userCheckout");
const cartModel = require("../Model/userCart");
const category = require("../Model/adminCategory");
const checkOut = require('../Model/userCheckout')
const wishListModel = require('../Model/userWishListModel')

const showCheckOutPage = async (req, res) => {
  let products = await cartModel.getCartProducts(req.session.user._id)
  let cartCount = null;
  let wishListCount = null
  if (req.session.user) {
    cartCount = await cartModel.getCartCount(req.session.user._id);
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
  let total = await checkOut.getTotalAmount(req.session.user._id)
  
  category.displayCategory().then((category) => {
    let userData = req.session.user;
    res.render("user/proceedToCheckOutPage", {
      admin: false,
      user: true,
      userData,
      cartCount,
      category,
      products,
      total,
      wishListCount
    });
  });
};

module.exports = {
  showCheckOutPage,
};