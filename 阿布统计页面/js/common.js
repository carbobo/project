/**
 *
 * @authors Marte (iqianduan@126.com)
 * @date    2017-05-04 09:18:28
 * @version $Id$
 */
window.onload = function(){
         $(".selext").children(".ul1").find("ul").hide().prev().click(function(e){
                e.preventDefault();
                $(this).next().slideDown();
                $(this).parent().siblings().children('ul').slideUp();
            });
                // 选项卡2
               $(".ul2").find("ul").hide().prev().click(function(e){
                e.preventDefault();
                $(this).next().slideToggle();
            });
}

