const { response } = require("express");
const adminBrand = require("../Model/adminBrand");

const showBrandPage = (req, res) => {
  adminBrand.displayBrand(req.body).then((brands) => {
    res.render("admin/adminBrandPage", {
      admin: true,
      title: "BRAND CONTROL PAGE",
      brands,
    });
  });
};
const addBrand = (req, res) => {
  adminBrand.insertbrand(req.body).then((response) => {
    res.redirect("/admin/adminBrandPage");
  });
};
const deleteBrand = async (req, res) => {
  let brandId = req.query.id;
  await adminBrand.checkProducts(brandId).then((products) => {
    if (products.length > 0) {
      response.status=false;
      res.json(response);
     } else {
      adminBrand.deleteBrand(brandId).then((response) => {
        response.status = true;
        console.log(response.status);
        res.json(response);
      });
    }
  });
};

module.exports = {
  showBrandPage,
  addBrand,
  deleteBrand,
};
