/**
 * Created by Felix on 2016/8/13.
 */
/**
 * 添加类名
 * @param addingClass 待添加的类名或类名列表
 *   -可以传入以空格分隔的类名列表字符串，将同时添加这些类名
 */
Element.prototype.addClass = function (addingClass) {
    var addingClassList = addingClass.trim().split(/\s+/);
    for (var i = 0; i < addingClassList.length; i++) {
        if (!this.hasClass(addingClassList[i])) {
            this.className += " " + addingClassList[i];
        }
    }
    this.className = this.className.trim();
};

/**
 * 移除类名
 * @param removingClass 待移除的类名或类名列表
 *   -可以传入以空格分隔的类名列表字符串，将同时删除这些类名
 */
Element.prototype.removeClass = function (removingClass) {
    var removingClassList = removingClass.trim().split(/\s+/);
    for (var i = 0; i < removingClassList.length; i++) {
        this.className = this.className.replace(new RegExp("\\b" + removingClassList[i] + "\\b", "g"), "");
    }
    this.className = this.className.trim();
    if (this.className === "") {
        this.removeAttribute("class");
    }
};

/**
 * 查询是否含有指定类名
 * @param testingClass 待查询的类名
 *   -每次只能查询一个类名
 */
Element.prototype.hasClass = function (testingClass) {
    return new RegExp("\\b" + testingClass.trim() + "\\b", "g").test(this.className);
};

/**
 * 替换类
 * @param newClassName 新类名
 * @param oldClassName 旧类名
 */
Element.prototype.replaceClass = function (newClassName, oldClassName) {
    this.className = this.className.replace(new RegExp("\\b" + oldClassName + "\\b", "g"), newClassName);
};

/**
 * 切换类
 * @param className 待切换的类名
 *   -如果调用对象不含指定类名，为其添加这个类名，否则删除这个类名
 */
Element.prototype.toggleClass = function (className) {
    this.hasClass(className) ? this.removeClass(className) : this.addClass(className);
};

/**
 * 修剪字符串两边的空格兼容
 * @param str 待处理字符串
 * @returns {*} 修剪过后的字符串
 */
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    };
}

/**
 * 获取任意范围内的随机数
 * @param min 最小值
 * @param max 最大值
 * @returns {number} 随机数
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 获取数组中的随机元素
 * @returns {*}
 */
Array.prototype.getRandomItem = function () {
    var random = getRandom(0, this.length - 1);
    return {index: random, value: this[random]};
};

/**
 * 注册事件添加到原型
 * @type {HTMLDocument.removeEvent}
 */
Element.prototype.addEvent = HTMLDocument.prototype.addEvent = function (eventType, handlerFunc, useCapture) {
    addEventHandler(this, eventType, handlerFunc, useCapture);
};

/**
 * 移除事件添加到原型
 * @type {HTMLDocument.removeEvent}
 */
Element.prototype.removeEvent = HTMLDocument.prototype.removeEvent = function (eventType, handlerFunc, useCapture) {
    removeEventHandler(this, eventType, handlerFunc, useCapture);
};

/**
 * 注册事件兼容处理
 * @param obj 要注册事件的对象
 * @param eventType 要注册的事件类型
 * @param handlerFunc 要注册的事件处理函数
 * @param useCapture 是否使用捕获（仅支持现代浏览器）
 */
function addEventHandler(obj, eventType, handlerFunc, useCapture) {
    if (obj.addEventListener) {
        obj.addEventListener(eventType, handlerFunc, useCapture ? true : false);
    } else {
        window.eventDictionary = window.eventDictionary || [];
        obj.eventElementId = obj.eventElementId || (window.eventDictionary.length === 0 ? 1 : window.eventDictionary.length);
        window.eventDictionary[obj.eventElementId] = window.eventDictionary[obj.eventElementId] || [];
        var __EventType = "__on" + eventType;
        var __ThisObjThisTypeAgenda = window.eventDictionary[obj.eventElementId][__EventType] = window.eventDictionary[obj.eventElementId][__EventType] || [];
        var isExist = false;
        for (var j = 0; j < __ThisObjThisTypeAgenda.length; j++) {
            if (__ThisObjThisTypeAgenda[j] === handlerFunc) {
                isExist = true;
                break;
            }
        }
        if (!isExist) {
            __ThisObjThisTypeAgenda.push(handlerFunc);
        }
        obj["on" + eventType] = function () {
            for (var k = 0; k < __ThisObjThisTypeAgenda.length; k++) {
                __ThisObjThisTypeAgenda[k].apply(obj, arguments);
            }
        }
    }
}

