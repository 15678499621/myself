//使用ajax发送请求给后台服务器
(async function(){
    var p1= await promiseAjax({
         url:'../php1/list.php'
     })
     //转为json对象
     var data=eval('('+p1+')')
     //配置分页信息
     var obj={
         pagenum:1,
         pagesize:16,
         totalsize:data.length,
         totalpage:Math.ceil(data.length/16)
     }
     //获取分页器对象
    var pagination=document.querySelector('.pagination')
    new Pagination(pagination,{
        pageInfo:obj,
        textInfo:{
            first:"首页",
            prev:'上一页',
            next:'下一页',
            last:'尾页'
        },change1(n){
            //截取数组中的一页数据
            var arr=data.slice((n-1)*obj.pagesize,n*obj.pagesize)
            //创建拼接内容的字符串
            var str=''
            //遍历截取的数据
            arr.forEach(function(item){
                str+=`
                <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="thumbnail">
                    <ol class="breadcrumb hh3" style='display: inline-block;white-space: nowrap;  width: 100%;'>
                        <li><a href="#">${item.cat_one_id}</a></li>
                        <li><a href="#">${item.cat_two_id}</a></li>
                        <li class="active">${item.cat_three_id}</li>
                    </ol>  
                    <img src="${item.goods_big_logo}" alt="...">
                    <div class="caption">
                        <h3 class='hh3' style='display: inline-block;white-space: nowrap;  width: 100%;'>${item.goods_name}</h3>
                        <p>￥<span>${item.goods_price}</span></p>
                        <p><a href="./cart.html" class="btn btn-primary" role="button">查看购物车</a> <a href="./xiangqing.html?id=${item.goods_id}" class="btn btn-default" role="button">查看商品详情</a></p>
                    </div>
                    </div>
                </div>
                `
            })
            //获取商品的父节点对象
            document.querySelector('.row').innerHTML=str
        }
    })
})()

/* function showList(){
    ajax({
        url:'../php1/list.php',
        success:function(d1){
             //转为json对象
            var data=eval('('+d1+')')
            console.log(data.length)
            //配置分页信息
            var obj={
                pagenum:1,
                pagesize:16,
                totalsize:data.length,
                totalpage:Math.ceil(data.length/16)
            }
            console.log(111)
            //获取分页器对象
            var pagination=document.querySelector('.pagination')
            new Pagination(pagination,{
                pageInfo:obj,
                textInfo:{
                    first:"首页",
                    prev:'上一页',
                    next:'下一页',
                    last:'尾页'
                },change1(n){
                    
                    console.log(n)
                }
            })
        }
    })
}
showList() */
