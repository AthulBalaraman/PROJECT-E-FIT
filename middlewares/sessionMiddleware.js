
  const  userSessionChecker = (req,res,next)=>{
    if(req.session.user)
    {
      next()
    }
    else
    {
      res.redirect('/showUserLoginPage')
    }
  }
  
  const adminSessionChecker = (req,res,next)=>{
    if(req.session.admin){
      next()
    }
    else
    {
      res.render('admin/adminLogin',{admin:false})
    }
  }

  module.exports = {
    userSessionChecker,
    adminSessionChecker
  }