/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-12-20 18:54:08
 * @version $Id$
 */
$(function(){

   $(".tab-list li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    var index = $(this).index();
   $(".cont-list .tab-cont").eq(index).show().siblings().hide();
   })
})
