const adminOrderModel = require("../Model/adminOrderModel");
const userProfileModel = require('../Model/userProfileModel')

const showOrderPage = (req, res) => {
  adminOrderModel.showOrder().then((orderList) => {
    res.render("admin/adminOrderPage", {
      admin: true,
      title: "ORDER CONTROL PAGE",
      orderList,
    });
  });
};

const viewOrderProducts = async (req, res) => {
  let orderId = req.query.id
  let products = await userProfileModel.getOrderProductDetails(orderId)
      
  console.log('this is products of order ====>>>>>>>',products);
  res.render("admin/adminViewOrderProductsPage",{admin:true,title:"VIEW ORDER PRODUCTS",products})


};

module.exports = {
  showOrderPage,
  viewOrderProducts,
};
