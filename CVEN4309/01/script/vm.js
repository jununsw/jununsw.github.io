/*
#23 to show txtbox
*/

var zid;
var count;
var special = [];

function check_id() {
    // check zID
    var re = new RegExp('^z[0-9]{7}$');
    
    zid = $("#zid").val();
    
    // developing mode
    if ((zid === "z3243398") || (zid === "z7701732") || (zid === "z3290765")) {
        isFirst = "first attempt";
    }

    $("#id-submit").prop("disabled", ((zid == 'z3243398') ? false : true));

    function toshow() {
        $("#main-body").css("display", "block");
        $("#score-bar").css("display", "block");
        $("#txtbox").css("display", "block");
        $("#id-bar").css("display", "none");

        $("#clock").css("position", "fixed").show();
        window.start = Math.ceil((new Date()).getTime() / 1000);
        window.requestAnimationFrame(clock);
    }
    
    function toblock() {
        $("#zid").css("background", "red");
        $("#after-id").css("color", "red").html(arguments[0]);
    }
    
    // check if attempted
    if (isFirst === "first attempt") {
        
    } else {
        toblock("&nbsp;You have already attempted this quiz. If you require additional attempt, please contact the course coordinator");
        $("#zid").prop("disabled", true);
        $("#id-btn").prop("disabled", true).hide();
        return;
    }
    
    if (!re.test(zid)) {
        toblock("&nbsp;Your zID is invalid!");
        return;
    }
    
    if ((zid === who)) {
        if (special.includes(zid)) {
            window.timer = 8100;
            $("#min").html(135);
        } else {
            window.timer = 5400;
            $("#min").html(90);
        }

        toshow();
    } else {
        toblock("&nbsp;Your zID does not match your profile!");
    }
}

