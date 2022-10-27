const express = require('express')
const router = express.Router()
const userBasics = require('../Controllers/userBasicsController')

router.get('/',userBasics.showLandingPage)
router.get('/showUserLoginPage',userBasics.showLoginPage)
router.get('/showUserSignUpPage',userBasics.showSignUpPage)
router.post('/userSignUpAction',userBasics.userSignUpaction)
router.post('/userLoginAction',userBasics.userLoginAction)

module.exports = router