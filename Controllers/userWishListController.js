
const category = require('../Model/adminCategory')
const cartModel = require('../Model/userCart')
const wishListModel = require('../Model/userWishListModel')


const showWishListPage = async(req,res)=>{
  let products = await wishListModel.getWishListProducts(req.session.user._id)
  let cartCount=null
  let wishListCount = null
  if(req.session.user)
  {
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
    cartCount = await cartModel.getCartCount(req.session.user._id)
  }
  category.displayCategory().then((category)=>{
    let userData = req.session.user
    res.render('user/userWishlistShowPage',{admin:false,user:true,category,userData,cartCount,wishListCount,products})
  })
  
}


const addToWishList = (req,res)=>{
  let productid = req.body.productId
  wishListModel.addToWishList(productid,req.session.user._id).then(()=>{
    res.json({status:true})
  })
  
}

const removeWishListProduct = (req,res)=>{
 wishListModel.removeWishListProduct(req.body).then((response)=>{
  res.json(response)
 })
}



module.exports = {
showWishListPage,
addToWishList,
removeWishListProduct
}