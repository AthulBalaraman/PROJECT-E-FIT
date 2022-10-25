const express = require('express')
const router = express.Router()
const admin = require('../Controllers/adminLoginController')
const adminCategory = require('../Controllers/adminCategoryController')
const adminBrand = require('../Controllers/adminBrandController')
const adminProduct = require('../Controllers/adminProductController')
const multer = require('multer')

// product image adding code for storage setting
const storage = multer.diskStorage({
  destination:'./public/img', 
  filename:(req,file,cb)=>{
    cb(null,Date.now()+file.originalname) // file name setting
  }
})

// product image uploading code
const upload = multer({
  storage: storage,
  fileFilter:(req,file,cb)=>{
    if(
      file.mimetype == 'image/jpeg'|| 
      file.mimetype == 'image/jpg'||
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/gif' ||
      file.mimetype == 'image/webp'
    ){
      cb(null,true)
    }
    else
    {
      cb(null,false);
      cb(new Error('Only jpeg, jpg, png and gif Image allowed'))
    }
  }
})


router.get('/',admin.adminLoginPage)
router.post('/adminloginaction',admin.adminLoginAction)
router.get('/adminUserPage',admin.adminUserPage)
router.get('/adminHomePage',admin.adminHomePage)


router.get('/adminLogout',admin.adminLogout)

//----------------------CATEGORY ROUTES---------------------------------------------

router.get('/adminCategoryPage',adminCategory.adminCategoryPage)
router.post('/addNewCategory',adminCategory.addNewCategory)
router.get('/deleteCategory',adminCategory.deleteCategory)

//-------------------------BRAND ROUTES----------------------------------------------

router.get('/adminBrandPage',adminBrand.showBrandPage)
router.post('/addBrand',adminBrand.addBrand)
router.get('/deleteBrand',adminBrand.deleteBrand)

//--------------------------PRODUCT ROUTES--------------------------------------------
router.get('/adminProductspage',adminProduct.adminProductsPage)
router.get('/addProduct',adminProduct.addProductPage)
router.post('/addProductDetails',upload.array('productImage',5),adminProduct.addProductDetails)
router.get('/deleteProduct',adminProduct.deleteProduct)


module.exports = router