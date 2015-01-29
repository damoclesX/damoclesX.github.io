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
	var oSlider=document.getElementById('slider'),
		oUl=oSlider.getElementsByTagName('ul')[0],
		aLi=oUl.children,
		iWidth=aLi[0].offsetWidth,
		now=0,
		time=500,
		ready=true,
		aBtns=oSlider.getElementsByTagName('ol')[0].children,
		oPrev=getByClass(oSlider,'prev')[0],
		oNext=getByClass(oSlider,'next')[0];

	//复制第一个和最后一个节点并插入到原来的ul中调整布局
	var first=oUl.children[0].cloneNode(true);
	var last=oUl.children[aLi.length-1].cloneNode(true);
	oUl.insertBefore(last,oUl.children[0]);
	oUl.appendChild(first);
	oUl.style.left=-iWidth+'px';

	for(var i=0;i<aBtns.length;i++){
		(function(index){
			aBtns[index].onmouseover=function(){
				now=index;
				action();
			};
		})(i)
	}
	oPrev.onclick=function(){
		if(!ready) return;
		ready=false;
		now--;
		action();
	};
	oNext.onclick=function(){
		if(!ready) return;
		ready=false;
		now++;
		action();
	};
	function action(){
		for(var i=0;i<aBtns.length;i++){
			aBtns[i].className='';
		}
		var index=now<0?aBtns.length-1:now%aBtns.length;
		aBtns[index].className='active';

		if(now<0){
			now=4;
			animate(oUl,{
				left:0
			},{
				time:time,
				cb:function(){
					oUl.style.left=-2500+'px';
					ready=true;
				}
			})
		}else if(now >= 5){
			now=0;
			animate(oUl,{
				left:-3000
			},{
				time:time,
				cb:function(){
					oUl.style.left=-500+'px';
					ready=true;
				}
			})
		}else{
			animate(oUl,{
				left:-(now+1)*iWidth
			},{
				time:time,
				cb:function(){
					ready=true;
				}
			})
		}
	}
})