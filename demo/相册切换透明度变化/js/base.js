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

ready(function(){
	var oThumb=document.getElementById('thumb'),
		oUl=oThumb.children[0],
		aLi=oUl.children,
		oPrev=oThumb.children[1],
		oNext=oThumb.children[2],
		now=0,
		old=0,
		ready=true;

	//布局转换并隐藏其余的图片
	for(var i=0;i<aLi.length;i++){
		var oImg=aLi[i].getElementsByTagName('img')[0];
		oImg.style.display='block';
		aLi[i].style.left=aLi[i].offsetLeft+'px';
		aLi[i].style.top=parseInt(i/4)%2*200+20+'px';
	}

	for(var i=0;i<aLi.length;i++){
		aLi[i].style.position='absolute';
		aLi[i].index=i;
		if(i<8){
			aLi[i].style.opacity=1;
			aLi[i].style.filter='alpha(opacity=100)';
		}else{			
			aLi[i].style.opacity=0;
			aLi[i].style.filter='alpha(opacity=0)';
		}
	}

	oNext.onclick=function(){
		if(now>aLi.length-9) return;
		if(!ready) return;
		ready=false;
		
		var i=now;
		
		var timer=setInterval(function(){			
			animate(aLi[i],{
				opacity:0
			});			
			aLi[i+8] && animate(aLi[i+8],{
				opacity:100
			},{
				cb:function(){
					if(!((this.index+1)%8)){
						ready=true;
					}
				}
			})
			i++;
			if(i>7+now){
				clearInterval(timer);
				now+=8;
			}
		},50)
	};

	
	oPrev.onclick=function(){
		if(now<=0) return;
		if(!ready) return;
		ready=false;

		var i=now+7;
		var timer=setInterval(function(){
			animate(aLi[i],{
				opacity:0
			});
			if(aLi[i-8]){
				animate(aLi[i-8],{
					opacity:100
				},{
					cb:function(){
						if(!((this.index-7)%8)){
							ready = true;
						}
					}
				})
			}
			i--;
			if(i<now){
				clearInterval(timer);
				now-=8;
			}
		},50)
	};

})