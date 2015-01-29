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
	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=iWidth*aLi.length+'px';
	var w=oUl.offsetWidth/2;

	for(var i=0;i<aBtns.length;i++){
		(function(index){
			aBtns[i].onmouseover=function(){
				//计算now的值
				now=Math.floor(now/iL)*iL+index;
				action(oUl,-now*iWidth);
			};
		})(i)
	}
	oPrev.onclick=function(){
		now--;
		action(oUl,-now*iWidth);
	};
	oNext.onclick=function(){
		now++;
		action(oUl,-now*iWidth);
	};
	var l=0;
	function action(obj,target){		
		for(var j=0;j<aBtns.length;j++){
			aBtns[j].className='';
		}
		aBtns[(now%iL+iL)%iL].className='active';
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var speed=(target-l)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);

			if(l == target){
				clearInterval(obj.timer);
			}else{
				l+=speed;
				//document.title=l+','+now;
				if(l<0){
					//模上整个ul的一半
					obj.style.left=l%w+'px';
				}else{
					obj.style.left=-(w-l%w)+'px';
				}
			}
		},30)
	}

	bindAutoplay({
		obj:oSlider,
		now:'now',
		fn:function(){
			action(oUl,-now*iWidth);
		}
	})
})