/**
 * 移除事件兼容处理
 * @param obj 要移除事件的对象
 * @param eventType 要移除的事件类型
 * @param handlerFunc 要移除的事件处理函数
 * @param useCapture 是否使用捕获
 */
function removeEventHandler(obj, eventType, handlerFunc, useCapture) {
    if (obj.removeEventListener) {
        obj.removeEventListener(eventType, handlerFunc, useCapture ? true : false);
    } else {
        var __EventType = "__on" + eventType, __ThisObjThisTypeAgenda;
        if (!(__ThisObjThisTypeAgenda = window.eventDictionary[obj.eventElementId][__EventType])) {
            return;
        }
        for (var i = 0; i < __ThisObjThisTypeAgenda.length; i++) {
            if (__ThisObjThisTypeAgenda[i] === handlerFunc) {
                __ThisObjThisTypeAgenda.splice(i, 1);
            }
        }
    }
}

/**
 * 设置cookie
 * @param cookieData cookie信息对象，对象属性名提示：name,value,expires,domain,path,secure
 *   -开启secure请将secure属性设置为true，否则设置为false
 *   -参数举例：{name: "a1", value: "1", secure: false}
 */
function setCookie(cookieData) {
    if (cookieData.name === null) {
        throw Error("Name of cookie is necessary.");
    }
    if (cookieData.value === null) {
        throw Error("Value of cookie is necessary.");
    }
    var cookieStr = "";
    cookieStr += (cookieData.name + "=" + encodeURIComponent(cookieData.value) + ";");
    if (cookieData.expires) {
        cookieStr += "expires=" + new Date(cookieData.expires).toGMTString() + ";";
    }
    if (cookieData.domain) {
        cookieStr += "domain=" + cookieData.domain + ";";
    }
    if (cookieData.path) {
        cookieStr += "path=" + cookieData.path + ";";
    }
    if (cookieData.secure) {
        cookieStr += "secure;";
    }
    document.cookie = cookieStr;
}

/**
 * 获取指定的cookie值
 * @param cookieName 需要获取的cookie名
 * @returns {*} 名为cookieName的值，如果未找到返回空字符串
 *   -返回的字符串已经过解码
 */
function getCookie(cookieName) {
    var cookieList = document.cookie.split("; ");
    console.log(cookieList);
    for (var i = 0; i < cookieList.length; i++) {
        var keyValue = cookieList[i].split("=");
        if (keyValue[0] === cookieName) {
            return decodeURIComponent(keyValue[1]);
        }
    }
    return "";
}

/**
 * 删除指定的cookie
 * @param cookieName 需要删除的cookie名
 */
function delCookie(cookieName) {
    var expires = new Date();
    expires.setTime(expires.getTime() - 1);
    document.cookie = cookieName + "=; expires=" + expires.toGMTString();
}
/**
 * 显示元素
 */
Element.prototype.show = function () {
    this.style.display = "block";
};
/**
 * 隐藏元素
 */
Element.prototype.hide = function () {
    this.style.display = "none";
};

/**
 * 格式化日期时间
 * @param format 格式化参照字符串
 * @param date 待格式化的时间
 * @returns string 格式化后的字符串
 *   -如果date参数未传入，默认为格式化当前时间
 *   -字母含义对照表：
 *   Y    完整年         2016
 *   y    缩写年         16
 *   M    月(带前导0)    01
 *   m    月             1
 *   __m  中文月         一
 *   _M   完整英文月     Monday
 *   _m   缩写英文月     Mon
 *   D    日(带前导0)   02
 *   d    日            2
 *   w    数字星期      7
 *   __w  中文星期      日
 *   _W   完整英文星期  Sunday
 *   _w   缩写英文星期  Sun
 *   H    24时(带前导0) 09
 *   h    24时缩写时    9
 *   G    12时(带前导0) 09
 *   g    12时缩写时    9
 *   A    大写上下午    AM
 *   a    小写上下午    am
 *   i    分(带前导0)   05
 *   s    秒(带前导0)   05
 *   u    毫秒          555
 */
