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
ready(function(){
	var oSlider=document.getElementById('slider');
	var aContents=oSlider.getElementsByTagName('ul')[0].getElementsByTagName('li');
	var aBtns=oSlider.getElementsByTagName('ol')[0].getElementsByTagName('li');
	var oTip=oSlider.getElementsByTagName('p')[0];
	var dir=['top','bottom','left','right'];
	var i;
	var now=0;
	var pre=0;
	for(i=0;i<aBtns.length;i++){
		(function(index){
			aBtns[i].onclick=function(){
				pre=now;
				now=index;
				tab();
			};
		})(i)
		
	}
	//自动播放
	var timer=setInterval(function(){
		pre=now;
		now++;
		tab();
	},4000);

	oSlider.onmouseover=function(){
		clearInterval(timer);
	};
	oSlider.onmouseout=function(){
		timer=setInterval(function(){
			pre=now;
			now++;
			tab();
		},4000);
	}
	function tab(){
		if(now == aBtns.length){
			now=0;
		}
		for(i=0;i<aBtns.length;i++){
			aBtns[i].className='';
			aContents[i].style.zIndex='0';
			aContents[i].style.opacity='0.7';
			aContents[i].style.filter='alpha(opacity=70)';
		}
		aBtns[now].className='active';
		var d=dir[parseInt(Math.random()*4)];

		var j={};
		switch(d){
			case 'left':
				j['left']=-698;
				break;
			case 'right':
				j['left']=698;
				break;
			case 'top':
				j['top']=-258;
				break
			case 'bottom':
				j['top']=258;
				break;
		}
		
		aContents[pre].style.zIndex='2';
		animate(aContents[pre],j,{
			cb:function(){
				this.style.left=0;
				this.style.top=0;
				this.style.zIndex=0;
			},
			time: 800,
			type:['Cubic','easeOut']
		})
		aContents[now].style.zIndex='1';
		aContents[now].style.opacity='1';
		aContents[now].style.filter='alpha(opacity=100)';
		oTip.innerHTML=aContents[now].children[0].alt;
	}
})