var vm = new Vue({
    el: "#myapp",
    data: {
        answered: 0,
        score: 0,
        s1: 0,  // used for coefficients for q1.1
        s2: 0,  // used for coefficients for q1.2
        s3: 0,  // used for coefficients for q2
        part0: q0,
        part1: q1,
        part2: q2,
        submit: {},
        multi: [q0[4], ["null", "null", "null", "null"], [q0[0].choice.toString(), q0[1].choice.toString(), q0[2].choice.toString(), q0[3].choice.toString()]],
        text: {
            co1: coeff1,
            co2: coeff2,
            input1: {
                'Ac': ['', ''],
                'Ap': ['', ''],
                'As': ['', ''],
                'At': ['', ''],
                'Emean': ['', ''],
                'E005': ['', ''],
                'fb': ['', ''],
                'fc': ['', ''],
                'fp': ['', ''],
                'fs': ['', ''],
                'ft': ['', ''],
                'I': ['', ''],
                'j2short': ['', ''],
                'j2long': ['', ''],
                'j3': ['', ''],
                'k1': ['', ''],
                'k4': ['', ''],
                'k6': ['', ''],
                'k7': ['', ''],
                'k9': ['', ''],
                'k12': ['', ''],
                'S1': ['', ''],
                'Z': ['', ''],
                'phi': ['', ''],
                'rhob': ['', ''],
                'rhoc': ['', '']
            },
            input2: {
                'Ac': '',
                'Ap': '',
                'As': '',
                'At': '',
                'Emean': '',
                'E005': '',
                'fb': '',
                'fc': '',
                'fp': '',
                'fs': '',
                'ft': '',
                'I': '',
                'j2short': '',
                'j2long': '',
                'j3': '',
                'k1': '',
                'k4': '',
                'k6': '',
                'k7': '',
                'k9': '',
                'k12': '',
                'S1': '',
                'Z': '',
                'phi': '',
                'rhob': '',
                'rhoc': ''
            },
            submit: {
                'part1': []
            }
        }
    },
    methods: {
        toAjax: function(event) {
            // resume button label
            setTimeout(function() {
                $(event.target).html("Finish and Submit").prop("disabled", false);
            }, 8000);
            
            // check coefficients
            this.checkText();

            // fire all hidden 'record' button
            $(".record").each(function(idx, ele) {
                $(ele).trigger("click");
            });
            
            // postData is the "data" attribute in AJAX post method
            var postData = {};
            postData["zid"] = zid;
            postData["answer"] = this.submit;
            postData["score"] = this.score;
            postData["q1"] = this.part1;
            postData["q2"] = this.part2;
            postData["q0"] = this.multi;
            
            // submitData is the one to send with post method
            var submitData = {
                "zid": postData.zid,
                "week": "w1",
                "mark": postData.score,
                "data": JSON.stringify(postData),
                "text": JSON.stringify(this.text.submit)
            };

            var code = scoreEncode(this.score);

            console.log(submitData.data);
            console.log(submitData.text);
            
            /*
            $.post("../query.php", submitData, function(data, status) {
                if (data.toString() == "1") {
                    $(event.target).hide();
                    
                    $("#after-submit").html("<br/><br/><strong>You have submitted sucessfully.<br/><br/>Your submitted answers are shown in the tab below. Please keep a record of this tab.</strong>");
                    $(".after-hide").hide();
                    $(".after-show").show();
                } else {
                    $("#after-submit").html("<br/><br/><strong>We have confronted a problem when sending the mark. Please try again and if problem still exists, please send a screenshot of the submission ID with your zID to xiaojun.chen@unsw.edu.au<br/><br/>" + "<span style='color: red;'>submission ID: " + code + ", zID: " + zid + "</span></strong>");
                    $(event.target).html("Finish and Submit").prop("disabled", false);
                }
            });
            */
        },
        
        tofinish: function(event) {
            var currentEvent = event;
            var currentInstance = this;
            
            $("#dialog-message").dialog({
                modal: true,
                draggable: false,
                resizable: false,
                show: 'fade',
                hide: 'fade',
                width: 600,
                buttons: {
                    "Yes, submit Now!": function() {
                        $(this).dialog("close");
                        $(currentEvent.target).html("Submitting...").prop("disabled", true);
                        setTimeout(function(){
                            currentInstance.toAjax(currentEvent);
                        }, 50);
                    },
                    "No, I'll do it later": function() {
                        $(this).dialog("close");
                    }
                }
            });
        },
        
        check: function(qIdx, event) {
            // qIdx = 0..9 for question 1; 10..12 for question 2; if qIdx = 4, 9, 12, it is checkbox question
            // input tag format: q1-1 or q4, from 0 to 12
            var answerArray = this.part1.answer.concat(this.part2.answer);
            
            if ((qIdx !== 4) && (qIdx !== 9) && (qIdx !== 12)) {
                // fill in the blank question
                // obtain two input's id
                var tag1 = "#q" + qIdx.toString() + "-1";
                var tag2 = "#q" + qIdx.toString() + "-2";
                
                // obtain input's value
                var in1 = getPrecision($(tag1).val(), 3, "n");
                var in2 = getPrecision($(tag2).val(), 3, "n");
                
                // check if value are invalid (prevent rubbish input)
                if (isNaN(in1)) {
                    in1 = "blank";
                }
                
                if (isNaN(in2)) {
                    in2 = "blank";
                }

                // check corresponding coefficient
                var coeff = (qIdx <= 4) ? this.s1 : (qIdx <= 9) ? this.s2 : this.s3;
                    
                var thisScore = 0;
                $(tag1).css("background", "white").prop("disabled", true);
                $(tag2).css("background", "white").prop("disabled", true);
                
                if (isEqual(in1, answerArray[qIdx][0], 2)) {
                    thisScore += 4;
                } else if (coeff != 0) {
                    thisScore += coeff;
                } else {

                }
                
                if (isEqual(in2, answerArray[qIdx][1], 2)) {
                    thisScore += 4;
                } else if (coeff != 0) {
                    thisScore += coeff;
                } else {
                    
                }

                // update score and number of answered
                this.score += thisScore;
                this.answered += 2;

                // record answers key=>value: (questionNum: [ans1, ans2])
                var key = (qIdx + 1).toString();
                var value = [in1, in2];
                this.submit[key] = value;

                $(event.target).remove();

            } else {
                // checkbox question
                // obtain tag = all radio button, tag:checked = checked radio button
                var tag = "#q" + qIdx.toString() + " input[type=radio]";
                var in1 = $(tag + ":checked").attr("value");
                
                // if noting is checked
                if (!in1) {
                    in1 = "blank";
                }
                
                $(tag).prop("disabled", true);

                if (in1 === answerArray[qIdx]) {  // "yes", "larger", "smaller"
                    this.score += 2;
                } else {

                }

                this.answered += 1;
                
                // record answer as key => value (questionNum: answer)
                var key = (qIdx + 1).toString();
                var value = in1;
                this.submit[key] = value;

                $(event.target).remove();
            }
        },
        
        toSelect: function(idx, event){
            // check part1 - multiple choice
            // idx = 0, 1, 2, 3, which are the four form tag: s0, s1, s2, s3
            var tag = "#s" + idx.toString() + " input[type=radio]";
            var in1 = $(tag + ":checked").attr("value");
            
            // if noting is checked
            if (!in1) {
                in1 = "blank";
            }
            
            $(tag).prop("disabled", true);

            if (in1 === this.part0[idx].choice.toString()) {
                this.score += 1;
            } else {

            }

            this.answered += 1;

            // record answer to multi[1]
            this.multi[1][idx] = in1;

            $(event.target).remove();
        },

        checkText: function() {  
            // change s1, s2, s3 to be the corresponding partial number
            // generate text.submit for later AJAX
            $("table input").prop("disabled", true);

            for (let key of this.text.co1[0]) {
                this.text.submit.part1.push([key.toString(), 'NA/NA', 'NA/NA', 'NA/NA']);
            }
        }
    }
});

