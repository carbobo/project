/**
 * Created by dongx on 2017/4/25.
 * 声明： 以下JS包含的各种类型语法并不是没有考虑到一致性问题
 *        是同时进行原声JavaScript和jQuery的练习。
 */
$(function () {
//------jQuery
    function scroll() {
        var i = 0;
        $("#left").on('click', function () {
            if (i == -2) {
                i = 1;
            }
            $("#scrollBox").css("left", (i - 1) * 1000 + "px")
            i--;
        })
        $("#right").on('click', function () {
            if (i == 0) {
                i = -3;
            }
            $("#scrollBox").css("left", (i + 1) * 1000 + "px")
            i++;
        })
    }
    scroll();
    $('#left').bind("selectstart", function () { return false; });
    $('#right').bind("selectstart", function () { return false; });
   //----------js
    function tabChange(tabTitle,showBox){
       var tit= tabTitle.getElementsByTagName("div");
       var show1=showBox.getElementsByTagName("div");
       for(var i=0;i<tit.length;i++){
           tit[i].index=i;
           tit[i].onclick=function(){
               for(var j=0;j<tit.length;j++){
                   show1[j].className="";
                   tit[j].className="title";
               }
               show1[this.index].className="show";
               tit[this.index].className +=" ccc";

           }
       }
   }
    var tabTitle= document.getElementById("tabTitle");
    var tabTitle02= document.getElementById("tabTitle02");
    var showBox02= document.getElementById("showBox02");
    var showBox= document.getElementById("showBox");
    tabChange(tabTitle,showBox);
    tabChange(tabTitle02,showBox02);

    function addCont(){
      var str1=["img/gameImg02.jpg","img/gameImg03.jpg","img/gameImg04.jpg","img/gameImg05.jpg","img/gameImg06.jpg","img/gameImg07.jpg","img/gameImg08.jpg","img/gameImg09.jpg",
      "img/gameImg010.jpg","img/gameImg011.jpg","img/gameImg012.gif","img/gameImg013.jpg","img/gameImg014.jpg","img/gameImg015.jpg","img/gameImg016.jpg",
      "img/gameImg017.jpg","img/gameImg018.jpg","img/gameImg019.jpg","img/gameImg020.jpg","img/gameImg021.jpg","img/gameImg022.jpg","img/gameImg023.jpg",
      "img/gameImg024.jpg","img/gameImg025.jpg","img/gameImg026.jpg","img/gameImg027.jpg","img/gameImg028.jpg","img/gameImg029.jpg","img/gameImg030.jpg",]
      var str2=["萌神赵子龙","特种兵作战","死神火影","忍者的宿命","皇家守卫军","僵尸小游戏","塔防","惹笑猴","故事商人","恐龙2048","一路向北","天天爱消除",
      "节奏大师","大鱼吃小鱼","经营","游戏霸天下","大家来找茬","解谜","斗地主","挂机","极速泡泡","老旧停车场","古老的符文","建造城市","大鱼吃小鱼","经营",
      "游戏霸天下","僵尸小游戏","塔防","惹笑猴","故事商人","恐龙2048","一路向北","天天爱消除","节奏大师","大鱼吃小鱼","经营","游戏霸天下","大家来找茬","解谜",
      "斗地主","挂机","极速泡泡","老旧停车场"]
      for(var i=0;i<24;i++){
        $("#part1Box").append('<li><div class="pic"><a href="#"><img src="'+str1[i]+'" alt=""></a></div><div class="title"><h4>'+str2[i]+'</h4></dia></li>')
        $("#part2Box").append('<li><div class="pic"><a href="#"><img src="'+str1[i]+'" alt=""></a></div><div class="title"><h4>'+str2[i]+'</h4></dia></li>')
        $("#part3Box").append('<li><div class="pic"><a href="#"><img src="'+str1[i]+'" alt=""></a></div><div class="title"><h4>'+str2[i]+'</h4></dia></li>')
      }
      for(var j=26;j>0;j--){
        $("#box0001").append('<div class="scrollGame"><div class="scrollPic"><img src="'+str1[j]+'" alt=""></div><div class="txt"><a href="">'+str2[j]+'</a></div></div>')
      }
      for(var j=28;j>2;j--){
        $("#box0002").append('<div class="scrollGame"><div class="scrollPic"><img src="'+str1[j]+'" alt=""></div><div class="txt"><a href="">'+str2[j]+'</a></div></div>')
      }
      for(var j=2;j<28;j++){
        $("#box0003").append('<div class="scrollGame"><div class="scrollPic"><img src="'+str1[j]+'" alt=""></div><div class="txt"><a href="">'+str2[j]+'</a></div></div>')
      }
    }
      addCont();
      function toTop(){
        var top = document.getElementById("top");

        window.onscroll = function() {
          var num = document.body.scrollTop || document.documentElement.scrollTop;
          if(num > 400) {
            top.style.visibility = "visible";
          } else {
            top.style.visibility = "hidden";
          }

        }

        top.onclick = function() {
          t = setInterval(function() {

            if(document.body.scrollTop) {
              document.body.scrollTop -= 20;
            } else {
              document.documentElement.scrollTop -= 20;
            }
            var num2 = document.body.scrollTop || document.documentElement.scrollTop;
            if(num2 <= 0) {
              clearInterval(t);
            }

          }, 1);
        }

      }
      toTop();
})