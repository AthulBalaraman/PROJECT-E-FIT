const userModel = require('../Model/adminUser')
const orderModel = require('../Model/adminOrderModel')

const chartStatusCount = async(req,res)=>{
  let user = await userModel.displayUser()
  let userlength = user.length
  let placedOrderLength = await orderModel.checkPlacedOrders()
  res.send({userlength,placedOrderLength})

}

module.exports = {
  chartStatusCount
}