function addToCart(proId){
  alert('alert')
  console.log('[][][]][][[[][][][[]][]]]][]][][]]]][][]',proId)
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
          alert(response)
      }
  })
}