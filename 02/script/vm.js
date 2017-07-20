var zid;
var count;

function check_id() {
    // check zID
    var re = new RegExp('^z[0-9]{7}$');
    
    zid = $("#zid").val();
    
    // developing mode
    if ((zid === "z3243398") || (zid === "z7701732") || (zid === "z3290765")) {
        isFirst = "first attempt";
        // zid = zid.slice(4);
    }
    
    function toshow() {
        $("#main-body").css("display", "block");
        $("#score-bar").css("display", "block");
        $("#id-bar").css("display", "none");
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
        toshow();
        
        // set interval and timer
        count = setInterval(function() {
            
            var min = Number($("#min").html());
            var sec = Number($("#sec").html());
            
            if (sec === 0) {
                min -= 1;
                sec = "59";
                min = min.toFixed(0);
            } else if (sec <= 10) {
                sec -= 1;
                sec = "0" + sec.toFixed(0);
                min = min.toFixed(0);
            } else {
                sec -= 1;
                sec = sec.toFixed(0);
                min = min.toFixed(0);
            }
            
            $("#min").html(min);
            $("#sec").html(sec);
            
        }, 1000);
        
        setTimeout(function() {
            clearInterval(count);
            
            // TODO disable submit
            $(".timer").css("display", "none");
            $("#id-submit").prop("disabled", true);

            // TODO submit result
        }, 5400000);
        
    } else {
        toblock("&nbsp;Your zID does not match your profile!");
    }
}

var vm = new Vue({
    el: "#myapp",
    data: {
        answered: 0,
        score: 0,
        part0: q0,
        part1: q1[Math.random() * q1.length >> 0],
        part2: q2[Math.random() * q2.length >> 0],
        part3: q3[Math.random() * q3.length >> 0],
        part4: q4[Math.random() * q4.length >> 0],
        submit: {},
        multi: [q0[4], ["null", "null", "null", "null"]]
    },
    methods: {
        toAjax: function(event) {
            // change button label
            $(event.target).html("Submitting...").prop("disabled", true);
            
            // postData is the "data" attribute in AJAX post method
            var postData = {};
            postData["zid"] = zid;
            postData["answer"] = this.submit;
            postData["score"] = this.score;
            postData["q1"] = this.part1;
            postData["q2"] = this.part2;
            postData["q3"] = this.part3;
            postData["q4"] = this.part4;
            postData["q0"] = this.multi;
            
            console.log(JSON.stringify(postData));
            
            // submitData is the one to send with post method
            var submitData = {
                "zid": postData.zid,
                "week": "w2",
                "mark": postData.score,
                "data": JSON.stringify(postData)
            };
            
            $.post("../query.php", submitData, function(data, status) {
                if (data.toString() == "1") {
                    // $(event.target).hide().after("<label> Your mark is recorded and will be sent to Moodle Gradebook after the due date. Please also keep a record of your answer by either taking a screenshot or printing it.</label>");
                    $(event.target).hide().after("<label>&nbsp;Your answers and your mark are recorded and they will be sent to Moodle Gradebook after the due date.</label>");
                    // final_label.hide().after(data.toString());
                    
                    // to hide everything
                    $("#main-body").hide();
                    $(".instruction").hide();
                    $(".timer").hide();
                } else {
                    $(event.target).after("<label>&nbsp;We have confronted a problem when sending the mark. Please send a screenshot of this page with your zID to xiaojun.chen@unsw.edu.au</label>");
                    $(event.target).html("Finish and Submit").prop("disabled", false);
                }
            });
        },
        
        tofinish: function(event) {
            // use event.target to get the button object
            
            // obtain a referce to event
            var currentEvent = event;
            var currentInstance = this;
            
            // pop up a confirm box
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
                        currentInstance.toAjax(currentEvent);
                    },
                    "No, I'll do it later": function() {
                        $(this).dialog("close");
                    }
                }
            });
        },
        
        check: function(qIdx, event) {
            // three type of question: 2 group together, 1 multiple choice, single calculation
            // qIdx = 0..2 for question 1; 3, 4 for question 2; 5..9 for question 3; 10..12 for question 4
            // single calculation: qIdx = 0, 1, 2, 3, 4
            // multiple choice: qIdx = 9, 12
            // input tag format: q5-1 or q1, from 0 to 12
            var answerArray = this.part1.answer.concat(this.part2.answer).concat(this.part3.answer).concat(this.part4.answer);
            
            if ((qIdx !== 0) && (qIdx !== 1) && (qIdx !== 2) && (qIdx !== 3) && (qIdx !== 4) && (qIdx !== 9) && (qIdx !== 12)) {
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
                    
                var thisScore = 1;
                $(tag1).css("background", "white").prop("disabled", true);
                $(tag2).css("background", "white").prop("disabled", true);

                if (in1 !== answerArray[qIdx][0]) {
                    thisScore -= 0.5;
                }

                if (in2 !== answerArray[qIdx][1]) {
                    thisScore -= 0.5;
                }

                // update score and number of answered
                this.score += thisScore;
                this.answered += 2;

                // record answers key=>value: (questionNum: [ans1, ans2])
                var key = (qIdx + 1).toString();
                var value = [in1, in2];
                this.submit[key] = value;

                $(event.target).remove();

            } else if ((qIdx == 9) || (qIdx == 12)) {
                // checkbox question
                // obtain tag = all radio button, tag:checked = checked radio button
                var tag = "#q" + qIdx.toString() + " input[type=radio]";
                var in1 = $(tag + ":checked").attr("value");
                
                // if noting is checked
                if (!in1) {
                    in1 = "blank";
                }
                
                $(tag).prop("disabled", true);

                if (in1 === answerArray[qIdx]) {  // "yes", "no"
                    this.score += 1;
                } else {

                }

                this.answered += 1;
                
                // record answer as key => value (questionNum: answer)
                var key = (qIdx + 1).toString();
                var value = in1;
                this.submit[key] = value;

                $(event.target).remove();
                
            } else {
                // single calculation question
                var tag = "#q" + qIdx.toString();
                var in1 = getPrecision($(tag).val(), 3, "n");
                
                // // check if value are invalid (prevent rubbish input)
                if (isNaN(in1)) {
                    in1 = "blank";
                }
                
                var thisScore = 1;
                $(tag).css("background", "white").prop("disabled", true);

                if (in1 !== answerArray[qIdx]) {
                    thisScore -= 1;
                }

                // update score and number of answered
                this.score += thisScore;
                this.answered += 1;

                // record answers key=>value: (questionNum: answer)
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
                this.score += 0.5;
            } else {

            }

            this.answered += 1;

            // record answer to multi[1]
            this.multi[1][idx] = in1;

            $(event.target).remove();
        }
    }
});

$(document).ready(function() {
    $("#myapp").css("display", "block");
    $("#main-body").tabs();
});