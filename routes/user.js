const express = require('express')
const router = express.Router()
const userBasics = require('../Controllers/userBasicsController')
const userFrontDIsplay = require('../Model/userFrontDIsplay')
const userPoductDetails = require('../Controllers/userProductDetails')


router.get('/',userBasics.showLandingPage)
router.get('/showUserLoginPage',userBasics.showLoginPage)
router.get('/showUserSignUpPage',userBasics.showSignUpPage)
router.post('/userSignUpAction',userBasics.userSignUpaction)
router.post('/userLoginAction',userBasics.userLoginAction)
router.get('/userLogout',userBasics.userLogout)

router.get('/viewProductDetails',userPoductDetails.showProductDetails)


router.post('/checkOtp',userBasics.checkOtp)
module.exports = router