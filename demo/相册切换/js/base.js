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
		if(i>=12){
			aLi[i].style.top='400px';
		}else{
			aLi[i].style.top=parseInt(i/4)*200+'px';
		}
	}

	for(var i=0;i<aLi.length;i++){
		aLi[i].style.position='absolute';
	}


	for(var i=0;i<8;i++)
	{
		aLi[i].style.filter='alpha(opacity:100)';
		aLi[i].style.opacity=1;
	}
	//让下面的图片都隐藏
	for(var i=8;i<aLi.length;i++)
	{
		aLi[i].style.filter='alpha(opacity:0)';
		aLi[i].style.opacity=0;
	}

	oPrev.onclick=function(){
		if(now==0)
		{
			return;
		}
		
		if(!ready)return;
		ready=false;
		
		var i=now+8-1;
		var timer=setInterval(function (){
			if(i<now)			//第一行
			{
				if(i==now-4)
				{	
					animate(aLi[i],{
						top:0,
						opacity:100
					},{
						type:v,
						cb:function(){
							ready=true;
						}
					})
				}
				else
				{
					animate(aLi[i],{
						top:0,
						opacity:100
					},{
						type:v
					})
				}
			}
			else if(i<now+4)	//第二行
			{
				animate(aLi[i],{
					top:200
				},{
					type:v
				})
			}
			else			//第三行
			{	

				animate(aLi[i],{
					top:400,
					opacity:0
				},{
					type:v
				})
			}
			
			i--;
			if(i==now-5)
			{
				now-=4;
				clearInterval(timer);
			}
		}, 40);
	};

	oNext.onclick=function(){
		//0
		if(now>=aLi.length-8)
		{
			return;
		}
		
		if(!ready)return;
		ready=false;
		
		var i=now;
		var timer=setInterval(function (){
			if(i<now+4)			//第一行
			{
				animate(aLi[i],{
					top:-200,
					opacity:0
				},{
					type:v
				})
			}
			else if(i<now+8)	//第二行
			{
				animate(aLi[i],{
					top:0
				},{
					type:v
				})
			}
			else			//第三行
			{
				if(i==now+11)
				{
					animate(aLi[i],{
						top:200,
						opacity:100
					},{
						type:v,
						cb:function(){
							ready=true;
						}
					})
				}
				else
				{
					animate(aLi[i],{
						top:200,
						opacity:100
					},{
						type:v
					})
				}
			}
			
			i++;
			if(i==now+12)
			{
				now+=4;
				clearInterval(timer);
			}
		}, 40);
	};
})