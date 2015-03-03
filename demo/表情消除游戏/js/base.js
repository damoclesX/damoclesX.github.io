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
function $(id){
	return document.getElementById(id);
}

ready(function(){
	var oBox=$('box'),
		oBtn=$('btn'),
		oGet=$('get'),
		oStage=$('stage'),
		timer=null,
		maintimer=null,
		speed=1,
		space=2000;

	oBtn.onclick=function(){
		this.disabled=true;
		this.value='游戏中...';
		maintimer=setInterval(function(){
 			begin();
		},space)
	}
	function begin(){
		var oDiv=document.createElement('div');
		oDiv.style.backgroundImage='url(images/d'+parseInt(Math.random()*114+1)+'.gif)';
		oDiv.style.left=Math.floor(Math.random()*(oStage.offsetWidth-60))+1+'px';
		oDiv.style.top=oDiv.offsetHeight+'px';
		oStage.appendChild(oDiv);
		oDiv.clicked=false;
		oDiv.onclick=function(){
			if(this.clicked) return;
			this.clicked=true;
			this.style.backgroundImage='url(images/b.gif)';	
			clearInterval(this.timer);
			shakeA(this);
			//shakeA(this);
			//oStage.removeChild(oDiv);
		};
		oDiv.timer=setInterval(function(){
			oDiv.style.top=oDiv.offsetTop+speed+'px';
			if(oDiv.offsetTop >oStage.offsetHeight-oDiv.offsetHeight){
				shakeB(oBox);			
				clearInterval(oDiv.timer);
				oStage.removeChild(oDiv);
				oGet.innerHTML=parseInt(oGet.innerHTML)-1;
				if(parseInt(oGet.innerHTML)<0){
					alert('游戏结束');
					window.location=window.location;
				}
			}
		},30)
	}
	function shakeA(obj){		
		obj.i=6;
		obj.l=obj.offsetLeft;
		obj.tmp=setInterval(function(){
			if(obj.i<0){					
				if(obj.parentNode) obj.parentNode.removeChild(obj);
				oGet.innerHTML=parseInt(oGet.innerHTML)+1;
				if(parseInt(oGet.innerHTML)%10 == 0){
					speed++;
				}
				clearInterval(obj.tmp);
			}
			obj.style.left=obj.l+10-Math.floor(Math.random()*20)+'px';
			obj.i--;
		},30)
	}
	function shakeB(obj){
		obj.i=6;
		obj.tmp=setInterval(function(){
			obj.style.top=5-Math.floor(Math.random()*10)+'px';
			obj.style.left=5-Math.floor(Math.random()*10)+'px';
			obj.i--;
			if(obj.i<0){
				clearInterval(obj.tmp);	
				obj.style.top=0+'px';
				obj.style.left=0+'px';
			}
		},30);
	}
})