function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj, false)[attr];
		}
};
function $(id){
	return document.getElementById(id);
}
function startMove(obj,json,callback){
	clearInterval(obj.timer);		
	obj.timer=setInterval(function(){
		//假设所有属性都已经运动到指定值
		var bStop=true;
		
		for(var sAttr in json){		
			var current=0;
			if(sAttr=="opacity"){
				current=Math.round(parseFloat(getStyle(obj, sAttr))*100);
			}else{
				current=parseInt(getStyle(obj,sAttr));
			}
			var speed=(json[sAttr]-current)/5;			
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(current!=json[sAttr]){
				bStop=false;
			}
			if(sAttr=="opacity"){
				obj.style.filter="alpha(opacity:"+(current+speed)+")";
				obj.style.opacity=(current+speed)/100;
			}else{
				obj.style[sAttr]=current+speed+"px";	
			}
		};
		
		if(bStop){
			clearInterval(obj.timer);
			if(callback){
				callback();
			}
		}			
	},30)
}
//选项卡类
function Tab(id){			
	var _this=this;
	this.oDiv=document.getElementById(id);
	this.aLi=this.oDiv.getElementsByTagName("ul")[0].getElementsByTagName("li");
	this.aDiv=this.oDiv.getElementsByTagName("div");
	for(var i=0;i<this.aLi.length;i++){
		this.aLi[i].index=i;
		this.aLi[i].onmouseover=function(){
			_this.toChange(this);
		}
	}
}
Tab.prototype.toChange=function(obj){		
	for(var j=0;j<this.aLi.length;j++){
		this.aLi[j].getElementsByTagName('a')[0].className="";
		this.aDiv[j].style.display="none";
	}
	this.aLi[obj.index].getElementsByTagName('a')[0].className="active";
	this.aDiv[obj.index].style.display="block";
}