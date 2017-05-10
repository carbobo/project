/**
 * Created by Felix on 2016/9/1.
 */

/**
 * 主页的逻辑
 */

$(function () {
    $("#totop").click(function () {
        $(".navButtons").find("li:first").click();
    });
    $(".lbars").mouseenter(function () {
        //$(this).css("backgroundColor","#DA2629");
        $(this).stop().animate({"width": "200px"}, 300);
        //$(this).children("img").stop().animate({"left":"150px"},300);
        $(this).children("span").show(300);
    });
    $(".lbars").mouseleave(function () {
        $(this).css("backgroundColor", "#DEDEDE");
        $(this).stop().animate({"width": "45px"}, 300);
        //$(this).children("img").stop().animate({"left":0},300);
        $(this).children("span").hide(300);
    });
});


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
});

$(function () {
    //第一页的逻辑
    setInitFunction(function () {
        //初始化轮播图li宽度
        var windowWidth = $(window).width();
        $(".page1 ul li").width(windowWidth);
    });
    setPageFunction(1, function () {
        //轮播图的逻辑
        var pauseSlide = $("#p1left,#p1right,#page1-num");
        var pics = document.getElementById("pics");
        var ul = pics.children[0];
        var ullis = ul.children;
        var ol = document.getElementById("page1-num");
        var ollis = ol.children;
        var p1left = document.getElementById("p1left");
        var p1right = document.getElementById("p1right");
        var pic = 0;
        var idx = 0;
        var time = null;
        for (var i = 0; i < ollis.length; i++) {
            ollis[i].index = i;
            ollis[i].onmouseover = function () {
                for (var j = 0; j < ollis.length; j++) {
                    ollis[j].style.opacity = 0.4;
                }
                this.style.opacity = 1;
                console.log(-ullis[this.index].offsetLeft);
                myanimate(ul, {left: -ullis[this.index].offsetLeft});
                pic = idx = ollis[i].index;
            }
        }
        function rightHandle() {
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            if (pic == ullis.length - 1) {
                pic = 0;
                ul.style.left = 0;
            }
            pic++;
            idx++;
            myanimate(ul, {left: -ullis[pic].offsetLeft});
            if (idx == ollis.length) {
                idx = 0;
            }
            for (var j = 0; j < ollis.length; j++) {
                ollis[j].style.opacity = 0.4;
            }
            ollis[idx].style.opacity = 1;
        }

        //鼠标移入按钮暂停轮播图
        pauseSlide.on({
            "mouseover": function () {
                clearInterval(time);
            },
            "mouseout": function () {
                gogogo();
            }
        });

        function gogogo() {
            time = setInterval(function () {
                rightHandle();
            }, 3000);
        }

        gogogo();

        p1right.onclick = rightHandle;
        p1left.onclick = function () {
            clearInterval(time);
            if (pic == 0) {
                pic = ullis.length - 1;
                ul.style.left = -ullis[pic].offsetLeft + "px";
            }
            pic--;
            idx--;
            myanimate(ul, {left: -ullis[pic].offsetLeft});
            if (idx < 0) {
                idx = ollis.length - 1;
            }
            for (var j = 0; j < ollis.length; j++) {
                ollis[j].style.opacity = 0.4;
            }
            ollis[idx].style.opacity = 1;
        }
    });
    //第二页的逻辑
    setInitFunction(function () {
        //参数设置
        var showPicsCount = 6;  //展示的图片张数

        //获取所需DOM对象
        var bigPics = $(".big-pics li");
        var mover = $(".small-pics");
        var smallPics = mover.children();
        var toLeftBtn = $(".to-left");
        var toRightBtn = $(".to-right");

        //小图宽度初始化
        var smallPicWidth = $(".small-pics-mask").width() / showPicsCount;
        smallPics.css("width", smallPicWidth);

        //参数初始化
        var nowIndex = 0;   //默认展示第一张图片

        //为按钮注册事件
        toLeftBtn.click(function () {
            //如果被禁用了或正在动画中，直接返回
            if ($(this).hasClass("disabled") || mover.filter(":animated").length) {
                return;
            }
            smallPics.eq(nowIndex - 1).click();
            var target = parseInt(mover.css("marginLeft")) + smallPicWidth;
            mover.stop().animate({"marginLeft": target});
        });
        toRightBtn.click(function () {
            //如果被禁用了或正在动画中，直接返回
            if ($(this).hasClass("disabled") || mover.filter(":animated").length) {
                return;
            }
            smallPics.eq(nowIndex + 1).click();
            var target = parseInt(mover.css("marginLeft")) + -smallPicWidth;
            mover.stop().animate({"marginLeft": target});
        });

        //为小图片注册事件
        smallPics.click(function () {
            //如果要移动的索引和当前索引相同，不执行动画
            if ($(this).index() === nowIndex) {
                return;
            }
            nowIndex = $(this).index();
            //小图类名处理
            $(this).addClass("current").siblings().removeClass("current");
            //小图对应的大图id
            var currentBigPic = bigPics.eq(nowIndex);
            //大图动画处理
            currentBigPic.stop().fadeIn().addClass("current").siblings().stop().removeClass("current").fadeOut();
            //大图文本动画处理
            currentBigPic.find(".slide-text").css({"bottom": 0, "opacity": 0.5}).stop().animate({
                "bottom": 33,
                "opacity": 1
            }, 400, "easeInOutSine", function () {
                //按钮可用性检测
                var nowLeft = parseInt(mover.css("marginLeft"));
                console.log(nowLeft);
                if (nowLeft >= 0) {
                    //左侧按钮不可用
                    toLeftBtn.addClass("disabled");
                } else {
                    toLeftBtn.removeClass("disabled");
                }
                if (nowLeft < (smallPics.length - showPicsCount - 1) * -smallPicWidth) {
                    //右侧按钮不可用
                    toRightBtn.addClass("disabled");
                } else {
                    toRightBtn.removeClass("disabled");
                }
            });
        });

    });
    setPrevPageFunction(2, function () {
        $(".splider-content-text").css("display", "none");
    });
    setPageFunction(2, function () {
        var page = ".page2 ";
        //动画文本
        var e = $(page + ".splider-content-textT h1," + page + ".splider-content-textT font," + page + ".splider-content-textT small," + page + ".splider-content-textT span," + page + ".splider-content-textB h3," + page + ".splider-content-textB p," + page + ".splider-content-textB span");
        $(".splider-content-text").eq(0).css("display", "block");
        e.css({"top": 20, "opacity": 0});
        e.eq(0).animate({"top": 0, "opacity": 1}, 400, "easeOutBack").end().eq(1).delay(150).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(2).delay(300).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(3).delay(450).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(4).delay(600).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(5).delay(750).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(6).delay(900).animate({"top": 0, "opacity": 1}, 400, "easeOutBack");
    });
    //第三页的逻辑
    setPrevPageFunction(3, function () {
        $(".splider-content-text").css("display", "none");
    });
    setPageFunction(3, function () {
        var page = ".page3 ";
        //动画文本
        var e = $(page + ".splider-content-textT h1," + page + ".splider-content-textT font," + page + ".splider-content-textT small," + page + ".splider-content-textT span," + page + ".splider-content-textB h3," + page + ".splider-content-textB p," + page + ".splider-content-textB span");
        $(".splider-content-text").eq(1).css("display", "block");
        e.css({"top": 20, "opacity": 0});
        e.eq(0).animate({"top": 0, "opacity": 1}, 400, "easeOutBack").end().eq(1).delay(150).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(2).delay(300).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(3).delay(450).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(4).delay(600).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(5).delay(750).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(6).delay(900).animate({"top": 0, "opacity": 1}, 400, "easeOutBack");
        //轮播逻辑
        $('.splider .splider-content-next').click(function () {
            var firstElement = $('.splider-content-img-act .splider-content-img-li').first();
            var nextCurrent = $(".splider-content-img-li").filter(".current").next();
            $(".splider-content-img-act").append(firstElement);
            $(".splider-content-img-li").filter(".current").removeClass("current");
            nextCurrent.addClass("current");
        });

        $('.splider .splider-content-pre').click(function () {
            var lastElement = $('.splider-content-img-act .splider-content-img-li').last();
            var preCurrent = $(".splider-content-img-li").filter(".current").prev();
            $(".splider-content-img-act").prepend(lastElement);
            $(".splider-content-img-li").filter(".current").removeClass("current");
            preCurrent.addClass("current");
        });
    });
    //第四页的逻辑
    setPrevPageFunction(4, function () {
        $(".splider-content-text").css("display", "none");
    });
    setPageFunction(4, function () {
        var page = ".page4 ";
        //动画文本
        var e = $(page + ".splider-content-textT h1," + page + ".splider-content-textT font," + page + ".splider-content-textT small," + page + ".splider-content-textT span," + page + ".splider-content-textB h3," + page + ".splider-content-textB p," + page + ".splider-content-textB span");
        $(".splider-content-text").eq(2).css("display", "block");
        e.css({"top": 20, "opacity": 0});
        e.eq(0).animate({"top": 0, "opacity": 1}, 400, "easeOutBack").end().eq(1).delay(150).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(2).delay(300).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(3).delay(450).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(4).delay(600).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(5).delay(750).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(6).delay(900).animate({"top": 0, "opacity": 1}, 400, "easeOutBack");

        //第四屏逻辑
        $(".splider4-content-img-act1 li,.splider4-content-img-act2 li").mouseenter(function () {
            $(this).children("a").children(".splider4-content-img-li").children().next().stop().fadeIn(1000);
        });

        $(".splider4-content-img-act1 li,.splider4-content-img-act2 li").mouseleave(function () {
            $(this).children("a").children(".splider4-content-img-li").children().next().stop().fadeOut(1000);
        });

        $('.splider4-content-img-show').append('<div class="face">' +
            '<p></p>' +
            '<div class="top"></div>' +
            '<div class="bottom"></div>' + '</div>');

        $(".splider-content-next4").click(function () {
            $(".splider4-content-img-act2").stop().animate({"margin-left": "-820px"}, 1000, "easeInOutExpo");
        });
        $(".splider-content-pre4").click(function () {
            $(".splider4-content-img-act2").stop().animate({"margin-left": "0px"}, 1000, "easeInOutExpo");
        });
    });
    //第五页的逻辑
    setPrevPageFunction(5, function () {
        $(".splider-content-text").css("display", "none");
    });
    setPageFunction(5, function () {
        var page = ".page5 ";
        //动画文本
        var e = $(page + ".splider-content-textT h1," + page + ".splider-content-textT font," + page + ".splider-content-textT small," + page + ".splider-content-textT span," + page + ".splider-content-textB h3," + page + ".splider-content-textB p," + page + ".splider-content-textB span");
        $(".splider-content-text").eq(3).css("display", "block");
        e.css({"top": 20, "opacity": 0});
        e.eq(0).animate({"top": 0, "opacity": 1}, 400, "easeOutBack").end().eq(1).delay(150).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(2).delay(300).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(3).delay(450).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(4).delay(600).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(5).delay(750).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(6).delay(900).animate({"top": 0, "opacity": 1}, 400, "easeOutBack");

        //获取dom对象
        var p5left = $(".page5-arrow-left").get(0);
        var p5right = $(".page5-arrow-right").get(0);
        var p5ul = document.getElementById("p5pics");
        var p5lis = p5ul.children;
        var p5pics = p5ul.getElementsByTagName("img");


        //点击箭头后让图片向右移动一张
        var p5index = 0;
        p5right.onclick = function () {
            p5index++;
            if (p5index > p5lis.length - 4) {
                p5index = p5lis.length - 4;
            }
            //当图片左边有图片总张数-页面可以容纳图片张数 的图片
            //即当pic 大于5时（左边已有5张照片），让右箭头变透明
            //否则，右箭头不透明
            if (p5index > p5lis.length - 5) {
                myanimate(p5right, {opacity: 0.1});
            } else {
                myanimate(p5right, {opacity: 1});
            }
            if (p5index <= 0) {
                myanimate(p5left, {opacity: 0.1});
            } else {
                myanimate(p5left, {opacity: 1});
            }

            myanimate(p5ul, {left: -p5lis[p5index].offsetLeft});
        };
        p5left.onclick = function () {
            p5index--;
            if (p5index < 0) {
                p5index = 0;
            }
            //当图片左边没有图片，即pic小于等于0时。左箭头不需要点击功能，让左箭头变透明，
            //否则，左箭头不透明
            if (p5index > p5pics.length - 5) {
                myanimate(p5right, {opacity: 0.5});
            } else {
                myanimate(p5right, {opacity: 1});
            }
            if (p5index <= 0) {
                myanimate(p5left, {opacity: 0.5});
            } else {
                myanimate(p5left, {opacity: 1});
            }
            myanimate(p5ul, {left: -p5lis[p5index].offsetLeft});
        };


        //鼠标移入li后，让a链接中背景图变宽变高 并且遮罩层出现
        for (var i = 0; i < p5lis.length; i++) {
            p5lis[i].onmouseenter = function () {
                var $obj = $(this.children[0].children[0]);
                var cover = this.children[2];
                cover.style.display = "block";
                $obj.stop().animate({
                    width: 210,
                    height: 161,
                    top: -8,
                    left: -10
                }, 500);
            };

            p5lis[i].onmouseleave = function () {
                var $obj = $(this.children[0].children[0]);
                var cover = this.children[2];
                cover.style.display = "none";
                $obj.stop().animate({
                    width: 190,
                    height: 145,
                    top: 0,
                    left: 0
                }, 500);

            }
        }

        /*
         * 缓动改变背景图片大小的函数
         * 参数一  目标元素  参数二 背景图目标宽度  参数三  背景图目标高度
         *
         * */
    });
    //第六页的逻辑
    setPrevPageFunction(6, function () {
        $(".splider-content-text").css("display", "none");
    });
    setPageFunction(6, function () {
        var page = ".page6 ";
        //动画文本
        var e = $(page + ".splider-content-textT h1," + page + ".splider-content-textT font," + page + ".splider-content-textT small," + page + ".splider-content-textT span," + page + ".splider-content-textB h3," + page + ".splider-content-textB p," + page + ".splider-content-textB span");
        $(".splider-content-text").eq(4).css("display", "block");
        e.css({"top": 20, "opacity": 0});
        e.eq(0).animate({"top": 0, "opacity": 1}, 400, "easeOutBack").end().eq(1).delay(150).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(2).delay(300).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(3).delay(450).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(4).delay(600).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(5).delay(750).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(6).delay(900).animate({"top": 0, "opacity": 1}, 400, "easeOutBack");

        //获取相关dom对象
        var p6left = $(".page6-arrow-left").get(0);
        var p6right = $(".page6-arrow-right").get(0);
        var p6ul = document.getElementById("p6pics");
        var p6lis = p6ul.children;
        var p6pics = p6ul.getElementsByTagName("img");


//点击箭头后让图片向右移动一张
        var p6index = 0;
        p6right.onclick = function () {
            p6index++;
            if (p6index > p6lis.length - 4) {
                p6index = p6lis.length - 4;
            }
            //当图片左边有图片总张数-页面可以容纳图片张数 的图片
            //即当pic 大于5时（左边已有5张照片），让右箭头变透明
            //否则，右箭头不透明
            if (p6index > p6lis.length - 5) {
                myanimate(p6right, {opacity: 0.1});
            } else {
                myanimate(p6right, {opacity: 1});
            }
            if (p6index <= 0) {
                myanimate(p6left, {opacity: 0.1});
            } else {
                myanimate(p6left, {opacity: 1});
            }

            myanimate(p6ul, {left: -p6lis[p6index].offsetLeft});
        };
        p6left.onclick = function () {
            p6index--;
            if (p6index < 0) {
                p6index = 0;
            }
            //当图片左边没有图片，即pic小于等于0时。左箭头不需要点击功能，让左箭头变透明，
            //否则，左箭头不透明
            if (p6index > p6lis.length - 5) {
                myanimate(p6right, {opacity: 0.1});
            } else {
                myanimate(p6right, {opacity: 1});
            }
            if (p6index <= 0) {
                myanimate(p6left, {opacity: 0.1});
            } else {
                myanimate(p6left, {opacity: 1});
            }
            myanimate(p6ul, {left: -p6lis[p6index].offsetLeft});
        };


        for (var i = 0; i < p6lis.length; i++) {
            p6pics[i].onmouseenter = function () {
                var $obj = $(this);
                $(this).parent().next().stop().animate({"font-size": "25px"}, 500);
                $obj.stop().animate({
                    width: 210,
                    height: 411,
                    top: -31,
                    left: -16
                }, 500);

            };

            p6pics[i].onmouseleave = function () {
                var $obj = $(this);
                $(this).parent().next().stop().animate({"font-size": "20px"}, 500);
                $obj.stop().animate({
                    width: 178,
                    height: 348,
                    top: 0,
                    left: 0
                }, 500);

            }
        }
    });
    //第七页的逻辑
    setPrevPageFunction(7, function () {
        $(".splider-content-text").css("display", "none");
    });
    setPageFunction(7, function () {
        var page = ".page7 ";
        //动画文本
        var e = $(page + ".splider-content-textT h1," + page + ".splider-content-textT font," + page + ".splider-content-textT small," + page + ".splider-content-textT span," + page + ".splider-content-textB h3," + page + ".splider-content-textB p," + page + ".splider-content-textB span");
        $(".splider-content-text").eq(5).css("display", "block");
        e.css({"top": 20, "opacity": 0});
        e.eq(0).animate({"top": 0, "opacity": 1}, 400, "easeOutBack").end().eq(1).delay(150).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(2).delay(300).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(3).delay(450).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(4).delay(600).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(5).delay(750).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(6).delay(900).animate({"top": 0, "opacity": 1}, 400, "easeOutBack");
    });
    //第八页的逻辑
    setPrevPageFunction(8, function () {
        $(".splider-content-text").css("display", "none");
    });
    setPageFunction(8, function () {
        var page = ".page8 ";
        //动画文本
        var e = $(page + ".splider-content-textT h1," + page + ".splider-content-textT font," + page + ".splider-content-textT small," + page + ".splider-content-textT span," + page + ".splider-content-textB h3," + page + ".splider-content-textB p," + page + ".splider-content-textB span");
        $(".splider-content-text").eq(6).css("display", "block");
        e.css({"top": 20, "opacity": 0});
        e.eq(0).animate({"top": 0, "opacity": 1}, 400, "easeOutBack").end().eq(1).delay(150).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(2).delay(300).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(3).delay(450).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(4).delay(600).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(5).delay(750).animate({
            "top": 0,
            "opacity": 1
        }, 400, "easeOutBack").end().eq(6).delay(900).animate({"top": 0, "opacity": 1}, 400, "easeOutBack");
    });
});