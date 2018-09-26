window.onload=function(){
//	注册表单信息验证
	(function(){
		// 是否允许注册变量
		var isRegister=false;
		//表单获取焦点验证函数
		function focusFun(objF,msgF){
			objF.className="";
			objF.innerHTML="";
			objF.innerHTML=objF.innerHTML.replace('',msgF);
		}
		//表单失去焦点验证函数
		function blurFun(regB,objB,strB){
			if(regB.test(strB)){//如果验证通过
				objB.innerHTML="";//清空内容显示成功标志
				objB.className="showSuc";
				isRegister=true;
			}
			else{
				objB.className="showError";//验证失败错误提醒
				isRegister=false;
			}
		}
		//获取表单
		var form=document.forms[0];
		//用户名称验证
		form.uname.onfocus=function(){
			focusFun($('uname_show'),"任意字符2-12位不为空");
		}
		form.uname.onblur=function(){
			var str=form.uname.value;
			var url='../../php/loginRegist/checkUname.php';
			var data=`${url}?uname=${str}`;//拼接url地址并传参
			ajax(data,'','get')//执行ajax请求
			.then(res=>{
				var reg=/^\w{2,12}$/;//验证正则任意字符2-8位
				blurFun(reg,$('uname_show'),str);
				if(res=='1'){//判断用户名是否被注册
					$('uname_show').innerHTML="用户名已注册";
					$('uname_show').className="showError";
					isRegister=false;
				}else isRegister=true;
			})
		}
		//用户密码验证
		form.upwd.onfocus=function(){
			focusFun($('upwd_show'),"任意字符3位以上不为空");
		}
		form.upwd.onblur=function(){
			var str=form.upwd.value;
			var reg=/^\w{3,}$/;//验证正则任意字符2-8位
			blurFun(reg,$('upwd_show'),str);
		}
		//确认密码验证
		form.rpwd.onfocus=function(){
			focusFun($('rpwd_show'),"任意字符3位以上不为空");
		}
		form.rpwd.onblur=function(){
			var rpwdShow=$('rpwd_show');
			if(form.rpwd.value!=form.upwd.value){
				rpwdShow.innerHTML="";
				rpwdShow.innerHTML="密码不一致";
				rpwdShow.className="showError";//验证失败错误提醒
				isRegister=false;
			}else if(form.rpwd.value==""||null){
				rpwdShow.innerHTML="";
				rpwdShow.innerHTML="密码不能为空";
				rpwdShow.className="showError";//验证失败错误提醒
				isRegister=false;
			}else{
				rpwdShow.innerHTML="";//清空内容显示成功标志
				rpwdShow.className="showSuc";
				isRegister=true;
			}
		}
		//手机号码验证
		form.phone.onfocus=function(){
			focusFun($('phone_show'),"请输入合法的号码");
		}
		form.phone.onblur=function(){
			var str=form.phone.value;
			var reg=/^\d{11}$/;//验证正则任意数字11位
			blurFun(reg,$('phone_show'),str);
		}
//	注册提交信息
		$('submit').onclick=function(){
			if(isRegister){
				var data=`uname=${$('uname').value}&upwd=${$('upwd').value}&phone=${$('phone').value}`;
				ajax('../../php/loginRegist/regist.php',data,'post')
				.then(res=>{
					if(res=='1'){
						msgWin("注册成功");
						location.href="../login.html";
					}else msgWin("抱歉:系统被外星人抓走了,请稍后重试");
				})
			}else msgWin("验证不通过");
		}
	})();
}

					