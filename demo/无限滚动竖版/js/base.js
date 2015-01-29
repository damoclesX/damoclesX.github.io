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
		oUl=oSlider.getElementsByTagName('ul')[0],
		aLi=oUl.children,
		oOl=oSlider.getElementsByTagName('ol')[0],
		aBtns=oOl.children,
		t=0;
	window.now=0;
	oUl.innerHTML+=oUl.innerHTML;
	var h=oUl.offsetHeight/2;

	for(var i=0;i<aBtns.length;i++){
		(function(index){
			aBtns[i].onmouseover=function(){
				now=parseInt(now/aBtns.length)*aBtns.length+index;
				action(oUl,-now*aLi[0].offsetHeight);
			};
		})(i)
	}

	function action(obj,target){
		for(var i=0;i<aBtns.length;i++){
			aBtns[i].className='';
		}
		aBtns[(aBtns.length+now%aBtns.length)%aBtns.length].className='active';
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var speed=(target-t)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(t == target){
				clearInterval(obj.timer);
			}else{
				t+=speed;					
				if(t<0){
					obj.style.top=t%h+'px';
				}else{
					obj.style.top=-(h-t%h)+'px';
				}
			}
		},30)
	}

	bindAutoplay({
		obj:oSlider,
		now:'now',
		fn:function(){
			action(oUl,-now*aLi[0].offsetHeight);
		}
	})
})