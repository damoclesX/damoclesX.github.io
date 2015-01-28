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
	var oSlider=document.getElementById('slider'),
		oContent=oSlider.getElementsByTagName('ul')[0],
		aContents=oContent.children,
		aBtns=oSlider.getElementsByTagName('ol')[0].children;
	window.iNow=0;

	oContent.style.width=aContents[0].offsetWidth*aContents.length+'px';
	for(var i=0;i<aBtns.length;i++){
		(function(index){
			aBtns[index].onmouseover=function(){
				iNow=index;
				tab();
			}
		})(i)
	}

	function tab(){
		if(iNow<0){
			iNow=aBtns.length-1;
		}else if(iNow>aBtns.length-1){
			iNow=0;
		}

		for(var i=0;i<aBtns.length;i++){
			aBtns[i].className='';
		}

		aBtns[iNow].className='selected';
		animate(oContent,{
			marginLeft:-iNow*aContents[0].offsetWidth
		},{
			time:300,
			type:['Sine','easeIn']
		})
	}

	bindAutoplay({
		obj:oSlider,
		now: 'iNow',
		fn:tab
	})
})