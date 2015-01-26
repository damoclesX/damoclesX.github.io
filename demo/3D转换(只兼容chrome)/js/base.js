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
	var oBox=document.getElementById('box'),
		oGo=document.getElementById('go'),
		oBack=document.getElementById('back'),
		oCss=document.getElementById('css'),
		aBoxList=oBox.getElementsByTagName('ul'),
		iRows=10,
		iCols=8,
		iAll=iCols*iRows,
		sHtml='',
		index=5,
		aUlAl=[],
		iNow=0;

	//动态创建li
	for(var i=0;i<iAll;i++){
		sHtml+='<li></li>';
	}
	for(var i=0;i<aBoxList.length;i++){
		aBoxList[i].innerHTML=sHtml;
		aBoxList[i].style.zIndex=--index;
		aUlAl[i]=setPos(aBoxList[i].getElementsByTagName('li'));
		(function(t){
			aBoxList[i].onclick=function(){
				alert(t);
				//console.log(t);
			};
		})(i)		
	}
	//防止在进入页面时的过度
	oCss.innerHTML+='.wrap ul li{-webkit-transition:1s background ease-in-out,1.5s .3s -webkit-transform ,.1s border,.2s box-shadow,1.5s .3s opacity;}';
	
	function change(aLipos,x,y,fn,delay,speed){	
		if(!aLipos[y] || !aLipos[y][x]){
			return;
		}
		if(fn){
			fn.call(aLipos[y][x]);
			clearTimeout(aLipos[y][x].timer);
			aLipos[y][x].timer=setTimeout(function(){			
				change(aLipos,x,y+speed,fn,delay,speed);
				change(aLipos,x+speed,y,fn,delay,speed);
			},delay)
		}
	}
	//设定每个li的坐标
	function setPos(aLi){
		var arr=[];
		for(var i=0;i<iCols;i++){
			var tmp=[];
			for(var j=0;j<iRows;j++){
				aLi[i*iRows+j].x=j;
				aLi[i*iRows+j].y=i;
				aLi[i*iRows+j].style.backgroundPosition=-j*aLi[0].offsetWidth+'px -'+i*aLi[0].offsetHeight+'px'
				tmp.push(aLi[i*iRows+j]);
			}
			arr.push(tmp);
		}
		return arr;
	}
	//添加点击事件
	oGo.onclick=function(){
		if(iNow == aBoxList.length-1){
			return;
		}
		change(aUlAl[iNow],iRows-1,iCols-1,function(){
			with(this.style){
				transition='1s background ease-in-out,1.5s .2s  -webkit-transform ,.1s border,.1s box-shadow,1.5s .3s opacity;';
				borderColor='rgba(0,0,0,.6)';
				boxShadow='0 0 20px #444';
				WebkitTransform='translate(-67px,-90px)  rotateX(-540deg) rotateY(-540deg) ';
				opacity=0;
			}
			if(this.x == 0 && this.y == 0){
				this.addEventListener('webkitTransitionEnd',end,false);
			}
		},50,-1);
		iNow++;
	};
	oBack.onclick=function(){		
		if(iNow <= 0){
			return;	
		}
		iNow--;
		aBoxList[iNow].style.visibility='visible';
		aBoxList[iNow].children[0].removeEventListener('webkitTransitionEnd',end,false)
		change(aUlAl[iNow],0,0,function(){
			with(this.style){
				transition='1s background ease-in-out,.5s -webkit-transform ease-in,.2s border,.2s box-shadow,1.5s .3s opacity;';
				borderColor='rgba(0,0,0,0)';
				boxShadow='0 0 0 #000';
				WebkitTransform='translate(0,0) rotateX(0) rotateY(0) ';
				opacity=1;
			}
		},50,1);
	};
	//添加转化结束时的事件
	function end(e){
		if(e.propertyName == 'opacity'){
			this.parentNode.style.visibility='hidden';
		}
	}
})