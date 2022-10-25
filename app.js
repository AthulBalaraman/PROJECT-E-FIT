const express = require('express')
const app = express()
const port = 5000
const adminRouter = require('./routes/admin')

const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/connection')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(expressLayouts)
app.use(express.static(path.join(__dirname,'public')))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.set('layout','./layout/layout')



db.connect((err)=>{
  if(err){
    console.log("Database Fail");
  }
  else{
    console.log("Database Connected");
  }
})


app.use('/admin',adminRouter)


app.listen(port,()=>{
  console.log('server started')
})