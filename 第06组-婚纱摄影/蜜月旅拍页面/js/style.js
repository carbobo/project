/**
 * Created by Me on 2016/9/1.
 */
$(document).ready(function() {
    function my$(id) {
        return document.getElementById(id);
    }

    //获取wrap对象
    var oParent = my$('wrap');
    /* //定义一个数组用来存储图片提示文字
     var article = [
     '有一种陪伴虽不见身影，却很真诚;有一种守候虽悄然无声，却很深情。',
     '无论何种感情，不要成为一种负累。若形成压力，总要逃离;若造就牵绊，总会失去。在意，却不刻意;珍惜，却不痴迷',
     '在爱情的问题上，往往没有谁对谁错，爱情只是一种缘分。缘至则聚，缘尽则散。能够结为夫妻并相伴到地老天荒，那是珍贵的不尽缘。',
     ' 走千条路，只一条适合;遇万般人，得一人足够。',
     '习惯着彼此的语言，重复万遍也不觉厌倦;等待着彼此的晚安，只因为心里那份惦念。',
     '趁着年轻，大胆地走出去，去迎接风霜雨雪的洗礼，',
     '我想我们每一个人都必须学会适应聚散无常，而不是每次都手足无措地哭泣',
     '成长起码有一个好处 想去什么地方 能掏出一张车票钱以前那么想 现在还这么想',
     '在爱情的问题上，往往没有谁对谁错，爱情只是一种缘分。缘至则聚，缘尽则散。能够结为夫妻并相伴到地老天荒，那是珍贵的不尽缘。',
     '你不必流离失所也不必像一个拾荒者那般寂寥无色只要在路边等待 便不会错过末班车',
     '不是我小气，只是我现在用的我父母的血汗钱，让我如何大方 ?',
     '一个成熟的人往往发觉可以责怪的人越来越少，人人都有他的难处。',
     '你还要长大 几经苦苦挣扎几度重新站立绝不服输'];
     //定义一个空字符串 为下边进行字符串拼接
     var str = '';
     //根据文字字符串的长度 新建n个box
     for (var i = 0; i < article.length; i++) {
     str += '<div class="box">'
     + '<div class="pic">'
     + '<img src="images/' + (i + 1) + '.jpg" alt="">'
     + '<div class="face">'
     + '<p>' + article[i] + '</p>'
     + '<div class="left"></div>'
     + '<div class="right"></div>'
     + '</div>'
     + '</div>'
     + '</div>';
     }
     //直接在wrap中插入拼接后的字符串
     my$('wrap').innerHTML = str;*/

    //调用瀑布流函数
    warterFall('wrap', 'box');

    //创建scroll事件
    window.onscroll = function () {
        //判断是否触底
        if (checkscroll()) {
            var dataImg = {
                "data": [
                    {"src": 'images/1.jpg'},
                    {"src": 'images/2.jpg'},
                    {"src": 'images/3.jpg'},
                    {"src": 'images/4.jpg'},
                    {"src": 'images/5.jpg'},
                    {"src": 'images/6.jpg'},
                    {"src": 'images/7.jpg'},
                    {"src": 'images/8.jpg'},
                    {"src": 'images/9.jpg'},
                    {"src": 'images/10.jpg'},
                    {"src": 'images/11.jpg'},
                    {"src": 'images/12.jpg'},
                    {"src": 'images/13.jpg'},
                    {"src": 'images/14.jpg'},
                    {"src": 'images/15.jpg'}
                ],
                "article": [
                    '有一种陪伴虽不见身影，却很真诚;有一种守候虽悄然无声，却很深情。',
                    '无论何种感情，不要成为一种负累。若形成压力，总要逃离;若造就牵绊，总会失去。在意，却不刻意;珍惜，却不痴迷',
                    '在爱情的问题上，往往没有谁对谁错，爱情只是一种缘分。缘至则聚，缘尽则散。能够结为夫妻并相伴到地老天荒，那是珍贵的不尽缘。',
                    ' 走千条路，只一条适合;遇万般人，得一人足够。',
                    '习惯着彼此的语言，重复万遍也不觉厌倦;等待着彼此的晚安，只因为心里那份惦念。',
                    '趁着年轻，大胆地走出去，去迎接风霜雨雪的洗礼，',
                    '我想我们每一个人都必须学会适应聚散无常，而不是每次都手足无措地哭泣',
                    '成长起码有一个好处 想去什么地方 能掏出一张车票钱以前那么想 现在还这么想',
                    '在爱情的问题上，往往没有谁对谁错，爱情只是一种缘分。缘至则聚，缘尽则散。能够结为夫妻并相伴到地老天荒，那是珍贵的不尽缘。',
                    '你不必流离失所也不必像一个拾荒者那般寂寥无色只要在路边等待 便不会错过末班车',
                    '不是我小气，只是我现在用的我父母的血汗钱，让我如何大方 ?',
                    '一个成熟的人往往发觉可以责怪的人越来越少，人人都有他的难处。',
                    '你还要长大 几经苦苦挣扎几度重新站立绝不服输',
                    '十年前你是谁，一年前你是谁，甚至昨天你是谁，都不重要。重要的是，今天你是谁?',
                    '人生是很累的，你现在不累，以后就会更累。',
                    '顺境中意气风发，困境是也应该坦然面对，这才是积极的人生。'
                ]
            }
            //对从后台获取的数据进行遍历 动态生成元素
            for (var i = 0; i < dataImg.data.length; i++) {

                //创建div元素添加到wrap中
                var oBox = document.createElement('div');
                oBox.className = 'box';
                oParent.appendChild(oBox);
                //创建div元素添加到前一个新建的div中
                var oPic = document.createElement('div');
                oPic.className = 'pic';
                oBox.appendChild(oPic);
                //在div中添加img标签 用来显示图片
                var oImg = document.createElement('img');
                oImg.src = dataImg.data[i].src;
                oPic.appendChild(oImg);
                //创建div元素作为滑动窗层
                var oFace = document.createElement('div');
                oFace.className = 'face';
                oPic.appendChild(oFace);
                //创建div元素添加到滑动窗层 左侧滑动窗
                var oLeft = document.createElement('div');
                oLeft.className = 'left';
                oFace.appendChild(oLeft);
                //创建div元素添加到滑动窗层 右侧滑动窗
                var oRight = document.createElement('div');
                oRight.className = 'right';
                oFace.appendChild(oRight);
                //创建p标签添加到滑动窗层中 用来显示文字
                var oP = document.createElement('p');
                oFace.appendChild(oP);
                oP.innerHTML = dataImg.article[i];
            }
            warterFall('wrap', 'box');
        }
    }


    //封装瀑布流函数
    function warterFall(parent, child) {
        var oParent = document.getElementById(parent);
        //获取到oParent中的所有child
        var oBox = getClassName(oParent, child);
        //第一个盒子的宽度
        var oBoxW = oBox[0].offsetWidth;
        //可视区宽度
        var winW = document.documentElement.clientWidth || document.body.clientWidth;
        //每行的盒子个数
        var mun = Math.floor(winW / oBoxW);//图片不能有半张的
        /**
         * wrap 居中
         */
        /* var tBox =  my$('content').children[0].children[0].offsetWidth;
         my$('content').style.cssText = "width:" + tBox * mun + 'px;margin:auto'*/
        oParent.style.cssText = "width:" + oBoxW * mun + 'px;margin:auto'
        var arrBoxH = [];
        for (var i = 0; i < oBox.length; i++) {
            var oBoxH = oBox[i].offsetHeight;
            if (i < mun) {
                //把第一行所有盒子的高度 放到数组里
                //存储每一列的高度
                arrBoxH.push(oBoxH)
            } else {
                //后面的盒子 需要被JS设置位置的盒子
                var minH = Math.min.apply(null, arrBoxH);//获取盒子中高度最小的盒子的高度
                var minHIndex = getIndex(minH, arrBoxH);//获取相应盒子的索引
                //要想left和top生效先要加定位
                oBox[i].style.position = 'absolute';
                //left 和 高度最小的那一列的索引对应的盒子 的 left是一样的
                oBox[i].style.left = oBox[minHIndex].offsetLeft + 'px';
                //top 是存储盒子高度数组里的最小值
                oBox[i].style.top = arrBoxH[minHIndex] + 'px';
                //放完盒子之后要记得对记录高度的数组的数值进行改变
                //后面的盒子根据新的数组的数值进行放置
                arrBoxH[minHIndex] += oBox[i].offsetHeight;
            }
        }
    }

    //封装获取通过类名获取对象的函数
    function getClassName(parent, child) {
        var arr = [];
        var allBox = parent.getElementsByTagName('*');
        for (var i = 0; i < allBox.length; i++) {
            if (allBox[i].className == child) {
                arr.push(allBox[i]);
            }
        }
        return arr;
    }

    //封装获取最小盒子高度盒子索引的函数
    function getIndex(minH, arrBoxHeight) {
        for (i in arrBoxHeight) {//遍历存储盒子高度的数组
            if (arrBoxHeight[i] == minH) {
                return i;
            }
        }
    }

    function checkscroll() {
        //获取到wrap层中的所有box
        var oBox = getClassName(oParent, 'box');
        //最后一个盒子
        var lastBox = oBox[oBox.length - 1];
        //最后一个盒子到页面顶部的高度
        var lastBoxT = Math.floor(lastBox.offsetTop + lastBox.offsetHeight / 2);
        //当前可视区的高度
        var winH = document.documentElement.clientHeight;
        //页面被卷去的头部
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //页面被卷去的头部+当前可视区的高度 > 最后一个盒子顶部的offsetTop
        return (lastBoxT < winH + scrollTop) ? true : false;
    }
});
