const adminProduct = require("../Model/adminProduct");
const categories = require("../Model/adminCategory");
const brand = require("../Model/adminBrand");

const adminProductsPage = (req, res) => {
  if (req.session.admin) {
    adminProduct.displayProducts().then((ProductDetails) => {
      res.render("admin/adminProductspage", {
        admin: true,
        title: "PRODUCT CONTROL PAGE",
        ProductDetails,
      });
    });
  } else {
    res.render("admin/adminLogin", { admin: false });
  }
};

const addProductPage = (req, res) => {
  if (req.session.admin) {
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
  } else {
    res.render("admin/adminLogin", { admin: false });
  }
};

const addProductDetails = (req, res) => {
  if (req.session.admin) {
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
      addToNewlyArrived
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
        addToTrending
      })
      .then((response) => {
        res.redirect("/admin/adminProductspage");
      });
  } else {
    res.render("admin/adminLogin", { admin: false });
  }
}

const deleteProduct = (req, res) => {
  if (req.session.admin) {
    let productId = req.query.id;
    adminProduct.deleteProduct(productId).then((response) => {
      res.redirect("/admin/adminProductsPage");
    });
  } else {
    res.render("admin/adminLogin", { admin: false });
  }
}

const updateProductDetails = async (req, res) => {
  if (req.session.admin) {
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
        })
      })
    })
  } else {
    res.render("admin/adminLogin", { admin: false });
  }
}

const updateProductDetailsAction = (req, res) => {
  if (req.session.admin) {
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
          })
        })
      })
  } else {
    res.render("admin/adminLogin", { admin: false });
  }
}

module.exports = {
  adminProductsPage,
  addProductPage,
  deleteProduct,
  addProductDetails,
  updateProductDetails,
  updateProductDetailsAction,
}
