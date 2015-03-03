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
		result=[],
		re=new RegExp('(\\s+|^)'+sClass+'(\\s+|$)'),
		i=0;
	for(;i<all.length;i++){
		if(re.test(all[i].className)){
			result.push(all[i]);
		}
	}
	return result;
}
ready(function(){
	var gameBtn=document.getElementById('gameBtn');
	var tips=document.getElementById('tips');
	gameBtn.onclick=function(){
		this.style.display='none';
		tips.style.display='none';
		game.init();
	};
})

var game={
	//当前关卡
	mission:1,
	score:0,
	scoreable:false,
	enemyable:false,
	aircraftable:false,
	stage:document.getElementById('game'),
	//每个关卡的数据
	missionData:{
		0:{
			easy:6,
			speedX:10,
			speedY:10,			
			space:4000
		},
		1:{
			easy:5,
			normal:1,
			speedX:10,
			speedY:10,	
			space:4000
		},
		2:{
			easy:4,
			normal:2,
			speedX:10,
			speedY:10,	
			space:4000
		},
		3:{
			high:6,			
			speedX:10,
			speedY:10,	
			space:4000
		}
	},
	//每个敌人的数据
	enemyDate:{
		easy:{
			style:'mf1',
			blood:1,
			speed:4,
			score:1
		},
		normal:{
			style:'mf2',
			blood:2,
			speed:5,
			score:2
		},
		high:{
			style:'mf3',
			blood:3,
			speed:6,
			score:3
		}
	},
	aircraftDate:{
		speed:2
	},
	init:function(){//游戏初始化
		document.title='第'+(this.mission+1)+'关'
		this.createScore();
		this.createEnemy();
		this.createAircraft();
	},
	createScore:function(){//创建积分信息
		if(this.scoreable) {return false};				
		var oScore=document.createElement('div');
		oScore.id='score';
		oScore.innerHTML='得分：<span>'+this.score+'</span>';
		this.scoreBox=oScore.getElementsByTagName('span')[0];
		this.scoreable=true;
		this.stage.appendChild(oScore);
	},
	createEnemy:function(){//创建敌人
		if(this.enemyable){
			clearInterval(this.enemy.timer);
			this.enemy.timer=null;
			this.stage.removeChild(getByClass(this.stage,'enemy')[0]);
		};
		var oUl=document.createElement('ul');
		oUl.className='enemy';
		this.enemyable=true;
		var easy=this.missionData[this.mission].easy || 0;
		var normal=this.missionData[this.mission].normal || 0;
		var high=this.missionData[this.mission].high || 0;
		if(high){
			for(var i=0;i<high*10;i++){
				var oLi=document.createElement('li');
				oLi.score=this.enemyDate.high.score;
				oLi.blood=this.enemyDate.high.blood;
				oLi.speed=this.enemyDate.high.speed;
				oLi.className=this.enemyDate.high.style;
				oUl.appendChild(oLi);
			}
		}

		if(normal){
			for(var i=0;i<normal*10;i++){
				var oLi=document.createElement('li');
				oLi.score=this.enemyDate.normal.score;
				oLi.blood=this.enemyDate.normal.blood;
				oLi.speed=this.enemyDate.normal.speed;
				oLi.className=this.enemyDate.normal.style;
				oUl.appendChild(oLi);
			}
		}

		if(easy){
			for(var i=0;i<easy*10;i++){
				var oLi=document.createElement('li');
				oLi.score=this.enemyDate.easy.score;
				oLi.blood=this.enemyDate.easy.blood;
				oLi.speed=this.enemyDate.easy.speed;
				oLi.className=this.enemyDate.easy.style;
				oUl.appendChild(oLi);
			}
		}
		//把包含小蜜蜂的容器插入到舞台
		this.stage.appendChild(oUl);
		this.enemy=oUl;
		this.enemys=oUl.getElementsByTagName('li');
		//布局转换
		for(var i=0;i<this.enemys.length;i++){
			this.enemys[i].style.left=this.enemys[i].offsetLeft+'px';
			this.enemys[i].style.top=this.enemys[i].offsetTop+'px';
		}
		for(var i=0;i<this.enemys.length;i++){
			this.enemys[i].style.position='absolute';
		}
		this.enemyMove();
	},
	enemyMove:function(){//敌人移动
		var _this=this;
		var speedX=_this.missionData[_this.mission].speedX;
		var speedY=_this.missionData[_this.mission].speedY;
		this.enemy.timer=setInterval(function(){			
			if(_this.stage.offsetWidth-_this.enemy.offsetLeft-20<_this.enemy.offsetWidth){
				speedX*=-1;
				_this.enemy.style.top=_this.enemy.offsetTop+speedY+'px';
			}else if(_this.enemy.offsetLeft-20<0){
				speedX*=-1;
				_this.enemy.style.top=_this.enemy.offsetTop+speedY+'px';
			}
			_this.enemy.style.left=_this.enemy.offsetLeft+speedX+'px';
			if(_this.gameOver(_this.enemy,_this.aircraft)){
				alert('游戏结束');
				window.location=window.location;
			}
		},300);
		setInterval(function(){
			_this.enemySp();
		},_this.missionData[_this.mission].space);
	},
	enemySp:function(){//随机一个敌人追踪战斗机
		var sp=this.enemys[Math.floor(Math.random()*this.enemys.length)];
		sp.style.zIndex=100;
		var _this=this;
		sp.timer=setInterval(function(){
			var l=sp.offsetLeft+sp.parentNode.offsetLeft+sp.offsetWidth/2,
				t=sp.offsetTop+sp.parentNode.offsetTop+sp.offsetHeight/2,
				L=_this.aircraft.offsetLeft+_this.aircraft.offsetWidth/2,
				T=_this.aircraft.offsetTop+_this.aircraft.offsetHeight/2;

			var a=T-t,
				b=L-l,
				c=Math.sqrt(a*a+b*b);

			sp.style.left=sp.offsetLeft+sp.speed*(b/c)+'px';				
			sp.style.top=sp.offsetTop+sp.speed*(a/c)+'px';

			if(_this.collisionTest(_this.aircraft,sp)){
				alert('游戏结束');
				window.location=window.location;
			}
		},30)

	},
	createAircraft:function(){//创建战斗机
		if(this.aircraftable){ return false;}
		var aircraft=document.createElement('div');
		aircraft.className='aircraft';
		this.aircraftable=true;
		this.stage.appendChild(aircraft);
		this.aircraft=aircraft;
		this.aircraftControl();
	},
	aircraftControl:function(){//控制战斗机
		var timer=null;
		var _this=this;
		document.onkeydown=function(ev){
			var oEvent=ev|| oEvent;
			if(!timer){
				timer=setInterval(function(){							
					if(oEvent.keyCode == 68){
						if(_this.stage.offsetWidth-_this.aircraft.offsetLeft-5<_this.aircraft.offsetWidth){
							return false;
						}else{
							_this.aircraft.style.left=_this.aircraft.offsetLeft+_this.aircraftDate.speed+'px';
						}

					}else if(oEvent.keyCode == 65){						
						if(_this.aircraft.offsetLeft<5){
							return false;
						}else{
							_this.aircraft.style.left=_this.aircraft.offsetLeft-_this.aircraftDate.speed+'px';		
						}				
					}
				},1)
			}
		};
		document.onkeyup=function(ev){
			var oEvent=ev || event;
			if(oEvent.keyCode == 32){
				_this.createBullet();
				setTimeout(function(){
					clearInterval(timer);
					timer=null;
				},1)
			}else{									
				clearInterval(timer);
				timer=null;
			}
		}
	},
	createBullet:function(){//创建子弹
		var oB=document.createElement('div');
		oB.className='bullet';
		oB.style.left=this.aircraft.offsetLeft+parseInt(this.aircraft.offsetWidth/2)-1+'px';
		oB.style.top=this.aircraft.offsetTop-10+'px';
		this.stage.appendChild(oB);
		this.bulletMove(oB);
	},
	bulletMove:function(oB){//子弹移动
		var _this=this;
		oB.timer=setInterval(function(){
			oB.style.top=oB.offsetTop-5+'px';
			if(oB.offsetTop<0){
				_this.stage.removeChild(oB);
				clearInterval(oB.timer);
				oB.timer=null;
			}
			for(var i=0;i<_this.enemys.length;i++){					
				if(_this.collisionTest(oB,_this.enemys[i])){
					_this.stage.removeChild(oB);
					clearInterval(oB.timer);
					if(_this.enemys[i].blood == 1){							
						if(_this.enemys[i].timer){
							clearInterval(_this.enemys[i].timer);
							_this.enemys[i].timer=null;
						}						
						_this.scoreBox.innerHTML=parseInt(_this.scoreBox.innerHTML)+_this.enemys[i].score;
						_this.score=parseInt(_this.scoreBox.innerHTML);
						_this.enemy.removeChild(_this.enemys[i]);
					}else{						
						_this.enemys[i].blood--;

					}
				}
			}
			if(_this.enemys.length == 0){
				_this.mission++;
				if(_this.missionData[_this.mission]){
					_this.init();
				}else{
					alert('恭喜通关');
				}
				
			}
		},30)
	},
	collisionTest:function (bullet,bee){//子弹和蜜蜂的碰撞检测
		var l=bullet.offsetLeft,
			r=l+bullet.offsetWidth,
			t=bullet.offsetTop,
			b=t+bullet.offsetHeight;


		var L=bee.offsetLeft+bee.parentNode.offsetLeft,
			R=L+bee.offsetWidth,
			T=bee.offsetTop+bee.parentNode.offsetTop,
			B=T+bee.offsetHeight;

		if(r<L || l>R || b<T || t>B){
			return false;
		}else{
			return true;
		}
	},
	gameOver:function(obj1,obj2){//检测敌人和战机是否碰撞
		var l=obj1.offsetLeft,
			r=l+obj1.offsetWidth,
			t=obj1.offsetTop,
			b=t+obj1.offsetHeight;


		var L=obj2.offsetLeft,
			R=L+obj2.offsetWidth,
			T=obj2.offsetTop,
			B=T+obj2.offsetHeight;

		if(r<L || l>R || b<T || t>B){
			return false;
		}else{
			return true;
		}
	}
}