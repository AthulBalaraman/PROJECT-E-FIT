const productDetails = require("../Model/userFrontDIsplay");

const showProductDetails = async (req, res) => {
  let productId = req.query.id;
 
  let product = await productDetails.viewProductDetails(productId);

  res.render("user/productDetails", { admin: false,user:false, product });
};

module.exports = {
  showProductDetails,
};
