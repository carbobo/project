$(function() {
    $(window).on("load", function() {
        // 加载的时候以瀑布流的形式显示
        ImgUtil.imgLocation();
    });

    $(window).scroll(function() {
        // 如果可以加载新的图片
        if (ImgUtil.scrollLoad()) {
            // 循环插入新的元素 
            $.each(ImgData.myData.data, function(index, value) {
                console.log(value);
                var box = $("<li>").appendTo($(".main-content"));
                var pic = $("<img>").attr("src", "./images/" + $(value).attr("src")).appendTo(box);
                var info = $("<div>").addClass("info").appendTo(box);
                var label = $("<label>").text("标签：").appendTo(info);
                var a = $("<a>").attr("href", $(value).attr("info-href")).text($(value).attr("info-name")).appendTo(info);
            });
            // 以瀑布流的形式显示
            ImgUtil.imgLocation();
        }
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() == 0) {
            $(".go-top").hide();
        } else {
            $(".go-top").show();
        }
    });

    $(".go-top").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 500);
    });
});

var ImgUtil = {
    imgLocation: function() {
        var box = $(".main-content li");
        // 获取每个图片单元的总宽度，注意width()，innerWidth()，outerWidth()三个方法的区别
        // outerWidth()传递参数，表示是否包括margin的值
        var boxWidth = box.eq(0).outerWidth(true);
        // 一排放num张图片
        var num = Math.floor($(".main-container").width() / boxWidth);
        // 创建数组，存放图片单元高度
        var boxArr = [];
        box.each(function(index, Element) {
            var boxHeight = box.eq(index).outerHeight(true);
            if (index < num) {
                boxArr[index] = boxHeight;
            } else {
                // 将下一个元素放到当前最小高度的图片单元下面
                var minBoxHeight = Math.min.apply(null, boxArr);
                var minBoxPosition = $.inArray(minBoxHeight, boxArr);
                $(Element).css({
                    "position": "absolute",
                    "top": minBoxHeight,
                    "left": box.eq(minBoxPosition).position().left
                });
                // 重新计算高度
                boxArr[minBoxPosition] += $(Element).outerHeight(true);
            }
        });
    },
    scrollLoad: function() {
        var box = $(".main-content li");
        // 最后一个box的高度一半，再加上其距离文档顶部的距离，就是要加载新图像的临界点
        var lastBoxHeight = box.last().offset().top + Math.floor(box.last().outerHeight(true) / 2);
        // 屏幕底部到文档顶部的距离
        var screenBottomHeight = $(window).height() + $(window).scrollTop();
        return lastBoxHeight < screenBottomHeight ? true : false;
    }
}


var ImgData = {
    // 本地数据来模拟
    myData: {
        "data": [{
            "src": "1.jpg",
            "info-name": "angelababy",
            "info-href": "#"
        }, {
            "src": "2.jpg",
            "info-name": "邓紫棋",
            "info-href": "#"
        }, {
            "src": "3.jpg",
            "info-name": "winner",
            "info-href": "#"
        }, {
            "src": "4.jpg",
            "info-name": "孙俪",
            "info-href": "#"
        }, {
            "src": "5.jpg",
            "info-name": "余文乐",
            "info-href": "#"
        }, {
            "src": "6.jpg",
            "info-name": "柳岩",
            "info-href": "#"
        }, {
            "src": "7.jpg",
            "info-name": "汤唯",
            "info-href": "#"
        }, {
            "src": "8.png",
            "info-name": "明星",
            "info-href": "#"
        }, {
            "src": "9.jpg",
            "info-name": "宋慧乔",
            "info-href": "#"
        }, {
            "src": "10.jpg",
            "info-name": "组合",
            "info-href": "#"
        }, {
            "src": "11.jpg",
            "info-name": "明星",
            "info-href": "#"
        }, {
            "src": "12.jpg",
            "info-name": "明星",
            "info-href": "#"
        }, {
            "src": "13.jpg",
            "info-name": "王力宏",
            "info-href": "#"
        }, {
            "src": "14.jpg",
            "info-name": "林心如",
            "info-href": "#"
        }, {
            "src": "15.jpg",
            "info-name": "明星",
            "info-href": "#"
        }, {
            "src": "16.jpg",
            "info-name": "杨幂",
            "info-href": "#"
        }, {
            "src": "17.jpg",
            "info-name": "angelababy",
            "info-href": "#"
        }, {
            "src": "18.jpg",
            "info-name": "周杰伦",
            "info-href": "#"
        }, {
            "src": "19.jpg",
            "info-name": "张杰",
            "info-href": "#"
        }, {
            "src": "20.jpg",
            "info-name": "教主",
            "info-href": "#"
        }]
    }
}