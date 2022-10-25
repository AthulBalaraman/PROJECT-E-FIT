const { response } = require('express')
const adminCategory = require('../Model/adminCategory')


const adminCategoryPage = (req,res)=>{
  adminCategory.displayCategory().then((category)=>{
    res.render('admin/adminCategoryPage',{admin:true,title:"CATEGORY CONTROL PAGE",category})
  }) 
}

const addNewCategory = (req,res)=>{
  adminCategory.insertcategory(req.body).then((response)=>{
    res.redirect('/admin/adminCategoryPage')
  })
}

const deleteCategory = (req,res)=>{
  let categoryId = req.query.id
  adminCategory.deleteCategory(categoryId).then((response)=>{
    res.redirect('/admin/adminCategoryPage')
  })
}


module.exports = {
addNewCategory,
adminCategoryPage,
deleteCategory
}