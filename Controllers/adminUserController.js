const adminUser = require("../Model/adminUser");

const adminUserPage = (req, res) => {
  if (req.session.admin) {
    adminUser.displayUser().then((User_Details) => {
      res.render("admin/adminUserPage", {
        admin: true,
        title: "USER CONTROL PAGE",
        User_Details,
      });
    });
  } else {
    res.render("admin/adminLogin", { admin: false });
  }
};

module.exports = {
  adminUserPage,
};
