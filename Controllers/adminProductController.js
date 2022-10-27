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
  console.log(req.body)
  console.log(req.file)
  adminProduct.insertProduct({
    picture: req.files,
    newProduct: req.body}).then((response)=>{
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
  deleteProduct,
  addProductDetails
}