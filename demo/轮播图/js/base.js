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
function getStyle(obj,name){
	return (obj.currentStyle||getComputedStyle(obj,null))[name];
}
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}

	var all=oParent.getElementsByTagName('*'),
		result=[],
		re=new RegExp('(\\s+|^)'+sClass+'(\\s+|$)'),
		i=0;
	for(;i<all.length;i++){
		if(re.test(all[i].className)){
			result.push(all[i]);
		}
	}
	return result;
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
	var oSlider=document.getElementById('slider'),
		oPrevDiv=getByClass(oSlider,'slider_prev')[0],
		oPrevBtn=oPrevDiv.getElementsByTagName('a')[0],
		oPrevTxt=oPrevDiv.getElementsByTagName('span')[0],
		oNextDiv=getByClass(oSlider,'slider_next')[0],
		oNextBtn=oNextDiv.getElementsByTagName('a')[0],
		oNextTxt=oNextDiv.getElementsByTagName('span')[0],
		aLi=oSlider.getElementsByTagName('ul')[0].children,
		type=['Back','easeOut'],
		ready=true;



	oNextBtn.onmouseover=function(){
		this.style.backgroundImage='url(images/next_1.png)';
		animate(this,{
			right:20
		})
		animate(oNextTxt,{
			right:59,
			opacity:100
		})
	};
	oNextBtn.onmouseout=function(){
		this.style.backgroundImage='url(images/next.png)';	
		animate(this,{
			right:0
		})
		animate(oNextTxt,{
			right:94,
			opacity:0
		})
	};
	oPrevBtn.onmouseover=function(){
		this.style.backgroundImage='url(images/prev_1.png)';		
		animate(this,{
			left:20
		})
		animate(oPrevTxt,{
			left:59,
			opacity:100
		})
	};
	oPrevBtn.onmouseout=function(){
		this.style.backgroundImage='url(images/prev.png)';		
		animate(this,{
			left:0
		})
		animate(oPrevTxt,{
			left:94,
			opacity:0
		})
	};

	var arr=[];
	for(var i=0;i<aLi.length;i++){
		var oImg=aLi[i].getElementsByTagName('img')[0];
		arr[i]={
			left:parseInt(getStyle(aLi[i],'left')),
			top:parseInt(getStyle(aLi[i],'top')),
			zIndex:parseInt(getStyle(aLi[i],'zIndex')),
			opacity:parseFloat(getStyle(aLi[i],'opacity')),
			width:parseInt(getStyle(aLi[i],'width'))
		}
	}
	oNextBtn.onclick=function(){
		if(!ready) return;
		ready=false;
		arr.push(arr.shift());
		action();
	};
	oPrevBtn.onclick=function(){		
		if(!ready) return;
		ready=false;
		arr.unshift(arr.pop());
		action();
	};
	function action(){
		var j=0;		
		for(var i=0;i<aLi.length;i++){
			aLi[i].style.opacity=arr[i].opacity;
			animate(aLi[i],{
				left:arr[i].left,
				top:arr[i].top,
				width:arr[i].width
			},{
				type:type,
				cb:function(){
					j++;
					if(j > aLi.length-1){
						ready=true;
					}
				}
			});
			aLi[i].style.zIndex=arr[i].zIndex;
		}
	}
	function auto(){
		arr.push(arr.shift());
		action();
	}
	bindAutoplay({
		obj:oSlider,
		now:'now',
		fn:auto
	})
})