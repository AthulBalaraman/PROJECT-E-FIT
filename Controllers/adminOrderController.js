const adminOrderModel = require('../Model/adminOrderModel')
const adminCategory = require('../Model/adminCategory')

const showOrderPage = (req,res)=>{
  adminOrderModel.showOrder().then((orderList)=>{
    console.log('this is order list',orderList);
    res.render('admin/adminOrderPage',{admin:true,
    title:"ORDER CONTROL PAGE",
    orderList
  })
  })
}

module.exports = {
showOrderPage
}