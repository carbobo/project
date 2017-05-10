/**
 * Created by Felix on 2016/8/20.
 */
document.addEvent("DOMContentLoaded", function () {
    /*----------------------
     * DOM对象获取
     *-----------------------*/
    var wrapperDiv = document.getElementsByClassName("wrapper")[0];
    var timeP = document.getElementsByClassName("time")[0];
    var levelP = document.getElementsByClassName("level")[0];
    var scoreP = document.getElementsByClassName("score")[0];
    var markP = document.getElementsByClassName("mark")[0];
    var againDiv = document.getElementsByClassName("again")[0];


    /*----------------------
     * 变量初始化
     *-----------------------*/
    var $Ui = new Ui(location.href);
    var levelDictionary = ["正常", "冒险", "大师"];


    /*----------------------
     * 页面初始化
     *-----------------------*/
    $Ui.init();
    againDiv.addEvent("click", function () {
        location.href = "../../cases/index.html";
    });


    /*----------------------
     * Ui
     *-----------------------*/
    function Ui(url) {
        this.result = url.match(/s=(\d+)/)[1];
        this.time = url.match(/t=(\d+)/)[1];
        this.level = url.match(/l=(\d+)/)[1];
        this.score = url.match(/sc=(\d+)/)[1];

        this.init = function () {
            wrapperDiv.style.background = "url(images/" + (parseInt(this.result) ? "win" : "lose") + ".jpg) no-repeat";
            if (this.time !== 60) {
                var d = new Date(0);
                d.setSeconds(this.time);
                var formattedDate = formatDate("i:s", d);
                timeP.innerText = "00:" + formattedDate;
            }
            levelP.innerHTML = levelDictionary[this.level - 1];
            scoreP.innerHTML = this.score;
            var mark;
            switch (true) {
                case (this.score > 350):
                    mark = "S";
                    break;
                case (this.score > 300):
                    mark = "A";
                    break;
                case (this.score > 250):
                    mark = "B";
                    break;
                case (this.score > 200):
                    mark = "C";
                    break;
                case (this.score > 100):
                    mark = "D";
                    break;
                case (this.score > 50):
                    mark = "E";
                    break;
                default:
                    mark = "F";
                    break;
            }
            markP.innerHTML = mark;
        }
    }
});
