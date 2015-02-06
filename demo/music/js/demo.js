function ready(fn){
    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded',fn,false)
    }else{
        document.attchEvent('onreaystatechange',function(){
            if(document.readyState == 'ready'){
                fn()
            }
        })
    }
}
function $(selector){
    return document.querySelectorAll(selector)
}
ready(function(){
    var aList = $('.list a');
    var oLoad = $('#loading')[0];
    var timer = null;
    var xhr = new XMLHttpRequest();
    var ac = new (AudioContext || webkitAudioContext)();
    var gainNode = ac.createGain();
    var analyser = ac.createAnalyser();
    var size = 512;


    [].forEach.call(aList,function(e,i){
        e.onclick = function(){
            var _this = this;                     
            if(timer){
                clearTimeout(timer); 
                timer = null;
            }
            if(oBuffer){
                oBuffer.stop(0);
            }
            timer = setTimeout(function(){
                oLoad.innerHTML = '';
                loadMusic('./media/'+_this.innerHTML+'.mp3');
            },1000)
            
        }
    })

   

    analyser.fftSize = size*2;
    analyser.connect(gainNode);
    gainNode.connect(ac.destination);

    var oCvs = $('#cvs')[0];
    var ctx = oCvs.getContext('2d');
    var width = oCvs.clientWidth;
    var height = oCvs.clientHeight; 
    var linear = ctx.createLinearGradient(0, 0, width, height)  ;
    linear.addColorStop(0,'red');
    linear.addColorStop(.5,'yellow');
    linear.addColorStop(1,'green');
    ctx.fillStyle = linear;

    var oGain = $('#gain')[0];
    var oBuffer = null;
    oGain.onmousedown = function(){
        this.onmousemove = function(){
            gainNode.gain.value = this.value/this.max;
        }
        this.onmouseup = function(){
            this.onmousemove = null;
        }
    }
    function loadMusic(url){
        oLoad.style.width = 0;
        xhr.abort();
        xhr.open('GET',url,true)
        xhr.responseType = 'arraybuffer';
        xhr.onload  = function(){
            oLoad.innerHTML = '正在解码音频';
            ac.decodeAudioData(xhr.response,function(buffer){
                if(!timer) return ;
                var bufferSource = ac.createBufferSource();
                bufferSource.buffer = buffer;
                bufferSource.connect(analyser);
                bufferSource.start(0);
                clearTimeout(timer);
                timer = null;
                oLoad.innerHTML = '';
                oLoad.style.width = 0;
                oBuffer = bufferSource;
            },function(err){
                console.log(err);
            })
            
        };
        xhr.onprogress = function(e){
            if(e.lengthComputable){
                oLoad.style.width = ((e.loaded / e.total)*100)+'%'
                oLoad.innerHTML  = ((e.loaded / e.total)*100).toFixed(1)+'%';
            }
        };
        xhr.send();
    }
    visualizer()
    function visualizer(){        
        var arr = new Uint8Array(analyser.frequencyBinCount);
        function v(){
            analyser.getByteFrequencyData(arr)
            draw(arr);
            requestAnimationFrame(v)
        }
        requestAnimationFrame(v)
    }
    var w = parseInt(width/size);
    function draw(arr){
        ctx.clearRect(0,0,width,height);        
        for(var i=0;i<size;i++){
            var h = arr[i]/256*height; 
            ctx.fillRect(w*i,height-h,w,h)
        }
    }
})