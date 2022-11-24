const userProfileModel = require('../Model/userProfileModel')
const cartModel = require('../Model/userCart')
const wishListModel = require('../Model/userWishListModel')
const category = require('../Model/adminCategory')
const { resolveContent } = require('nodemailer/lib/shared')
const collection = require('../config/collection')



const viewOrders = async(req,res)=>{
let orderList = await userProfileModel.getUserOrders(req.session.user._id)
let cartCount = null;
let wishListCount = null
if (req.session.user) {
  cartCount = await cartModel.getCartCount(req.session.user._id);
  wishListCount = await wishListModel.getWishListCount(req.session.user._id)
}
console.log('this is my orders',orderList);
category.displayCategory().then((category) => {
  let userData = req.session.user;
  res.render("user/viewOrdersPage", {
    admin:false,
    user:true,
    userData,
    cartCount,
    category,
    wishListCount,
    orderList
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

const updatePassword = async(req,res)=>{
  let cartCount = null;
  let wishListCount = null
  if (req.session.user) {
    cartCount = await cartModel.getCartCount(req.session.user._id);
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
  
  category.displayCategory().then(async(category) => {
    let userData = req.session.user;
    let userDetails = await userProfileModel.findUser(userData._id)
    userProfileModel.updatePassword(req.body.password,userData).then(()=>{
      res.render("user/userProfilePage", {
        admin:false,
        user:true,
        userData,
        cartCount,
        category,
        wishListCount,
        userDetails
      });
    }); 
    })
}

const viewOrderProducts = async(req,res)=>{
  let cartCount = null;
  let wishListCount = null
  if (req.session.user) {
    cartCount = await cartModel.getCartCount(req.session.user._id);
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
  category.displayCategory().then(async(category) => {
    let userData = req.session.user;
    let userDetails = await userProfileModel.findUser(userData._id)
    let orderId = req.query.id
    console.log('this is user order id ',orderId);
    let products = await userProfileModel.getOrderProductDetails(orderId)
    let orderProducts = products?products:''
    
    console.log('this is products of order ====>>>>>>>',products);

    res.render("user/userViewOrderProducts", {
      admin:false,
      user:true,
      userData,
      cartCount,
      category,
      wishListCount,
      userDetails,
      products
    });
    // let oneProduct = await userProfileModel.getOneProduct(orderId)
    // console.log('this is one products ',oneProduct);


    })
}
module.exports ={
  viewOrders,
  showUserProfile,
  editProfile,
  editProfileDetails,
  showPasswordChangePage,
  updatePassword,
  viewOrderProducts
  
}