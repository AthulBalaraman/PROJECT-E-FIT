const userCredentials = require("../Model/userBasics");
const nodemailer = require("nodemailer");
const collection = require("../config/collection");
const { response } = require("express");
const categoryDisplay = require("../Model/adminCategory");
const userFrontDisplay = require("../Model/userFrontDIsplay");
const bannerDisplay = require("../Model/adminBanner");
const cartModel = require('../Model/userCart')
const wishListModel = require('../Model/userWishListModel')



let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "athul2522001@gmail.com",
    pass: "myhmxppxxvoixqtl",
  },
});

const OTP = `${Math.floor(1000 + Math.random() * 9000)}`;

const showLandingPage = async(req, res) => {
  let cartCount = null 
  let wishListCount = null
  if(req.session.user){
    cartCount = await cartModel.getCartCount(req.session.user._id)
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
  userFrontDisplay.displayProducts().then((productDetails) => {
    categoryDisplay.displayCategory().then((category) => {
      bannerDisplay.showBanner().then((banner) => {
        let userData = req.session.user

        
        console.log('user data ================= ',userData)
        res.render("user/userHomePage", {
          admin: false, user:true,
          productDetails,
          category,
          banner,
          userData,
          cartCount,
          wishListCount
        });
      });
    });
  });
};

const showLoginPage = (req, res) => {
  res.render("user/userLoginPage", { admin: false ,user:false});
};

const showSignUpPage = (req, res) => {
  res.render("user/userSignUpPage", { admin: false ,user:false});
};

const userSignUpaction = (req, res) => {
  let verified = 0;

  const { username, useremail, userpassword } = req.body;
  let mailDetails = {
    from: "athul2522001@gmail.com",
    to: useremail,
    subject: "EFIT REGISTRATION",
    html: `<p>YOUR OTP FOR REGISTERING IN E-FIT IS ${OTP}</p>`,
  };
  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
    }
  });
  userCredentials
    .insertUserCredentials(verified, username, useremail, userpassword)
    .then((response) => {
      userID = response.insertedId;
      res.render("user/otpVerificationPage", { admin: false,user:false, });
    });
};

const userLoginAction = (req, res) => {  
  userCredentials.checkUserLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user //added this
      res.redirect('/') // added this check
    } else {
     res.redirect('/showUserLoginPage')
    }
  });
};

const checkOtp = async(req, res) => {
  console.log(OTP);

  let cartCount = null 
  let wishListCount = null

  if (OTP == req.body.otpSend) {
    req.session.loggedIn = true //added this
    userCredentials.updateverified(userID).then((response) => {
      console.log("success");
      userFrontDisplay.displayProducts().then(async(productDetails) => {
        categoryDisplay.displayCategory().then(async(category) => {
          bannerDisplay.showBanner().then(async(banner) => {
           
            req.session.user = response.user
            let userData = response.user
            if(req.session.user){
              cartCount = await cartModel.getCartCount(req.session.user._id)
              wishListCount = await wishListModel.getWishListCount(req.session.user._id)
            }
            res.render("user/userHomePage", {
              admin: false,user:true,
              productDetails,
              category,
              banner,
              userData,
              cartCount,
              wishListCount
            });
          });
        });
      });
    });
  } else {
    console.log("not successsssss");
  }
};

const userLogout = (req, res) => { //added this
  req.session.destroy((err)=>{
    if(err){
      console.log("error")
      res.send("error")
    }
    else
    {
      res.redirect("/");
    }
  })

};

module.exports = {
  showLandingPage,
  showLoginPage,
  showSignUpPage,
  userSignUpaction,
  userLoginAction,
  userLogout,
  checkOtp,
};
