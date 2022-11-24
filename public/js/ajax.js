function addToCart(proId){
  $.ajax({
      url:'/addToCart',
      method:'post',
      data:{productId:proId},
      success:(response)=>{

        if(response.status)
        {
          let count = $('#cart-count').html()
          count = parseInt(count)+1
          $('#cart-count').html(count)

        }
        swal({
          text: "PRODUCT ADDED TO CART",
          icon: "success",
          button:"OK"
          
       })
      }
  })
}

function addToWishList(proId)
{
  $.ajax({
    url:'/addToWishList',
    method:'post',
    data:{productId:proId},
    success:(response)=>{
      if(response.status){
        let count = $('#wish-listcount').html()
        count=parseInt(count)+1
        $('#wish-listcount').html(count)
        swal({
         text: "PRODUCT ADDED TO WISHLIST",
         icon: "success",
         button:"OK"
         
      })
      }
      else
      {
        alert(response)
      }
      
    }
  })
}