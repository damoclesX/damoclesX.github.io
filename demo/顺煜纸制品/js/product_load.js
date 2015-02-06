$(document).ready(function(){
	var li=$('.major_product li:not(:first):not(:last)');
	$(li).children('a').click(function(){	
		$(this).parent().siblings().removeClass('current_product');
		$(this).parent().addClass('current_product')	
		href=$(this).attr('href');
		$('#marjor_product').load(href);
		return false;
		});
	$('#prev').click(function(){
		var current_product=$('.current_product');
		var index=li.index(current_product);
		index-=1;
		$(li).eq(index).children('a').click();
		if(index==-1){
			alert('this is first page!')}
		return false;
		
		});
	$('#next').click(function(){
		var current_product=$('.current_product');
		var index=li.index(current_product);
		index+=1;
		$(li).eq(index).children('a').click();
		if(index==10){
			alert('this is last page!')}
		return false;
		});
	})// JavaScript Document