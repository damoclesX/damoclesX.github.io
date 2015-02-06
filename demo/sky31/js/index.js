function ready(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',fn,false)
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
	var all=oParent.getElementsByTagName('*');
	var re=new RegExp('(\\s+|^)'+sClass+'(\\s+|$)');
	var result=[];
	for(var i=0;i<all.length;i++){
		if(re.test(all[i].className)){
			result.push(all[i])
		}
	}
	return result;
}
//选项卡函数
function tabs(json){
	var oBox=document.getElementById(json.id) || json.id;
	if(!oBox){
		console.log('没有找到id为'+json.id+'元素');
		return;
	}
	json.event=json.event || 'mouseover';
	json.autoplay=json.autoplay || false;
	json.time=json.time || 1000;
	var aBtns=getByClass(oBox,'tab_btns')[0];
	if(!aBtns) return;
	aBtns=aBtns.getElementsByTagName('li');
	var aContents=getByClass(oBox,'tab_contents_box') || getByClass(oBox,'tab_contents')[0].getElementsByTagName('li') ;
	var timer=null;
	var index=0;
	for(var i=0; i<aBtns.length;i++){
		aBtns[i].index=i;
		aBtns[i]['on'+json.event]=function(){
			if(index==this.index){
				return ;
			}else{
				index=this.index;
			}
			tab();
		}
	};
	function tab(){
		for(var i=0; i<aBtns.length;i++){
			aBtns[i].className='';
			aContents[i].style.display='none';				
		}
		aBtns[index].className='active';
		aContents[index].style.display='block';	
	};
	function next(){
		index++;
		if(index==aBtns.length){
			index=0;
		}
		tab();
	};
	if(json.autoplay){
		timer=setInterval(next,json.time);
		oBox.onmouseover=function(){
			clearInterval(timer);
		};				
		oBox.onmouseout=function(){
			timer=setInterval(next,json.time);
		};
	};
}

ready(function(){
	//选项卡
	var aTabBox=getByClass(document,'content-classify-rows');
	for(var i=0;i<aTabBox.length;i++){
		tabs({
			id:aTabBox[i]
		})
	}
	//幻灯片
	var oSlider=document.getElementById('slider');
	var iSliderNow=0;
	var space=5;
	var timer=null;
	var aSliderBtns=oSlider.getElementsByTagName('ol')[0].getElementsByTagName('li');
	var oSliderContent=oSlider.getElementsByTagName('ul')[0];
	var aSliderContents=oSliderContent.getElementsByTagName('li');
	var oSliderURL=oSlider.parentNode.getElementsByTagName('p')[0].getElementsByTagName('a')[0];

	for(var i=0;i<aSliderBtns.length;i++){
		(function(index){
			aSliderBtns[index].onmouseover=function(){
				iSliderNow=index;
				change();
			};
		})(i)
	}
	function change(){
		if(iSliderNow > aSliderContents.length-1){
			iSliderNow=0;
		}
		for(var j=0;j<aSliderBtns.length;j++){
			aSliderBtns[j].className='';
		}
		aSliderBtns[iSliderNow].className='active';
		var thisAnor=aSliderContents[iSliderNow].getElementsByTagName('a')[0];
		oSliderURL.href=thisAnor.href;
		oSliderURL.innerHTML=thisAnor.getElementsByTagName('img')[0].alt;
		animate(oSliderContent,{
			top:-iSliderNow*aSliderContents[0].offsetHeight
		})
	}
	oSlider.parentNode.onmouseover=function(){
		clearInterval(timer);
	};
	oSlider.parentNode.onmouseout=function(){
		timer=setInterval(function(){
			iSliderNow++;
			change();
		},space*1000)
	}
	timer=setInterval(function(){
		iSliderNow++;
		change();
	},space*1000);
	//点击幻灯效果
	var oSliderClick=document.getElementById('slider_click');
	var iSliderClickNow=0;
	var oSliderClickContent=oSliderClick.getElementsByTagName('ul')[0];
	var aSliderClickContents=oSliderClick.getElementsByTagName('li');
	oSliderClickContent.style.width=aSliderClickContents.length*aSliderClickContents[0].offsetWidth+'px';

	var oPrev=getByClass(oSliderClick,'prev')[0];	
	var oNext=getByClass(oSliderClick,'next')[0];

	oPrev.onclick=function(){
		iSliderClickNow--;
		changeClick();
	};
	oNext.onclick=function(){
		iSliderClickNow++;
		changeClick();
	};
	function changeClick(){
		if(iSliderClickNow<0){
			iSliderClickNow=aSliderClickContents.length-1;
		}else if(iSliderClickNow>aSliderClickContents.length-1){
			iSliderClickNow=0;
		}
		animate(oSliderClickContent,{
			left:-iSliderClickNow*aSliderClickContents[0].offsetWidth
		},{
			type:['Bounce','easeOut']
		})
	}
})