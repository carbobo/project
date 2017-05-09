/**
 * 首页js
 * @authors Your Name (you@example.org)
 * @date    2016-09-28 16:34:18
 * @version $Id$
 */


function toper(){
    var oQQCont = document.getElementById("QQ-cont");
    var liObj = oQQCont.getElementsByTagName("li");
    var oqq1 = document.getElementById("qq1");
    var oqq2 = document.getElementById("qq2");
    var oqq3 = document.getElementById("qq3");
    var QQLObj = document.getElementById("QQL");
    var weiLObj = document.getElementById("weiL");

    for(var i=0; i<liObj.length; i++){
        if(liObj[i].className.indexOf("down")!=-1){
            var oCont = liObj[i].getElementsByTagName("div")[0];
            oCont.style.display = "none";
            showBlock(liObj[i]);
        }
        changeBg(liObj[0],3,-25);
        changeBg(liObj[1],-55,-86);
    }
    
    changeBg(oqq1,-55,-86);
    changeBg(oqq2,-55,-86);
    changeBg(oqq3,-55,-86);

    changeBg(QQLObj,3,-25);
    changeBg(weiLObj,-764,-793);
}
toper();

function header(){
    var oNav = document.getElementById("nav");
    var liObj = oNav.getElementsByTagName("li");
    for(var i=1; i<liObj.length-1; i++){
        if(liObj[i].className.indexOf("down")!=-1){
            var oDiv = liObj[i].getElementsByTagName("div")[0];
            oDiv.style.display = "none";
            showBlock(liObj[i]);
        }
    }
}
header();

function searchInput(){
    var oSearch = document.getElementById("search");
    var oSearCont = document.getElementById("search-cont");
    var searchulObj = oSearCont.getElementsByTagName("ul");

    oSearch.onfocus = function(){
        oSearCont.style.display = "block";
        this.value = "";
    }
    oSearch.onblur = function(){
        setTimeout(function(){
            oSearCont.style.display = "none";
            this.value = "800万张免费设计素材任意下载";
        },120);   
    }

    for(var i=0; i<searchulObj.length; i++){
        var searchliObj = searchulObj[i].getElementsByTagName("li")[1];
        searchulObj[i].content = searchliObj;
        searchulObj[i].onclick = function(){
            var searchliCont = this.content.innerHTML;
            oSearch.value = searchliCont;
            oSearch.blur();
        }
    }
}
searchInput();


function banner(){
    var banner = document.getElementById("banner");
    var pic = document.getElementById("pic");
    var picLi = pic.getElementsByTagName("li");
    var tabs = document.getElementById("tabs");
    var tabLi = tabs.getElementsByTagName("li");
    var backObj = document.getElementById("backword");
    var forObj = document.getElementById("forword");
    backObj.style.display = "none";
    forObj.style.display = "none";
    var len = picLi.length;
    var cur = 0;
    var timer;
    var t;
    var flag = false;
    var curIndex;

    //初始化
    function init(){
        for (var i = 1; i < len; i++){
            picLi[i].style.left = "1200px";
        }
        picLi[0].style.left = 0;
        tabLi[0].className = "green";
    }
    init();

    //向左的运动
    function toLeft(){
        var pos = parseInt(picLi[cur].style.left);
        picLi[cur].style.left = pos - Math.ceil((pos - 0)/10) + "px";
        if ( pos <= 0){
            clearInterval(t);
        }
    }

    //把需要的li全部移至最右边
    function moveRight(start,end){
        for( var n = start; n < end ; n++){
                picLi[n].style.left = "1200px";
        }
    }  
    function moveLeft(start,end){
        for( var n = start; n < end ; n++){
                picLi[n].style.left = "0";
        }
    }  

    //向右的运动
    function toRight(curRight,flag){
        var pos = parseInt(picLi[curRight].style.left); 
        picLi[curRight].style.left = pos + Math.ceil((1200 - pos)/10) + "px";
        if ( pos >= 1200){
            clearInterval(t);
            if (flag){
                cur = 0;
            }
        }
        
    }

    //分页按钮自动切换
    function pageBtn(){
        for (var n = 0 ; n < len; n++){
            tabLi[n].className = "";
        }
        if ( cur == len){
            tabLi[0].className = "green";
        }else{
            tabLi[cur].className = "green";
        }
    }

    //轮播器
    function slider(){
        cur++;
        pageBtn();
        if (cur == len ){
            moveRight(1,len-1);
            t = setInterval(function(){
                toRight(len-1,true);
            },10);
        }else{
            t = setInterval(toLeft,5);
        }
        
    }
    timer = setInterval(slider,2000);

    //鼠标经过banner,动画停止，离开，继续播放
    banner.onmouseenter = function(){
        clearInterval(timer);
        backObj.style.display = "block";
        forObj.style.display = "block";
    }
    banner.onmouseleave = function(){
        timer = setInterval(slider,2000);
        backObj.style.display = "none";
        forObj.style.display = "none";
    }

    //前后翻页
    backObj.onclick = function(){
        clearInterval(t);
        var prev;
        prev = cur;
        cur = cur-1;
        if(cur>=0){
            t = setInterval(function(){
                toRight(prev,false);
            },5);
        }else if(cur=-1){
            setTimeout(function(){
                moveLeft(prev+1,prev+len-1);
            },500);
            t = setInterval(function(){
                toLeft(prev,false);
            },10);
            cur = len-1;
        }
        pageBtn();       
    }
    forword.onclick = function(){
        clearInterval(t);
        var prev;
        prev = cur;
        cur = cur+1;
        if(cur<len){
            t = setInterval(function(){
                toLeft(prev,false);
            },5);
        }else if(cur=len-1){
            moveRight(1,len-1);
            t = setInterval(function(){
                toRight(prev,false);
            },10);
            cur=0;
        }
        pageBtn();
    }

    //单击每个按钮实现相应的图片切换
    for(var m = 0; m < len; m++){
        tabLi[m].index = m;
        var prev;
        tabLi[m].onclick = function(){
            prev = cur;
            cur = this.index;
            if (prev > cur){
                moveRight(cur+1,prev);
                t = setInterval(function(){
                    toRight(prev,false);
                },10);
            }else{
                setTimeout(function(){
                    moveLeft(prev+1,cur);
                },500);
                t=setInterval(toLeft,10);
            }
            pageBtn();
        }
    }

}
banner();


