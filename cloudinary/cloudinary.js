const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')


cloudinary.config({ 
  cloud_name: 'dpl8lhv6f', 
  api_key: '585741543489598', 
  api_secret: 'osPSankvqVHD4mQxRbVWXk6to9g' 
});

const storage =  new CloudinaryStorage({
  cloudinary,
  params:{
    folder:'pictures',
    alowedFormat:['jpeg','png','jpg','gif','webp','avif']
  }})


  module.exports={
    cloudinary,
    storage
  }