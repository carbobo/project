/**
 *
 * @authors Marte (iqianduan@126.com)
 * @date    2017-03-28 17:31:57
 * @version $Id$
 *
 */
$(function(){

// 封装的tab切换

function tab(id){

    $(id).find("li").click(function(){

        var index = $(this).index();
        $(this).parent().next().children().hide().eq(index).show().siblings().hide();
    });
};
tab("#topTab");
    $(".tool-box .list").find("a").click(function(){
        var index = $(this).index();
        $(this).addClass('active').parents().siblings().children().removeClass("active");
    });

});
