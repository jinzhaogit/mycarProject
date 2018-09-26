window.onload=function(){
//	轮播图
	var timer=null;
	(function(){
		var bannerUl=$('banner').getElementsByTagName('ul')[0];
		var bannerUlLi=$('banner').getElementsByTagName('li');
		var bannerImg=$('banner-btn').getElementsByTagName('img');
		var bannerUlHeight=bannerUlLi.length*bannerUlLi[0].offsetWidth;
		bannerUl.style.width=bannerUlHeight+'px';//给ul设置总宽度
	//	鼠标放入轮播区左右按钮显示
		$('banner').onmouseover=function(){
			clearInterval(timer);
			$('banner-btn').style.display='block';
		}
		$('banner').onmouseout=function(){
			setBanner();	
			$('banner-btn').style.display='';
		}
	//鼠标移入左右按钮改变图片样式
		bannerImg[0].onmouseover=function(){
			clearInterval(timer);
			this.setAttribute('src','../img/index/banner/aprev.png');
		}
		bannerImg[1].onmouseover=function(){
			clearInterval(timer);
			this.setAttribute('src','../img/index/banner/anext.png');
		}
	//鼠标移出左右按钮返回图片样式
		bannerImg[0].onmouseout=function(){
			setBanner();	
			this.setAttribute('src','../img/index/banner/prev.png');
		}
		bannerImg[1].onmouseout=function(){
			setBanner();	
			this.setAttribute('src','../img/index/banner/next.png');
		}
	//鼠标点击左右按钮切换轮播图片
		var i=0;
		function prevClick(){
			i++;
			if(i>0)i=-bannerUlLi.length+1;
			startMove(bannerUl,{left:(i*1200)});	
		}
		function nextClick(){
			i--;
			if(i<-bannerUlLi.length+1)i=0;
			startMove(bannerUl,{left:(i*1200)});	
		}
		bannerImg[0].onclick=function(){
			prevClick();
		}
		bannerImg[1].onclick=function(){
			nextClick();	
		}
	//实现自动播放
		function setBanner(){
			clearInterval(timer);
			timer=setInterval(function(){
				nextClick();
			},2600);
		}
		setBanner();	
	})();
//轮播图焦点列表	
//	for(var m=0;m<bannerUlLi.length;m++){
//		var bannerSpan=document.createElement('span');
//		$('focus').appendChild(bannerSpan);
//	}
//最新动态
	(function(){
		var newsLi=$('news').getElementsByTagName('li');
		var newsDiv=$('news').getElementsByTagName('div');
		var newsAudio=$('news').getElementsByTagName('audio');
		for(let j=0;j<newsLi.length;j++){
			newsLi[j].onmouseover=function(){//鼠标移入div上移
				for(var k=0;k<newsDiv.length;k++){//同时其他div下移
					startMove(newsDiv[k],{top:30});
				}
				startMove(newsDiv[j],{top:0});
				//控制音乐播放
				newsAudio[j].pause();//开启前暂停音乐，避免上一次没播完干扰
				newsAudio[j].currentTime=0;//把音乐时间重置
				newsAudio[j].play();//开启音乐
			}
		}
	})();
//豪车云集
	(function(){
		var luImg=$('luxury').getElementsByTagName('img');
		var suijiArr=[],_width=0,_height=0,n=0;
		for(var s=0;s<luImg.length;s++){
			luImg[s].onmouseover=function(){
				_width=this.offsetWidth;//取当前元素宽度值，方便运动给值
				_height=this.offsetHeight;
				n=Math.floor(Math.random()*4);//生成随机数
				//定义可能出现运动操作随机数组
				suijiArr=[
					{'left':_width},
					{'left':-_width},
					{'top':_height},
					{'top':-_height}
				];
				startMove(this.parentNode.children[1],suijiArr[n]);//随机运动
//				this.parentNode.children[1].style.left='0px';
//				this.parentNode.children[1].style.top='0px';
//				this.parentNode.insertBefore(this.parentNode.children[1],this.parentNode.children[0]);
			}
		}
	})();
//热门车型
	(function(){
		var hotImg=$('hot').getElementsByTagName('img')[0];
		var h=0;
		$('hot-left').onmouseover=function(){//鼠标移入每150毫秒切换一张照片
			timer=setInterval(function(){
				h++;//向右转
				if(h>29)h=1;
				hotImg.setAttribute('src','../img/index/hot/hot'+h+'.png');//改变图片属性值位置
			},150);
		}
		$('hot-right').onmouseover=function(){
			timer=setInterval(function(){
				h--;//向左转
				if(h<1)h=29;
				hotImg.setAttribute('src','../img/index/hot/hot'+h+'.png');
			},150);
		}//鼠标离开停止定时器
		$('hot-left').onmouseout=$('hot-right').onmouseout=function(){
			clearInterval(timer);
		}
	})();
//发现好货
	(function(){
		var findLi=$('find').getElementsByTagName('li');
		var _findex=0;
		var findPrice=['￥129.5万','￥169.5万','￥158.5万','￥110.0万','￥204.5万','￥166.5万'];//价格数组
		var findArr=[
			'简介：保时捷卡宴是一款SUV车型。保时捷卡宴插电式混合动力现车Cayenne S E-Hybrid配备了绿色的刹车卡钳，并配备了265/50 R19的米其林Michelin Latitude Sport低滚动阻力轮胎',
			'简介：阿斯顿·马丁（AstonMartin） 汽车公司设在英国盖顿，公司主要生产敞篷旅行车、赛车和限量版的跑车。阿斯顿.马丁公司始建于1913年3月，创始人是莱昂内尔·马丁和罗伯特·班。',
			'宾利（BentleyMotors Limited）是一家举世闻名的超豪华汽车制造商，总部位于英国克鲁。1919年，W.O.宾利先生创办了宾利汽车公司。要造一台快的车，好的车，同级别中最出类拔萃的车',
			'法拉利是举世闻名的赛车和运动跑车的生产厂家，总部位于意大利马拉内罗（Maranello），由恩佐·法拉利（Enzo Ferrari）于1947年创办，主要制造一级方程式赛车、赛车及高性能跑车。',
			'兰博基尼（Automobili Lamborghini S.p.A.）是一家意大利汽车生产商，全球顶级跑车制造商及欧洲奢侈品标志之一，公司坐落于意大利圣亚加塔·波隆尼',
			'了解大全玛莎拉蒂意大利豪华桥车, 传承意大利经典设计和手工定制传统。 完美诠释优雅,奢华,运动激情,带您体验无与伦比的驾乘感受.伟大的旅行从玛莎拉蒂开始!',
		];
		for(let f=0;f<findLi.length;f++){
			findLi[f].index=f;//取索引值
			findLi[f].onmouseover=function(){
				for(var f=0;f<findLi.length;f++){//鼠标移入删除其他元素所增加的类
					findLi[f].classList.remove('find-active');
				}
				this.classList.add('find-active');//给当前移入元素增加激活类
				_findex=this.index;//取当前事件索引值
				$('find-img').setAttribute('src','../img/index/find/find0'+(_findex+1)+'.png');//给对应元素图片改变路径属性
				$('findH5').innerHTML=findArr[_findex];//给对应元素改变内容
				$('find-price').innerHTML=findPrice[_findex];
			};
		}
	})();
//时尚宝贝
	(function(){
		var Course=$('baby').getElementsByClassName('Course');
		var babyH2=$('baby').getElementsByTagName('h2');
		for(var b=0;b<babyH2.length;b++){//循环遍历执行鼠标移入事件
			babyH2[b].onmouseover=function(){
				for(var b=0;b<Course.length;b++){
					Course[b].style.width='40px';//让除了当前事件外都变为40宽
				}
				this.parentNode.style.width='745px';//让当前事件变为745宽
			}
		}
	})();
//	滚轮
	(function(){
		var wrap=document.getElementById("baby-article");
		var content=document.getElementById("baby-main");
		var sliderWrap=document.getElementById("sliderWrap");
		var slider=document.getElementById("slider");
       	var scale=wrap.clientHeight/content.clientHeight;//获取比例
       	var y = 0;//设置y轴的增量
       	//为wrap添加滚轮事件
       	wrap.onmousewheel=function(e){
	       	var event1 = event || e;
	       	if(event1.wheelDelta<0)y+=5;//判断向上还是向下滚动，给出方向值
	       	else if(event1.wheelDelta > 0)y-=5;
	       	if(y<=0)y=0;//判断滚动到两端处理
	       	else if(y>= sliderWrap.clientHeight-slider.clientHeight){
	       		y=sliderWrap.clientHeight-slider.clientHeight;
	       	}
       		slider.style.top = y + "px";	//滑块做运动
			var scaleY = y / sliderWrap.clientHeight;
       		content.style.top = -content.clientHeight * scaleY + "px";//内容区运动
       	}
	})();
//限时抢购计时牌
	(function(){
		var robList=$('robList').getElementsByTagName('li');
		var robNumber=9000;//初始倒计时值
		setInterval(function(){
			robNumber--;//减法更新
			if(robNumber<0)robNumber=9000;//如果减到零处理重新开始
			robNumber+='';//使数字变成字符串，方便charat使用
			for(var r=0;r<robList.length;r++){
				robList[r].innerHTML=robNumber.charAt(r);//截取字符串，给每个赋值
			}
		},100);
	})();
//限时抢购无缝滚动
	(function(){
		var roll=$('rollList');
		var rollList=roll.getElementsByTagName('li');
		roll.style.width=(rollList[0].offsetWidth*rollList.length)+'px';//动态给宽，使其元素都排列在一行
		function rollMove(){
			clearInterval(timer);//关闭定时器，避免多次触发
			timer=setInterval(function(){
			var l=roll.offsetLeft-5;//滑动到两端判断
			if(roll.offsetLeft<-roll.offsetWidth/2)l=0;
			roll.style.left=l+'px';//做滚动运动
			},30);
		}
		rollMove();//自调用，一开始就加载
		roll.onmouseover=function(){//鼠标移入停止滚动
			clearInterval(timer);
		}
		roll.onmouseout=function(){//鼠标移出继续运动
			rollMove();
		}
	})();
//精彩车图
	(function(){
		var wonUl=$('wonUl');
		var wonWidth=$('won').offsetWidth;
		var wonLi=wonUl.getElementsByTagName('li');
		var wUlWidth=wonLi[0].offsetWidth*wonLi.length;//动态取ul的宽
		wonUl.style.width=wUlWidth+'px';
		wonUl.setAttribute('ondragstart','return false');//阻止默认滑动事件
		var x=0,_x=0,wx=0,wl=0;
		wonUl.onmousedown=function(ev){
			var wEvent=ev||event;
			x=wEvent.clientX;//取当前横坐标
			document.onmousemove=function(ev){
				var wEvent=ev||event;
				wx=x-_x;//算出鼠标移动瞬时速度
				wx=wx>0?Math.ceil(wx):Math.floor(wx);//取整并判断方向
				wl=wonUl.offsetLeft+wx;
				if(wl>0)wl=0;//判断滑动到两头时候处理
				if(wl<-(wUlWidth-wonWidth))wl=-(wUlWidth-wonWidth);
				startMove(wonUl,{left:wl});//做滑动运动
				_x=wEvent.clientX;//记录当前值，为下一次移动做计算
			}
			document.onmouseup=function(){
				document.onmousemove=null;//释放事件
				document.onmouseup=null;
			}
		}
	})();
//精彩车图后续
	(function(){
		var fulBtn=$('ful-btn').getElementsByTagName('a');
		var fulLi=$('ful-list').getElementsByTagName('li');
		var fulList=$('ful-list').getElementsByTagName('div');
		for(var fb=0;fb<fulBtn.length;fb++){
			fulBtn[fb].index=fb;//取当前事件的索引值
			fulBtn[fb].onclick=function(){
				//按钮操作
				for(var fub=0;fub<fulBtn.length;fub++){//其他按钮恢复原色
					fulBtn[fub].style.background='';
				}
				this.style.background='#f10180';//改变当前元素背景色
				//图片操作
				for(var fls=0;fls<fulList.length;fls++){
					fulList[fls].style.backgroundImage="";//循环遍历恢复每一个li下面所有子元素的背景图路径
					fulList[fls].style.left='133px';//循环遍历恢复每一个li下面所有子元素的位移
				}
				for(var fl=0;fl<fulLi.length;fl++){//循环遍历改变每一个li下面第几个子元素的背景图路径
					fulLi[fl].children[this.index].style.backgroundImage="url(../img/index/wonderful/ful0"+(this.index+1)+".jpg)";
					startMove(fulLi[fl].children[this.index],{left:0});//循环遍历改变所有li下第几个div的位移值
				}
			}
		}
	})();
//大家一起说
	(function(){
		var etcSee=document.getElementById('etc').getElementsByClassName('see')[0];
		setInterval(function(){
			var sDiv=document.createElement('div');//创建div
			sDiv.className='seeDiv';//给div添加样式
			sDiv.style.left=(Math.random()*800)+'px';//随机生成位置值
			sDiv.style.backgroundColor=randomRgbColor();//随机生成背景颜色值
			etcSee.appendChild(sDiv);//添加到显示区
			var timer=setInterval(function(){
				sDiv.style.top=sDiv.offsetTop+5+'px';//让创建的div从顶部位置以5px速度下降
				if(sDiv.offsetTop>=(etcSee.offsetHeight-30)){//当下降到显示区底端位置时
					clearInterval(timer);
					etcSee.removeChild(sDiv);//删除创建的这个div，释放内存
				}
			},50);
		},50);
	})();
//这里等你
	(function(){
		var map = new BMap.Map("myMap");          // 创建地图实例  
		var point = new BMap.Point(121.48789949,31.24916171);  // 创建点坐标  
		map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别  
		map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
		map.addControl(new BMap.NavigationControl());    
		//添加控件
		map.addControl(new BMap.ScaleControl());    
		map.addControl(new BMap.OverviewMapControl());    
		map.addControl(new BMap.MapTypeControl());    
		map.setCurrentCity("上海"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
		var marker = new BMap.Marker(point);        // 创建标注    
		map.addOverlay(marker);                     // 将标注添加到地图中 
		var opts = {    
		    width : 1,     // 信息窗口宽度    
		    height: 1,     // 信息窗口高度    
		    title : "精车汇在这里"  // 信息窗口标题   
		}    
		var infoWindow = new BMap.InfoWindow("", opts);  // 创建信息窗口对象    
		map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口
		//定位
		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				var mk = new BMap.Marker(r.point);
				map.addOverlay(mk);
				map.panTo(r.point);
				//alert('您的位置：'+r.point.lng+','+r.point.lat);
			}
			else {
				alert('failed'+this.getStatus());
			}        
		});
	})();
