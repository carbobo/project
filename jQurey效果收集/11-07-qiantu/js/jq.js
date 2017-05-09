// 顶部QQ切换
function qqToggle(className){
    var obj = $(className+" .qqToggle b");
    var objDown = $(className).find(".down");
    $(className).hover(function(){
            obj.animate({marginTop:-29});
            objDown.slideDown('fast');
        },function(){
            obj.animate({marginTop:3});
            objDown.slideUp('fast');
        });
}
qqToggle('.QQ-chat');
qqToggle('.QQ-qun');
qqToggle('.QQ-login');
qqToggle('.wei-login');

//导航的下拉面板
// $(".header .nav").children("li").hover(function(){
//     $(this).children(".yuanc").fadeToggle(100);
// });
// 
$(".header .nav").on("click","li",function(){
    $(this).children(".yuanc").fadeToggle(100);
});

