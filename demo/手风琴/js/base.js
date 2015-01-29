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
	var oAccordion=document.getElementById('accordion'),
		oUl=oAccordion.children[0],
		aLi=oUl.children,
		space=50,
		type=['Cubic','easeOut'];
	window.now=0;

	for(var i=0;i<aLi.length;i++){
		aLi[i].style.left=space*i+'px';
		(function(index){				
			aLi[index].onmouseover=function(){
				now=index;
				action();
			};
		})(i)
	}

	function action(){
		if(now>aLi.length-1){
			now=0;
		}
		var iWidth=oUl.offsetWidth-space*(aLi.length-1);
		for(var i=0;i<aLi.length;i++){
			//改变遮罩层透明度
			var oI=aLi[i].getElementsByTagName('i')[0];
			if(i == now){
				animate(oI,{
					opacity:0
				})
			}else{
				animate(oI,{
					opacity:70
				})
			};
			if(i<=now){
				animate(aLi[i],{
					left:i*space
				},{
					type:type
				})
			}else if(i>now){
				animate(aLi[i],{
					left:iWidth+(i-1)*space
				},{
					type:type
				})
			}
		}
	}
	action();
	//自动播放
	bindAutoplay({
		obj:oAccordion,
		now:'now',
		fn:action
	})
})