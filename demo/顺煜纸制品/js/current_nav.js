$(document).ready(function(){
	var height=$('.right').height();
	$('.left').css('height', height)
	var url=window.location.pathname;
	url=new String(url);
	$('.left a').each(function(){
	var href=$(this).attr('href');
	if(url.indexOf(href)!=-1){
		$('.left li').removeClass();
		$(this).parent('li').addClass('current_nav');
		}
	});
	function addBookmark(title,url) {
		 if (window.sidebar) {
 			window.sidebar.addPanel(title,url,"");
 			}
		 else if( document.all ) {
 			window.external.AddFavorite(url,title);
 			} 
		else if( window.opera && window.print ) {
			 return false;
			}
 		}
});
