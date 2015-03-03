var getByClass=function (className){
	var theClass=className.toString();
	if(document.getElementByClassName){
		return document.getElementsByClassName(theClass);
	}else if(document.querySelectorAll){
		return document.querySelectorAll("."+theClass);
	}else{
		var result=[];
		var allElements=document.getElementsByTagName("*");		
		for(var i=0;i<allElements.length;i++){
			if(allElements[i].className==theClass){
				result.push(allElements[i]);
			}else{
				continue;
			}
		}
		return result;
	}
}