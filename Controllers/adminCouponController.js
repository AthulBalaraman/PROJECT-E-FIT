const couponModel = require('../Model/adminCouponModel')

const showCouponPage = (req,res)=>{
  couponModel.displayCoupon().then((availableCoupons)=>{

    res.render('admin/adminCouponPage',{admin:true,title:'COUPON CONTROL PAGE',availableCoupons})
  })
  
}
const addCoupon = (req,res)=>{
  couponModel.addCoupon(req.body).then(()=>{
    couponModel.displayCoupon().then((availableCoupons)=>{

      res.render('admin/adminCouponPage',{admin:true,title:'COUPON CONTROL PAGE',availableCoupons})
    })
  })
}

const deleteCoupon = (req,res)=>{
  let couponId = req.query.id
couponModel.deleteCoupon(couponId).then(()=>{
res.json()
})
}

module.exports = {
  showCouponPage,
  addCoupon,
  deleteCoupon
}