$(document).ready(
				function(){
					$('img').fadeIn('slow');					
					$('ul#picsshow').innerfade({
						speed: 1000,
						timeout: 5000,
						type: 'sequence',
						containerheight: '220px'
					});
				
			});