function Pagination(ele,options){
    //操作对象
    this.ele=ele
    this.options=options || {}
    //回调函数
    this.change=this.options.change1 || function(){}
    //默认参数
    this.default={
        pageInfo:{
            pagenum:1, //当前显示页
            pagesize:10,//每页显示多少条
            totalsize:1000, //总条数
            totalpage:100 //总页数
        },
        textInfo:{
            first:'first',
            prev:'prev',
            list:'',//页码
            next:'next',
            last:'last'
        }
    }
    //存放页码
    this.list=null
    //执行入口函数
    this.init()
}
//入口函数
Pagination.prototype.init=function(){   
    //替换默认参数
    this.tihuan() 
    //把默认参数中的信息显示在当前操作对象中
    this.show1()
    //动起来
    this.dongqilai()
}
//传入的参数替换默认参数
Pagination.prototype.tihuan=function(){
    //判断传入的参数中是否存在pageInfo
    if(this.options.pageInfo){
        //遍历传入的参数
        for(var attr in this.options.pageInfo){
            //使用传入的进来的参数，去替换对应的默认参数
            this.default.pageInfo[attr]=this.options.pageInfo[attr]
        }
    }
    if(this.options.textInfo){
        for(var attr in this.options.textInfo){
            this.default.textInfo[attr]=this.options.textInfo[attr]
        }
    }
}
//显示数据信息
Pagination.prototype.show1=function(){
    //清空当前盒子所有信息
    this.ele.innerHTML=''
    //显示文本信息
    this.createText()
    //显示页码
    this.showP()
    //禁用按钮
    this.disabled1()
    //跳转按钮
    this.tiaozhuan()
    //把页面传递给回调函数
    this.change(this.default.pageInfo.pagenum)
}
Pagination.prototype.tiaozhuan=function(){
    //创建输入框和按钮对象
    var inp=document.createElement('input')
    //给输入框添加样式
    setCss(inp,{
        width:'40px'
    })
    //添加type属性
    inp.type='number'
    //给输入框添加value值
    inp.value=this.default.pageInfo.pagenum
    //设置输入框中的最大最小值
    inp.min=1
    inp.max=this.default.pageInfo.totalpage
    var btn=document.createElement('button')
    btn.type='button'
    btn.innerHTML='go'
    //把输入框和按钮追加到大盒子中
    this.ele.appendChild(inp)
    this.ele.appendChild(btn)
}
//文本信息
Pagination.prototype.createText=function(){
    //遍历当前默认参数中的文本信息
    for(var attr in this.default.textInfo){
        //创建div节点对象
        var newDiv=document.createElement('div')
        //给每个div对象添加一个class属性
        newDiv.className=attr
        //判断参数是否为list
        if(attr=='list'){
            this.list=newDiv
            //给list对象设置样式
            setCss(this.list,{
                justifyContent:'center',
                alignItems:'center',
                display:'flex'
            })
        }else{
            //给文本的div对象添加文本信息
            newDiv.innerHTML=this.default.textInfo[attr]
            setCss(newDiv,{
                border:'1px solid #000',
                margin:'0px 5px',
                padding:'0px 5px'
            })
        }
        this.ele.appendChild(newDiv)
    }
}
//添加页码
Pagination.prototype.showP=function(){
    //获取默认参数中的当前页和总页数
    var pagenum=this.default.pageInfo.pagenum
    var totalpage=this.default.pageInfo.totalpage

    //判断总页数是否小于10
    if(totalpage<10){
        //遍历当前总页数的页码
        for(var i=1;i<=totalpage;i++){
            //创建p对象，并给该对象添加内容
            var p1=createP(i,pagenum)
            //给p1对象设置样式
            setCss(p1,{
                border:'1px solid #000',
                margin:'0px 5px',
                padding:'0px 5px'
            })
            //把p对象追加到list对象中
            this.list.appendChild(p1)
        }
    }else{
        //当前页小于5
        if(pagenum<5){
            //遍历前5个页码
            for(var i=1;i<=5;i++){
                //创建p对象，并给该对象添加内容
                var p1=createP(i,pagenum)
                //把p对象追加到list对象中
                this.list.appendChild(p1)
            }
            //创建span标签对象
            var spans=document.createElement('span')
            spans.innerHTML='...'
            this.list.appendChild(spans)
            //遍历最后两个页码
            for(var i=totalpage-1;i<=totalpage;i++){
                //创建p对象，并给该对象添加内容
                var p1=createP(i,pagenum)
                //把p对象追加到list对象中
                this.list.appendChild(p1)
            }
            //当前页面等于5
        }else if(pagenum==5){
            //遍历前5个页码
            for(var i=1;i<=7;i++){
                //创建p对象，并给该对象添加内容
                var p1=createP(i,pagenum)
                //把p对象追加到list对象中
                this.list.appendChild(p1)
            }
            //创建span标签对象
            var spans=document.createElement('span')
            spans.innerHTML='...'
            this.list.appendChild(spans)
            //遍历最后两个页码
            for(var i=totalpage-1;i<=totalpage;i++){
                //创建p对象，并给该对象添加内容
                var p1=createP(i,pagenum)
                //把p对象追加到list对象中
                this.list.appendChild(p1)
            }
            //当前页在6-95之间时
        }else if(pagenum>5 && pagenum<totalpage-4){
            //遍历前5个页码
            for(var i=1;i<=2;i++){
                //创建p对象，并给该对象添加内容
                var p1=createP(i,pagenum)
                //把p对象追加到list对象中
                this.list.appendChild(p1)
            }
            //创建span标签对象
            var spans1=document.createElement('span')
            spans1.innerHTML='...'
            this.list.appendChild(spans1)
            //遍历中间五个页码
            for(var i=pagenum-2;i<=pagenum+2;i++){
                //创建p对象，并给该对象添加内容
                var p1=createP(i,pagenum)
                //把p对象追加到list对象中
                this.list.appendChild(p1)
            }
            //创建span标签对象
            var spans2=document.createElement('span')
            spans2.innerHTML='...'
            this.list.appendChild(spans2)
            //遍历最后两个个页码
            for(var i=totalpage-1;i<=totalpage;i++){
                //创建p对象，并给该对象添加内容
                var p1=createP(i,pagenum)
                //把p对象追加到list对象中
                this.list.appendChild(p1)
            }
        }else if(pagenum==totalpage-4){
            //遍历前2个页码
            for(var i=1;i<=2;i++){
                //创建p对象，并给该对象添加内容
                var p1=createP(i,pagenum)
                //把p对象追加到list对象中
                this.list.appendChild(p1)
            }
            //创建span标签对象
            var spans1=document.createElement('span')
            spans1.innerHTML='...'
            this.list.appendChild(spans1)
            //遍历后面7个页码
            for(var i=totalpage-6;i<=totalpage;i++){
                //创建p对象，并给该对象添加内容
                var p1=createP(i,pagenum)
                //把p对象追加到list对象中
                this.list.appendChild(p1)
            }
        }else if(pagenum>totalpage-4){
            //遍历前2个页码
            for(var i=1;i<=2;i++){
                //创建p对象，并给该对象添加内容
                var p1=createP(i,pagenum)
                //把p对象追加到list对象中
                this.list.appendChild(p1)
            }
            //创建span标签对象
            var spans1=document.createElement('span')
            spans1.innerHTML='...'
            this.list.appendChild(spans1)
            //遍历后面5个页码
            for(var i=totalpage-4;i<=totalpage;i++){
                //创建p对象，并给该对象添加内容
                var p1=createP(i,pagenum)
                //把p对象追加到list对象中
                this.list.appendChild(p1)
            }
        }
    }
}
//禁用
Pagination.prototype.disabled1=function(){
    //获取大盒子中的所有子元素对象
    var divs=this.ele.children
    //判断当前页是否为第一页
    if(this.default.pageInfo.pagenum==1){
        divs[0].style.background='#ccc'
        divs[1].style.background='#ccc'
    }
    //判断是否为最后一页
    if(this.default.pageInfo.pagenum==this.default.pageInfo.totalpage){
        divs[3].style.background='#ccc'
        divs[4].style.background='#ccc'
    }
}
//动起来
Pagination.prototype.dongqilai=function(){
    //给父节点对象绑定一个点击事件
    this.ele.onclick= e =>{
        var e = e || window.event
        var target=e.target || e.srcElement
        //下一页
        if(target.className=='next' && this.default.pageInfo.pagenum!=this.default.pageInfo.totalpage){
            //修改当前页的页码
            this.default.pageInfo.pagenum=this.default.pageInfo.pagenum-0+1
            this.show1()
        }
        // console.log(target.nodeName)
        //页码
        if(target.nodeName=='P' && target.innerHTML!=this.default.pageInfo.pagenum){
           
            //修改当前页的页码
            this.default.pageInfo.pagenum=parseInt(target.innerHTML)
            this.show1()
        }
        //上一页
        if(target.className=='prev' && this.default.pageInfo.pagenum!=1){
            //修改当前页的页码
            this.default.pageInfo.pagenum=this.default.pageInfo.pagenum-1
            this.show1()
        }
        //首页
        if(target.className=='first' &&this.default.pageInfo.pagenum!=1){
            //修改当前页的页码
            this.default.pageInfo.pagenum=1
            this.show1()
        }
        //尾页
        if(target.className=='last' &&this.default.pageInfo.pagenum!=this.default.pageInfo.totalpage){
            //修改当前页的页码
            this.default.pageInfo.pagenum=this.default.pageInfo.totalpage
            this.show1()
        }
        //go按钮点击
        if(target.type=='button' && this.default.pageInfo.pagenum!=target.previousElementSibling.value){
            //获取输入框中的页码
            var val=target.previousElementSibling.value
            //判断输入框中的页码是否在当前页码之间
            if(val>=1 && val<=this.default.pageInfo.totalpage){
                //如果在这个范围，那么就把输入框中的页码赋值给当前页
                this.default.pageInfo.pagenum=parseInt(val)
                this.show1()
            }else{
                alert('页码有误，请重新输入')
            }
        }
    }
}

function createP(i,pagenum1){
    //创建一个p对象
    var p=document.createElement('p')
    p.innerHTML=i
    //给p1对象设置样式
    setCss(p,{
        border:'1px solid #000',
        margin:'0px 5px',
        padding:'0px 5px'
    })
    //判断页码是否为当前页的页码
    if(i==pagenum1){
        p.style.background='#ccc'
    }
    return p
}

function setCss(ele,opts){
    //遍历当前opts参数
    for(var attr in opts){
        ele.style[attr]=opts[attr]
    }
}