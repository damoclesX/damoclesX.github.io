
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
function ready(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',fn,false)
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

	var result=[],
		all=oParent.getElementsByTagName('*'),
		re=new RegExp('(\\s+|^)'+sClass+'(\\s+|$)'),
		i=0;
	for(;i<all.length;i++){
		if(re.test(all[i].className)){
			result.push(all[i]);
		}
	}
	return result;

}
ready(function(){
	var oSlider=document.getElementById('slider'),
		aContents=getByClass(oSlider,'slider-contents')[0].getElementsByTagName('li'),
		aBtns=getByClass(oSlider,'slider-btns')[0].getElementsByTagName('li'),
		aLinks=getByClass(oSlider,'slider-links')[0].getElementsByTagName('li'),
		timer=null;
		window.iNow=0;


	for(var i=0;i<aBtns.length;i++){
		(function(index){
			aBtns[index].onmouseover=function(){
				iNow=index;
				tab();
			};
			aBtns[index].onmouseout=function(){
				if(timer){
					clearTimeout(timer);
					timer=null;
				}
			}
		})(i)
	}
	function tab(){
		if(iNow<0){
			iNow=aBtns.length-1;
		}else if(iNow>aBtns.length-1){
			iNow=0
		}

		timer=setTimeout(function(){								
			for(var j=0;j<aBtns.length;j++){
				aBtns[j].className='';
				aContents[j].style.display='none';
				aLinks[j].style.display='none';
			}
			aBtns[iNow].className='active';
			aContents[iNow].style.display='block';
			aLinks[iNow].style.display='block';
		},500)
	}

	bindAutoplay({
		obj:oSlider,
		fn:tab,
		now:'iNow',
		space: 5000
	})

})