/**
 * Created by Administrator on 2016/9/1.
 */

$(function () {
    //鼠标经过导航栏，下拉框显示，导航栏变色
    $(".slide").mouseenter(function () {
        $(this).children("dl").stop().slideDown(200);
    });
    $(".slide").mouseleave(function () {
        $(this).children("dl").stop().slideUp(200);
        $(this).children("dl").css("zIndex", "20");
    });
    $(".header a.change").mouseenter(function () {
        $(this).stop().animate({
            "backgroundColor": "#D51413"
        });
    });
    $(".header a.change").mouseleave(function () {
        $(this).stop().animate({
            "backgroundColor": "#606060"
        });
    });


    //鼠标进入works部分的li中，背景颜色改变，图片特效显示
    $(".our-works li").mouseenter(function () {
        $(this).stop().animate({
            "backgroundColor": "#D51413"
        });
        $(this).children().find("img").css("opacity", "0.5")
        //$(this).find(".text").stop().animate({left:'0'}, {duration: 500});
        $(this).children().children("dd").children("h4").css("color", "#FFFFFF");
        $(this).children().children("dd").children("em").css("background", "url(../images/sj-jtpng.png) no-repeat left top");
        $(this).children().children().children("a").children("img").stop().animate({
            "width": "302px",
            "height": "412px",
            "marginLeft": "-13px",
            "marginTop": "-18px"
        },600);
    });
    $(".our-works li").mouseleave(function () {
        $(this).stop().animate({
            "backgroundColor": "#FFFFFF"
        });
        $(this).children().find("img").css("opacity", "1");
        $(this).children().children("dd").children("h4").css("color", "#818181");
        $(this).children().children("dd").children("em").css("background", "url(../images/sj-jtpng.png) no-repeat left bottom")
        $(this).children().children().children("a").children("img").stop().animate({
            "width": "275px",
            "height": "375px",
            "marginLeft": "0px",
            "marginTop": "0px"
        });
    });


    //点击顶部，返回到顶部
    $(".footer").click(function () {
        $('html,body').animate({scrollTop: '0px'}, 600);
    });

    //最后一屏自动滚动
    $(function () {
        var autoScrollElement = $(".tripWrapper");
        var autoScrollTrigger = autoScrollElement.offset().top + autoScrollElement.height();
        var scrollFlag = false;
        $(window).mousewheel(function (e, d) {
            if (scrollFlag) {
                e.preventDefault();
                return;
            }
            if (d < 0) {
                //下滚的情况
                if ($(this).scrollTop() >= autoScrollTrigger) {
                    e.preventDefault();
                    scrollFlag = true;
                    //计算滚动目标
                    var scrollTarget = $(".projects-container").offset().top;
                    $('html,body').animate({scrollTop: scrollTarget}, 600, function () {
                        scrollFlag = false;
                    });
                }
            } else {
                //上滚的情况
                scrollFlag = false;
            }
        });
    });


});

$(function () {
    //获取所需DOM对象
    var accordion = $(".accordion");
    var lis = accordion.find("li");
    //动态添加背景图片和图标
    lis.each(function (i, e) {
        //添加背景图片、注册鼠标移入和移出事件
        // $(e).css("backgroundImage", "url(../images/" + (i + 1) + ".jpg)");
        $(e).mouseenter(enterHandler).mouseleave(leaveHandler);
        //添加图标
        $(e).find(".icon").css("background", "url(../images/" + (i + 1) + ".png) no-repeat");
    });

    //鼠标移入事件处理
    function enterHandler() {
        //改变图片宽度
        $(this).siblings().stop().animate({"width": 100}, 750, "easeInOutExpo").find(".icon").stop().animate({"left": 50}, 750, "easeInOutExpo");
        //遮罩层淡出、文本动画
        $(this).find("p.type,p.slogan,p.decoration").css("top", 265).end().stop().animate({"width": 800}, 750, "easeInOutExpo", function () {
            $(this).find("p.type").animate({"top": 0}, 600, "easeOutExpo").next().delay(150).animate({"top": 38}, 600, "easeOutExpo").next().delay(300).animate({"top": 92}, 600, "easeOutExpo");
        }).children("div.mask").stop().fadeOut();
    }

    //鼠标移出事件处理
    function leaveHandler() {
        //改变图片宽度
        lis.stop().animate({"width": 240}, 750, "easeInOutExpo").find(".icon").stop().animate({"left": 120}, 750, "easeInOutExpo");
        //遮罩层淡入
        $(this).children("div.mask").stop().fadeIn();
    }
});

