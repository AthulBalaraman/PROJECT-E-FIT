const categoryProducts = require("../Model/userShopModel");
const brand = require("../Model/adminBrand");
const category = require("../Model/adminCategory");

const viewShop = async (req, res) => {
  let categoryId = req.query.id;
  let product = await categoryProducts.viewProductDetails(categoryId);
  brand.displayBrand().then((brand) => {
    category.displayCategory().then((category) => {
      res.render("user/userShoppingPage", {
        admin: false,user:false,
        product,
        brand,
        category,
      });
    });
  });
};

module.exports = {
  viewShop,
};
