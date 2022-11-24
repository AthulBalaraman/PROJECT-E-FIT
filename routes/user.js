const express = require('express')
const router = express.Router()
const userBasics = require('../Controllers/userBasicsController')
const userPoductDetails = require('../Controllers/userProductDetails')
const cartController = require('../Controllers/userCartController')
const userShop = require('../Controllers/userShopController')
const userSessionCheck = require('../middlewares/sessionMiddleware')
const proceedToCheckOut = require('../Controllers/userCheckout')
const wishListController  = require('../Controllers/userWishListController')
const placeOrderController = require('../Controllers/userPlaceOrder')
const userProfileController = require('../Controllers/userProfileController')
const couponController = require('../Controllers/userCouponController')

router.get('/',userBasics.showLandingPage)


router.get('/showUserLoginPage',userBasics.showLoginPage)
router.post('/userLoginAction',userBasics.userLoginAction)
router.get('/userLogout',userBasics.userLogout)


router.get('/showUserSignUpPage',userBasics.showSignUpPage)
router.post('/userSignUpAction',userBasics.userSignUpaction)
router.post('/checkOtp',userBasics.checkOtp)


router.get('/viewProductDetails',userSessionCheck.userSessionChecker,userPoductDetails.showProductDetails)
router.get('/viewCategory',userSessionCheck.userSessionChecker,userShop.viewShop)

//---------------------------- CART ROUTES -----------------------------------------------

router.get('/showCartPage',userSessionCheck.userSessionChecker,cartController.showCartPage)
router.post('/addToCart',userSessionCheck.userSessionChecker,cartController.addToCart)
router.post('/changeProductQuantity',cartController.changeProductQuantity)
router.delete('/removeCartProduct',userSessionCheck.userSessionChecker,cartController.removeCartProduct)
router.post('/userCartShowPage/applyCoupon',userSessionCheck.userSessionChecker,couponController.applyCoupon)

router.get('/proceedToCheckOut',userSessionCheck.userSessionChecker,proceedToCheckOut.showCheckOutPage)
router.post('/userCartShowPage/proceedToCheckingOut',userSessionCheck.userSessionChecker,proceedToCheckOut.showCheckingOutPage)

router.post('/placeOrder',userSessionCheck.userSessionChecker,placeOrderController.placeOrder)
router.get('/orderPlacedPage',userSessionCheck.userSessionChecker,placeOrderController.showOrderPlaced)
router.post('/verifyPayment',userSessionCheck.userSessionChecker,placeOrderController.verifyPayment)





//------------------------------------ WISHLIST ROUTES -------------------------------------------
router.get('/showWishListPage',userSessionCheck.userSessionChecker,wishListController.showWishListPage)
router.post('/addToWishList',userSessionCheck.userSessionChecker,wishListController.addToWishList)
router.delete('/removeWishListProduct',userSessionCheck.userSessionChecker,wishListController.removeWishListProduct)


//------------------------------------- PROFILE ROUTES -------------------------------------------
router.get('/userProfilePage',userSessionCheck.userSessionChecker,userProfileController.showUserProfile)
router.get('/editProfile',userSessionCheck.userSessionChecker,userProfileController.editProfile)
router.post('/editedUserProfile',userSessionCheck.userSessionChecker,userProfileController.editProfileDetails)
router.get('/viewOrders',userSessionCheck.userSessionChecker,userProfileController.viewOrders)
router.get('/viewOrderProducts',userSessionCheck.userSessionChecker,userProfileController.viewOrderProducts)

router.get('/changePassword',userSessionCheck.userSessionChecker,userProfileController.showPasswordChangePage)
router.post('/updatePassword',userSessionCheck.userSessionChecker,userProfileController.updatePassword)

module.exports = router
