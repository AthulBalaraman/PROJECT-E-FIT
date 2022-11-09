const express = require('express')
const router = express.Router()
const userBasics = require('../Controllers/userBasicsController')
const userPoductDetails = require('../Controllers/userProductDetails')
const cartController = require('../Controllers/userCartController')
const userShop = require('../Controllers/userShopController')
const userSessionCheck = require('../middlewares/sessionMiddleware')
const proceedToCheckOut = require('../Controllers/userCheckout')


router.get('/',userBasics.showLandingPage)


router.get('/showUserLoginPage',userBasics.showLoginPage)
router.post('/userLoginAction',userBasics.userLoginAction)
router.get('/userLogout',userBasics.userLogout)


router.get('/showUserSignUpPage',userBasics.showSignUpPage)
router.post('/userSignUpAction',userBasics.userSignUpaction)
router.post('/checkOtp',userBasics.checkOtp)


router.get('/viewProductDetails',userSessionCheck.userSessionChecker,userPoductDetails.showProductDetails)
router.get('/viewCategory',userSessionCheck.userSessionChecker,userShop.viewShop)


router.get('/showCartPage',userSessionCheck.userSessionChecker,cartController.showCartPage)
router.post('/addToCart',userSessionCheck.userSessionChecker,cartController.addToCart)
router.post('/changeProductQuantity',cartController.changeProductQuantity)


router.get('/proceedToCheckOut',userSessionCheck.userSessionChecker,proceedToCheckOut.showCheckOutPage)

module.exports = router