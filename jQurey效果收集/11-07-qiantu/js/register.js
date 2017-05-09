/**
 * 注册界面js
 */

function isagree(){
    var isagreeObj = document.getElementById("isagree");
    var agreeTip = document.getElementById("agree-tip");
    var x = 0;

    isagreeObj.onclick = function(){
        x++;
        if(x%2 == 0){
            isagreeObj.style.backgroundPosition = "-17px -375px";
            agreeTip.style.visibility = "hidden";
            return true; 
        }else{
            isagreeObj.style.backgroundPosition = "-17px -426px";
            agreeTip.style.visibility = "visible";
            return false;
        } 
    }
}
isagree();