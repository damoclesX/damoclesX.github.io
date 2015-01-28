/*
	animate运动库:可多物体多属性变化;
	调用函数：animate()
	参数说明：
		obj:	必要参数  单个element元素;
		json:	必要参数	css属性值对 ，类型为json/obejct
			#无单位
			#为简单样式，不为复合样式
			#在css样式表中，需定义要运动属性的默认值，如：left：200，需在css中声明:left：0
			#透明度属性为 opacity: 值为0-100的整数
			#颜色变化支持，color|backgroundColor ，属性值为 rgb | 16进制简写或全写 | 英文单词
		optional:	可选参数 ，类型为json/object
			#time:	动画在多少时间内完成，毫秒数，类型为number
			#type:	动画类型 ，类型为array
				——type详细参数
					匀速：['Linear']
					缓动 | 特殊效果:	[str1, str2]
						str1（缓动）可为：	Quad，Cubic，Quart，Quint，Sine，Expo，Circ 
						str1（特殊效果）可为：Back，Bounce，Elastic
						str2 可为：	easeIn，easeOut，easeInOut
					
			#cb:	回调函数，在动画完成后需要进行的操作，类型为function
	
	/——————————————————————————————/
	#damocles 
	#damocles2013@163.com
	#2013-09-07
*/

function animate(obj, json, optional){
	
	optional = optional || {};
	optional.time= optional.time || 700;
	optional.type= optional.type || ['Cubic', 'easeOut'];
	var count=parseInt(optional.time/30);
	count<1 && (count=1);
	
	var start={};
	var dis={};
	
	for(var i in json){
		if(i == 'opacity'){
			start[i]= parseFloat(getStyle(obj, i))*100;
			dis[i]= json[i]-start[i];
		}else if (i == 'color' || i == 'backgroundColor'){
			start[i]=toRGB(getStyle(obj,i).toString());
			var temp=toRGB(json[i]);
			dis[i]={};
			for(j in temp){
				dis[i][j]=temp[j]-start[i][j];
			}
		}else{
			start[i] = parseInt(getStyle(obj, i));
			dis[i]=json[i]-start[i];
		}		
	}
	//ol默认含有start属性
	obj.starts=start;
	obj.dis=dis;
	obj.n=0;
	
	if(!obj.timer){
		obj.timer=setInterval(function(){
			obj.n++;
			
			if(optional.type.length == 1){
				var fn=Tween[optional.type[0]];
			}else{
				var fn=Tween[optional.type[0]][optional.type[1]];
			}
			if(!fn){
				return '运动类型参数有误';
			}
			
			for(var i in json){
				if(i == 'opacity'){
					obj.style.opacity=fn(obj.n, obj.starts[i], obj.dis[i],count)/100;
					obj.style.filter='alpha(opacity:'+fn(obj.n, obj.starts[i], obj.dis[i],count)+')';
					
				}else if (i == 'color' || i == 'backgroundColor'){
					obj.style[i]= 'rgb('+parseInt(fn(obj.n, obj.starts[i].r, obj.dis[i].r,count))+','+parseInt(fn(obj.n, obj.starts[i].g, obj.dis[i].g,count))+','+parseInt(fn(obj.n, obj.starts[i].b, obj.dis[i].b,count))+')';
				}else{
					obj.style[i]=fn(obj.n, obj.starts[i], obj.dis[i],count)+'px';
				}
			}
			
			if(obj.n == count){
				clearInterval(obj.timer);
				obj.timer=null;
				optional.cb && optional.cb.call(obj);
			}
		},30)
	}
};
//获取样式
function getStyle(obj, name){
	return (obj.currentStyle || getComputedStyle(obj, null))[name];
};
//Tween类
var Tween={
	Linear: function(t,b,c,d){ return c*t/d + b; },
	Quad: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Expo: {
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {
		easeIn: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	Back: {
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	Bounce: {
		easeIn: function(t,b,c,d){
			return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
};
//常见颜色映射表
var dmColor={
	red:	[255,0,0],
	green:	[0,128,0],
	blue:	[0,0,255],
	magenta:	[255,0,255],
	yellow:[255,255,0],
	chocolate:[210,105,30],
	black:[0,0,0],
	aquamarine:[127,255,212],
	lime:[0,255,0],
	brown:[165,42,42],
	deeppink:[255,20,147],
	gray:[128,128,128],
	orange:[255,165,0],
	pink:[255,192,203],
	silver:[192,192,192],
	gold:[255,215,0]
};
//颜色转化为rgb格式
function toRGB(color){
	color=color.replace(/\s+/g,'');
	var result={r:0,g:0,b:0};
	if(/^#[a-f0-9]{3}$/i.test(color)  && color.length ==4){
		color='#'+color.charAt(1)+color.charAt(1)+color.charAt(2)+color.charAt(2)+color.charAt(3)+color.charAt(3);
	}
	
	if(/^#[a-f0-9]{6}$/i.test( color )){
		result.r= parseInt(color.substring(1,3),16);
		result.g= parseInt(color.substring(3,5),16);
		result.b= parseInt(color.substring(5,7),16);
	}else if(/^rgb\(\d{1,3},\d{1,3},\d{1,3}\)/i.test(color)){
		var arr=color.match(/\d+/g);
		result.r= parseInt(arr[0]);
		result.g= parseInt(arr[1]);
		result.b= parseInt(arr[2]);
	}else{
		if(dmColor[color]){
			result.r=dmColor[color][0];
			result.g=dmColor[color][1];
			result.b=dmColor[color][2];
		}
	}	
	return result;
};