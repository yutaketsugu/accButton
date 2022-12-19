/*
 加速度取得、20Hz
 データの送信はjson
 */


var isRec = false;
var wasRec = false;
var accX = [];
var accY = [];
var accZ = [];
var motionData = [];
var url = "http://localhost:8080";
var contentUrl;

const button = document.getElementById("button");

$(function(){
    if(!isRec && wasRec) {
        var post_array = {"cmd":"match_gesture", "data":{"dataX":accX, "dataY":accY, "dataZ":accZ}};
        var post_data = JSON.stringify(post_array);
        $.ajax({
            type: "POST",
            url: url,
            data: post_data,
            dataType : "json"
        }).done(function(data){
            console.log("sucsess");
            contentUrl = data;
        }).fail(function(XMLHttpRequest, status, e){
            alert(e);
        });
    }
});

init();

function init() {
    if (window.DeviceMotionEvent) {
        $("deviceMotionInfo").empty().append("supported.");
        window.addEventListener("devicemotion", getMotion, true);
    }

    if (window.TouchEvent) {
        button.addEventListener("touchstart", touchStart);
        button.addEventListener("touchend", touchEnd);
    }
}


function getMotion(e) {
    e.preventDefault();

    if (isRec) {
        wasRec = false;
        if (e.accelerationIncludingGravity) {
            
            var x = e.accelerationIncludingGravity.x;
            var y = e.accelerationIncludingGravity.y;
            var z = e.accelerationIncludingGravity.z;

            accX.push(x);
            accY.push(y);
            accZ.push(z);
            
            document.getElementById("x").textContent = x;
            document.getElementById("y").textContent = y;
            document.getElementById("z").textContent = z;
        }

        /*
        var motion = {};
        motion['x'] = x;
        motion['y'] = y;
        motion['z'] = z;

        motionData.push(motion);
        */

    } else {
        wasRec = true;
    }
    

}

function touchStart(e) {
    e.preventDefault();
    isRec = true;

    motionData = [];

}

function touchEnd(e) {
    e.preventDefault();
    isRec = false;
}

if (!isRec && wasRec) {
    console.log(accX);
    //do_post(url, );//サーバーにmotiondataを送る
}

/*
計測自体はずっとやって、ボタン押してるときだけ配列に格納する
*/

function do_post(e) {
    var post_array = {"cmd":"match_gesture", "data":{"dataX":accX, "dataY":accY, "dataZ":accZ}};
    var post_data = JSON.stringify(post_array);
    console.log(post_data);
}

function post() {
    xhr.open('POST', 'server.py', true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    // フォームに入力した値をリクエストとして設定
    xhr.send(request);
}
