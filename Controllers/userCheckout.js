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
  let total = await checkOut.getTotalAmount(req.session.user._id)
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
  let finalTotal = req.body.TOTAL//cart total
  let details = req.body
  if(details.couponCode==='')
  {
    finalTotal = details.TOTAL  
    res.json(finalTotal)
  }
  else{
    console.log('this is checkingout page req.body details',details);
    let couponDetails = await couponModel.getCouponDetails(details.couponCode)
    console.log('this is coupon details ',couponDetails);
    if(couponDetails)
    {
      await couponModel.getDiscount(couponDetails, details.TOTAL).then((response) => {
        console.log('########################################',response);
        finalTotal = response.discountedTotal
        console.log('this is final total',response);
        res.json(response.discountedTotal)

      });
    }
    else
    {
      finalTotal = details.TOTAL 
      res.json(finalTotal)     
    }
  }
}

module.exports = {
  showCheckOutPage,
  showCheckingOutPage
};
