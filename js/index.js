ready(function(){
    var los = localStorage,
        pageSize = 6,//每页数据量
        currentPage = parseInt(location.hash.substring(1)) || 1,//当前页
        totalPage = 0,//总页数
        oLoading = $('.loading')[0],//loading
        oList = $('#list')[0],//数据列表容器
        pagination = $('#pagination')[0],//页码
        data = los._github?JSON.parse(los._github) : null;//所有数据

    if(!data){
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
    }else{
        totalPage = Math.ceil(data.list.length/pageSize);
        if(currentPage>totalPage){
            currentPage = totalPage;
        }
        renderPage(data.list,currentPage)
    }
    function renderPage(list,page){
        oList.style.display = 'none';
        oLoading.style.display = 'block';      
        var str =''; 
        list = list.slice((page-1)*pageSize,page*pageSize);
        for(var i=0;i<list.length;i++){
            var url = list[i].type+'/'+list[i].url+'/'
            var type = list[i].type == 'demo' ?'fa fa-film':'fa fa-archive';
            str += '<li><h3><a href="'+url+'" target="_blank">'+list[i].name+'</a><i class="'+type+'"></i></h3><small>'+list[i].pubdate+'</small><p>'+list[i].desc+'</p></li>'
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
                console.log(hash);
                if(hash < 0){
                    hash = 1;
                }
                currentPage = hash;
                renderPage(data.list,currentPage)
            }
        }
    }
})