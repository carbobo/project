/**
 * 
 适配各种手机
 * 
 */
(function(){
    function w(){
        var r = document.documentElement;
        var v = r.getBoundingClientRect().width;
        if(v > 750){
            v = 750;
        }
        r.style.fontSize = v/7.5 +'px';
    }
    var t;
    w();
    window.addEventListener("resize", function() {
        clearTimeout(t);
        t = setTimeout(w, 300)
    }, false);
// console.dir( 'common'+history.length);


}());
