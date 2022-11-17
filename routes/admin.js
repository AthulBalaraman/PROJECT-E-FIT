const express = require('express')
const router = express.Router()
const admin = require('../Controllers/adminLoginController')
const adminCategory = require('../Controllers/adminCategoryController')
const adminBrand = require('../Controllers/adminBrandController')
const adminProduct = require('../Controllers/adminProductController')
const adminUser = require('../Controllers/adminUserController')
const adminBanner = require('../Controllers/adminBannerController')
const adminCoupon = require('../Controllers/adminCouponController')

const multer = require('multer')
const adminSessionCheck = require('../middlewares/sessionMiddleware')

const storage = multer.diskStorage({
  destination: './public/images',
  filename:(req,file,cb)=>{
    cb(null,Date.now()+file.originalname)
  }
})

const upload = multer({
  storage: storage,
  fileFilter:(req,file,cb)=>{
    if(
      file.mimetype == 'image/jpeg'|| 
      file.mimetype == 'image/jpg'||
      file.mimetype == 'image/png'||
      file.mimetype == 'image/webp'
    ){
      cb(null,true)
    }else{
      cb(null,false)
      cb(new Error('only jpeg,jpg files'))
    }
  }
})

router.get('/',adminSessionCheck.adminSessionChecker,admin.adminLoginPage)
router.post('/adminloginaction',admin.adminLoginAction)
router.get('/adminHomePage',adminSessionCheck.adminSessionChecker,admin.adminHomePage)
router.get('/adminLogout',admin.adminLogout)


//----------------------CATEGORY ROUTES---------------------------------------------

router.get('/adminCategoryPage',adminSessionCheck.adminSessionChecker,adminCategory.adminCategoryPage)
router.post('/addNewCategory',adminSessionCheck.adminSessionChecker,adminCategory.addNewCategory)
router.get('/deleteCategory',adminSessionCheck.adminSessionChecker,adminCategory.deleteCategory)

//-------------------------BRAND ROUTES----------------------------------------------

router.get('/adminBrandPage',adminSessionCheck.adminSessionChecker,adminBrand.showBrandPage)
router.post('/addBrand',adminSessionCheck.adminSessionChecker,adminBrand.addBrand)
router.get('/deleteBrand',adminSessionCheck.adminSessionChecker,adminBrand.deleteBrand)

//--------------------------PRODUCT ROUTES--------------------------------------------
router.get('/adminProductspage',adminSessionCheck.adminSessionChecker,adminProduct.adminProductsPage)
router.get('/addProduct',adminSessionCheck.adminSessionChecker,adminProduct.addProductPage)
router.post('/addProductDetails',adminSessionCheck.adminSessionChecker,upload.single('productImage'),adminProduct.addProductDetails)
router.get('/deleteProduct',adminSessionCheck.adminSessionChecker,adminProduct.deleteProduct)
router.get('/showEditProductPage',adminSessionCheck.adminSessionChecker,adminProduct.updateProductDetails)
router.post('/updateProductDetails',adminSessionCheck.adminSessionChecker,upload.single('productImage'),adminProduct.updateProductDetailsAction)


//-------------------------------USER ROUTES-------------------------------------------------

router.get('/adminUserPage',adminSessionCheck.adminSessionChecker,adminUser.adminUserPage)


//---------------------------------BANNER ROUTES-----------------------------------------

router.get('/adminBannerPage',adminSessionCheck.adminSessionChecker,adminBanner.showBannerPage)
router.post('/addNewBanner',adminSessionCheck.adminSessionChecker,upload.single('bannerImage'),adminBanner.addBanner)
router.delete('/deleteBanner',adminSessionCheck.adminSessionChecker,adminBanner.deleteBanner)


//------------------------------------- COUPON ROUTES ------------------------------------------
router.get('/adminCouponPage',adminSessionCheck.adminSessionChecker,adminCoupon.showCouponPage)
router.post('/addNewCoupon',adminSessionCheck.adminSessionChecker,adminCoupon.addCoupon)
router.get('/deleteCoupon',adminSessionCheck.adminSessionChecker,adminCoupon.deleteCoupon)
module.exports = router    