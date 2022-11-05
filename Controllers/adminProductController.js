const adminProduct = require("../Model/adminProduct");
const categories = require("../Model/adminCategory");
const brand = require("../Model/adminBrand");

const adminProductsPage = (req, res) => {

    adminProduct.displayProducts().then((ProductDetails) => {
      res.render("admin/adminProductspage", {
        admin: true,
        title: "PRODUCT CONTROL PAGE",
        ProductDetails,
      });
    });
  }
const addProductPage = (req, res) => {

    categories.displayCategory().then((categoriesDetails) => {
      brand.displayBrand().then((brandDetails) => {
        res.render("admin/adminAddProductPage", {
          admin: true,
          title: "ADD PRODUCT PAGE",
          categoriesDetails,
          brandDetails,
        });
      });
    });
  }

const addProductDetails = (req, res) => {
 
    const {
      productName,
      actualPrice,
      sellingPrice,
      categoryName,
      brandName,
      weight,
      productQuantity,
      productDescription,
      addToTrending,
      addToNewlyArrived,
    } = req.body;
    adminProduct
      .insertProduct({
        picture: req.file.filename,
        productName,
        actualPrice,
        sellingPrice,
        categoryName,
        brandName,
        weight,
        productQuantity,
        productDescription,
        addToNewlyArrived,
        addToTrending,
      })
      .then((response) => {
        res.redirect("/admin/adminProductspage");
      });
  }

const deleteProduct = (req, res) => {

    let productId = req.query.id;
    adminProduct.deleteProduct(productId).then((response) => {
      res.redirect("/admin/adminProductsPage");
    });
  } 
const updateProductDetails = async (req, res) => {

    let productid = req.query.id;
    let product = await adminProduct.getProductDetails(productid);
    categories.displayCategory().then((categoriesDetails) => {
      brand.displayBrand().then((brandDetails) => {
        res.render("admin/adminUpdateProductPage", {
          admin: true,
          title: "EDIT PRODUCT PAGE",
          categoriesDetails,
          brandDetails,
          product,
        });
      });
    });
  } 

const updateProductDetailsAction = (req, res) => {

    let id = req.body.id;
    let newProductData = req.body;
    let newImageId = req.file.filename;
    adminProduct
      .updateProductDetails(id, newProductData, newImageId)
      .then(() => {
        adminProduct.displayProducts().then((ProductDetails) => {
          res.render("admin/adminProductspage", {
            admin: true,
            title: "PRODUCT CONTROL PAGE",
            ProductDetails,
          });
        });
      });
  } 

module.exports = {
  adminProductsPage,
  addProductPage,
  deleteProduct,
  addProductDetails,
  updateProductDetails,
  updateProductDetailsAction,
};
