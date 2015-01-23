ready(function(){
    var loading = $('.loading')[0];
    var list = $('#list')[0];
    ajax('data/all.js',function(data){
        var data = eval(data);
        var str ='';
        for(var i=0;i<data.length;i++){
            str = '<li><h3><a href="'+data[i].url+'">'+data[i].name+'</a></h3><small>'+data[i].pubdate+'</small><p>'+data[i].desc+'</p></li>'
        }
        list.innerHTML = str;
        loading.style.display = 'none';
    })
})