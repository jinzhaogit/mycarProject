window.onload=function(){
	(function(){
		$('submit').onclick=function(){

			var uname=$('uname').value;
			var upwd=$('upwd').value;
			/*******测试代码，紧急情况请求错误时使用,非管理员误用*start******/
            if(uname=='tom'&&upwd=='123'){
                msgWin('登陆成功');
                setTimeout(function(){
                    location.href="/html/index.html";
                },1000);
            }else{
                msgWin('账号或者密码不正确');
            };
            /*******测试代码，紧急情况请求错误时使用,非管理员误用*end******/
			var url="/php/loginRegist/login.php?uname="+uname+"&upwd="+upwd;
			ajax(url,"",'get')
			.then(res=>{
				if(res=='1'){
					msgWin('登陆成功');
					if($('rem').checked) setCookie('uname',uname,3);
					location.href="../index.html";
				}
				else msgWin('账号或者密码不正确');
			})
		}
	})();
};
