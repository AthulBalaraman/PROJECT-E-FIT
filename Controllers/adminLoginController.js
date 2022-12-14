const adminLogin = require("../Model/adminLogin");


const adminLoginPage = (req, res) => {
   res.render("admin/adminHome", { admin: true, title: "ADMIN HOME PAGE" });
  } 

const adminLoginAction = (req, res) => {
  adminLogin.dologin(req.body).then((response) => {
    if (response.status) {
      req.session.admin = true;
      res.render("admin/adminHome", { admin: true, title: "ADMIN HOME PAGE" });
    } else {
      res.redirect("/admin");
    }
  });
};

const adminHomePage = (req, res) => {
    res.render("admin/adminHome", { admin: true, title: "ADMIN HOME PAGE" });
  } 

const adminLogout = (req, res) => {
  req.session.destroy(function (err) {
    if (err) console.log("error");
    else res.redirect("/admin");
  });
};



module.exports = {
  adminLoginPage,
  adminLoginAction,
  adminHomePage,
  adminLogout,
};
