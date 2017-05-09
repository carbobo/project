var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    // 如果需要分页器
    pagination: '.swiper-pagination',
    autoplay:3000,
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    paginationElement : 'li',
    pagination: '.swiper-pagination',
    paginationClickable: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplayDisableOnInteraction: false
    
  }); 


$(function(){
       
    $('header .btnBox li').eq(0).addClass('cur');
    $('h2').addClass('clearfix');                  
    $('.commonSense .wrapper>div').addClass('clearfix');                  
    $('body>div').css({margin:'0 auto'});
    $('footer li:nth-child(3)').mouseenter(function(){
        $(this).html('hao');
    });

/**
 *
 gastronome 板块
 * 
 */
(function(){
    $('.gastronome li').addClass('swiper-slide');
}());

var mySwiperSecond = new Swiper ('.swiper-gastronome', {
    loop: true,
    slidesPerView: 5,
    });
    
  }); 

(function(){
    $('.circle .person>img').each(function(index,value){
        $(value).click(function(){
            $(this).parent().append($('<i><img src="'+$(value).attr('src')+'"></i>'));
            console.log($(value).attr('src'));
            $(this).parent().children('i').addClass('layer').click(function(){
                $(this).remove();
            });
        });
    });



}());




// }());//end