function hotsSarch(){
    var hotTit = document.getElementById("hotTit");
    var hotliObj = hotTit.getElementsByTagName("li");
    var hotCont = document.getElementById("hotCont");
    var hotContObj = hotCont.getElementsByTagName("div");
    tab(hotliObj,hotContObj);

    var newTit = document.getElementById("new-tit");
    var newliObj = newTit.getElementsByTagName("li"); //标签的数组
    var list = document.getElementById("list");
    var listObj = list.getElementsByTagName("div");  //列表的数组
    tab(newliObj,listObj);
}
hotsSarch();


function showpic(){
    var picList = document.getElementsByClassName("picList");
    var listBtn = document.getElementsByClassName("list-btn");
    var t;
    var x = -36;

    for(var i=0; i<46; i++){

        picList[i].index = i;
        picList[i].timer = "t"+i;
        picList[i].onmouseenter = function(){
            clearInterval(t);
            var self = this;
            this.timer = setInterval(function(){
                x += 4;
                if(x>8){
                    clearInterval(self.timer);
                }else{
                    listBtn[self.index].style.top = x +"px";
                }
            },0);
        }
        picList[i].onmouseleave = function(){
            clearInterval(this.timer);
            var self = this;
            this.timer = setInterval(function(){
                x -= 4;
                if(x<-36){
                    clearInterval(self.timer);
                }else{
                    listBtn[self.index].style.top = x +"px";
                }
            },0);
        }
    }
}
// showpic();


function friendLink(){
    var friendTit = document.getElementById("friend-title");
    var aObj = friendTit.getElementsByTagName("a");
    var friendCont = document.getElementById("friend-cont");
    var contObj = friendCont.getElementsByTagName("div");

    tab(aObj,contObj);
}
friendLink();

//返回顶部
function totop(){
    var backtop = document.getElementById("backtop");
    backtop.onclick = function(){
        t = setInterval(function(){
            if(document.body.scrollTop){
                document.body.scrollTop += (0-document.body.scrollTop)/7;
            }else{
                document.documentElement.scrollTop += (0-document.documentElement.scrollTop)/7;
            }
            var scrollY = document.body.scrollTop || document.documentElement.scrollTop;
            if(scrollY<=0){
                clearInterval(t);
            }
        },17);
    }
}
totop();

//滚轮位置效果
window.onscroll = function(){
    var headerFixed = document.getElementById("headerFixed");
    var header = document.getElementById("header");
    var ff = document.getElementById("ff"); //漂浮框
    var unloadImg = [];
    var allImg = document.getElementsByTagName("img");

    var scrollY = document.body.scrollTop || document.documentElement.scrollTop;

    //header-fixed  ff效果
    var headerTop = getAbsoluteTop(header);
    if(scrollY>=headerTop && scrollY<476){
        headerFixed.style.visibility = "visible";
    }else if(scrollY>=476){
        ff.style.visibility = "visible";
    }else{
        headerFixed.style.visibility = "hidden";
        ff.style.visibility = "hidden";
    }

    //图片延迟加载效果
    for(var i=0; i<allImg.length; i++){
        if(allImg[i].getAttribute("lazy_src") != null){
            unloadImg.push(allImg[i]);
        }
    }
    var targetTop = getAbsoluteTop(unloadImg[0]);
    var actualTop = scrollY + document.documentElement.clientHeight;
    if(actualTop>=targetTop){ 
        for(var i=0; i<unloadImg.length; i++){
            unloadImg[i].src = unloadImg[i].getAttribute("lazy_src");
        }
     }

}