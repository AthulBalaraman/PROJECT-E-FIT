const userProfileModel = require('../Model/userProfileModel')
const cartModel = require('../Model/userCart')
const wishListModel = require('../Model/userWishListModel')
const category = require('../Model/adminCategory')
const { resolveContent } = require('nodemailer/lib/shared')
const userDetailsModel = require('../Model/adminUser')


const viewOrders = async(req,res)=>{
let orders = await userProfileModel.getUserOrders(req.session.user._id)
let cartCount = null;
let wishListCount = null
if (req.session.user) {
  cartCount = await cartModel.getCartCount(req.session.user._id);
  wishListCount = await wishListModel.getWishListCount(req.session.user._id)
}
console.log('this is my orders',orders);
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

const showUserProfile = async(req,res)=>{
  let orders = await userProfileModel.getUserOrders(req.session.user._id)
  let cartCount = null;
  let wishListCount = null
  if (req.session.user) {
    cartCount = await cartModel.getCartCount(req.session.user._id);
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
  
  category.displayCategory().then(async(category) => {
    let userData = req.session.user;
    let userDetails = await userProfileModel.findUser(userData._id)
    console.log('this is display user',userDetails)
      res.render("user/userProfilePage", {
        admin:false,
        user:true,
        userData,
        cartCount,
        category,
        wishListCount,
        orders,
        userDetails
      });
    });
  };

const editProfile =async(req,res)=>{
  let orders = await userProfileModel.getUserOrders(req.session.user._id)
  let cartCount = null;
  let wishListCount = null
  if (req.session.user) {
    cartCount = await cartModel.getCartCount(req.session.user._id);
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
  
  category.displayCategory().then(async(category) => {
    let userData = req.session.user;
    let userDetails = await userProfileModel.findUser(userData._id)
        res.render("user/editProfilePage", {
          admin:false,
          user:true,
          userData,
          cartCount,
          category,
          wishListCount,
          orders,
          userDetails
        });
      });
    };


const editProfileDetails = async(req,res)=>{
  let orders = await userProfileModel.getUserOrders(req.session.user._id)
  let cartCount = null;
  let wishListCount = null
  if (req.session.user) {
    cartCount = await cartModel.getCartCount(req.session.user._id);
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }

userProfileModel.editUserProfile(req.body,req.session.user).then(()=>{
  let userData = req.session.user;
    category.displayCategory().then(async(category) => {
      let userDetails = await userProfileModel.findUser(userData._id)
  
      res.render("user/userProfilePage", {
        admin:false,
        user:true,
        userData,
        cartCount,
        category,
        wishListCount,
        orders,
        userDetails
      });
    });
  })

}


const showPasswordChangePage =async(req,res)=>{
  let cartCount = null;
  let wishListCount = null
  if (req.session.user) {
    cartCount = await cartModel.getCartCount(req.session.user._id);
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
  
  category.displayCategory().then(async(category) => {
    let userData = req.session.user;
    let userDetails = await userProfileModel.findUser(userData._id)
        res.render("user/changePasswordPage", {
          admin:false,
          user:true,
          userData,
          cartCount,
          category,
          wishListCount,
          userDetails
        });
      });
}

module.exports ={
  viewOrders,
  showUserProfile,
  editProfile,
  editProfileDetails,
  showPasswordChangePage
}