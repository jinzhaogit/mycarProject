$(function(){
	var mask=$('.lineLeft>.lLeftmd>.mask');
	var sMask=mask.next();
	var lgImg=mask.parent().next();
	//鼠标移入小图切换中图切换大图
	$('.lineLeft>.lLeftsm').mouseover(function(e){
		if(e.target.nodeName=='IMG'){
			var smImg=e.target;
			mask.prev().attr('src',smImg.dataset.md);
			lgImg.css('background-image',`url(${smImg.dataset.lg})`);
		}
	})
	//鼠标移入中途显示放大镜和大图
	$('.lineLeft>.lLeftmd').mouseover(function(){
		mask.css('display','block');
		lgImg.css('display','block');
	})
	//鼠标移动放大镜改变大图位置
	sMask.mousemove((e)=>{
		var {offsetX,offsetY}=e;
		var left=offsetX-75;
		var top=offsetY-75;
		top=top<=0?0:top>=150?150:top;
		left=left<=0?0:left>=250?250:left;
		mask.css({'left':left,'top':top});
		lgImg.css({'backgroundPosition':`${-left*2}px ${-top*2}px`});
	})
	//鼠标移出中图隐藏放大镜和大图
	$('.lineLeft>.lLeftmd').mouseout(function(){
		mask.css('display','none');
		lgImg.css('display','none');
	})
	//鼠标点击左右按钮移动小图
	var ulImgs=$('.lLeftsm>.lRoll>ul'),n=0;
	var leftBtna=ulImgs.parent().prev(),rightBtna=ulImgs.parent().next();
	rightBtna.addClass('disabled');
	ulImgs.css('width',ulImgs.children().length*205);
	leftBtna.click(function(){
		rightBtna.removeClass('disabled');
		n--;	
		if(-n>=ulImgs.children().length-5){
			leftBtna.addClass('disabled');
		}
		ulImgs.animate({
			marginLeft:n*205
		})
	});
	rightBtna.click(function(){
		leftBtna.removeClass('disabled');
		n++;	
		if(n>=0)rightBtna.addClass('disabled');
		ulImgs.animate({
			marginLeft:n*205
		})
	});
	
	// 分页列表
    $.ajax({
        type:'get',
        url:'http://localhost:3000/car/lists',
        dataType:'jsonp',
        success:function(res){
            // res=JSON.parse(res);
            console.log(1111);
            console.log(res);
        },
        error:function(){
            console.log('请求错误');
        }
    })
	
	
})
