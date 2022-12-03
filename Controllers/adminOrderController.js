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
  res.render("admin/adminViewOrderProductsPage",{admin:true,title:"VIEW ORDER PRODUCTS",products,orderId})


};

const updateOrderStatus = async(req,res)=>{
  let orderId = req.body.orderId
  let status = req.body.status
  await adminOrderModel.updateOrderStatus(orderId,status).then(()=>{
    res.json()
  })
}

module.exports = {
  showOrderPage,
  viewOrderProducts,
  updateOrderStatus
};
