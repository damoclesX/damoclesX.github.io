Object.prototype.addEvent=function(event,func){
	if(document.addEventListener){
		document.addEventListener(event,func,false);
	}else if(document.attachEvent){
		document.attachEvent(event,func);
	}else{
		return false;
	}
};
Object.prototype.removeEvent=function(){
	if(document.removeEventListener){
		document.removeEventListener(event,func,false);
	}else if(document.detachEvent){
		document.detachEvent(event,func);
	}else{
		return false;
	}
};
var $=function (ele){
		return  document.getElementById(ele);
};