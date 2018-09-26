<?php
	$uname=$_GET['uname'];
	$upwd=$_GET['upwd'];
	$upwd=md5($upwd);
	require('../init.php');
	$sql="SELECT * FROM user WHERE uname='$uname' && upwd='$upwd'";
	$res=mysqli_query($conn, $sql);
	$row=mysqli_fetch_row($res);
	if($row!=null) echo '1';
	else echo '0';
	
?>