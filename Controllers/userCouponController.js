const couponModel = require("../Model/userCouponModel");
const cartCheckOutModel = require("../Model/userCheckout");

const applyCoupon = async (req,res) => {
  console.log("coupon body =>", req.body);

  let userData = req.session.user;
  let couponCode = req.body.couponCode;
  let totalAmount = await cartCheckOutModel.getTotalAmount(userData._id);//total of cart
  let TOTAL = totalAmount[0].total;//cart Total
  let couponDetails = await couponModel.getCouponDetails(couponCode);
  await couponModel.getDiscount(couponDetails, TOTAL).then((response) => {
    res.json(response);
  });
};

module.exports = {
  applyCoupon,
};
