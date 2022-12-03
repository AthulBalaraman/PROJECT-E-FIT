const express = require('express')
const app = express()
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/connection')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoDBSession = require('connect-mongodb-session')(session)
require('dotenv').config()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(expressLayouts)
app.use(express.static(path.join(__dirname,'public')))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.set('layout','./layout/layout')
app.use(cookieParser())

const store = new MongoDBSession({
  uri: 'mongodb://0.0.0.0:27017',
  collection: 'MySession'
})

app.use(session({
  secret:process.env.SESSION_SECRET_KEY,
  saveUninitialized:true,
  cookie:{maxAge:3000000},
  resave:false,
  store:store

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

app.listen(process.env.PORT,()=>{
  console.log('server started')
})