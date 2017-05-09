/**
 *
 * @authors Marte (iqianduan@126.com)
 * @date    2017-03-27 17:32:37
 * @version $Id$
 */
$(function(){

        var f_scoll = true;
        var size=$(".header .menu li").size();
            $(".header .menu li").click(function(){
                f_scoll = false;
                var index=$(this).index();
                var T=$(".d"+index).offset().top-300;
                $(this).addClass("focus").siblings().removeClass("focus");
                $("html,body").animate({scrollTop:T},function(){
                    setTimeout(function(){
                        f_scoll = true;
                    },100)
                });
            });

       $(window).scroll(function(){
        var T=$(window).scrollTop();
        // alert(T);

        if (f_scoll)
        {
            for (var j=0;j<size;j++){
                var t=$(".d"+j).offset().top + 200;
                if (T>=t){
                    $(".header .menu li").eq(j).addClass("focus").siblings().removeClass("focus");
                }
            }
        }

       });




})

