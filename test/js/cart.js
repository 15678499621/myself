//获取操作对象
var div1=document.querySelector('.container');
//获取当前url地址
var href1=location.href
//获取登录的cookie账号
var name1=getCookie('login')
var cartList2
showCart()
function showCart(){
  //获取locaStrong中的cartList2对应的数据
  cartList2=localStorage.getItem('cartList2')
  //判断该cookie是否存在
  if(name1){
      //判断该内容是否存在
      if(cartList2){
        //把cartList2中的数据转为json对象
        cartList2=JSON.parse(cartList2)
        //获取全选框是否被选中
        var quanxuan=cartList2.every(item=>{
          return item.is_select==1
        })
        //获取所有被选中商品的总数量和价格
        var tt=total1()
        //创建变量存放需要拼接的内容
        var str2=`
        <h1>这个是一个购物车页<a href="./list.html" class="btn btn-success">返回列表页</a></h1>
        <div class="panel panel-default">
            <div class="panel-heading">
                <input type="checkbox" name="quan" ${quanxuan?'checked':''}>全选
                商品种类：<span>${cartList2.length}</span>
                所选商品数量：<span>${tt[0]}</span>     
                所选商品价格：￥<span>${tt[1]}</span>
                <button type="button" class="btn btn-primary btn-xs">去结算</button>

                <button type="button" class="btn btn-success btn-xs">清空购物车</button>
            </div>
            <div class="panel-body"> 
        `
        //遍历数组中的所有对象
        cartList2.forEach(function(item){
              str2+=`
          <div class="media">
              <div class="media-left">
                <input type="checkbox" data-id=${item.goods_id} name="xuan" ${item.is_select==1?"checked":''}>
                <a href="#">
                  <img class="media-object" src="${item.goods_big_logo}" width="100" height="100">
                </a>
              </div>
              <div class="media-body">
                <h4 class="media-heading">${item.goods_name}</h4>
                <p>￥<span>${item.goods_price}</span></p>
                <button type="button" class="btn btn-primary" data-id=${item.goods_id}>我不要了</button>
                <div class="btn-group right1" role="group" aria-label="...">
                  <button type="button" data-id=${item.goods_id} class="btn btn-default">-</button>
                  <button type="button" class="btn btn-default" value="${item.cart_number}">${item.cart_number}</button>
                  <button type="button" data-id=${item.goods_id} class="btn btn-default">+</button>
                </div>
              </div>
          </div>
              `
        })
          //拼接结束的标签
          str2+=`
          </div>
          </div>
          `    
          //把拼接好的内容添加到div对象中
          div1.innerHTML=str2
      }else{
        //拼接显示内容
        var str1=`
        <h1>这个是一个购物车页<a href="./list.html" class="btn btn-success">返回列表页</a></h1>
          <div class="jumbotron">
              <h1>您的购物车空空如也</h1>
              <p>点击下方按钮快去选购吧! ^_^</p>
              <p><a class="btn btn-primary btn-lg" href="./list.html" role="button">赶紧去选吧</a></p>
          </div>
        ` 
        //把拼接好的内容添加到div中
        div1.innerHTML=str1
      }
  }else{
      alert('你还未登录，请登录后在进入')
      //跳转到登录界面
      location.href='./login.html?pathUrl='+href1
  }
}

//给父级对象绑定点击事件
div1.onclick=function(e){
  var e =e || window.event
  var target=e.target || e.srcElement
  //加法
  if(target.innerHTML=='+'){
     //获取当前对象中的data-id
     var id1=target.getAttribute('data-id')
     //获取上一个兄弟元素节点的value值
     var val=parseInt(target.previousElementSibling.value)
     //遍历数组
     cartList2.forEach(item=>{
      //判断遍历出来的商品是否跟当前操作的商品相等 
      if(item.goods_id==id1 && val<item.goods_number){
        // console.log(111)
        item.cart_number=item.cart_number-0+1
      }
     })
     //把修改之后的cartList2添加到locaStrong中
     localStorage.setItem('cartList2',JSON.stringify(cartList2))
     showCart()
  }
  //减法
  if(target.innerHTML=='-'){
    //获取当前对象中的data-id
    var id2=target.getAttribute('data-id')
     //获取下一个兄弟元素节点的value值
     var val=parseInt(target.nextElementSibling.value)
     //遍历当前数组元素
     cartList2.forEach(item=>{
       if(item.goods_id==id2 && val>1){
        item.cart_number=item.cart_number-1
       }
     })
     //把修改之后的cartList2添加到locaStrong中
     localStorage.setItem('cartList2',JSON.stringify(cartList2))
     showCart()
  }
  //删除一行数据
  if(target.innerHTML=='我不要了'){
    //获取当前操作的商品id
    var id3=target.getAttribute('data-id')
    //过滤不满足条件的数据
    cartList2=cartList2.filter(item=>{
      return item.goods_id!=id3
    })
    // var ar1=[]
    // for(var i=0;i<cartList2.length;i++){
    //   if(cartList2[i].goods_id!=id3){
    //     ar1.push(cartList2[i])
    //   }
    // }
    //把修改之后的cartList2添加到locaStrong中
    localStorage.setItem('cartList2',JSON.stringify(cartList2))
    showCart()
  }
  //全选
  if(target.name=='quan'){
     //遍历所有商品
     cartList2.forEach(item=>{
       //判断当前全选框是否被选中
       if(target.checked){
         item.is_select=1
       }else{
         item.is_select=0
       }
     })
     //把修改之后的cartList2添加到locaStrong中
    localStorage.setItem('cartList2',JSON.stringify(cartList2))
    showCart()
  }
  //选中框
  if(target.name=='xuan'){
     //获取当前商品的id
     var id4=target.getAttribute('data-id')
     //遍历数组
     cartList2.forEach(item=>{
       //判断是否为当前操作的商品
       if(item.goods_id==id4){
        //  item.is_select=item.is_select==1?0:1
        //再次判断当前操作的商品是否被选中
          if(item.is_select==1){
            item.is_select=0
          }else{
            item.is_select=1
          }
       }
     })
      //把修改之后的cartList2添加到locaStrong中
    localStorage.setItem('cartList2',JSON.stringify(cartList2))
    showCart()
  }
  //结算
  if(target.innerHTML=='去结算'){
    //获取需要支付的总金额
    var totalprice=total1()[1]
    //使用确认框来再次确认是否购买
    if(confirm("你确定要购买吗？")){
       alert("你已支付:￥"+totalprice)
       //从购物车中删除已购买的商品
       cartList2=cartList2.filter(item=>{
         return item.is_select!=1
       })
    }
     //把修改之后的cartList2添加到locaStrong中
     localStorage.setItem('cartList2',JSON.stringify(cartList2))
     showCart()
  }
  //判断点击的是不是清空购物车按钮
  if(target.innerHTML=='清空购物车'){
    // localStorage.clear()
    localStorage.removeItem('cartList2')
    showCart()
  }
}
//总计方法
function total1(){
  //商品总数量
  var num=0
  //商品总价格
  var numprice=0
  //遍历数组元素
  cartList2.forEach(item=>{
    //判断该商品是否被选中
    if(item.is_select==1){
      //累加所有被选中商品的数量
      num+=parseInt(item.cart_number)
      //累加所有被选中商品的小计
      numprice+=parseInt(item.cart_number)*parseFloat(item.goods_price)
    }
  })
  return [num,numprice.toFixed(2)]
}