ready(function(){
    var bDemo = location.href.split('/').pop().indexOf('demo') != -1,
        los = localStorage,
        pageSize = bDemo?16:6,//每页数据量
        currentPage = parseInt(location.hash.substring(1)) || 1,//当前页
        totalPage = 0,//总页数
        oLoading = $('.loading')[0],//loading
        oList = $('#list')[0],//数据列表容器
        pagination = $('#pagination')[0],//页码
        data = los._github?JSON.parse(los._github) : null;//所有数据

    

    if(!data){
        init();
    }else{
        if(isUpdate(data.version)){
            //console.log('需要更新')
            los.removeItem('_github');
            init();
        }else{
            totalPage = Math.ceil(data.list.length/pageSize);
            if(currentPage>totalPage){
                currentPage = totalPage;
            }
            renderPage(data.list,currentPage)
        }
    }
    function init(){
        ajax('data/all.json',function(res){
            var res = JSON.parse(res);
            var list = res.list.sort(function(o1,o2){
                return -(new Date(o1.pubdate) - new Date(o2.pubdate));
            });
            totalPage = Math.ceil(list.length/pageSize);
            data = {
                version : res.version,
                list:list
            }

            los._github = JSON.stringify(data);

            renderPage(list,currentPage);
        })
    }
    function isUpdate(version){
        var oVersion = new Date();
        var sNowVersion = oVersion.getFullYear()+'-'+(oVersion.getMonth()+1)+'-'+oVersion.getDate();
        if(sNowVersion == version){
            return false
        }else{
            return true
        }        
        //return true
    }
    function renderPage(list,page){
        oList.style.display = 'none';
        oLoading.style.display = 'block';      
        var str =''; 
        list = list.slice((page-1)*pageSize,page*pageSize);
        for(var i=0;i<list.length;i++){
            var url = 'demo/'+list[i].url+'/';
            if(bDemo){
                var desc = list[i].desc.length<100?list[i].desc:list[i].desc.substring(0,100)+'...';
                str+='<img src="./images/'+(list[i].img || 'default')+'.jpg" alt="'+list[i].name+'" /><a href="'+url+'" title="点击查看" target="_blank"><div><h3>'+list[i].name+'</h3><p>'+desc+'</p></div></a>';
            }else{
                var type = list[i].type;
                var tpl = '<i class="fa fa-link"></i>';
                if(type != 'demo'){
                    var aType = type.split(' ');
                    aType.forEach(function(e,i){
                        tpl += '<i class="fa fa-'+e+'"></i>';
                    })
                }
                str += '<li><h3><a href="'+url+'" target="_blank">'+list[i].name+tpl+'</a></h3><small>'+list[i].pubdate+'</small><p>'+list[i].desc+'</p></li>';
            }
        }
        if(totalPage>1){
            var sPagination = '';
            for(var i=0;i<totalPage;i++){
                sPagination+= '<li '+(i == currentPage-1?'class = "active"':'')+'><a href="#'+(i+1)+'">'+(i+1)+'</a></li>';
            }
            pagination.innerHTML = sPagination;
        }
        oList.innerHTML = str;
        oLoading.style.display = 'none'; 
        oList.style.display = 'block';     
    }

    window.addEventListener('hashchange',changePage,false);
    function changePage(){
        var hash = parseInt(location.hash.substring(1));   
        if(/\d+/g.test(hash)){           
            if(hash != currentPage){
                if(hash>totalPage){
                    hash = totalPage;
                }
                if(hash < 0){
                    hash = 1;
                }
                currentPage = hash;
                renderPage(data.list,currentPage)
            }
        }
    }
})