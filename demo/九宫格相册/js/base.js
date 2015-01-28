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
function isChild(obj,parent){
	while(obj){
		if(obj == parent){
			return true;
		}else{
			obj=obj.parentNode
		}
	}
	return false;
}
function hover(obj,fn1,fn2){
	obj.onmouseover=function(ev){
		var oEvent=ev||event;
		var from=oEvent.fromElement||oEvent.relatedTarget;
		if(isChild(from,obj)){
			return;
		}
		fn1 && fn1.call(obj);
	};
	obj.onmouseout=function(ev){
		var oEvent=ev||event;
		var to=oEvent.toElement||oEvent.relatedTarget;
		if(isChild(to,obj)){
			return;
		}
		fn2 && fn2.call(obj);
	};
}
function fadeIn(obj,fn,time){
	time=time||700;
	if(obj.id == 'back' || obj.id == 'prev' || obj.id == 'next' ){
		obj.style.visibility='visible';
	}
	animate(obj,{
		opacity:100
	},{
		time:time,
		cb:function(){
			fn && fn.call(obj)
		}
	})
}

function fadeOut(obj,fn,time){
	time=time||700;	
	animate(obj,{
		opacity:0
	},{	
		time:time,
		cb:function(){
			fn && fn.call(obj);
			if(obj.id == 'back' || obj.id == 'prev' || obj.id == 'next' ){
				obj.style.visibility='hidden';
			}
		}
	})	
}

function $(id){
	return document.getElementById(id);
}
ready(function(){
	var aColor=['27BFF3','ADEF48','9947C2','EC3095','F25D26','E58FE5','5373D3','ECCC20','CC2C4C'];
	var oThumbList=$('thumb_list'),
		aBtns=oThumbList.getElementsByTagName('li'),
		aList=$('thumb_stage').getElementsByTagName('ul')[0].children,
		aContents=$('thumb_stage').getElementsByTagName('ol'),
		oPic2=$('pic2'),
		oPrev=$('prev'),
		oNext=$('next'),
		oBack=$('back'),
		iNow=0,
		arr=[],
		timer=null,
		ready=false,
		done=false,
		complete=true,
		type=['Sine','easeOut'];

	for(var i=0;i<aBtns.length;i++){
		arr[i]=0;
		(function(index){
			var oA=aBtns[i].getElementsByTagName('a')[0];
			var oSpan=oA.getElementsByTagName('span')[0];
			hover(aBtns[i],function(){
				iNow=index;
				animate(oSpan,{
					backgroundColor:'#'+aColor[index]
				})
				if(timer){
					clearTimeout(timer);
					timer=null;
				}
				timer=setTimeout(function(){
					changeItem();
				},500)
			},function(){
				animate(oSpan,{
					backgroundColor:'#ddd'
				})
			});
			aBtns[i].onclick=function(){
				if(!ready && timer){
					return;
				}
				showBar();
				fadeOut(oThumbList,function(){
					this.style.display='none';
				},100);
				getColorful()
			};
		})(i)
	}

	oNext.onclick=function(){				
		if(!complete){
			return;
		}
		complete=false;
		arr[iNow]+=1;
		showBar();
		animate(aContents[iNow],{
			left:-arr[iNow]*800
		},{
			type:type,
			cb:function(){
				complete=true;
			}
		})
	};

	oPrev.onclick=function(){			
		if(!complete){
			return;
		}
		complete=false;
		arr[iNow]-=1;
		showBar();
		animate(aContents[iNow],{
			left:-arr[iNow]*800
		},{
			type:type,
			cb:function(){
				complete=true;
			}
		})
	};
	oBack.onclick=function(){
		if(!done){
			return;
		}
		console.log(1);
		oThumbList.style.display='block';
		fadeIn(oThumbList);
		fadeOut(oBack);
		fadeOut(oPrev);
		fadeOut(oNext);
		lostColorful();
	};
	//改变鼠标划过时的黑白图片
	function changeItem(){
		for(var i=0;i<aList.length;i++){
			if(iNow == i){
				aList[iNow].style.display='block';
				fadeIn(aList[iNow],function(){
					ready=true;
				});
				continue;
			}
			fadeOut(aList[i],function(){
				this.style.display='none';
			},200);			
		}
	}
	//彩色图片显示出来
	function getColorful(){
		fadeOut(aList[iNow]);
		for(var i=0;i<aContents.length;i++){
			if(iNow == i){				
				aContents[iNow].style.display='block';
				aContents[iNow].style.zIndex='2';
				fadeIn(aContents[iNow],function(){
					done=true;
				});
				continue;
			}
			aContents[i].style.display='none';
			aContents[i].style.zIndex='1';
		}		
	}
	//黑白图片显示出来
	function lostColorful(){
		aList[iNow].getElementsByTagName('img')[0].src='images/album'+(iNow+1)+'/bw/'+(arr[iNow]+1)+'.jpg';
		fadeIn(aList[iNow]);
		fadeOut(aContents[iNow],function(){
			done=false;
		});
	};
	//控制显示prev、next、back按钮
	function showBar(){
		if(arr[iNow] == 0){
			fadeOut(oPrev,null,30);
			fadeIn(oNext);
		}else if(arr[iNow] == 2){
			fadeIn(oPrev);
			fadeOut(oNext,null,30);
		}else{			
			fadeIn(oPrev);
			fadeIn(oNext);
		}
		fadeIn(oBack);
	}
})