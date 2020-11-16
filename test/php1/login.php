<?php
header('content-type:text/html;charset=utf-8');
//获取传入的值
$u=$_GET['username'];
$p=$_GET['password'];
//连接数据库
$link=mysqli_connect('localhost','root','root','sys');
//设置编码
mysqli_set_charset($link,'utf8');
$sql="select * from user where name='$u' and pass='$p'";
$result=mysqli_query($link,$sql);
//判断结果集中是否存在数据
if($row=mysqli_fetch_row($result)){
    echo '1';
}else{
    echo '0';
}

?>