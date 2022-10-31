const userCredentials = require('../Model/userBasics')
const nodemailer = require('nodemailer');
const collection = require('../config/collection');
const { response } = require('express');


let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'athul2522001@gmail.com',
      pass: 'myhmxppxxvoixqtl'
  }
})

const OTP = `${Math.floor(1000+ Math.random() * 9000 )}`;


const showLandingPage = (req,res)=>{
  res.render('user/userLandingPage',{admin:false})
}

const showLoginPage = (req,res)=>{
  res.render('user/userLoginPage',{admin:false})
}

const showSignUpPage = (req,res)=>{
  res.render('user/userSignUpPage',{admin:false})
}

const userSignUpaction = (req,res)=>{
  let verified = 0
 
  const {username,useremail,userpassword}= req.body
  let mailDetails = {
    from: 'athul2522001@gmail.com',
    to: useremail,
    subject: 'EFIT REGISTRATION',
    html: `<p>YOUR OTP FOR REGISTERING IN E-FIT IS ${OTP}</p>`
  }
  mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
})
userCredentials.insertUserCredentials(verified,username,useremail,userpassword).then((response)=>{
  userID = response.insertedId
  res.render('user/otpVerificationPage',{admin:false})
})
}

const userLoginAction = (req,res)=>{
  userCredentials.checkUserLogin(req.body).then((response)=>{
    if(response.status)
    {
      res.render('user/userHomePage',{admin:false})
    }
    else
    {
      res.render('user/userLoginPage',{admin:false})
    }
  })
}



const checkOtp = (req,res)=>{
  console.log(OTP)
  if(OTP == req.body.otpSend)
  {
    // let verified = 1
    userCredentials.updateverified(userID).then((response)=>{
      console.log('success')
 
      res.render('user/userHomePage',{admin:false}) 
    })
  
  }
  else{
    console.log('not successsssss')
  }
  }



  
const userLogout = (req,res)=>{
res.redirect('/')
}



module.exports = {
  showLandingPage,
  showLoginPage,
  showSignUpPage,
  userSignUpaction,
  userLoginAction,
  userLogout,
  checkOtp
}