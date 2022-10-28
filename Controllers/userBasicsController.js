const userCredentials = require('../Model/userBasics')


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
userCredentials.insertUserCredentials(req.body).then(()=>{
  res.redirect('/showUserLoginPage')
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





module.exports = {
  showLandingPage,
  showLoginPage,
  showSignUpPage,
  userSignUpaction,
  userLoginAction
}