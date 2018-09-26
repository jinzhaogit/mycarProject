window.onload=function(){
	var win=document.getElementById('win');
	win.onmousedown=function(e){
		var oEvent=e||event;
		var disX=oEvent.clientX-win.offsetLeft;
		var disY=oEvent.clientY-win.offsetTop;
		document.onmousemove=function(e){
			var oEvent=e||event;
			var x=oEvent.clientX-disX;
			var y=oEvent.clientY-disY;
			if(x>document.documentElement.clientWidth-win.offsetWidth)
			x=document.documentElement.clientWidth-win.offsetWidth;
			else if(x<0)x=0;
			else if(y>document.documentElement.clientHeight-win.offsetHeight)
			y=document.documentElement.clientHeight-win.offsetHeight;
			else if(y<0)y=0;
			win.style.left=x+'px';
			win.style.top=y+'px';
			
		}
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}
