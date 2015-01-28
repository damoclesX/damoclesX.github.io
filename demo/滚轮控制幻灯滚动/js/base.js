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
function addEvent(obj,sType,fn){
	if(obj.addEventListener){
		obj.addEventListener(sType,fn,false);
	}else{
		obj.attachEvent('on'+sType,fn);
		return false;
	}
};
//添加滚轮事件
function addWheelEvent(obj,callback){	
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
		addEvent(obj,'DOMMouseScroll',wheel);
	}else{
		addEvent(obj,'mousewheel',wheel);
	}
	function wheel(ev){
		var oEvent= ev || event;
		var down=oEvent.detail?oEvent>0:oEvent.wheelDelta<0;	
		
		callback && callback(down);				
		if(oEvent.preventDefault){
			oEvent.preventDefault();
		}
		return false;
	};
};
//utf8下暂算汉字为2个字节
function fnlength(str,len){
	var j=0,
		result='',
		reg=/[\u4e00-\u9fa5]/;//汉字所处的unicode范围
	for(var i=0;i<str.length;i++){
			if(reg.test(str.charAt(i))){
				j+=2;						
				if(j>len){
					if(j == len+1){
						result+='*';
					}
					break;
				}else{
					result+=str.charAt(i);
				}

			}else{
				j++;										
				if(j>len){
					break;
				}else{
					result+=str.charAt(i);
				}		
				
			}
	}
	return result;
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
		aLi=oSlider.getElementsByTagName('li');

	var now=0,
		index=5;

	addWheelEvent(document,function(down){
		if(down){
			now++;
		}else{
			now--;
		}
		action();
	})
	function action(){
		if(now<0){
			now=aLi.length-1;
		}
		if(now==aLi.length){
			now=0;
		}
		for(var i=0;i<aLi.length;i++){			
			animate(aLi[i],{
				opacity:50
			})
		}
		aLi[now].style.zIndex=++index;
		animate(aLi[now],{
			opacity:100
		})
	}
})