$(function () {
    //放大镜
    $("#left").mouseenter(function () {
        $(this).find("img").stop().animate({"height": 520, "margin-top": -10, "width": 1170, "margin-left": -10})
    })

    $("#left").mouseleave(function () {
        $(this).find("img").stop().animate({"height": 500, "margin-top": 0, "width": 1150, "margin-left": 0})
    })

    //点击显示主界面
    $("#left").click(function () {
        $(this).stop().animate({"width": 0, "height": 0, "opacity": 0}, 1000, function () {
            $(".left2").show(1500);
            $(".right").children().eq(0).show(500);
            $(".right").children().eq(1).show(500);
            $(".right").children().eq(2).show(500, function () {
                $(".right").children().eq(3).show(500);
                $(".right").children().eq(4).show(500);
                $(".right").children().eq(5).show(500, function () {
                    $(".right").children().eq(6).show(500);
                    $(".right").children().eq(7).show(500);
                    $(".right").children().eq(8).show(500);
                });
            });
        });
        return false;
    })

    //点击按钮
    var datas = [{"name": "Arctic","line1":"约会极光","line2":"邂逅耀眼北欧","line3":"~相传能看到北极光的，都是被幸福青睐的人~","line4":"定制路线 深度体验","line5":"冰蓝北欧极地之光 11日深度旅行","line6":"变换莫测的炫目之光","line7":"守候欧若拉守候爱情"},
        {"name": "Bali","line1":"海岛之约","line2":"邂逅魅力巴厘","line3":"","line4":"定制路线 深度体验","line5":"浪漫海岛之旅 6日深度旅行","line6":"印度尼西亚/巴厘岛","line7":"邂逅最美的自己"},
        {"name": "Tibet","line1":"冻原之约","line2":"叩响雪域风情的神秘之门","line3":"与大地为伴 与群山为伍","line4":"定制路线 深度体验","line5":"高原净土之旅 5日深度旅行","line6":"拉萨/拉姆拉错/唐古拉山","line7":"一个你可以将灵魂存储的地方"},
        {"name":"Italia","line1":"依山傍海静谧小镇","line2":"彩色悬崖日落余晖","line3":"许愿池前浪漫传说","line4":"定制路线 深度体验","line5":"意大利缤纷浪漫诗 11日深度旅行","line6":"罗马/五渔村/佛罗伦萨/威尼斯/米兰","line7":"惊艳邂逅罗马假日"},
        {"name":"Thailand","line1":"海天世界","line2":"你的每一次回眸","line3":"都别具惊世之美","line4":"定制路线 深度体验","line5":"邂逅普吉梦幻天堂 8日深度旅行","line6":"维提岛＋托阔里奇岛","line7":"独木泛舟热带浮潜"},
        {"name":"Dubai","line1":"七星奢华世界翘楚","line2":"一半海水一半沙漠","line3":"","line4":"品质旅行 优选旅行","line5":"黑金帝国奢享阿联酋 6日深度旅行","line6":"迪拜/阿布扎比","line7":"及尽奢靡之能事"},
        {"name":"Mauritius","line1":"你看到的 只有蓝天白云","line2":"上帝先创造了毛里求斯","line3":"再仿造毛里求斯创造了天堂","line4":"品质旅行 优选旅行","line5":"海天天堂 6日深度旅行","line6":"毛里求斯/路易港/留尼汪","line7":"拜访上帝的伊甸园"},
        {"name":"Greece","line1":"圣托里尼","line2":"国家地理绝美角度","line3":"蓝与白的纯美净土","line4":"定制路线 深度体验","line5":"湛蓝希腊梦幻双岛 10日深度半自驾旅行","line6":"雅典/圣托里尼/扎金索斯","line7":"漫步洁白魔幻海滩"},
        {"name":"Provence","line1":"薰衣草田紫色花海","line2":"奢靡夜景浮生若梦","line3":"","line4":"定制路线 深度体验","line5":"普罗旺斯婚纱旅拍 11日深度旅行","line6":"巴黎/阿维尼翁/尼斯/摩纳哥","line7":"蔚蓝海岸天使湾"}]

    $(".back").find(".btn").click(function () {
        var idx = $(this).parent().parent().parent().parent().index();
        console.log(idx);
        $(".right").append("<div class='public3'></div>")
        //$(".public3").append("<img src='images/0" + idx + ".jpg'>")
        $(".public3").css("background-image", "url(../images/0" + idx + ".jpg)")
        //$(".public3").css("background-size","140%")
        $(".public3").stop().animate({"height": 500, "width": 782, "left": 358, "top": 246}, 800, function () {
            //内部详情页
            $(".public3").append("<div class='public3_top'></div>")
            $(".public3").append("<div class='public3_bottom'></div>")


            $(".public3_top").stop().animate({"height": 380}, 600, function () {
                $(".public3_bottom").fadeIn(200, function () {
                    //动态生成内容
                    for (var i = 0; i < datas.length; i++) {
                        var data = datas[idx];
                        var str =  "<p class='style1'>"+data.name+"</p>"
                                  +"<p class='style2'>"+data.line1+"</p>"
                                  +"<p class='style3'>"+data.line2+"</p>"
                                  +"<p class='style4'>"+data.line3+"</p>"
                                  +"<p class='style5'>"+data.line4+"</p>"

                        $(".public3_top").html(str);

                        var str2 = "<p class='style6'>"+data.line5+"</p>"
                                   +"<p class='style6'>"+data.line6+"</p>"
                                   +"<p class='style6'>"+data.line7+"</p>"
                        $(".public3_bottom").html(str2);
                    }
                });
            })
        });


        $(".public3").click(function () {
            $(this).stop().fadeOut(1000, function () {
                $(this).remove();
            });
        })
    })
});

