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
	var oList=document.getElementById('list'),
		oUl=oList.children[1],
		oBtn=oList.children[0],
		aLi=oUl.children,
		bOpen=false,
		time=200,
		type=['Cubic','easeOut']
		space=70;
	//布局转化
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.opacity = 0;
		aLi[i].style.filter = 'alpha(opacity=0)';
		aLi[i].style.top = aLi[i].offsetTop+'px';
		if(i%2){
			aLi[i].style.left = '-318px';
		}else{
			aLi[i].style.left = '318px';
		}
	}

	for(var i=0;i<aLi.length;i++){
		aLi[i].style.position = 'absolute';
		aLi[i].onmouseover=function(){
			animate(this,{
				backgroundColor: '#0066FF',
				color:'#fff'
			})
		};		
		aLi[i].onmouseout=function(){
			animate(this,{
				backgroundColor: '#fff',
				color: '#000'
			})
		};
	}

	oUl.style.display = 'none';

	oBtn.onclick=function(){
		oUl.style.display = 'block';
		if(!ready) return;
		ready=false;
		var tips=this.getElementsByTagName('i')[0];
		bOpen=!bOpen;
		if(bOpen){
			var i=0;
			tips.className = 'less';

			var timer = setInterval(function(){
				aLi[i].style.display='block';
				animate(aLi[i],{
					left:0,
					opacity:100
				},{
					time: time,
					type: type,
					cb:function(){
						if(i == aLi.length-1){
							ready = true;
						}
					}
				})
				i++;
				if(i > aLi.length-1){
					clearInterval(timer);
				}
			},space)
		}else{
			var i=aLi.length-1;
			var j=0;
			tips.className = 'more';
			var timer = setInterval(function(){
				if(i%2){
					animate(aLi[i],{
						left:-318,
						opacity:0
					},{
						time: time,
						type: type,
						cb:function(){
							this.style.display='none';
							if(i==0){
								ready = true;
							}
						}
					})
				}else{					
					animate(aLi[i],{
						left:318,
						opacity:0
					},{						
						time: time,
						type: type,
						cb:function(){
							this.style.display='none';
						}
					})
				}
				i--;
				if(i<0){
					clearInterval(timer);
				}
			},space)		
		}
	};
})