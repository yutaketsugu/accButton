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
var url = "http://localhost/192.168.10.255:8080";
var contentUrl;

const button = document.getElementById("button");

$.ajax({
    url: url
}).done((data, textStatus, jqXHR) => {
    // 正常処理
}).fail((jqXHR, textStatus, errorThrown) => {
    // 異常処理
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

    }
    

}

function touchStart(e) {
    e.preventDefault();
    isRec = true;
    wasRec = false;
    motionData = [];

}

function touchEnd(e) {
    e.preventDefault();
    isRec = false;
    wasRec = true;
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
