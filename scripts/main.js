/*
 加速度取得、20Hz
 データの送信はjson
 */


var isRec = false;
// var wasRec = false;
var accX = [];
var accY = [];
var accZ = [];
var motionData = [];

const button = document.getElementById("button");


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

    motionData = [];

}

function touchEnd(e) {
    e.preventDefault();
    isRec = false;
}

if (!isRec && wasRec) {
    console.log(accX);
    do_post();//サーバーにmotiondataを送る
}

/*
計測自体はずっとやって、ボタン押してるときだけ配列に格納する
*/

function do_post(e) {
    var data = []
}
