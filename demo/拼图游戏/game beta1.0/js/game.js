var timer,leave,paused=true;
var positionNum=[1,2,3,4,5,6,7,8,9];

window.onload=function(){
	var position=getByClass("position");
	function changeItem(event){
		var theEvent=event?event:window.event;
		var theSrc=event.target?event.target:event.srcElement;		
		var index=theSrc.value;
		item.src="image/item/item"+index+".jpg";
		var positionSrc=item.src.charAt(item.src.length-5);
		for(var i=0;i<position.length;i++){
			position[i].src="image/item/item"+positionSrc+"_"+(i+1)+".jpg";
		};
	};
	function startGame(){
		var imgs=$("content").childNodes;
		for(var i=0;i<imgs.length;i++){
			makeDraggable(imgs[i]);
		}
		items.style.visibility="hidden";
		time.style.visibility="hidden";
		this.disabled=true;
		item.src="image/come.jpg";
		timeBegin();
	};
	function restartGame(){
		marks=0;
		leave=0;
		isMarked=[true,true,true,true,true,true,true,true,true];
		var imgs=$("content").childNodes;
		for(var i=0;i<imgs.length;i++){
			disDraggablePure(imgs[i]);
		}
		clearTimeout(timer);
		start.disabled=false;		
		items.style.visibility="visible";
		time.style.visibility="visible";
		var index=$("items").value;
		item.src="image/item/item"+index+".jpg";
		minutes.innerHTML="00";
		second.innerHTML="00";
		mask.style.display="none";
		setPosition();
	};
	function timeBegin(){
		var level=time.value;
		var timeLeave=parseInt(level);
		leave=timeLeave;
		timeLeaveBegin();
	};
	function timeLeaveBegin(){
		if(leave==60){
			minutes.innerHTML="00";
			second.innerHTML="59";
			leave--;
			timer=setTimeout(timeLeaveBegin,1000)
		}else if(leave==0){
			clearTimeout(timer);
			gameOver();
		}else{
			leave--;
			minutes.innerHTML="00";
			if(leave<10){
				leave="0"+leave;
			}
			second.innerHTML=leave;
			timer=setTimeout(timeLeaveBegin,1000);
		}
	};
function setPosition(){		
		for(var i=0;i<positionNum.length;i++){
		position[i].style.left=10+positionNum[i]*20*(Math.random()*3)+"px";
		position[i].style.top=10+positionNum[i]*20*(Math.random()*3)+"px";
		position[i].style.opacity="0.7";
		position[i].style.filter="Alpha(opacity=70)";
		position[i].onmouseover=addOpacity;
		position[i].onmouseout=divOpacity;
		position[i].index=i;
		};
		marks=0;
	};
	function addOpacity(){
		position[this.index].style.opacity="1";
		position[this.index].style.filter="Alpha(opacity=100)";
		position[this.index].style.zIndex=100;
		var theIndex=parseInt(this.index);
		for(var i=0;i<positionNum.length;i++){
			if(theIndex!=positionNum[i]){
				position[i].style,zIndex=50;
			}
		}
	};
	function divOpacity(){
		position[this.index].style.opacity="0.7";
		position[this.index].style.filter="Alpha(opacity=70)";
		position[this.index].style.zIndex=50;
		var theIndex=parseInt(this.index);
		for(var i=0;i<positionNum.length;i++){
			if(theIndex!=positionNum[i]){
				position[i].style,zIndex=100;
			}
		}
	};
	var tipsBttom=50;
	var showEd=true;
	function showHelp(){
		if(showEd){
			tipsBttom+=10;
			if(tipsBttom<350){
			tips.style.clip="rect(0px,200px,"+tipsBttom+"px,0px)";
			setTimeout(showHelp,10);			
			}else{
				showEd=false;}
		}else{
			tipsBttom-=10;
			if(tipsBttom>40){
			tips.style.clip="rect(0px,200px,"+tipsBttom+"px,0px)";
			setTimeout(showHelp,10);
			}else{
				showEd=true;
			}
		}		
	}
	var mask=$("mask");
	var items=$("items");
	var item=$("item");
	var time=$("time");
	var start=$("start");
	var refresh=$("refresh");
	var restart=$("restart");
	var minutes=$("minutes");
	var second=$("second");
	var tips=$("tips");
	
	start.disabled=false;
	tips.onclick=showHelp;
	items.onchange=changeItem;
	items.onfocus=changeItem;
	start.onclick=startGame;
	refresh.onclick=setPosition;
	restart.onclick=restartGame;
	items.focus();
	setPosition();
};
	function gameOver(){
		if(leave==0&&marks<9){
			mask.style.display="block";
			mask.style.zIndex=150;
			mask.innerHTML="<div id='maskIn'></div>";
			$("maskIn").className="lose";
			clearTimeout(timer);
		}else if(marks==9&&leave>0){
			mask.style.display="block";
			mask.style.zIndex=150;
			mask.innerHTML="<div id='maskIn'></div>";
			$("maskIn").className="win";
			clearTimeout(timer);
		}else{
			return ;
		};
	};