$(function () {
    //����뿪���¼��������
    function mouseLeaveHandler() {
        $(this).stop().animate({"opacity": "1"}, 400);
    }

    //��������¼��������
    function mouseClickHandler() {
        $(this).parent().animate({"width": "100vw"}, 600, function () {
            $(".cd-project-info").stop().animate({"height": "200px"}, 600);
        });
        $(this).parent().siblings().animate({"width": "0px"}, 600);

        //������뿪���ڵ��㲻��ʾ
        $(".cd-title").off("mouseleave");
    }

    //��������뿪�¼������ڸǲ�͸����Ϊ1
    $(".cd-title").mouseleave(mouseLeaveHandler);
    //�����������¼�
    $(".cd-title").mouseenter(function () {
        var idx = $(this).parent().index() + 1;
        //ʹ��ǰ����ĸ�Ԫ������Ӧ�ı���ͼƬ����ʹ�ڸǲ�͸����Ϊ0
        $(this).parent().css({
            "backgroundImage": "url(../images/1" + idx + ".jpg)",
            "backgroundSize": "100vw 100vh"
        })
            .siblings().css("backgroundImage", "");
        $(this).stop().animate({"opacity": "0"}, 400);

        //����������¼����õ�ǰ����ͼȫ����ʾ�������ڵ�������
        $(this).click(mouseClickHandler);
    });
    //cd-project-info��˫���¼�
    $(".cd-project-info").dblclick(function () {
        //���������¼�����ֹӰ�����˫���¼�
        $(".cd-title").off("click");
        //cd-project-info��͸����Ϊ0  ��������ָ�ԭ״
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        $(this).stop().animate({"height": "0"}, 600, function () {
            $(".cd-single-project").stop().animate({"width": "25%"}, 600);
            $(".cd-title").stop().animate({"opacity": "1"}, 600);
            //�ָ����˫���¼�������뿪�¼�
            $(".cd-title").mouseleave(mouseLeaveHandler);
            $(".cd-title").click(mouseClickHandler);
        });
    });
});

$(function () {
    // 返回顶部
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 800) { //向下滚动像素大于这个值时，即出现小火箭~
            $('.actGotop').fadeIn(300); //火箭淡入的时间，越小出现的越快~
        } else {
            $('.actGotop').fadeOut(300); //火箭淡出的时间，越小消失的越快~
        }
    });
    //火箭动画停留时间，越小消失的越快~
    $('.actGotop').click(function () {
        $('html,body').animate({scrollTop: '0px'}, 1500);

    });

});