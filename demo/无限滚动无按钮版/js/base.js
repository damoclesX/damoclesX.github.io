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
		iWidth=aLi[0].offsetWidth,
		aBtns=oSlider.getElementsByTagName('ol')[0].children,
		iL=aBtns.length,
		oPrev=getByClass(oSlider,'prev')[0],
		oNext=getByClass(oSlider,'next')[0];

	window['now']=0;
	var now2=0;

	for(var i=0;i<aBtns.length;i++){
		(function(index){
			aBtns[i].onmouseover=function(){
				now=index;
				now2=index;
				action();
			};
		})(i)
	}

	function action(){		
		for(var i=0;i<aBtns.length;i++){
			aBtns[i].className='';
		}
		aBtns[now].className='active';
		if(now == 0){
			aLi[0].style.position='static';
			oUl.style.left=0;
			now2=0;
		}
		if(now == aLi.length-1){
			now=0;
			aLi[0].style.position='relative';
			aLi[0].style.left=iL*iWidth+'px';
		}else{
			now++;
		}
		now2++;
		
		animate(oUl,{
			left:-now2*iWidth
		})
	}

	var timer=null;
	timer=setInterval(function(){
		action();
	},5000)

	oSlider.onmouseover=function(){
		clearInterval(timer);
	};
	oSlider.onmouseout=function(){		
		timer=setInterval(function(){
			action();
		},5000)
	};

})