const express = require('express')
const router = express.Router()
const userBasics = require('../Controllers/userBasicsController')
const userPoductDetails = require('../Controllers/userProductDetails')
const cartController = require('../Controllers/userCartController')
const userShop = require('../Controllers/userShopController')


router.get('/',userBasics.showLandingPage)


router.get('/showUserLoginPage',userBasics.showLoginPage)
router.post('/userLoginAction',userBasics.userLoginAction)
router.get('/userLogout',userBasics.userLogout)


router.get('/showUserSignUpPage',userBasics.showSignUpPage)
router.post('/userSignUpAction',userBasics.userSignUpaction)
router.post('/checkOtp',userBasics.checkOtp)


router.get('/viewProductDetails',userPoductDetails.showProductDetails)
router.get('/viewCategory',userShop.viewShop)




router.get('/addToCart',cartController.addToCart)


module.exports = router