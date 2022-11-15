const db = require("../config/connection");
const collection = require("../config/collection");
const { ObjectID } = require("bson");
const { response } = require("express");
const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: "rzp_test_ZlCC11J6GndceG",
  key_secret: "Q24tTFMKWdtqDpT5xzHxjbeH",
});
module.exports = {
  placeOrder: (order, products, total) => {
    return new Promise((resolve, reject) => {
      console.log(order, products, total);
      let status =
        order.payment_method === "cash_on_delivery" ? "placed" : "pending";
      let orderObj = {
        deliveryDetails: {
          firstName: order.firstName,
          lastName: order.lastName,
          email: order.userEmail,
          mobile: order.userPhoneNumber,
          address: order.address,
          country: order.country,
          city: order.city,
          state: order.state,
          pinCode: order.pinCode,
          totalAmout: total[0].total,
        },
        userId: ObjectID(order.userId),
        paymentMethod: order.payment_method,
        products: products,
        status: status,
        date: new Date(),
      };
      console.log("order object = > ", orderObj);
      db.get()
        .collection(collection.ORDER)
        .insertOne(orderObj)
        .then((response) => {
          db.get()
            .collection(collection.CART)
            .deleteOne({ user: ObjectID(order.userId) });
            console.log('/*-/*-**/*-/*/*-*/-*/*',response)
            resolve(response.insertedId);
        });
    });
  },

  getCartProductsList: (userId) => {
    return new Promise(async (resolve, reject) => {
      let cart = await db
        .get()
        .collection(collection.CART)
        .findOne({ user: ObjectID(userId) });
      console.log(cart);
      resolve(cart.products);
    });
  },

  generateRazorpay: (orderId,total) => {
    return new Promise((resolve, reject) => {
      console.log(total);
      total = parseInt(total)
      var options = {
        amount: total*100,
        currency: "INR",
        receipt:""+orderId
      }

      instance.orders.create(options,function(err,order){
        if(err)
        {
          console.log(err)
        }
        else
        {
          console.log("New Order = ",order)
          resolve(order)
        }
        
      })
    });
  },
};
