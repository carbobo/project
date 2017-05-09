/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-12-16 19:25:05
 * @version $Id$
 */


        setInterval(function(){
            $("nav section div ul").animate({top:"-.53rem"},1000,function(){
                $(this).find("li").first().appendTo(this);
                $(this).css({top:0});
            });
        },3000);
