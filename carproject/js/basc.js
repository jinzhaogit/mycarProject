//取Id的对象
function $(id){
	return document.getElementById(id);
}
//创建ajax请求
function createXhr(){
	if(window.XMLHttpRequest){
		var xhr=new XMLHttpRequest();//谷歌兼容
	}else{
		var xhr=new ActiveXObject("Microsoft.XMLHttp");//IE兼容
	}
	return xhr;
}
//ajax请求post方式
function ajax(url,data,method){
	return new Promise(function(open,err){//new一个promise对象防止回调地狱和异步问题
		var xhr=createXhr();//创建异步对象
		xhr.onreadystatechange=function(){//异步事件监听
			if(xhr.readyState==4&&xhr.status==200){
				open(xhr.responseText);//返回处理值，并允许下一步开始
			}
		}
		if(method=="get"){//对请求方式判断进行不同处理请求
			xhr.open('get',url,true);
			xhr.send(null);
		}else if(method=="post"){
			xhr.open('post',url,true);
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xhr.send(data);
		}
	})
}
//取对象的属性值
function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];//IE兼容
	}else{
		return getComputedStyle(obj,null)[name];
	}
}
//缓冲运动函数
var timer=null;
function startMove(obj,json,fn){
	clearInterval(obj.timer);//关闭定时器防止多次触发
	obj.timer=setInterval(function(){
		var iStop=true;
		for(var attr in json){//遍历属性值
			var iCur=parseInt(getStyle(obj,attr));//得元素当前值
			var iSpeed=(json[attr]-iCur)/8;//同步更新速度并减小速度值
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);//将速度值取整
			if(json[attr]!=iCur)iStop=false;//判断所有条件是否都执行完毕
			obj.style[attr]=iCur+iSpeed+'px';
		}
		if(iStop){
			clearInterval(obj.timer);
			if(fn)fn();//有链式函数执行链式函数
		}
	},30);
}
//滚动条运动函数
function scrollMoce(iTarget){
	var sCro=true;
	window.onscroll=function(){
		if(!sCro){//刚进来时判断不是真的就跳过执行scro=false,然后再回来时就是假的停止定时器
			clearInterval(timer);	
		}
		sCro=false;
	}
	clearInterval(timer);
	timer=setInterval(function(){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var iSpeed=(iTarget-scrollTop)/8;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		if(scrollTop==iTarget){
			iSpeed=0;
			clearInterval(timer);	
		}
		sCro=true;
		document.documentElement.scrollTop=scrollTop+iSpeed;
		document.body.scrollTop=scrollTop+iSpeed;
	},30);
}
//弹性运动函数
function elasticMove(obj,iTarget){
	clearInterval(obj.timer);
	var left=0,iSpeed=0;
	obj.timer=setInterval(function(){
		iSpeed+=(iTarget-obj.offsetLeft)/5;//由以上化简而来速度，来回左右远动
		iSpeed*=0.75;//产生摩擦力。一个数乘以一个小数，值会越来越小
		left=obj.offsetLeft+iSpeed;//定义一个变量最后赋值，避免较少小数点产生的误差，因为left值是一个整数，会自动舍弃小数点
		if(Math.abs(iSpeed)<1&&Math.abs(left-iTarget)<1){ //取值得绝对值，如果速度足够小，距离足够接近目标点，停止定时器
			clearInterval(obj.timer);
			obj.style.left=iTarget+'px';//防止产生的最后小数影响，直接将数值确定为目标点值
		}else{
			obj.style.left=left+'px';
		}	
	},30);
}
//随机生成RGB颜色
function randomRgbColor() { 
 var r = Math.floor(Math.random() * 256); //随机生成256以内r值
 var g = Math.floor(Math.random() * 256); //随机生成256以内g值
 var b = Math.floor(Math.random() * 256); //随机生成256以内b值
 return `rgb(${r},${g},${b})`; //返回rgb(r,g,b)格式颜色
}
//提示信息小窗口
function msgWin(msg){
	$('msg').style.display='block';//一开始弹出窗口是隐藏的,所以显示
	$('msg').innerHTML=msg;//给每个不同需要变量赋内容
	setTimeout(function(){//开启后延时关闭弹窗
		$('msg').style.display='none';
	},1500);
}
//存cookie
function setCookie(name,value,idate){
	var now=new Date();
	var newDate=now.getDate();//获取现在时间当天
	now.setDate(newDate+idate);//在当天的基础上+一个设置值
	document.cookie=`${name}=${value};express=${newDate}`;//存cookie值
}
//取cookie
function getCookie(name){
	var str=document.cookie;//获取cookie字符串
	var arr=str.split('; ');//拆分成数组
	for(var co of arr){//遍历cookie拆分名字和值
		var	[ckey,value]=co.split('=');
		if(ckey==name) return value;//进行判断name返回值
	}
}
//删cookie
function delCookie(name){
	setCookie(name,'',-1);
}
