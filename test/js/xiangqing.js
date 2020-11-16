//获取操作对象
var div1=document.querySelector('.panel-default')
//获取地址栏中的参数
var ids=location.search
var data
//判断地址栏中是否有参数
if(ids){
    //获取id值
    var mm=ids.split('=')[1]
    console.log(mm)
    //使用ajax发送请求，并获取响应结果
    ajax({
        url:'../php1/xiangqing.php',
        data:'id='+mm,
        success:function(dt1){
            //转换为json对象
            data=JSON.parse(dt1)
            //拼接详情页信息
            var str=`
            <div class="panel-heading">商品详细信息</div>
            <div class="panel-body">
                <div class="media">
                    <div class="media-left media-middle">
                      <a href="#">
                        <img class="media-object" src="${data.goods_small_logo}" alt="..." width="300" height="300">
                      </a>
                    </div>
                    <div class="media-body">
                      <h3 class="media-heading">	
                        ${data.goods_name}
                      </h3>
                      <h2>￥<span>${data.goods_price}</span></h2>
                      <div class="btn-group" role="group" aria-label="...">
                        <button type="button" class="btn btn-default">XL</button>
                        <button type="button" class="btn btn-default">L</button>
                        <button type="button" class="btn btn-default">M</button>
                        <button type="button" class="btn btn-default">XM</button>
                        <button type="button" class="btn btn-default">XS</button>
                      </div>
                      <br/>
                      <br/>
                      <a href="./cart.html" class="btn btn-primary">立即购买</a>
                      <button type="button" class="btn btn-success">加入购物车</button>
                    </div>
                  </div>
            </div>
            <ul class="nav nav-tabs a2">
                <li role="presentation" class="active"><a href="#">Home</a></li>
                <li role="presentation"><a href="#">Profile</a></li>
                <li role="presentation"><a href="#">Messages</a></li>
            </ul>
            <div class="a2">
                ${data.goods_introduce}
            </div>
            `
            //把拼接好的数据添加到div对象中
            div1.innerHTML=str
        }
    })
}else{
    alert('未知商品，请重新选择')
    location.href='./list.html'
}

//給父节点对象绑定一个点击事件
div1.onclick=function(e){
    var e = e || window.event
    var target= e.target || e.srcElement
    //判断点击的对象是否为‘加入购物车’
    if(target.innerHTML=='加入购物车'){
        //获取locaStrong中的cartList2对象
        var cartList2=localStorage.getItem('cartList2')
        //判断该键名是否存在
        if(cartList2){
            //转为json对象
            var arr1=JSON.parse(cartList2)
            var a=0 //判断locaStrong中是否有现在要添加的商品
            //遍历arr1对象
            arr1.forEach(function(item){
                //判断该内容是否跟我们添加的内容相同
                if(item.goods_id==data.goods_id){
                    //如果已存在，那么直接修改当前数组对象中对应商品的数量
                    item.cart_number++
                    localStorage.setItem('cartList2',JSON.stringify(arr1))
                    a=1
                }
            })
            //判断a是否为0，如果为0时，代表当前添加的商品，在locaStrong中不存在
            if(!a){
                 //修改当前添加的商品数量
                 data.cart_number=1
                 //把当前添加的商品追加到数组中
                 arr1.push(data)
                 localStorage.setItem('cartList2',JSON.stringify(arr1))
            }
        }else{
            data.cart_number=1
            localStorage.setItem('cartList2',JSON.stringify([data]))
        }
    }
}