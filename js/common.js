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
 function ajax(url,fnS,fnF){
    var oAjax;
    if(window.XMLHttpRequest){
        oAjax=new XMLHttpRequest();
    }else{
        oAjax=new ActiveXObject('Microsoft.XMLHttp');
    }
    oAjax.open('GET',url+'?t='+Math.random(),true);
    oAjax.send();
    oAjax.onreadystatechange=function(){
        if(oAjax.readyState == 4){
            if(oAjax.status >= 200 && oAjax.status<300 || oAjax.status == 304){
                fnS && fnS(oAjax.responseText);
            }else{
                fnF && fnF(oAjax.status);
            }
        }
    };
}
function $(id){
    return document.querySelectorAll(id)
}