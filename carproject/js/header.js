window.onload=function(){
//	导航右侧搜索框的显示与隐藏
	var timer=null;
	//	移入鼠标搜索框显示
	$('nav-search').onmouseover=$('nav-search-input').onmouseover=function(){
		clearTimeout(timer);//关闭延时定时器，否则离开后会自动执行把input框隐藏
		$('nav-search-input').style.display='block';
	};
	//	移出鼠标搜索框延时退出,方便把鼠标移入到搜索框上
	$('nav-search').onmouseout=$('nav-search-input').onmouseout=function(){
		timer=setTimeout(function(){
			$('nav-search-input').style.display='';
		},1000);
		$('nav-search-input').value='';
	};
//	导航栏列表弹性盒子
	var oNavLi=$('navList').getElementsByTagName('li');
	var oNavLiStop=false;
	for(var i=0;i<oNavLi.length;i++){
		oNavLi[i].onmouseover=function(){
			elasticMove($('elaset'),this.offsetLeft);
			oNavLiStop=false;
		}
	}	
//吸顶盒模式导入
	(function(){
		window.onscroll=function(){
			var domScrollTop=document.getElementsByTagName('html')[0].scrollTop;
			if(domScrollTop>=172){
				$('nav').classList.add('fixed');
			}else{
				$('nav').classList.remove('fixed');
			}
		}
	})();
//取cookie值
	(function(){
		var uname=getCookie('uname');
	})();
}
