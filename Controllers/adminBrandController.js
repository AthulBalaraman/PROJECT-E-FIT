const adminBrand = require("../Model/adminBrand");

const showBrandPage = (req, res) => {

    adminBrand.displayBrand(req.body).then((brands) => {
      res.render("admin/adminBrandPage", {
        admin: true,
        title: "BRAND CONTROL PAGE",
        brands,
      });
    });
  } 
const addBrand = (req, res) => {

    adminBrand.insertbrand(req.body).then((response) => {
      res.redirect("/admin/adminBrandPage");
    });
  } 
const deleteBrand = (req, res) => {
 
    let brandId = req.query.id;
    adminBrand.deleteBrand(brandId).then((response) => {
      res.redirect("/admin/adminBrandPage");
    });
  } 

const editBrand = (req, res) => {};

module.exports = {
  showBrandPage,
  addBrand,
  deleteBrand,
  editBrand,
};
