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
		return oParent.getElementsByClassName(sClass)
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
function setCssOpacity(aElemnts,aNumber){
	if(aElemnts.length != aNumber.length){
		return '数据不匹配';
	}
	for(var i=0;i<aElemnts.length;i++){			
		aElemnts[i].style.opacity=aNumber[i]/100;
		aElemnts[i].style.filter='alpha(opacity='+aNumber[i]+')';
	}
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
	var oSlider=document.getElementById('slider');
	var oPrev=getByClass(oSlider,'slider-prev')[0];
	var oNext=getByClass(oSlider,'slider-next')[0];
	var aBtns=oSlider.getElementsByTagName('ol')[0].getElementsByTagName('li');
	var aContents=oSlider.getElementsByTagName('ul')[0].getElementsByTagName('li');

	window.iNow=0;
	var iIndex=5;


	for(var i=0;i<aBtns.length;i++){
		(function(index){
			aBtns[index].onclick=function(){
				iNow=index;
				innerFade();
			}
		})(i)
	}
	function innerFade(){
		if(iNow>aBtns.length-1){
			iNow=0;
		}else if(iNow<0){
			iNow=aBtns.length-1;
		}
		var temp;
		for(var j=0;j<aBtns.length;j++){
			aBtns[j].className='';
			temp=aContents[j];
			setCssOpacity([temp,temp.getElementsByTagName('h3')[0],temp.getElementsByTagName('p')[0]],[50,0,0]);
			temp.getElementsByTagName('div')[0].style.display='none';
		};
		aBtns[iNow].className='active';
		aContents[iNow].style.zIndex=++iIndex;
		animate(aContents[iNow],{
			opacity:100
		},{
			time:300,
			cb:function(){
				this.getElementsByTagName('div')[0].style.display='block';
				animate(this.getElementsByTagName('h3')[0],{
					opacity:100
				},{
					time: 350,
					cb:function(){
						animate(this.parentNode.parentNode.parentNode.getElementsByTagName('p')[0],{
							opacity:100
						},{
							time:350
						})
					}
				})
			}
		});
	}
	oPrev.onclick=function(){
		iNow--;
		innerFade();
	};
	oNext.onclick=function(){
		iNow++;
		innerFade();
	};
	bindAutoplay({
		obj: oSlider,
		fn:innerFade,
		now:'iNow',
		space:7000
	})
})