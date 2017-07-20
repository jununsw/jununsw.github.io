var myscore = 0;
var myid = "";
var postdata = {};

$(document).ready(function() {
    $("#main-body").tabs();
    bind_check();
    $("#score-bar").css("display", "block");
    $("#main-body").css("display", "block");
    $("#id-bar").css("display", "none");
});

function bind_check() {
    $("#q1-check").on("click", q1_check);
    $("#q2-check").on("click", q2_check);
    $("#q3-check").on("click", q3_check);
}

function update() {
    myscore += arguments[0]
    $("#score").html(myscore.toFixed(0).toString());
}

function check_id() {
    var zid = $("#zid").val();
    var re = new RegExp('^z[0-9]{7}$');
    
    if (re.test(zid)) {
        $("#score-bar").css("display", "block");
        $("#main-body").css("display", "block");
        $("#id-bar").css("display", "none");
        myid = id; 
    } else {
        $("#zid").css("background", "red");
        $("#after-id").css("color", "red").html("Please type in your zID or your zID is invalid!");
    }
}

function submit() {
    postdata.zid = myid;
    postdata.mark = myscore;
    postdata.week = "week03";
    var final_label = $(arguments[0]);
    final_label.html("Submitting ...").prop("disabled", true);
    window.setTimeout(function() {
        final_label.hide().after("<label>Note this is a sample page. In real case your mark will be sent to Moodle Gradebook.</label>");
    }, 500);
}

function q1_check() {
    var in1 = getPrecision($("#q1-1").val(), 2, "n");
    var in2 = getPrecision($("#q1-2").val(), 2, "n");
    var in3 = getPrecision($("#q1-3").val(), 2, "n");
    
    var isCorrect = true;
    $("#q1-1").css("background", "white");
    $("#q1-2").css("background", "white");
    $("#q1-3").css("background", "white");
    
    if (!isEqual(in1, -1.83, 2)) {
        $("#q1-1").css("background", "red");
        isCorrect = false;
    }
    
    if (!isEqual(in2, 2.1, 2)) {
        $("#q1-2").css("background", "red");
        isCorrect = false;
    }
    
    if (!isEqual(in3, 2.46, 2)) {
        $("#q1-3").css("background", "red");
        isCorrect = false;
    }
    
    if (isCorrect) {
        $("#q1-1").prop("disabled", true);
        $("#q1-2").prop("disabled", true);
        $("#q1-3").prop("disabled", true);
        $("#q1-check").after("<label>Correct!</label>").hide();
        update(3);
    }
}

function q2_check() {
    var in1 = getPrecision($("#q2-1").val(), 1, "n");
    
    var isCorrect = true;
    $("#q2-1").css("background", "white");
    
    if (!isEqual(in1, 28.6, 1)) {
        $("#q2-1").css("background", "red");
        isCorrect = false;
    }
    
    if (isCorrect) {
        $("#q2-1").prop("disabled", true);
        $("#q2-check").after("<label>Correct!</label>").hide();
        update(3);
    }
}

function q3_check() {
    var in1 = getPrecision($("#q3-1").val(), 0, "n");
    var in2 = getPrecision($("#q3-2").val(), 0, "n");
    var in3 = getPrecision($("#q3-3").val(), 0, "n");
    var in4 = getPrecision($("#q3-4").val(), 0, "n");
    var in5 = getPrecision($("#q3-5").val(), 0, "n");
    
    var isCorrect = true;
    $("#q3-1").css("background", "white");
    $("#q3-2").css("background", "white");
    $("#q3-3").css("background", "white");
    $("#q3-4").css("background", "white");
    $("#q3-5").css("background", "white");
    
    if (!isEqual(in1, 0, 0)) {
        $("#q3-1").css("background", "red");
        isCorrect = false;
    }
    
    if (!isEqual(in2, 3188, 0)) {
        $("#q3-2").css("background", "red");
        isCorrect = false;
    }
    
    if (!isEqual(in3, -1913, 0)) {
        $("#q3-3").css("background", "red");
        isCorrect = false;
    }
    
    if (!isEqual(in4, 425, 0)) {
        $("#q3-4").css("background", "red");
        isCorrect = false;
    }
    
    if (!isEqual(in5, 850, 0)) {
        $("#q3-5").css("background", "red");
        isCorrect = false;
    }
    
    if (isCorrect) {
        $("#q3-1").prop("disabled", true);
        $("#q3-2").prop("disabled", true);
        $("#q3-3").prop("disabled", true);
        $("#q3-4").prop("disabled", true);
        $("#q3-5").prop("disabled", true);
        $("#q3-check").after("<label>Correct!</label>").hide();
        update(4);
    }
}