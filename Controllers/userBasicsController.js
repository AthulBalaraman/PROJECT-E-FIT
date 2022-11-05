const userCredentials = require("../Model/userBasics");
const nodemailer = require("nodemailer");
const collection = require("../config/collection");
const { response } = require("express");
const categoryDisplay = require("../Model/adminCategory");
const userFrontDisplay = require("../Model/userFrontDIsplay");
const bannerDisplay = require("../Model/adminBanner");



let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "athul2522001@gmail.com",
    pass: "myhmxppxxvoixqtl",
  },
});

const OTP = `${Math.floor(1000 + Math.random() * 9000)}`;

const showLandingPage = (req, res) => {
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
          userData
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

const checkOtp = (req, res) => {
  console.log(OTP);
  console.log(userID);
  if (OTP == req.body.otpSend) {
    req.session.loggedIn = true //added this
    userCredentials.updateverified(userID).then((response) => {
      console.log("success");
      userFrontDisplay.displayProducts().then((productDetails) => {
        categoryDisplay.displayCategory().then((category) => {
          bannerDisplay.showBanner().then((banner) => {
           
            req.session.user = response.user//added this
            let userData = response.user//added this
            res.render("user/userHomePage", {
              admin: false,user:true,
              productDetails,
              category,
              banner,
              userData//added this
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
