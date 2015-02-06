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
//获取选中的文字
function getSelectTxt() {
    var txt = "";
    if(document.selection) {
        txt = document.selection.createRange().text;    // IE
    } else {
        txt = document.getSelection();
    }
    return txt.toString();
};
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
		json.fnon && json.fnon.call(json.obj);
		clearInterval(json.timer);
	};
	json.obj['onmouseout']=function(){
		json.fnout && json.fnout.call(json.obj);
		json.timer=setInterval(function(){
			window[json.now]=++window[json.now];
			json.fn();
		},json.space)
	}
}
//支持为多个元素设置自动播放
function bindAutoplay2(json){
	var json = json || {};
	if(!json) return ;
	json.space=json.space || 5000;
	json.timer=json.timer || null;
	json.obj=json.obj;
	//为多个元素开启自动播放
	if(json.obj.length){
		for(var i=0;i<json.obj.length;i++){
			if(!json.obj[i]) return;

			json.obj[i]['onmouseover']=function(){
				clearInterval(json.timer);
			};
			json.obj[i]['onmouseout']=function(){
				json.timer=setInterval(function(){
					window[json.now]=++window[json.now];
					json.fn();
				},json.space)
			}
		}
		json.timer=setInterval(function(){
			window[json.now]=++window[json.now];
			json.fn();
		},json.space);
	}else{			
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
}
function $(id){
	return document.getElementById(id);
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
ready(function(){

	//语言和购物车的显示
	var oLang=$('lang'),
		oLanguage=$('language'),
		oShopping=$('shopping'),
		oShoppingCart=$('shopping_cart');

	hover(oLang,function(){
		if(oLang.timer){
			clearTimeout(oLang.timer);
		}
		oLanguage.style.display='block';
		animate(oLanguage,{
			height:206
		},{
			time:400
		})
	},function(){
		oLang.timer=setTimeout(function(){
			oLanguage.style.display='none';
			oLanguage.style.height='0';
		},500)
	})
	hover(oShopping,function(){
		if(oShopping.timer){
			clearTimeout(oShopping.timer);
		}
		oShoppingCart.style.display='block';
		animate(oShoppingCart,{
			minHeight:45,
			width:329
		},{
			time:400
		})
	},function(){
		oShopping.timer=setTimeout(function(){
			oShoppingCart.style.display='none';
			oShoppingCart.style.minHeight='0';
			oShoppingCart.style.width='100px';
		},500)
	})

	//左侧全部导航
	var oNavList=$('nav_list'),
		aNavList=oNavList.getElementsByTagName('li'),
		aNavListContent=oNavList.getElementsByTagName('dl'),
		timerNav=timerNav2=null;


	for(var i=0;i<aNavList.length;i++){
		(function(index){
			hover(aNavList[i],function(){
				if(this.getElementsByTagName('a')[0]){
					this.aClassName=this.getElementsByTagName('a')[0].className;
					this.getElementsByTagName('a')[0].className=this.aClassName+' active';
				}
				if(timerNav2){
					clearTimeout(timerNav2);				
				}
				var _this=this;
				timerNav2=setTimeout(function(){
					_this.dl=_this.getElementsByTagName('dl')[0];				
					if(_this.dl){
						_this.getElementsByTagName('i')[0].style.visibility='visible';
						_this.dl.style.display='block';
					}
				},200)
			},function(){				
				if(this.getElementsByTagName('a')[0]){
					this.getElementsByTagName('a')[0].className=this.aClassName;
				}
				if(this.dl){
					var _this=this;
					timerNav=setTimeout(function(){
						_this.dl.style.display='none';
						_this.getElementsByTagName('i')[0].style.visibility='hidden';
					},250)
				}
			})
		})(i)
	}

	//幻灯效果
	var oClassFocusSlider=$('class_focus_slider'),
		aClassFocusPics=oClassFocusSlider.getElementsByTagName('li'),
		oPrev=$('prev'),
		oNext=$('next');		
	window.iClassifyNow=0;

	function slider(){
		if(iClassifyNow>aClassFocusPics.length-1){
			iClassifyNow=0;
		}
		if(iClassifyNow<0){
			iClassifyNow=aClassFocusPics.length-1;
		}
		for(var i=0;i<aClassFocusPics.length;i++){
			if(i == iClassifyNow){
				continue;
			}
			aClassFocusPics[i].style.zIndex=1;
			animate(aClassFocusPics[i],{
				opacity:50
			},{
				time: 800
			})
		}
		aClassFocusPics[iClassifyNow].style.zIndex=2;		
		animate(aClassFocusPics[iClassifyNow],{
			opacity:100
		},{
				time: 800
			})
	}
	oPrev.onclick=function(){
		iClassifyNow--;
		slider();
	};
	oNext.onclick=function(){
		iClassifyNow++;
		slider();
	}
	
	bindAutoplay({
		obj: oClassFocusSlider,
		now:'iClassifyNow',
		fn:function(){
			slider();
		},
		space:5000,
		fnon:function(){
			oPrev.style.display=oNext.style.display='block';
		},
		fnout:function(){
			oPrev.style.display=oNext.style.display='none';
		}
	})
	

})