function clock() {
    var now = new Date();
    var ctx = document.getElementById('clock').getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, 150, 150);
    ctx.translate(75, 75);
    ctx.scale(0.4, 0.4);
    ctx.rotate(-Math.PI / 2);
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';

    // Hour marks
    ctx.save();
    for (var i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(100, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
    }
    ctx.restore();

    // Minute marks
    ctx.save();
    ctx.lineWidth = 5;
    for (i = 0; i < 60; i++) {
    if (i % 5!= 0) {
        ctx.beginPath();
        ctx.moveTo(117, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
    }
    ctx.restore();

    var sec = now.getSeconds();
    var min = now.getMinutes();
    var hr  = now.getHours();
    hr = hr >= 12 ? hr - 12 : hr;

    ctx.fillStyle = 'black';

    // write Hours
    ctx.save();
    ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) *sec);
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();

    // write Minutes
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.lineTo(112, 0);
    ctx.stroke();
    ctx.restore();

    // Write seconds
    ctx.save();
    ctx.rotate(sec * Math.PI / 30);
    ctx.strokeStyle = '#D40000';
    ctx.fillStyle = '#D40000';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(83, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#325FA2';
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.stroke();

    ctx.restore();

    // timer
    window.elapse = Math.floor((new Date()).getTime() / 1000) - window.start;
    window.remain = window.timer - window.elapse;

    window.min = Math.floor(window.remain / 60);
    window.sec = window.remain % 60;

    if (window.remain <= 0) {
        $(".timer").css("display", "none");
        $("#timeup").html("").css("color", "red").html("Your time is up. Please take screenshot of your answers as a record and submit")
        $("input").prop("disabled", true);
    }

    if (window.sec === 0) {
        window.min -= 1;
        window.sec = 59;
    } else if (sec <= 10) {
        window.sec -= 1;
    } else {
        window.sec -= 1;
    }
            
    $("#min").html(window.min.toString());
    $("#sec").html((window.sec < 10) ? '0' + window.sec.toString() : window.sec.toString());

    window.requestAnimationFrame(clock);
}

function myFunction(){
    var x = document.getElementById("myFile");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
            }
        }
    } 
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
        }
    }
    $("#fileinfo").html(txt);
}

$(document).ready(function() {
    $("#myapp").css("display", "block");
    $("#main-body").tabs();
    
    $("button").filter(function(idx, ele) {
        return ($(ele).html() == "Record Answers");
    }).addClass("record").css("display", "none");
});