function getByClass(obj,sClass){
	var oParent=obj || document;
	var all=oParent.getElementsByTagName('*');
	var result=[];			
	for(var i=0; i<all.length;i++){
		var temp=all[i];
		if(temp.className){
			if(temp.className.indexOf(' ')==-1){
				if(temp.className==sClass){
					result.push(temp);
				}
			}else{
				var aClass=temp.className.split(' ');
				for(var j=0;j<aClass.length;j++){
					if(aClass[j]==sClass){
						result.push(temp);
					};
				};
			};
		};
	}
	return result;
}

function tabs(json){
	var oBox=document.getElementById(json.id) || json.id;
	if(!oBox){
		console.log('没有找到id为'+json.id+'元素');
		return;
	}
	json.event=json.event || 'mouseover';
	json.autoplay=json.autoplay || false;
	json.time=json.time || 1000;
	var aBtns=getByClass(oBox,'tab_btns')[0].getElementsByTagName('li');
	var aContents=getByClass(oBox,'tab_contents_box');
	var timer=null;
	var index=0;
	for(var i=0; i<aBtns.length;i++){
		aBtns[i].index=i;
		aBtns[i]['on'+json.event]=function(){
			if(index==this.index){
				return ;
			}else{
				index=this.index;
			}
			tab();
		}
	};
	function tab(){
		for(var i=0; i<aBtns.length;i++){
			aBtns[i].className='';
			aContents[i].style.display='none';
		}
		aBtns[index].className='active';
		aContents[index].style.display='block'
	};
	function next(){
		index++;
		if(index==aBtns.length){
			index=0;
		}
		tab();
	};
	if(json.autoplay){
		timer=setInterval(next,json.time);
		oBox.onmouseover=function(){
			clearInterval(timer);
		};				
		oBox.onmouseout=function(){
			timer=setInterval(next,json.time);
		};
	};
}
function setStyle(obj,json){
	for(var i in json){
		obj.style[i]=json[i];
	}
}
function getUA(){
	var arr=['IE','FireFox','Chrome','Opera','Safari','未知浏览器'];
	var sUA=navigator.userAgent;
	if(sUA.indexOf('MSIE')!=-1){
		if(sUA.indexOf('10.0')!=-1){
			return arr[0]+'10';
		}else if(sUA.indexOf('9.0')!=-1){
			return arr[0]+'9';
		}else if(sUA.indexOf('8.0')!=-1){
			return arr[0]+'8';
		}else if(sUA.indexOf('7.0')!=-1){
			return arr[0]+'7';
		}else if(sUA.indexOf('6.0')!=-1){
			return arr[0]+'6';
		}else{
			return '未知版本'+arr[0];
		}
	}else if(sUA.indexOf('Firefox')!=-1){
		return arr[1];
	}else if(sUA.indexOf('Chrome')!=-1){
		return arr[2];
	}else if(sUA.indexOf('Opera')!=-1){
		return  arr[3];
	}else if(sUA.indexOf('Safari')!=-1){
		return arr[4];
	}else{
		return arr[5];
	}
}
window.onload=function(){
	var aTabs=getByClass(document,'tab');
	for(var i=0;i<aTabs.length;i++){
		aTabs[i].index=i;
		if(i==0){
			tabs({
				id:aTabs[0],
				autoplay:true,
				time:2000
			})
		}else{
			tabs({
				id:aTabs[i]
			})
		}
		var aImg=aTabs[i].getElementsByTagName('img');
		var timer=null;
		for(var j=0,l=aImg.length;j<l;j++){			
			if(i!=0){
				aImg[j].index=i;
				aImg[j].index2=j;
				aImg[j].onmouseover=function(){
					var _this=this;
					timer=setTimeout(function(){						
						var oMask=document.createElement('div');
						oMask.className='mask';
						_this.parentNode.appendChild(oMask);
						if(_this.index == 2){
							if(getUA()=='IE7' || getUA=='IE6'){
								if(_this.index2==0 || _this.index2==5){
									setStyle(oMask,{width:_this.width+'px',height:_this.height+'px',left:_this.offsetLeft+'px',top:_this.offsetTop+56+'px',display:'block'});
								}else{
									setStyle(oMask,{width:_this.width+'px',height:_this.height+'px',left:_this.offsetLeft+'px',top:_this.offsetTop+'px',display:'block'});
								}
							}else{
								setStyle(oMask,{width:_this.width+'px',height:_this.height+'px',left:_this.offsetLeft+'px',top:_this.offsetTop+'px',display:'block'});
							}
						}else{
							setStyle(oMask,{width:_this.width+'px',height:_this.height+'px',left:_this.offsetLeft+20+'px',top:_this.offsetTop+'px',display:'block'});
						}
						oMask.onmouseout=function(){
							oMask.parentNode.removeChild(oMask);
						};
					},100)
				};
				aImg[j].onmouseout=function(){
					clearTimeout(timer);
				}
			}
		}
	}
	//搜索框关键词
	var oKeyWords=document.getElementById('keywords');
	var oSearchList=document.getElementById('search_list');
	var aKeyWords=oSearchList.getElementsByTagName('a');
	oKeyWords.onfocus=function(){
		oSearchList.style.display='block';
	};
	for(var i=0; i<aKeyWords.length;i++){
		aKeyWords[i].onclick=function(){
			oKeyWords.value=this.innerHTML;
			oSearchList.style.display='none';
		};
	}
	//观看记录
	var bRecorder=false;
	var oRecorderSwitch=document.getElementById('recorder_switch');
	var oRecorder=document.getElementById('recorder');
	oRecorderSwitch.onclick=function(){
		if(!bRecorder){
			oRecorder.style.display='block';
			this.className='header_user_more off';
		}else{
			oRecorder.style.display='none';
			this.className='header_user_more on';
		}
		bRecorder=!bRecorder;
	}
	
}