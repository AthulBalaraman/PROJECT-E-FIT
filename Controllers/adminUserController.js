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

  const userBlock = (req,res)=>{
    adminUser.blockUser(req.body.userId).then((response)=>{
      res.json({status:true})
    })
  }

  const userUnblock =(req,res)=>{
    adminUser.unblockUser(req.body.userId).then((response)=>{
      res.json({status:true})
    })
  }
module.exports = {
  adminUserPage,
  userBlock,
  userUnblock
};
