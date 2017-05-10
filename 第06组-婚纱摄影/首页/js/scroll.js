/**
 * Created by Felix on 2016/9/1.
 */

/**
 * 滚动参数设置
 */
var scrollDuration = 1000;                      //滚动动画持续时间
var scrollCoolDown = 200;                       //滚动冷却时间，单位毫秒，默认200毫秒
var scrollTimingFunction = "easeInOutExpo";     //滚动时间函数，默认为easeInOutExpo

/**
 * 变量初始化
 */
var nowPageIndex = 0;                           //当前页
var nowWindowHeight = 0;                        //当前可视区域高度
var isScrolling = false;                        //滚动标记，表示页面是否正在滚动中
var funcDictionary = {};                        //回调函数字典
var prevFuncDictionary = {};                    //动画前函数字典

/**
 * 设置指定页面的页面处理程序
 * @param pageIndex 页面索引
 * @param fn 回调函数
 *  *  -这里是页面处理程序，每次跳转到指定页面都会执行
 */
function setPageFunction(pageIndex, fn) {
    funcDictionary[pageIndex - 1] = fn;
}

/**
 * 设置指定页面的页面处理程序
 * @param pageIndex 页面索引
 * @param fn 回调函数
 *  *  -这里是页面处理程序，每次跳转到指定页面都会执行
 */
function setPrevPageFunction(pageIndex, fn) {
    prevFuncDictionary[pageIndex - 1] = fn;
    console.log(prevFuncDictionary);
}

/**
 * 设置页面初始化事件处理程序
 * @param fn 回调函数
 *  -这里是初始化程序，只执行一次
 */
function setInitFunction(fn) {
    fn();
}

/**
 * 入口函数
 *   -DOMContentLoaded触发时执行
 */
$(function () {
    //获取相关DOM对象
    var wrapper = $(".scroll-wrapper");         //包裹层
    var mover = $(".mover");                    //移动层
    var pages = $(".page");                     //页面层
    var nav = $(".navButtons ul");              //导航层
    var navBtns = null;                      //导航按钮

    //获取相关参数
    var nowIndex = 0;                           //当前页面索引
    var pageCount = pages.length;               //页面数量

    //页面初始化
    //初始化页面尺寸
    initPagesSize();
    //调整窗口时修复页面尺寸
    $(window).resize(function () {
        //初始化页面尺寸
        initPagesSize();
        //修正mover位置
        mover.css("top", -nowPageIndex * $(window).height());
    });
    //如果第一张页面有页面函数（怎么可能会没有- -!）
    if (funcDictionary[0]) {
        //执行第一张页面的页面函数
        funcDictionary[0]();
    }
    //初始化右侧导航按钮
    pages.each(function (i) {
        //创建新的按钮
        var newNavBtn = $("<li></li>");
        //为第一个按钮添加current类
        newNavBtn.addClass(i === 0 ? "current" : "");
        //为导航按钮注册点击事件
        newNavBtn.click(function () {
            //滚动到点击导航按钮指向的页面
            scrollHandler(i);
            //修改导航按钮类名
            $(this).addClass("current").siblings().removeClass("current");
        });
        //按钮追加到ul中
        newNavBtn.appendTo(nav.eq(0));
    });
    nav.css("marginTop", -nav.height() / 2);
    navBtns = nav.children();


    // //【测试用】生成背景色
    // pages.each(function (i, e) {
    //     $(e).css("backgroundColor", "#" + i + i + i);
    // });


    //鼠标滚动的处理
    mover.mousewheel(function (event, delta) {
        //鼠标滚动方向：向上滚动delta为1，向下滚动delta为-1
        //如果滚动动画正在进行，直接返回
        if (isScrolling) {
            return;
        }
        //确认执行滚动，设置滚动标记为true
        isScrolling = true;
        //请求滚动到的页面索引
        var toPage = nowPageIndex + -delta;
        console.log("【Request】请求滚动到第" + toPage + "页");
        //修正滚动页面索引（下溢）
        if (toPage < 0) {
            toPage = 0;
            console.log("【Feedback】请求失败：第" + (toPage - 1) + "页不存在");
        }
        //修正滚动页面索引（上溢）
        if (toPage > pageCount - 1) {
            toPage = pageCount - 1;
            console.log("【Feedback】请求失败：第" + (toPage + 1) + "页不存在");
        }
        nowIndex = toPage;
        //动画处理
        scrollHandler(nowIndex);
    });


    /**
     * 初始化页面尺寸
     */
    function initPagesSize() {
        //记录当前屏幕高度
        nowWindowHeight = $(window).height();
        //mover的宽高设置为浏览器可视区域宽高
        wrapper.css({"width": $(window).width(), "height": $(window).height()});
        //pages宽高设置为浏览器可视区域宽高
        pages.css({"width": $(window).width(), "height": $(window).height()});
    }


    /**
     * 滚动处理
     * @param pageIndex 要滚动到的页面索引
     */
    function scrollHandler(pageIndex) {
        //要移动到的页不等于当前页时才执行动画
        if (pageIndex !== nowPageIndex) {
            console.log("【Feedback】请求成功：正在滚动到第" + pageIndex + "页...");
            //计算滚动距离
            var target = -pageIndex * $(window).height();
            //处理导航按钮
            navBtns.eq(nowIndex).addClass("current").siblings().removeClass("current");
            //如果有页面回调函数，执行页面回调函数
            if (prevFuncDictionary[pageIndex]) {
                prevFuncDictionary[pageIndex]();
            }
            mover.stop().animate({"top": target}, scrollDuration, scrollTimingFunction, function () {
                //延迟0.2s后执行回调函数
                setTimeout(function () {
                    //动画过后将滚动标记还原为false
                    isScrolling = false;
                    //如果有页面回调函数，执行页面回调函数
                    if (funcDictionary[pageIndex]) {
                        funcDictionary[pageIndex]();
                    }
                }, scrollCoolDown);
            });
            nowPageIndex = pageIndex;
        } else {
            //如果要移动的页等于当前页，不执行动画
            //同时将滚动标记还原为false
            isScrolling = false;
        }
    }
});