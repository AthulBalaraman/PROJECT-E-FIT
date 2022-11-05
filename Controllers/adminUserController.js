const adminUser = require("../Model/adminUser");

const adminUserPage = (req, res) => {
 
    adminUser.displayUser().then((User_Details) => {
      res.render("admin/adminUserPage", {
        admin: true,
        title: "USER CONTROL PAGE",
        User_Details,
      });
    });
  }

module.exports = {
  adminUserPage,
};
