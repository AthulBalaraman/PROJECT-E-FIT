

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
res.redirect('/showUserLoginPage')
}


module.exports = {
  showLandingPage,
  showLoginPage,
  showSignUpPage,
  userSignUpaction
}