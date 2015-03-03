//———————————————————————————下面是实现拖放功能的代码(带有横线的实现拖动)—————————————————————————————
//——————————————创建两个全局对象——————————
var dragObject=null;
var mouseOffset=null;
//为了判断图片是否移动到了正确位置
var witchDrag=0;
var marks=0;
var isMarked=[true,true,true,true,true,true,true,true,true];
//——————————————捕获鼠标相关事件——————————————
document.onmousemove=mouseMove;
document.onmouseup=mouseUp;
//	——————————————创建一个鼠标位置——————————————
function mousePoint(x,y){
	this.x=x;
	this.y=y;
};
//——————————————寻找鼠标位置——————————————
function mousePosition(e){
	var x=parseInt(e.clientX);
	var y=parseInt(e.clientY);
	
	return new mousePoint(x,y);
};
//——————————————获取元素在页面中的偏移量——————————————
function getMouseOffset(target,event){
	var theEvent=event ? event:window.event;
	var mousePos=mousePosition(theEvent);
	
	var x=mousePos.x-target.offsetLeft;
	var y=mousePos.y-target.offsetTop;
	
	return new mousePoint(x,y);
};
//当图片位置正确的情况下增加仅有的一次得分
function addMarks(index){
	var dragged=$("position"+index);
	dragged.onmouseout=null;
	var leftPos=parseInt(dragged.style.left);
	var topPos=parseInt(dragged.style.top);
	switch(index){
		case 1:
			if(leftPos==0&&topPos==0){
				if(isMarked[0]==true){
					marks++;
					isMarked[0]=false;
				}
			};
		break;
		case 2:
			if(leftPos==200&&topPos==0){
				if(isMarked[1]==true){
					marks++;
					isMarked[1]=false;
				}
			};
		break;	
		case 3:
			if(leftPos==400&&topPos==0){				
				if(isMarked[2]==true){
					marks++;
					isMarked[2]=false;
				}
			};
		break;	
		case 4:
			if(leftPos==0&&topPos==200){
				if(isMarked[3]==true){
					marks++;
					isMarked[3]=false;
				}
			};
		break;	
		case 5:
			if(leftPos==200&&topPos==200){
				if(isMarked[4]==true){
					marks++;
					isMarked[4]=false;
				}
			};
		break;	
		case 6:
			if(leftPos==400&&topPos==200){
				if(isMarked[5]==true){
					marks++;
					isMarked[5]=false;
				}
			};
		break;	
		case 7:
			if(leftPos==0&&topPos==400){
				if(isMarked[6]==true){
					marks++;
					isMarked[6]=false;
				}
			};
		break;	
		case 8:
			if(leftPos==200&&topPos==400){
				if(isMarked[7]==true){
					marks++;
					isMarked[7]=false;
				}
			};
		break;	
		case 9:
			if(leftPos==400&&topPos==400){
				if(isMarked[8]==true){
					marks++;
					isMarked[8]=false;
				}
			};
		break;	
		default:
			return false;
	};
	//debug:分数是否正确
	//info_marks.innerHTML="分数"+marks;
	gameOver();
}
//——————————————停止拖放——————————————
function mouseUp(e){
	dragObject=null;
};
//——————————————当拖放时鼠标的移动——————————————
function mouseMove(event){
	if(!dragObject) return ;
	var theEvent=event? event:window.event;
	var mousePos=mousePosition(theEvent);
	//如果可拖放，设置新的位置
	if(dragObject){
		dragObject.style.position="absolute";
		dragObject.style.left=mousePos.x-mouseOffset.x+"px";
		dragObject.style.top=mousePos.y-mouseOffset.y+"px";
		witchDrag=parseInt(dragObject.id.charAt(dragObject.id.length-1));
		rightPosition();
		return false;
	}
	
};
//当图片放置到合适位置时固定，取消鼠标移动事件,绑定加分事件
function fixed(index){
	var dragged=$("position"+index);
	dragged.style.position="absolute";
	dragged.onmouseover=null;
	dragged.onmouseout=function (){
		addMarks(index);
	};
	dragged.style.opacity="1";
	dragged.style.filter="Alpha(opacity=100)";
	dragged.style.zIndex=50;
	//debug:测试获取的图片序列是否正确
	//info.innerHTML="第"+index+"张图片";
}
//判断是否移动到了正确位置；
function rightPosition(){
		var dragged=$("position"+witchDrag);
		if(!dragged) return;
		var leftPos=parseInt(dragged.style.left);
		var topPos=parseInt(dragged.style.top);
		switch(witchDrag){
			case 1:
				if(leftPos>=-5&&leftPos<=5&&topPos>=-5&&topPos<=5){
					disDraggable(1);
					dragged.style.left=0
					dragged.style.top=0;
				};
				break;
			case 2:
				if(leftPos>=195&&leftPos<=205&&topPos>=-5&&topPos<=5){
					disDraggable(2);
					dragged.style.left=200+"px";
					dragged.style.top=0;	

				};
				
				break;
			case 3:
				if(leftPos>=395&&leftPos<=405&&topPos>=-5&&topPos<=5){
					disDraggable(3);
					dragged.style.left=400+"px";
					dragged.style.top=0;
					
				};
				
				break;
			case 4:
				if(leftPos>=-5&&leftPos<=5&&topPos>=195&&topPos<=205){
					disDraggable(4);
					dragged.style.left=0
					dragged.style.top=200+"px";
					
				};
				
				break;
			case 5:
				if(leftPos>=195&&leftPos<=205&&topPos>=195&&topPos<=205){
					disDraggable(5);
					dragged.style.left=200+"px";
					dragged.style.top=200+"px";
					
				};
				
				break;
			case 6:
				if(leftPos>=395&&leftPos<=405&&topPos>=195&&topPos<=205){
					disDraggable(6);
					dragged.style.left=400+"px";
					dragged.style.top=200+"px";
					
				};
				
				break;
			case 7:
				if(leftPos>=-5&&leftPos<=5&&topPos>=395&&topPos<=405){
					disDraggable(7);
					dragged.style.left=0;
					dragged.style.top=400+"px";
					
					};
					
				break;
			case 8:
				if(leftPos>=195&&leftPos<=205&&topPos>=395&&topPos<=405){
					disDraggable(8);
					dragged.style.left=200+"px";
					dragged.style.top=400+"px";

				};
				
				break;
			case 9:
				if(leftPos>=395&&leftPos<=405&&topPos>=395&&topPos<=405){
					disDraggable(9);
					dragged.style.left=400+"px";
					dragged.style.top=400+"px";
					
				};
				
				break;
			default:
				return false;
		};
	}
//——————————————使对象可以拖放——————————————
function makeDraggable(item){
	if(item){
		var item=$(item)||item;
		item.onmousedown=function(event){
			dragObject=this;
			mouseOffset=getMouseOffset(this,event);
			return false;
		}
	}
};
//——————————————使对象不能拖动——————————————
function disDraggable(index){
	dragObject=null;
	//当图片位置正确时
	fixed(index);
};
function disDraggablePure(item){
	if(item){
		var item=$(item)||item;
		item.onmousedown=null;
	}
}