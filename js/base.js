function ready(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',fn,false);
	}else{
		document.attachEvent('onreadystatechange',function(){
			if(document.readyState == 'complete'){
				fn();
			}
		})
	}
}

//自动播放
/*
	参数说明
	{
		obj: 绑定事件的对象 (obj),
		now:控制全局的变量 (string),
		fn:自动播放的函数名 (fn，为定义函数的名字)
	}
	bindAutoplay(json)
*/
function bindAutoplay(json){
	var json = json || {};
	if(!json) return ;
	json.obj=json.obj;
	json.space=json.space || 5000;
	json.timer=json.timer || null;

	if(!json.obj) return;

	json.timer=setInterval(function(){
		window[json.now]=++window[json.now];
		json.fn();
	},json.space);
	json.obj['onmouseover']=function(){
		clearInterval(json.timer);
	};
	json.obj['onmouseout']=function(){
		json.timer=setInterval(function(){
			window[json.now]=++window[json.now];
			json.fn();
		},json.space)
	}
}
ready(function(){
	var oBox=document.getElementById('box'),
		oUl=document.getElementById('box_list'),
		aBtns=document.getElementById('box_btns').children,
		oCss=document.getElementById('css'),
		iWidth=67,
		iLength=parseInt(oUl.offsetWidth/iWidth),
		sResult='',
		sStyle='',
		iZindex=0;
	
	window.iNow=0;
	var old=0;

	for(var i=0;i<iLength;i++){
		i<iLength/2?iZindex++:iZindex--;
		sStyle+='.box ul li:nth-of-type('+(i+1)+') {z-index:'+iZindex+'}';
		sStyle+='.box ul li:nth-of-type('+(i+1)+') a{background-position: '+i*-iWidth+'px 0;}';
		sResult+='<li><a href="#"></a><a href="#"></a><a href="#"></a><a href="#"></a><i></i><i></i></li>';
	}
	oUl.innerHTML=sResult;
	oCss.innerHTML+=sStyle;

	var aLi=oUl.children;
	for(var i=0;i<aBtns.length;i++){
		(function(index){
			aBtns[i].onclick=function(){
				iNow=index;
				action();
			};
		})(i)
	}

	function action(){
		if(iNow>aBtns.length-1){
			iNow=0
		}		
		aBtns[old].className='';
		aBtns[iNow].className='active';
		for(var i=0;i<aLi.length;i++){
			aLi[i].style.WebkitTransition=Math.abs(old-iNow)*.7+'s '+i*50+'ms ease-in-out';
			aLi[i].style.WebkitTransform=' translateZ(-224px) rotateX(-'+iNow*90+'deg)';
		}

		old=iNow;
	}

	bindAutoplay({
		obj:oBox,
		now:'iNow',
		fn:function(){
			action();
		}
	})
})