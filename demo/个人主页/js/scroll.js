$(function(){
	var leftPos=0,time;
	function scroll(){		
		leftPos-=960;
		if(leftPos==-960*$('.banner li img').length) leftPos=0;
		$('.banner>ul').animate({left:leftPos},500);		
		time=setTimeout(scroll,5000);
	};
	setTimeout(scroll,5000);
})