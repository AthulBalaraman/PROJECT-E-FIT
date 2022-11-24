const checkOutModel = require("../Model/userCheckout");
const cartModel = require("../Model/userCart");
const category = require("../Model/adminCategory");
const checkOut = require('../Model/userCheckout')
const wishListModel = require('../Model/userWishListModel')
const couponModel = require('../Model/userCouponModel')

const showCheckOutPage = async (req, res) => {
  console.log('***************************',req.query.finalTotal)
  let products = await cartModel.getCartProducts(req.session.user._id)
  let cartCount = null;
  let wishListCount = null
  if (req.session.user) {
    cartCount = await cartModel.getCartCount(req.session.user._id);
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
  // let total = await checkOut.getTotalAmount(req.session.user._id)
  let finalTotal = Math.round(req.query.finalTotal)

  category.displayCategory().then((category) => {
    let userData = req.session.user;
    res.render("user/proceedToCheckOutPage", {
      admin: false,
      user: true,
      userData,
      cartCount,
      category,
      products,
      finalTotal,
      wishListCount
    });
  });
};

const showCheckingOutPage = async(req,res)=>{
  
  let finalTotal = parseInt(req.body.TOTAL)//cart total
  let details = req.body
  details.TOTAL = parseInt(details.TOTAL)
  if(details.couponCode==='')
  {
    let shippingCharge =  (5/100)*details.TOTAL
    finalTotal = details.TOTAL + shippingCharge
    res.json(finalTotal)
  }
  else{
    let couponDetails = await couponModel.getCouponDetails(details.couponCode)
    if(couponDetails)
    {
      await couponModel.getDiscount(couponDetails, details.TOTAL).then((response) => {
        finalTotal = response.discountedTotal
        finalTotal = Math.round(finalTotal)
        res.json(finalTotal)

      });
    }
    else
    {
      let shippingCharge =  (5/100)*details.TOTAL
      finalTotal = details.TOTAL + shippingCharge
      res.json(finalTotal) 
    }
  }
}

module.exports = {
  showCheckOutPage,
  showCheckingOutPage
};
