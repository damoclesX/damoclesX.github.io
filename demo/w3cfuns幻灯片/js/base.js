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
	var result=[],
	all=oParent.getElementsTagName('*'),
	re=new RegExp('(\\s+|^)'+sClass+'(\\s+|$)');
	i=0;
	for(;i<all.length;i++){
		if(re.test(all[i].className)){
			result.push(all[i]);
		}
	}
	return result;
}
ready(function(){		
	var oSlider=document.getElementById('slider');
	var oContent=oSlider.getElementsByTagName('ul')[0];
	oContent.innerHTML+=oContent.innerHTML;		
	oContent.style.width=oContent.children.length*900+'px';
	var aBtns=getByClass(oSlider,'slider-btn');
	var iNow=0;
	var l=0;
	var w=oContent.offsetWidth/2;
	//绑定事件
	for(var i=0;i<aBtns.length;i++){
		(function(index){
			aBtns[index].onmouseover=function(){
				animate(this,{
					opacity:100
				})
			};
			aBtns[index].onmouseout=function(){
				animate(this,{
					opacity:50
				})
			};				
			aBtns[index].onclick=function(){
				if(this.className.indexOf('slider-prev') != -1){
					iNow--;
					action(oContent,-iNow*900)
				}else if(this.className.indexOf('slider-next') != -1){
					iNow++;
					action(oContent,-iNow*900)
				}
			};
		})(i)
	}
	//自动播放
	var timer=null;
	timer=setInterval(function(){
		iNow++;
		action(oContent,-iNow*900);
	},5000);
	oSlider.onmouseover=function(){
		clearInterval(timer);
	};
	oSlider.onmouseout=function(){				
		timer=setInterval(function(){
			iNow++;
			action(oContent,-iNow*900);
		},5000);
	}
	
	function action(obj,target){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var speed=(target-l)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);

			if(target == l){
				clearInterval(obj.timer);
			}else{
				l+=speed;
				if(l<0){
					obj.style.left=l%w+'px';
				}else{													
					obj.style.left=-(w-l%w)%w+'px';
				}						
			}
		},30)
	}
})