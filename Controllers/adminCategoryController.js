const { response } = require("express");
const adminCategory = require("../Model/adminCategory");

const adminCategoryPage = (req, res) => {
  if (req.session.admin) {
    adminCategory.displayCategory().then((category) => {
      res.render("admin/adminCategoryPage", {
        admin: true,
        title: "CATEGORY CONTROL PAGE",
        category,
      });
    });
  } else {
    res.render("admin/adminLogin", { admin: false });
  }
};

const addNewCategory = (req, res) => {
  if (req.session.admin) {
    adminCategory.insertcategory(req.body).then((response) => {
      res.redirect("/admin/adminCategoryPage");
    });
  } else {
    res.render("admin/adminLogin", { admin: false });
  }
};

const deleteCategory = (req, res) => {
  if (req.session.admin) {
    let categoryId = req.query.id;
    adminCategory.deleteCategory(categoryId).then((response) => {
      res.redirect("/admin/adminCategoryPage");
    });
  } else {
    res.render("admin/adminLogin", { admin: false });
  }
};

module.exports = {
  addNewCategory,
  adminCategoryPage,
  deleteCategory,
};
