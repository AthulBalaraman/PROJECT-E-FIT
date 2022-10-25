const adminProduct = require('../Model/adminProduct')
const categories = require('../Model/adminCategory')
const brand = require('../Model/adminBrand')

const adminProductsPage = (req,res)=>{
  adminProduct.displayProducts().then((ProductDetails)=>{
        res.render('admin/adminProductspage',{admin:true,title:"PRODUCT CONTROL PAGE",ProductDetails})
      })
    }
   


const addProductPage = (req,res)=>{
  categories.displayCategory().then((categoriesDetails)=>{
    brand.displayBrand().then((brandDetails)=>{
      res.render('admin/adminAddProductPage',{admin:true,title:"ADD PRODUCT PAGE",categoriesDetails,brandDetails})
    })
  })
 
}


const addProductDetails = (req,res)=>{
  
  adminProduct.insertProduct({
    Picture: req.files, // edit here accordingly
    productName: req.body.productName,
    actualPrice: req.body.actualPrice,
    sellingPrice:req.body.sellingPrice,
    categoryName:req.body.categoryName,
    brandName:req.body.brandName,
    weight:req.body.weight,
    productQuantity:req.body.productQuantity,
    productDescription:req.body.productDescription

  }).then((response)=>{
    res.redirect('/admin/adminProductspage')
  })
}

const deleteProduct = (req,res)=>{
  let productId = req.query.id
  adminProduct.deleteProduct(productId).then((response)=>{
    res.redirect('/admin/adminProductsPage')
  })
}



module.exports = {
  adminProductsPage,
  addProductPage,
  addProductDetails,
  deleteProduct
}