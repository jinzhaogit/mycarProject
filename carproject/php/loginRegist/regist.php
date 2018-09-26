<?php
	$uname=$_POST['uname'];
	$upwd=$_POST['upwd'];
	$phone=$_POST['phone'];
	$upwd=md5($upwd);//对密码进行32位加密
	require("../init.php");//引进公共数据库和字符串格式
	$sql="INSERT INTO `user` VALUES('null','$uname','$upwd','$phone')";//添加数据语句
	$res=mysqli_query($conn,$sql);//执行语句
	if($res!=false)echo '1';//执行成功返回1
	else echo '0';
?>