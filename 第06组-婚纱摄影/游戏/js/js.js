/**
 * Created by Felix on 2016/8/19.
 */

/*----------------------
 * 游戏参数声明与展示（游戏参数在Ui类的start方法中设置）
 *-----------------------*/
var gameTime = null;                    //单位:秒
var level = null;                       //1-正常  2-冒险  3-大师
var floatThroughTime = null;            //单词船速度，值越大速度越快 数组[随机值最小值,随机值最大值]
var throwInRate = null;                 //单词船投掷频率，值越大速度越快数组[随机值最小值,随机值最大值]
var comboTime = null;                   //连击判定时间


document.addEvent("DOMContentLoaded", function () {
    /*----------------------
     * DOM属性设置及对象获取
     *-----------------------*/
    var stageDiv = document.getElementsByClassName("stage")[0];                 //舞台div
    var tunnelDiv = document.getElementsByClassName("tunnel");                  //河道div
    var scoreDiv = document.getElementsByClassName("score")[0];                 //分数div
    var timerDiv = document.getElementsByClassName("timer")[0];                 //计时器div
    var introDl = document.getElementsByClassName("intro")[0];                  //引导（选择难度）dl
    var normalLevelBtn = document.getElementsByClassName("normal")[0];          //正常难度选择按钮dd
    var adventureLevelBtn = document.getElementsByClassName("adventure")[0];    //冒险难度选择按钮dd
    var masterLevelBtn = document.getElementsByClassName("master")[0];          //大师难度选择按钮dd
    var levelDescDiv = document.getElementsByClassName("levelDesc")[0];         //难度描述div
    var normalDesc = document.getElementsByClassName("normalDesc")[0];          //普通难度描述【规则】（第三条）p
    var adventureDesc = document.getElementsByClassName("adventureDesc")[0];    //冒险难度描述【规则】（第三条）p
    var masterDesc = document.getElementsByClassName("masterDesc")[0];          //大师难度描述【规则】（第三条）p
    var comboDiv = document.getElementsByClassName("combo")[0];                 //连击div
    var missDiv = document.getElementsByClassName("miss")[0];                   //丢失div

    var stageWidth = stageDiv.offsetWidth;                                      //获取舞台宽度
    var comboAndMissAnimationDuration = 0.3;                                    //连击和丢失动画持续时间（单位秒）


    /*----------------------
     * 游戏初始化
     *-----------------------*/
    var $data = new Data(gameTime, level);          //实例化Data游戏数据类
    var $tool = new Tool();                         //实例化Tool工具类
    var $game = new Game();                         //实例化Game游戏核心类
    var $script = new Script();                     //实例化Script游戏脚本类
    var isGameRunning = false;                      //游戏运行状态（true:运行中，false:未运行）
    var shipIdCount = 0;                            //单词船id计数变量
    var $Ui = new Ui();                             //实例化UI
    var shipsOnStage = {};                          //在舞台上的船集合，key为单词船id，value为Ship实例对象
    var nowShip = null;                             //当前针对的单词船
    var tunnels = [];                               //河道数组
    var zIndex = 1;                                 //针对的单词船增加zIndex自增变量
    var comboCount = 0;                            //当前是否处于连击状态
    var comboTimer = null;                          //连击计时器
    for (var i = 0; i < tunnelDiv.length; i++) {    //河道DOM推入数组
        tunnels.push(tunnelDiv[i]);
    }
    $Ui.init();                                     //初始化UI界面（绑定众按钮事件）


//————————————————————————————————————————————————————————————————————
//     调试使用
//     $script.gameStart();
//————————————————————————————————————————————————————————————————————

    setInterval(function () {
        console.log(comboCount);
    }, 1000);
    /*----------------------
     * 游戏核心——处理创建和移除单词船，玩家操作的处理，命中处理，连击处理，丢失处理
     *-----------------------*/
    function Game() {
        /**
         * 创建单词船（Ship类的实例）
         */
        this.createShip = function () {
            var thisTxt = $data.wordsDictionary.getRandomItem();     //从字典中随机获取单词
            $data.wordsDictionary.splice(thisTxt.index, 1);          //该单词从单词字典（暂时）删除，单词船移除后会将单词再次添加到单词字典中（保证舞台上没有相同单词的单词船）
            return new Ship(thisTxt.value);                          //创建一个新的单词船实例对象，并将其返回
        };

        /**
         * 移除单词船
         * -玩家成功输入某个单词船所有字母时会移除单词船
         * -单词船飘过整个舞台没有被玩家理时会移除单词船
         */
        this.removeShip = function (shipId, goodRemove) {
            var ship = $tool.getShipById(shipId);                                       //根据单词船id获取要删除的Ship类实例对象
            if (!ship) {                                                                //没有获取到单词船实例对象就返回，避免重复删除
                return;
            }
            clearInterval(ship.animator);                                               //停止单词船动画
            ship.dom.parentNode.removeChild(ship.dom);                                  //删除单词船DOM
            $data.wordsDictionary.push(ship.txt);                                       //将单词船的单词回收到单词字典
            (goodRemove || ship.pointer) && (nowShip = null);                           //该单词船被玩家消除还是丢失，成功的话当前单词船指针（nowShip）重置为null
            delete shipsOnStage[shipId];                                                //从舞台上的单词船集合删除ship对象
            $data.scoreChange(goodRemove ? true : false);         //计分操作
        };

        /**
         * 键盘操作
         * -为document注册keypress事件，玩家按键时做出相应处理
         * todo：（待实现）正常和冒险难度下不区分大小写，老兵难度下区分大小写
         */
        this.controls = function () {
            //为document注册keypress事件
            document.addEvent("keypress", function (e) {
                var key = String.fromCharCode(e.keyCode);                        //案件编码转为对应的字符
                if (!(key >= "a" && key <= "z" || key >= "A" && key <= "Z")) {   //如果按键不合法（非a-z,A-Z）直接返回
                    return;
                }
                //如果当前单词船指针为空，说明没有单词船被选中，此时获取所有在舞台上可用的单词船
                if (nowShip === null) {
                    var valuableKeys = {};                                       //初始化当前舞台可供选择的单词船集合，该对象被设计为：key为单词船上单词第一个字母，value为对应的Ship实例对象
                    for (var i in shipsOnStage) {                                //遍历舞台上的单词船
                        var char = shipsOnStage[i].txt.charAt(0);                //取出单词首字母
                        //如果舞台上有两个起始字母一样的单词，只将第一个添加到valuableKeys列表（解决开头字母相同的单词从最新生成的单词船开始算的问题，即如果舞台上有首字母相同的单词船，优先匹配快要丢失的单词船）
                        if (char in valuableKeys) {
                            continue;
                        }
                        valuableKeys[char] = shipsOnStage[i];                     //生成键值对（key为单词船上单词第一个字母，value为对应的Ship实例对象）
                    }
                    //如果玩家的按键在valuableKeys列表，那么匹配这个单词船，否则什么也不做
                    if (key in valuableKeys) {
                        nowShip = valuableKeys[key];                              //将当前单词船指针（nowShip）设为被匹配到的Ship实例对象
                        nowShip.dom.addClass("inputting");                        //设置当前单词船红色高亮
                        nowShip.dom.style.zIndex = zIndex++;                      //设置当前单词船层级为最高，以防被覆盖（从许愿墙案例中学到）
                        nowShip.matchLetter();                                    //调用Ship实例对象的匹配字母方法
                    }
                    //如果当前单词船指针不为空，说明有单词船被选中，此时直接判断用户输入的字符是不是当前Ship实例对象的下一个待输入字母
                } else {
                    //如果是当前Ship实例对象的下一个待输入字母
                    if (key === nowShip.txt.charAt(nowShip.pointer)) {
                        nowShip.matchLetter();                                     //调用Ship实例对象的匹配字母方法
                    }
                }
                // console.log(key + "-" + String.fromCharCode(key)); //测试按键编码
            })
        };
        /**
         * 单词船命中的处理
         */
        this.hit = function (shipId) {
            $game.removeShip(shipId, true);                            //移除命中的单词船
            //连击的处理，如果连击了
            if (comboCount > 0) {
                comboCount++;                                          //本次命中是第n次连击，连击数+1
                this.combo();                                          //播放连击动画
                clearTimeout(comboTimer);                              //如果继续连击，删除“comboTime秒（默认3秒）后清零连击数”的计时器
                //如果没有连击
            } else {
                comboCount = 1;                                        //本次命中是第1次连击，连击数设置为1
            }
            comboTimer = setTimeout(function () {                      //一旦命中，就算一次连击，无论如何都在comboTime秒（默认3秒）后清零连击数
                comboCount = 0;
            }, comboTime * 1000);
        };
        /**
         * 播放连击动画
         */
        this.combo = function () {
            comboDiv.innerText = "COMBO×" + comboCount;                //设置连击动画中的文本为“COMBO×n”，n为当前连击数
            comboDiv.show();                                           //显示连击动画div
            comboDiv.addClass("comboAndMissAnimation");                //添加动画类，开始播放动画
            setTimeout(function () {                                   //动画播放时间结束后，删除动画类，隐藏连击动画div
                comboDiv.removeClass("comboAndMissAnimation");
                comboDiv.hide();
            }, comboAndMissAnimationDuration * 1000);
        };
        /**
         * 单词船丢失的处理
         * @param shipId 单词船id
         */
        this.miss = function (shipId) {
            $game.removeShip(shipId);                                   //移除单词船dom
            missDiv.show();                                             //显示丢失动画div
            missDiv.addClass("comboAndMissAnimation");                  //添加动画类，开始播放动画
            setTimeout(function () {                                    //动画播放时间结束后，删除动画类，隐藏丢失动画div
                missDiv.removeClass("comboAndMissAnimation");
                missDiv.hide();
            }, comboAndMissAnimationDuration * 1000);
        }
    }


    /*----------------------
     * 脚本——游戏脚本的逻辑，包括投放单词船，游戏开始处理，游戏结束处理
     *-----------------------*/
    function Script() {
        var _this = this;                                                                                       //供闭包内使用this
        this.gameOverTimer = null;                                                                              //初始化游戏结束计时器
        this.gameTimer = null;                                                                                  //初始化游戏倒计时计时器
        this.throwInInterval = null;                                                                            //初始化投入单词船的间隔时间计时器
        /**
         * 投入单词船
         */
        this.throwInShip = function () {
            var ship = $game.createShip();                                                                      //创建一个新的单词船
            shipsOnStage[ship.id] = ship;                                                                       //将该单词船推入shipsOnStage，key为新建单词船id，value为新建的Ship类实例对象
            tunnels.getRandomItem().value.appendChild(ship.dom);                                                //随机获取一个河道，将单词船送入河道（DOM实现）
            ship.animator = $tool.animate(ship.id, getRandom(floatThroughTime[0], floatThroughTime[1]));        //开始单词船动画，动画时间（即单词船飘过舞台的时间）随机
        };

        /**
         * 游戏开始（选择难度后调用该方法，包括设置游戏计时器，设置投入单词船计时器等）
         */
        this.gameStart = function () {
            //设置游戏倒计时计时器
            var overTime = +new Date().getTime() + 1000 * gameTime;                                              //游戏结束时间 = 当前时间 + 游戏时间
            _this.gameTimer = setInterval(function () {                                                          //游戏倒计时（舞台右下角）的实现
                var leftTime = new Date(overTime - new Date().getTime());                                        //剩余时间 = 结束时间 - 当前事件
                timerDiv.innerText = formatDate("i:s", leftTime);                                                //格式化剩余时间并放入倒计时div中
                if (leftTime.getTime() <= 10000) {                                                               //剩余时间10秒以下闪红
                    timerDiv.toggleClass("urgent");
                }
            }, 1000);
            //设置游戏结束计时器，该计时器结束后游戏结束
            _this.gameOverTimer = setTimeout(function () {
                _this.gameOver(true);                                                                             //调用Script类的gameOver方法，处理游戏结束后的逻辑，在这里的游戏结束玩家获胜
            }, gameTime * 1000);
            isGameRunning = true;                                                                                 //游戏开始标志设置为true
            $game.controls();                                                                                     //装载键盘操作程序
            function throwInIntervalFunc() {                                                                      //投入单词船的函数
                _this.throwInShip();
                var randomTime = getRandom(throwInRate[0] * 1000, throwInRate[1] * 1000);                         //本次随机投放单词船的间隔（在Ui类的start()方法中设置）
                _this.throwInInterval = setTimeout(throwInIntervalFunc, randomTime);                              //递归设置投入单词船的间隔时间计时器
            }

            _this.throwInInterval = setTimeout(throwInIntervalFunc, 0);                                           //设置投入单词船的间隔时间计时器
        };

        /**
         * 游戏结束
         * @param isWin 玩家是否获胜
         */
        this.gameOver = function (isWin) {
            //如果游戏已经结束了（重复调用了本方法），直接返回
            if (!isGameRunning) {
                return;
            }
            isGameRunning = false;                                                                                 //游戏运行状态设置为停止
            clearTimeout(_this.gameOverTimer);                                                                     //清空游戏结束计时器
            clearTimeout(_this.gameTimer);                                                                         //清空游戏倒计时计时器
            clearTimeout(_this.throwInInterval);                                                                   //清空投入单词船的间隔时间计时器
            //遍历移除所有在舞台上的单词船
            for (var i in shipsOnStage) {
                $game.removeShip(i);
            }
            //跳转到结算页面
            window.location = "result.html?s=" + (isWin ? 1 : 0) + "&t=" + gameTime + "&l=" + level + "&sc=" + $data.score;
        }
    }

    /*----------------------
     * UI——用户界面初始化，用户界面和开始游戏对接，根据用户选择的难度对游戏难度相关数据进行初始化
     *-----------------------*/
    function Ui() {
        /**
         * 用户界面和开始游戏脚本对接
         * @param selectedLevel 玩家选择的难度
         */
        this.start = function (selectedLevel) {
            gameTime = 60;                                          //游戏时间60秒
            comboTime = 3;                                          //连击间隔时间3秒
            level = selectedLevel;                                  //玩家选择的难度
            //根据玩家选择的难度（selectedLevel）进行难度相关数据初始化
            //floatThroughTime:单词船经过舞台的时间，值越小越难
            //throwInRate:投入单词船的间隔时间，值越小越难
            switch (selectedLevel) {
                case 1:
                    floatThroughTime = [6, 8];
                    throwInRate = [1.5, 3.5];
                    break;
                case 2:
                    floatThroughTime = [4, 7];
                    throwInRate = [0.8, 2];
                    break;
                case 3:
                    floatThroughTime = [3, 6];
                    throwInRate = [0.5, 2];
                    break;
                default:
                    floatThroughTime = [6, 8];
                    throwInRate = [1.5, 3.5];
            }
            introDl.hide();                                         //隐藏难度选择dl
            scoreDiv.show();                                        //显示记分牌div
            timerDiv.show();                                        //显示倒计时div
            $script.gameStart();                                    //调用Script类的gameStart()方法，用户界面和开始游戏脚本对接
        };
        /**
         * 用户界面初始化
         */
        this.init = function () {
            //正常难度按钮
            normalLevelBtn.addEvent("click", function () {          //点击事件：对接用户界面和开始游戏脚本，传入当前选择的难度
                $Ui.start(1);
            });
            normalLevelBtn.addEvent("mouseover", function () {      //鼠标移入事件：显示当前难度的说明
                levelDescDiv.show();
                normalDesc.show();
            });
            normalLevelBtn.addEvent("mouseout", function () {       //鼠标移出事件：隐藏当前难度的说明
                levelDescDiv.hide();
                normalDesc.hide();
            });
            normalLevelBtn.addEvent("mousedown", function () {      //鼠标按下事件：压暗按钮
                introDl.style.background = "#000";
            });
            //冒险难度按钮（注释同上）
            adventureLevelBtn.addEvent("click", function () {
                $Ui.start(2);
            });
            adventureLevelBtn.addEvent("mouseover", function () {
                levelDescDiv.show();
                adventureDesc.show();
            });
            adventureLevelBtn.addEvent("mouseout", function () {
                levelDescDiv.hide();
                adventureDesc.hide();
            });
            adventureLevelBtn.addEvent("mousedown", function () {
                introDl.style.background = "#000";
            });
            //大师难度按钮（注释同上）
            masterLevelBtn.addEvent("click", function () {
                $Ui.start(3);
            });
            masterLevelBtn.addEvent("mouseover", function () {
                levelDescDiv.show();
                masterDesc.show();
            });
            masterLevelBtn.addEvent("mouseout", function () {
                levelDescDiv.hide();
                masterDesc.hide();
            });
            masterLevelBtn.addEvent("mousedown", function () {
                introDl.style.background = "#000";
            });
        };
    }


    /*----------------------
     * 单词船类——调用会创建一个单词船实例对象
     *-----------------------*/
    function Ship(txt) {
        var _this = this;                                                                               //供闭包内使用this
        this.id = "s" + shipIdCount++;                                                                  //设置单词船id
        this.txt = txt;                                                                                 //设置单词船单词
        this.pointer = 0;                                                                               //初始化单词船字母指针
        this.animator = null;                                                                           //初始化单词船动画句柄
        this.dom = null;                                                                                //初始化单词船DOM
        /**
         * 匹配字母（当玩家输入了匹配本单词船的字母时调用）
         */
        this.matchLetter = function () {
            var matchLetter = this.dom.getElementsByClassName("textWrapper")[0].children[this.pointer]; //获取本次匹配的字母（span列表的第pointer位）
            matchLetter.replaceClass("pass", "coming");                                                 //将本次匹配字母的coming类替换为pass类，改变字母样式
            this.pointer++;                                                                             //单词船字母指针+1
            //如果字母指针等于单词船单词的长度，说明已经匹配到最后一位，此时单词船被命中
            if (this.pointer === this.txt.length) {
                $game.hit(this.id);
            }
        };
        /**
         * 创建单词船DOM
         */
        this.dom = this.dom || function () {
                var shipDiv = document.createElement("div");                                             //单词船div
                var textWrapperP = document.createElement("p");                                          //包裹单词的p
                shipDiv.setAttribute("id", _this.id);                                                    //设置单词船HTMLid（后来并没有用到）
                shipDiv.addClass("ship");                                                                //设置单词船class控制样式
                shipDiv.style.left = stageWidth + "px";                                                  //初始位置位于舞台右侧
                textWrapperP.addClass("textWrapper");                                                    //包裹单词p添加样式
                shipDiv.appendChild(textWrapperP);                                                       //将p添加到div中
                //循环创建单词的每一个字母span
                for (var i = 0; i < _this.txt.length; i++) {
                    var letterSpan = document.createElement("span");
                    letterSpan.addClass("coming");
                    letterSpan.innerText = txt[i];
                    textWrapperP.appendChild(letterSpan);
                }
                return shipDiv;                                                                           //返回单词船div
            }();
    }


    /*----------------------
     * 工具
     *-----------------------*/
    function Tool() {
        /**
         * 单词船动画
         * @param shipId 创建动画的船的id
         * @param duration 动画时间，单位秒
         * @param styleType 动画CSS属性，默认为"left"
         * @param start 起始位置，默认为舞台宽度
         * @param amount 运动量，默认为(-舞台宽度)
         * @returns {number} 动画定时器，供停止动画使用
         */
        this.animate = function (shipId, duration, styleType, start, amount) {
            //参数初始化
            var ship = $tool.getShipById(shipId).dom;
            duration *= 1000;
            styleType = styleType || "left";
            start = start || stageDiv.offsetWidth;
            amount = amount || -(stageWidth + ship.offsetWidth);
            //变量初始化
            var currentTime = 0;
            var animateTimer = setInterval(function () {
                if (currentTime >= duration) {
                    clearInterval(animateTimer);
                    $game.miss(shipId);
                }
                ship.style[styleType] = (start + currentTime / duration * amount) + "px";
                currentTime += 20;
            }, 20);
            return animateTimer;
        };
        /**
         * 根据id获得单词船DOM对象
         * @param shipId 单词船id
         * @returns {*} 单词船DOM对象
         */
        this.getShipById = function (shipId) {
            return shipsOnStage[shipId];
        };
    }


    /*----------------------
     * 数据
     *-----------------------*/
    function Data() {
        var _this = this;
        this.score = 0; //当前分数
        this.wordsDictionary = ["computer", "getElementById", "className", "display", "fixed", "overflow", "zIndex", "typeof", "stylesheet", "image", "JavaScript", "style", "margin", "padding", "html", "nodeJS", "bootstrap", "angularJS", "span", "div", "json", "java", "background", "function", "prototype", "jQuery", "a", "nextSibling", "index", "href", "relative", "trim", "indexOf", "Node", "window", "Element", "document", "array", "string", "boolean", "true", "false", "NaN", "undefined", "null", "while", "do"];
        this.goodScore = [5, 5, 5];                             //不同难度下的加分量
        this.badScore = [5, 15, 25];                            //不同难度下的扣分量
        this.scoreChange = function (goodRemove) {              //游戏分数处理
            //如果游戏没在运行，直接返回
            if (!isGameRunning) {
                return;
            }
            //本次分数变动情况（加分：当前难度加分分值+ 连击数；扣分：当前难度扣分分值）
            this.score += goodRemove ? (_this.goodScore[level - 1] + comboCount) : -_this.badScore[level - 1];
            //如果分数小于零，玩家失败，结束游戏
            if (this.score < 0) {
                this.score = 0;                                 //游戏分数归零，避免结算界面出现负分
                $script.gameOver(false);                        //调用Script类的gameOver()方法
                return;                                         //游戏结束直接返回，不操作记分牌
            }
            //记分牌操作
            scoreDiv.innerText = this.score;                    //记分牌div分数更新
            //加分闪红扣分闪绿（闪红或闪绿持续400毫秒）
            scoreDiv.addClass(goodRemove ? "plus" : "minus");
            setTimeout(function () {
                scoreDiv.removeClass("plus minus");
            }, 400);
        };
    }
});