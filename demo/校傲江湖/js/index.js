window.onload=function(){
	//tab选项卡
	new Tab("activity_tab");
	new Tab("training_tab");
	//banner幻灯片
	var oBanner=$("banner");
	var oTitle=oBanner.getElementsByTagName("p")[0];
	var oPics=oBanner.getElementsByTagName("ul")[0];
	var aPics=oPics.getElementsByTagName("li");
	var aBtn=oBanner.getElementsByTagName("ol")[0].getElementsByTagName("li");
	oPics.style.width=aBtn.length*aPics[0].offsetWidth+"px";
	oTitle.innerHTML=aPics[0].getElementsByTagName("a")[0].title;
	var now=0;
	for(var i=0;i<aBtn.length;i++){
		aBtn[i].index=i;
		aBtn[i].onmouseover=function(){
			if(now==this.index) return ;
			now=this.index;
			tab();
		}
	}
	function tab(){
			for(var i=0;i<aBtn.length;i++){
				aBtn[i].className="";
			}
			aBtn[now].className="active";
			var sTitle=aPics[now].getElementsByTagName("a")[0].title
			startMove(oTitle,{height:0},function(){
				startMove(oPics,{left:-now*670},function(){
					oTitle.innerHTML=sTitle;
					startMove(oTitle,{height:25})
				})
			})
	}
	//自动播放
	var timer=null;	
	timer=setInterval(function(){
		now++;
		if(now==aBtn.length){
			now=0
		}
		tab();
		},6000)
	oBanner.onmouseover=function(){
		clearInterval(timer)
	};
	oBanner.onmouseout=function(){
		timer=setInterval(function(){
		now++;
		if(now==aBtn.length){
			now=0
		}
		tab();
		},6000);
	} 
	//media 幻灯片	
	var oMediaPics=$("media_pics");
	var oPics2=oMediaPics.getElementsByTagName("ul")[0];
	var aPics2=oPics2.getElementsByTagName("li");
	var aBtn2=oMediaPics.getElementsByTagName("ol")[0].getElementsByTagName("li");
	var now2=0;
	var iIndex=1;
	for(var i=0;i<aBtn2.length;i++){
		aBtn2[i].index=i;
		aBtn2[i].onmouseover=function(){
			if(now2==this.index) return ;
			now2=this.index;
			iIndex++
			tab2();
		}
	}
	function tab2(){
			iIndex++
			for(var i=0;i<aBtn2.length;i++){
				aBtn2[i].className="";
				aPics2[i].style.opacity=0.4;			
				aPics2[i].style.filter="alpha(opacity=40)";
			}
			aBtn2[now2].className="active";
			aPics2[now2].style.zIndex=iIndex;
			startMove(aPics2[now2],{opacity:100});
	}
	//自动播放
	var timer2=null;	
	timer2=setInterval(function(){
		now2++;
		if(now2==aBtn2.length){
			now2=0
		}
		tab2();
		},7000)
	oMediaPics.onmouseover=function(){
		clearInterval(timer2)
	};
	oMediaPics.onmouseout=function(){
		timer2=setInterval(function(){
		now2++;
		if(now2==aBtn2.length){
			now2=0
		}
		tab2();
		},7000);
	} 
	
	//兼职列表滚动;
	var oNext=$("next");
	var oPrev=$("prev");
	var oPartTimeList=$("parttime_list");
	var oUl=oPartTimeList.getElementsByTagName("ul")[0];
	oUl.innerHTML=oUl.innerHTML+oUl.innerHTML;
	var totalTop=oUl.offsetHeight;
	//alert(totalTop);
	var top=0;
	var scrollTimer=null;
	
	oNext.onmouseover=scrollBottom;
	oNext.onmouseout=function(){
		clearTimeout(scrollTimer);
	}
	oPrev.onmouseover=scrollTop;
	oPrev.onmouseout=function(){
		clearTimeout(scrollTimer);
	}
	function scrollTop(){
		top++;
		if(top>=0) return;
		oUl.style.top=top+"px";
		scrollTimer=setTimeout(scrollTop,33);
	}
	function scrollBottom(){
		top--;
		if(Math.abs(top)>=totalTop/2) return;
		oUl.style.top=top+"px";
		scrollTimer=setTimeout(scrollBottom,33);
	}
}