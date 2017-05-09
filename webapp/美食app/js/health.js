/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-12-16 10:42:32
 * @version $Id$
 */
var nav = new Swiper('.nav',{
    // centeredSlides: true,
    slidesPerView:'auto',
    onSlideChangeEnd:function(swiper){
        content.slideTo(swiper.activeIndex);
    }
});
var content = new Swiper('.content',{
    onSlideChangeEnd:function(swiper){
        nav.slideTo(swiper.activeIndex);
        $(".nav ul li").siblings().removeClass("cur");
        $(".nav ul li").eq(swiper.activeIndex).addClass("cur");
    },
    slidesPerView: 'auto',
});
$(".nav ul li").each(function(i,el){
    $(el).on("click",function(){
        nav.slideTo(i);
        content.slideTo(i);
    })
});
// console.dir('health'+history.length);