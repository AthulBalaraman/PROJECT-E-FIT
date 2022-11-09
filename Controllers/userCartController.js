const cartModel = require("../Model/userCart");
const category = require('../Model/adminCategory')
const cartController = require('../Model/userCart')


const showCartPage = async (req,res)=>{
  let products = await cartModel.getCartProducts(req.session.user._id)
  let cartCount = null 
  if(req.session.user){
    cartCount = await cartController.getCartCount(req.session.user._id)
  }
  console.log('cart products ============ >>>> ',products[0].productDetails);
  category.displayCategory().then((category)=>{
    
    let userData = req.session.user
    let userDetails = req.session.user._id
    
    res.render('user/userCartShowPage',{admin:false,user:true,category,userData,products,userDetails,cartCount})
  })
  
}
const addToCart = (req,res)=>{

  let productid = req.body.productId
  console.log(productid)
  cartModel.addToCart(productid,req.session.user._id).then(()=>{
    // res.redirect('/viewProductDetails')
    res.json({status:true})
  })
}

const changeProductQuantity = (req,res,next)=>{
  cartModel.changeProductQuantity(req.body).then(()=>{

  })
}


module.exports = {
showCartPage,
addToCart,
changeProductQuantity
};
