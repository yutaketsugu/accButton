/*
 加速度取得、20Hz
 データの送信はjson
 */


var isRec = false;
var wasRec = false;
// 仮置き
//var accX = [-0.610847, -0.851593, -0.655163, -1.010293, -0.459333, -1.127073, -0.632406, -0.301830, -1.453457, 0.249729, -0.384474, -1.214508, -0.365909, -0.735412, -0.610847, 0.791107, -0.279073, 0.123966, 0.896508, 0.085638, 0.916869, 1.93914, 2.376315, 2.664371, -0.197627, -0.893514, -1.924767, -1.872665, -2.328405, -2.707490, -1.810383, -1.934948, -1.061796, -1.733728, -0.868361, -0.618632, -0.767152];
//var accY = [7.734401, 7.918254, 7.853576, 7.688288, 7.374481, 7.006775, 6.562414, 5.979115, 5.047273, 4.502302, 4.219635, 5.032301, 5.252087, 6.690572, 7.015159, 7.474492, 7.636786, 7.737396, 7.006176, 7.799678, 7.006775, 7.069057, 6.481566, 5.869521, 5.540143, 4.650223, 4.449601, 4.568777, 4.487330, 4.669386, 5.108358, 5.228132, 5.423962, 5.543138, 5.519183, 5.686866, 5.796459, 5.782086, 5.834787, 5.514391, 5.768312, 6.318075, 5.639555];
//var accZ = [5.912640, 5.795261, 5.207171, 5.446719, 5.305386, 5.160460, 4.916121, 3.937568, 4.093274, 2.964405, 3.415952, 5.010143, 4.708912, 4.629262, 6.284538, 9.044129, 8.776435, 11.056931, 11.616274, 11.870195, 12.222929, 12.095969, 11.437811, 10.055021, 9.608863, 9.289067, 8.428492, 7.694876, 8.583598, 8.028446, 8.301531, 8.466220, 7.704458, 7.976943, 7.558334, 7.793689, 7.869147, 8.259011, 6.693566, 9.350152, 6.430063, 8.240446];
var accX = [];
var accY = [];
var accZ = [];
var motionData = [];
// httpsに変更予定
var url = "https://miyata.is.chs.nihon-u.ac.jp:58082";
var contentUrl;

const button = document.getElementById("button");

init();

function init() {
    motionData = new Array();
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

$( function() {
    $('#button').mouseup(
    function() {
        var post_array = {"cmd":"match_gesture", "data":{"accX": accX, "accY": accY, "accZ": accZ}};
        var post_data = JSON.stringify(post_array);
        $.ajax({
            type: "POST",
            url: url,
            data: post_data,
            dataType : "json"
        }).done(function(data) {
            console.log('success');
            console.log(accX);
            accX.length = 0;
            accY.length = 0;
            accZ.length = 0;
            console.log(motionData[0]);
            //contentUrl = data;
            //const contents = JSON.parse(data);
            $('#result').text(data.name);
            //$('#image_result').text(data.image);
        }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
            alert(e);
        })
    });
} );

if (!isRec && wasRec) {
    // 実装しないかも
}

/*
計測自体はずっとやって、ボタン押してるときだけ配列に格納する
*/
