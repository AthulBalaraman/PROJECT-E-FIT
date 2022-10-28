const express = require('express')
const app = express()
const port = 5000
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/connection')
const session = require('express-session')
const cookieParser = require('cookie-parser')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(expressLayouts)
app.use(express.static(path.join(__dirname,'public')))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.set('layout','./layout/layout')
app.use(cookieParser())

app.use(session({
  secret:"1234",
  saveUninitialized:true,
  cookie:{maxAge:300000},
  resave:false

}))
app.use(function (req, res, next) {
  res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});


db.connect((err)=>{
  if(err){
    console.log("Database Fail");
  }
  else{
    console.log("Database Connected");
  }
})

app.use('/',userRouter)
app.use('/admin',adminRouter)

app.listen(port,()=>{
  console.log('server started')
})