const placeOrderModel = require('../Model/userPlaceOrderModel')
const checkOut = require('../Model/userCheckout')
const cartModel = require('../Model/userCart')
const wishListModel = require('../Model/userWishListModel')
const category = require('../Model/adminCategory')
const e = require('express')


const placeOrder = async(req,res)=>{

  let products = await placeOrderModel.getCartProductsList(req.body.userId)
  let totalPrice = await checkOut.getTotalAmount(req.body.userId)
  placeOrderModel.placeOrder(req.body,products,totalPrice).then((orderId)=>{
  if(req.body.payment_method === 'cash_on_delivery')
  {
    res.json({codSuccess:true})
  }
  else
  {
    placeOrderModel.generateRazorpay(orderId,totalPrice[0].total).then((response)=>{
      res.json(response)
    })
  }
   
  })

}

const showOrderPlaced = async(req,res)=>{
  let cartCount = null;
  let wishListCount = null
  if (req.session.user) {
    cartCount = await cartModel.getCartCount(req.session.user._id);
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
 
  category.displayCategory().then((category) => {
    let userData = req.session.user;
    res.render("user/orderPlacedPage", {
      admin:false,
      user:true,
      userData,
      cartCount,
      category,
      wishListCount
    });
  });
}

const verifyPayment = (req,res)=>{
  console.log(req.body);

}

module.exports = {
  placeOrder,
  showOrderPlaced,
  verifyPayment
}