//楼梯导航
	(function(){
		var stairs=$('stairs');
		var html=document.getElementsByTagName('html')[0];
		var cHeight=document.documentElement.clientHeight||document.body.clientHeight;
		stairs.style.top=(cHeight-stairs.offsetHeight)/2+'px';
		var staLis=document.querySelectorAll('#stairs>ul li');
		for(var s=0;s<staLis.length;s++){
			staLis[s].index=s;
			staLis[s].onclick=function(){
				//进行标签激活
				for(var sa=0;sa<staLis.length;sa++){
					staLis[sa].className="";
				}
				this.className='staActive';
				//回到顶部
				if(this.index==0)scrollMoce(0);
				else{//找到对应的class名操作
					var staElem=document.getElementsByClassName('staElem'+this.index)[0];
					var offsetTop=staElem.offsetTop;
					scrollMoce(offsetTop);
				}
			}
		}
		//滚动时通过判断scrolltop值对应元素值进行激活
		window.onscroll=function(){
			if(html.scrollTop>450){
				stairs.style.opacity=1;
			}else{
				stairs.style.opacity=0;
			}
			var staLiOther=document.querySelector('#stairs ul li.staActive');//取出有staActive类的元素方便情况
			//判断html滚动距离和目标元素到文档顶部位置进行滚动监听
			if(html.scrollTop<697){
				staLiOther.className='';staLis[1].className='staActive';
			}
			else if(html.scrollTop<751){
				staLiOther.className='';staLis[2].className='staActive';
			}
			else if(html.scrollTop<1276){
				staLiOther.className='';staLis[3].className='staActive';
			}
			else if(html.scrollTop<1772){
				staLiOther.className='';staLis[4].className='staActive';
			}
			else if(html.scrollTop<2326){
				staLiOther.className='';staLis[5].className='staActive';
			}
			else if(html.scrollTop<2655){
				staLiOther.className='';staLis[6].className='staActive';
			}
			else if(html.scrollTop<3036){
				staLiOther.className='';staLis[7].className='staActive';
			}
			else if(html.scrollTop<3472){
				staLiOther.className='';staLis[8].className='staActive';
			}
			else if(html.scrollTop<3828){
				staLiOther.className='';staLis[9].className='staActive';
			}
			else if(html.scrollTop<4657){
				staLiOther.className='';staLis[10].className='staActive';
			}
			else if(html.scrollTop<5177){
				staLiOther.className='';staLis[11].className='staActive';
			}
			else{
				staLiOther.className='';staLis[12].className='staActive';
			}
		}
	})();
}