function formatDate(format, date) {
    //参数处理
    if (!format && (typeof format !== "string")) {
        throw Error("格式化参照字符串有误。");
    }
    date = date || new Date();
    //相关字典
    var day = [{
        n: 7,
        e: "Sun",
        ef: "Sunday",
        c: "日"
    }, {
        n: 1,
        e: "Mon",
        ef: "Monday",
        c: "一"
    }, {
        n: 2,
        e: "Tue",
        ef: "Tuesday",
        c: "二"
    }, {
        n: 3,
        e: "Wed",
        ef: "Wednesday",
        c: "三"
    }, {
        n: 4,
        e: "Thu",
        ef: "Thursday",
        c: "四"
    }, {
        n: 5,
        e: "Fri",
        ef: "Friday",
        c: "五"
    }, {
        n: 6,
        e: "Sat",
        ef: "Saturday",
        c: "六"
    }];
    var month = [{
        e: "Jan",
        ef: "January",
        c: "一"
    }, {
        e: "Feb",
        ef: "February",
        c: "二"
    }, {
        e: "Mar",
        ef: "March",
        c: "三"
    }, {
        e: "Apr",
        ef: "April",
        c: "四"
    }, {
        e: "May",
        ef: "May",
        c: "五"
    }, {
        e: "Jun",
        ef: "June",
        c: "六"
    }, {
        e: "Jul",
        ef: "July",
        c: "七"
    }, {
        e: "Aug",
        ef: "August",
        c: "八"
    }, {
        e: "Sep",
        ef: "September",
        c: "九"
    }, {
        e: "Oct",
        ef: "October",
        c: "十"
    }, {
        e: "Nov",
        ef: "November",
        c: "十一"
    }, {
        e: "Dec",
        ef: "December",
        c: "十二"
    }];
    //格式化操作
    return format.replace(/Y|y|M|m|__m|_M|_m|D|d|w|__w|_W|_w|H|h|G|g|A|a|i|s|u/g, function ($1) {
        switch ($1) {
            case "Y":
                return date.getFullYear();
                break;
            case "y":
                return date.getFullYear() % 100;
                break;
            case "M":
                return date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                break;
            case "m":
                return date.getMonth() + 1;
                break;
            case "__m":
                return month[date.getMonth()]["c"];
                break;
            case "_M":
                return month[date.getMonth()]["ef"];
                break;
            case "_m":
                return month[date.getMonth()]["e"];
                break;
            case "D":
                return date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                break;
            case "d":
                return date.getDate();
                break;
            case "w":
                return day[date.getDay()]["n"];
                break;
            case "__w":
                return day[date.getDay()]["c"];
                break;
            case "_W":
                return day[date.getDay()]["ef"];
                break;
            case "_w":
                return day[date.getDay()]["e"];
                break;
            case "H":
                return date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                break;
            case "h":
                return date.getHours();
                break;
            case "G":
                return hourTo12() < 10 ? "0" + hourTo12() : hourTo12();
                break;
            case "g":
                return hourTo12();
                break;
            case "A":
                return date.getHours() <= 12 ? "AM" : "PM";
            case "a":
                return date.getHours() <= 12 ? "am" : "pm";
            case "i":
                return date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                break;
            case "s":
                return date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
                break;
            case "u":
                return date.getMilliseconds();
                break;
            default:
                return "ERROR!";
        }
        function hourTo12() {
            var hour = date.getHours();
            if (hour < 12) {
                return hour;
            } else if (hour === 12) {
                return 12;
            } else {
                return hour - 12;
            }
        }
    });
}

//getElementsByClassName兼容
document.gEBCN = document.getElementsByClassName;
document.getElementsByClassName = function (className) {
    if (this.gEBCN) {
        return this.gEBCN(className);
    } else {
        var allEleArr = document.getElementsByTagName("*");
        var resultArr = [];
        for (var i = 0; i < allEleArr.length; i++) {
            if (allEleArr[i].hasClass(className)) {
                resultArr.push(allEleArr[i]);
            }
        }
        return resultArr;
    }
};