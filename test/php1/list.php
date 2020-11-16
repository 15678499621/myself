<?php
header('content-type:text/html;charset=utf-8');
//连接数据库
$link=mysqli_connect('localhost','root','root','sys');
//设置编码
mysqli_set_charset($link,'utf8');
//SQL语句
$sql='select * from goods';
//执行SQL
$result=mysqli_query($link,$sql);
//存储数据的数组
$ar1=[];
//遍历结果集
while($row=mysqli_fetch_assoc($result)){
    array_push($ar1,$row);
}
echo json_encode($ar1);

?>