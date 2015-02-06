$(function(){
	$('.body_fast_banner_login_notice div:gt(0)').hide();
	//分类tab切换
	$('.body_classify ul li').hover(function(){
		$('.body_classify_list').show();
		var index=$('.body_classify ul li').index($(this));
		$('.body_classify_lists').eq(index).fadeIn().siblings().hide();
	},function(){

	});
	$('.body_classify_list').hover(function(){
		
	},function(){
		$('.body_classify_list').fadeOut();
	})
	//焦点图切换
			var time;
			var first_index=0;
			$('.banner_num li').mouseover(function(){
				clearTimeout(time);
				var index=$('.banner_num li').index(this);
				$(this).addClass('banner_num_now').siblings().removeClass();
				action(index);				
			}).mouseout(function(){
				time=setTimeout(begin,4000);
			});
			$('.banner_img li').mouseover(function(){
				clearTimeout(time);
			}).mouseout(function(){
				time=setTimeout(begin,4000);
			});
			function action(indexNum){
				var topPos=(indexNum)*(-443);
				$('.banner_img_list').animate({
					left:topPos
				},'normal');
			}
			function begin(){
				$('.banner_num li').eq(first_index).addClass('banner_num_now').siblings().removeClass();
				action(first_index);
				first_index+=1;
				var max=$('.banner_num li').length;
				if(first_index==max) first_index=0;
				time=setTimeout(begin,4000);
			}
			begin();
	//公告tab切换
	$('.body_fast_banner_login_notice_nav li a').mouseover(function(){
		$('.notice_now').removeClass();
		$(this).addClass('notice_now');
		var index=$('.body_fast_banner_login_notice_nav li ').index($(this).parent());
		$('.tab_notice').eq(index).show().siblings('div').hide();
	});
	//新品和热卖的滚动
	$('.new_left img').mouseover(function(){
			$('.body_new .products_list').animate({
			left:0
		},'slow')
	});
	$('.new_right img').mouseover(function(){
		$('.body_new .products_list').animate({
			left:-800
		},'slow')
	});
	$('.hot_left img').mouseover(function(){
			$('.body_hot .products_list').animate({
			left:0
		},'slow')
	});
	$('.hot_right img').mouseover(function(){
			$('.body_hot .products_list').animate({
			left:-800
		},'slow')
	});
	//图片透明度变化
	$('a img').hover(function(){
		$(this).css('opacity','0.5');
	},function(){
		$(this).css('opacity','1');
	});
	//回到顶部
	$(window).scroll(function(){
						var  top=$(this).scrollTop();
						if(top>=200){
							$('#backtop').fadeIn();
						}else{
							$('#backtop').fadeOut('fast');
						}
				});
			$('#backtop').click(function(){
					$(window).scrollTop(0);
				})
})