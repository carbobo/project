/**
 * 通用js
 */

//封装，显示块
function showBlock(obj){
    obj.onmouseenter = function(){
        this.children[1].style.display = "block";
    }
    obj.onmouseleave = function(){
        this.children[1].style.display = "none";
    }
}

//封装，更换背景
function changeBg(obj,y,endy){
    var t;
    var i = y;
    obj.onmouseover = function(){
            clearInterval(t);
            var self = this;
            t=setInterval(function(){
                i--;
                if (i < endy){
                    clearInterval(t);
                }else{
                    self.style.backgroundPosition = "6px "+i+"px";
                }
                
            },1);
    }
    obj.onmouseout = function(){
        clearInterval(t);
        var self = this;
        t=setInterval(function(){
            i++;
            if (i >= y){
                clearInterval(t);
            }else{
                self.style.backgroundPosition = "6px "+i+"px";
            }
        },1);
    }
}

//封装tab
function tab(arr1,arr2){
    var len = arr2.length;
    function init(){
        for( var i = 1; i < len ; i++){
            arr2[i].style.display = "none";
        }
    }
    init();

    for(var n = 0; n < len; n++){
        arr1[n].index = n;
        arr1[n].onmouseenter = function(){
            for( var i = 0; i < len ; i++){
                arr2[i].style.display = "none"; 
                arr1[i].className = "";          
            }
            arr2[this.index].style.display = "block";
            arr1[this.index].className = "gray";
        }
    }
}

//封装得到元素的top值
function getAbsoluteTop(element) {
    var offsetTop = element.offsetTop;
    while (element = element.offsetParent){
      offsetTop += element.offsetTop;
    }
    return offsetTop;
}