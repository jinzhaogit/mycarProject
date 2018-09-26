<?php
	$uname=$_GET['uname'];
	require('../init.php');
	$sql="SELECT * FROM `user` WHERE uname='$uname'";//查找
	$res=mysqli_query($conn,$sql);//执行sql语句,得到一个结果集对象
	$row=mysqli_fetch_row($res);//得到一个索引数组或者null
	if($row!==null) echo "1";
	else echo '0';
?>