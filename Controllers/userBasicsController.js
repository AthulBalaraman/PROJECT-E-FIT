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
userCredentials.insertUserCredentials(req.body).then((response)=>{
  res.redirect('/showUserLoginPage')
})
}

const addNewCategory = (req,res)=>{
  adminCategory.insertcategory(req.body).then((response)=>{
    res.redirect('/admin/adminCategoryPage')
  })
}





module.exports = {
  showLandingPage,
  showLoginPage,
  showSignUpPage,
  userSignUpaction
}