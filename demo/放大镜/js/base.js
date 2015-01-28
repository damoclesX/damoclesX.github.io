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
function isChild(obj,parent){
	while(obj){
		if(obj == parent){
			return true;
		}
		obj = obj.parentNode
	}
	return false;
}
ready(function(){
	var oMagnifier=document.getElementById('magnifier'),
		oSmall=getByClass(oMagnifier,'small')[0],
		oSmallImg=oSmall.getElementsByTagName('img')[0],
		oSmallCubic=oSmall.getElementsByTagName('div')[0],
		oBig=getByClass(oMagnifier,'big')[0],
		oBigImg=oBig.getElementsByTagName('img')[0],
		show=false;
	
	oSmall.onmousemove=function(e){
		if(!show){
			console.log(1);
			oSmallCubic.style.display='block';
			oBigImg.style.display='block';
			show=!show;
		}
		var oEvent=e || event;
		var l=t=0;		
		l=oEvent.clientX-oMagnifier.offsetLeft-oSmallCubic.offsetWidth/2;
		l<0 && (l=0);
		l>oSmall.offsetWidth-oSmallCubic.offsetWidth && (l=oSmall.offsetWidth-oSmallCubic.offsetWidth);
		t=oEvent.clientY-oMagnifier.offsetTop-oSmallCubic.offsetHeight/2;	
		t<0 && (t=0);
		t>oSmall.offsetHeight-oSmallCubic.offsetHeight && (t=oSmall.offsetHeight-oSmallCubic.offsetHeight);
		oSmallCubic.style.left=l+'px';
		oSmallCubic.style.top=t+'px';

		var ratioX=l/(oSmall.offsetWidth-oSmallCubic.offsetWidth);
		var ratioY=t/(oSmall.offsetHeight-oSmallCubic.offsetHeight);
		var x=ratioX*(oBigImg.offsetWidth-oBig.offsetWidth);
		var y=ratioY*(oBigImg.offsetHeight-oBig.offsetHeight);
		oBigImg.style.left=-parseInt(x)+'px';
		oBigImg.style.top=-parseInt(y)+'px';
	};
	oSmall.onmouseout=function(e){
		var oEvent=e || event;
		var to=oEvent.toElement || oEvent.relatedTarget;
		//解决ie下假离开oSmall时，big图片不停闪烁地情况
		if(isChild(to,oSmall)) return;
		oSmallCubic.style.display='none';
		oBigImg.style.display='none';
		show=!show;
	};
})