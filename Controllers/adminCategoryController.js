const { response } = require("express");
const adminCategory = require("../Model/adminCategory");
const { showOrderPlaced } = require("./userPlaceOrder");

const adminCategoryPage = (req, res) => {
  adminCategory.displayCategory().then((category) => {
    res.render("admin/adminCategoryPage", {
      admin: true,
      title: "CATEGORY CONTROL PAGE",
      category,
    });
  });
};

const addNewCategory = (req, res) => {
  adminCategory.insertcategory(req.body).then((response) => {
    res.redirect("/admin/adminCategoryPage");
  });
};

const deleteCategory = async (req, res) => {
  let categoryId = req.query.id;
  await adminCategory.checkProducts(categoryId).then((products) => {
    if (products.length > 0) {
      response.status = false;
      res.json(response);
    } else {
      adminCategory.deleteCategory(categoryId).then((response) => {
        response.status = true;
        // res.redirect("/admin/adminCategoryPage");
        res.json(response);
      });
    }
  });
};

module.exports = {
  addNewCategory,
  adminCategoryPage,
  deleteCategory,
};
