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
	//获取元素
	var oThumb=document.getElementById('thumb'),
		oUl=oThumb.children[0],
		aLi=oUl.children,
		oDiv=oThumb.children[1],
		oPrev=oDiv.children[0],
		oNext=oDiv.children[1],
		now=0,
		ready=true,
		v=['Sine','easeOut']

	//布局转换
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.left=aLi[i].offsetLeft+'px';
		if(parseInt(i/10)){
			aLi[i].style.top=200+'px';
		}else{	
			aLi[i].style.top=0+'px';
		}
	}

	for(var i=0;i<aLi.length;i++){
		aLi[i].style.position='absolute';
		aLi[i].index=i;
	}

	//隐藏右边大于4的图片
	for(var i=0;i<aLi.length;i++){
		if(i%10>3){
			aLi[i].style.left=800+'px';
			aLi[i].style.opacity='0';
			aLi[i].style.filter='alpha(opacity=0)';
			aLi[i].style.display='none';
		}else{			
			aLi[i].style.opacity='1';
			aLi[i].style.filter='alpha(opacity=100)';
		}
	}

	//点击左边
	oPrev.onclick=function(){
		if(now<=0) return;
		if(!ready) return;
		ready=false;

		var i=now-1;
		var timer=setInterval(function(){
			//第一列
			if(i%10 == now-1){
				aLi[i].style.display='block';
				animate(aLi[i],{
					left:0,
					opacity:100
				})
			//第二列
			}else if(i%10 == now){
				animate(aLi[i],{
					left:200
				})
			//第三列
			}else if(i%10 == now+1){
				animate(aLi[i],{
					left:400
				})
			//第四列
			}else if(i%10 == now+2){
				animate(aLi[i],{
					left:600
				})
			//第五列
			}else if(i%10 == now+3){
				animate(aLi[i],{
					left:800,
					opacity:0
				},{
					cb:function(){
						this.style.display='none';
						if(parseInt(i)){
							ready = true;
						}
					}
				})
			}

			i++;


			if(i > aLi.length-1){
				clearInterval(timer);
				now--;
			}
		},40)
	};
	//点击右边
	oNext.onclick=function(){
		if(now >= aLi.length/2-4) return;
		if(!ready) return;
		ready=false;

		var i=now;

		var timer=setInterval(function(){
			//第一列
			if(i%10 == 0+now){
				animate(aLi[i],{
					left:-200,
					opacity:0
				},{
					cb:function(){
						this.style.display='none';
					}
				})
				
			//第二列
			}else if(i%10 == 1+now){
				animate(aLi[i],{
					left:0
				})
			//第三列
			}else if(i%10 ==2+now){				
				animate(aLi[i],{
					left:200
				})
			//第四列
			}else if(i%10 == 3+now){
				animate(aLi[i],{
					left:400
				})
			//第五列
			}else if (i%10 ==4+now){
				aLi[i].style.display='block';
				animate(aLi[i],{
					left:600,
					opacity:100
				},{
					cb:function(){
						if(this.index>10){
							ready = true;
						}
					}
				})
			}

			i++;

			if(i > aLi.length-1){
				clearInterval(timer);
				now++;
			}
		},40) ;
	};
})