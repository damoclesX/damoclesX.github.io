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
		re=new RegExp('(\\s+|^)'+sclass+'(\\s+|$)'),
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
	var oRolling=document.getElementById('rolling'),
		oUl=oRolling.children[0],
		aLi=oUl.children,
		speed=3,
		timer=null;

	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';

	function rollingLeft(){
		timer=setInterval(function(){
			oUl.style.left=oUl.offsetLeft-speed+'px';
			if(Math.abs(oUl.offsetLeft) >= oUl.offsetWidth/2){
				oUl.style.left=0+'px';
			}
		},30)
	}
	function rollingRight(){
		oUl.style.left=-oUl.offsetWidth/2+'px';	
		timer=setInterval(function(){
			oUl.style.left=oUl.offsetLeft+speed+'px';
			if(oUl.offsetLeft >= 0){
				oUl.style.left=-oUl.offsetWidth/2+'px';
			}
		},30)
	}
	rollingLeft()
	oRolling.onmouseover=function(){
		clearInterval(timer);
	};
	oRolling.onmouseout=function(){
		rollingLeft();
	}
})