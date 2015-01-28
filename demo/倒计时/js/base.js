function ready(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',fn,false);
	}else{
		document.attachEvent('onreadystatechange',function(){
			if(document.readyState == 'complete'){
				fn();
			}
		})
	}
}
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}

	var all=oParent.getElementsByTagName('*'),
		reg=new RegExp('(^|\\s+)'+sClass+'($|\\s+)'),
		result=[],
		i=0;
	for(;i<all.length;i++){
		if(reg.test(all[i].className)){
			result.push(all[i]);
		}
	}

	return result;
}
function $(id){
	return document.getElementById(id);
}
ready(function(){
	var oCutDown=$('cutdown'),
		op=$('op'),
		aValues=op.getElementsByTagName('input'),
		oBtns=getByClass(oCutDown,'buttons')[0],
		oTips=getByClass(oCutDown,'tips')[0].getElementsByTagName('span')[0],
		aBtns=oBtns.getElementsByTagName('a'),
		oStart=aBtns[0],
		oReset=aBtns[1],
		aDetail=getByClass(oCutDown,'detail')[0].getElementsByTagName('span'),
		timer=null;

	window.onload=function(){
		animate(op,{
			top:0
		})
	};

	oStart.onclick=function(){
		if(timer) return;
		if(!/^2\d{2}[^0123]$/.test(parseInt(aValues[0].value)) || !/(^[^0]$)|(^1[012]$)|(^0[^0]$)/.test(parseInt(aValues[1].value)) || !/(^[^0]$)|(^[12]\d$)|(^3[01]$)/.test(parseInt(aValues[2].value))){
			alert('请输入合法有效的年月日');
			return;
		}
		animate(op,{
			top:-84
		},{
			cb:function(){
				oTips.innerHTML=aValues[0].value+'<i>年</i>'+aValues[1].value+'<i>月</i>'+aValues[2].value+'<i>日</i>';
				
				tiktok(aValues[0].value,aValues[1].value,aValues[2].value,aDetail);
			}
		});
		
	};

	oReset.onclick=function(){
		clearInterval(timer);
		timer=null;
		animate(op,{
			top:0
		})
	};

	function tiktok(year,month,day,show){
		var oDate = new Date();
		oDate.setFullYear(parseInt(year));
		oDate.setMonth(parseInt(month)-1);
		oDate.setDate(parseInt(day));
		var time=oDate.getTime();
		timer=setInterval(function(){
			var space=parseInt((time-(new Date().getTime()))/1000);

			if(!space || space<0){
				alert('请输入当前日期之后的年月日');
				clearInterval(timer);
				timer=null;
				animate(op,{
					top:0
				})
				return;

			}

			show[0].innerHTML=toDouble(parseInt(space/86400));
			space%=86400;

			show[1].innerHTML=toDouble(parseInt(space/3600));
			space%=3600;

			show[2].innerHTML=toDouble(parseInt(space/60));
			space%=60;

			show[3].innerHTML=toDouble(parseInt(space))

		},1000)

		function toDouble(n){
			if(n<10){
				return '0'+n;
			}

			return ''+n;
		}

	}

})