const adminBrand = require('../Model/adminBrand')

const showBrandPage = (req,res)=>{
  if(req.session.admin)
  {
    adminBrand.displayBrand(req.body).then((brands)=>{
      res.render('admin/adminBrandPage',{admin:true,title:'BRAND CONTROL PAGE',brands})
    })
  }
  else
  {
    res.render('admin/adminLogin',{admin:false})
  }

 
}

const addBrand = (req,res)=>{
  if(req.session.admin)
  {
    adminBrand.insertbrand(req.body).then((response)=>{
      res.redirect('/admin/adminBrandPage')
    })
  }
  else
  {
    res.render('admin/adminLogin',{admin:false})
  }

}



const deleteBrand = (req,res)=>{
  if(req.session.admin)
  {
    let brandId = req.query.id
    adminBrand.deleteBrand(brandId).then((response)=>{
      res.redirect('/admin/adminBrandPage')
    })
  }
  else
  {
    res.render('admin/adminLogin',{admin:false})
  }

}


const editBrand = (req,res)=>{

}

module.exports = {
  showBrandPage,
  addBrand,
  deleteBrand,
  editBrand
}