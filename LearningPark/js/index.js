/**
 *
 * @authors Marte (iqianduan@126.com)
 * @date    2017-03-28 17:31:57
 * @version $Id$
 *
 */
$(function(){

// 首页的tab切换
$(".tab .nav li").click(function(){
    var index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $(".c1").eq(index).show().siblings().hide();
});



$(".tab2 .t-nav li").click(function(){
    var index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active').parent().siblings('.t-cont').children('.t-list').eq(index).show().siblings().hide();;
    });
































})
