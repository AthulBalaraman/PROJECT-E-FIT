const db = require("../config/connection");
const collection = require("../config/collection");
const { ObjectID } = require("bson");
const { response } = require("express");



module.exports = {

  addToCart:(productId,userId)=>{

    let proObj = {
      item:ObjectID(productId),
      quantity:1
    }

    return new Promise(async(resolve,reject)=>{
      let userCart = await db.get().collection(collection.CART).findOne({user:ObjectID(userId)})
      if(userCart)
      {
        let proExist = userCart.products.findIndex(product=>product.item == productId)
        console.log(proExist)
        if(proExist!=-1)
        {
           db.get().collection(collection.CART).updateOne({user:ObjectID(userId),'products.item':ObjectID(productId)},
           {
            $inc:{'products.$.quantity':1} 
           }).then(()=>{
            resolve()
           })
        }
        else
        {
          db.get().collection(collection.CART).updateOne({user:ObjectID(userId)},
          {
            $push:{products:proObj}
          }).then((response)=>{
            resolve()
          })
        }

      }
      else
      {
        let cartObj = {
          user:ObjectID(userId),
          products:[proObj]
        }
        db.get().collection(collection.CART).insertOne(cartObj).then((response)=>{
          resolve()
        })
      }
    })
  },

   getCartProducts:(userId)=>{
    return new Promise(async(resolve,reject)=>{
      let cartItems = await db.get().collection(collection.CART).aggregate([
        {
          $match:{user:ObjectID(userId)}
        },
        {
          $unwind:'$products'
        },
        {
          $project:{
            item:'$products.item',
            quantity:'$products.quantity'
          }
        },
        {
          $lookup:{
            from:collection.PRODUCTS,
            localField:'item',
            foreignField:'_id',
            as:'product'

          }
        },
        {
         $project:{
          item:1,
          quantity:1,
          productDetails:{$arrayElemAt:['$product',0]}
        
         } 
        }

      ]).toArray()

      resolve(cartItems)
  })
  },


  getCartCount:(userId)=>{
    return new Promise(async(resolve,reject)=>{
      let count = 0 
      let cart = await db.get().collection(collection.CART).findOne({user:ObjectID(userId)})
      if(cart)
      {
        count = cart.products.length
      }
      resolve(count)
    })
  },

  changeProductQuantity:(details)=>{
    details.count = parseInt(details.count)
    details.quantity = parseInt(details.quantity)
    return new Promise((resolve,reject)=>{
      if(details.count == -1 && details.quantity==1)
      {
        db.get().collection(collection.CART).updateOne(
          {_id:ObjectID(details.cart)},
          {
            $pull:{products:{item:ObjectID(details.product)}}
          }
        ).then((response)=>{
          resolve({removeProduct:true})
        })
        
      }
      else
      {
        db.get().collection(collection.CART).updateOne({_id:ObjectID(details.cart),'products.item':ObjectID(details.product)},
        {
         $inc:{'products.$.quantity':details.count} 
        }).then((response)=>{
         resolve(true)
        })
      }

    })
  },


  removeCartProduct:(details)=>{
    return new Promise((resolve,reject)=>{
      console.log(details);
      db.get().collection(collection.CART).updateOne(
        {_id:ObjectID(details.cart)},
        {
          $pull:{products:{item:ObjectID(details.product)}}
        }
        
      ).then(()=>{
        resolve({productRemoved:true})
      })
    })
  }

};
