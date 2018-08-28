var vm = new Vue({
    el: "#myapp",
    data: {
        'part1': part1,
        'part2': part2,
        'part3': part3,
        'part4': part4,
        'part5': part5,
        'part6': part6,
        'order2': order2,
        'order3': order3,
        'submission': {
            id: '',
            score: 0,
            q1: [],
            q2: ['', ['', '', '', '', '']],
            q3: ['', ['', '', '', '', '']],
            q4: [0, 0, 0],
            q5: [0, 0, 0],
            q6: [0, [0, 0], [0, 0]]
        }
    },
    methods: {
        toFinish: function(e) {
            var currentEvent = e;
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
        
        toAjax(e) {
            $("input").prop("disabled", true);
            
            window.submitData = {
                "zid": who,
                "d1": JSON.stringify(vm.submission)
            };
            
            setTimeout(function() {
                $.post("write.php", window.submitData, function(data, status) {
                    if (data.toString() == "1") {
                        $("#after-submit").html("Your quiz answers are submitted. You can close the page now.");
                        $("#id-submit").html("Sumbitted").prop("disabled", true);
                    } else {
                        $("#after-submit").html("There is some internet issues for your submission, please send the screenshot of your answers to xiaojun.chen@unsw.edu.au. <br/>Error msg: " + data.toString());
                        $("#id-submit").html("Sumbitted").prop("disabled", true);
                    }
                });
            }, 500);
            
            //console.log(window.submitData['d1']);
        },
        
        toMark(e) {
            vm.submission['id'] = who;
            var sub = '';
            
            var mark = [2, 5, 5, 5, 5, 3, 2];
            var marklist = [0, 0, 0];
            
            // mark part 1
            for (let idx = 0; idx < 5; idx++) {
                var isCheck = $("#p0 input[data-idx='" + idx.toString() + "']").prop("checked");
                var ele = vm.part1[idx];
                
                if (isCheck) {
                    sub = 'yes';
                } else {
                    sub = 'no';
                }
                
                var rcd = [ele['idx'], ele['ans'], sub];
                
                if (sub == ele['ans']) {
                    vm.submission.score += mark[0];
                }
                
                vm.submission.q1.push(rcd);
            }
            marklist[0] = vm.submission.score;
            
            // mark part 2 and 3
            $lst2 = $("#p1 ul li");
            vm.submission.q2[0] = this.part2['idx'];
            var mark2 = 5;
            for (let idx = 0; idx < 5; idx++) {
                var order = this.order2[idx];
                var isCheck = $lst2.eq(idx).find("input").prop("checked");
                
                if (isCheck) {
                    sub = 'yes';
                } else {
                    sub = 'no';
                }
                
                if (sub == vm.part2.question[order][2]) {
                    
                } else {
                    mark2 = 0;
                }
                
                vm.submission.q2[1][order] = sub;
            }
            vm.submission.score += mark2;
            marklist[1] = mark2;
            
            
            $lst3 = $("#p2 ul li");
            vm.submission.q3[0] = this.part3['idx'];
            var mark3 = 5;
            for (let idx = 0; idx < 5; idx++) {
                var order = this.order3[idx];
                var isCheck = $lst3.eq(idx).find("input").prop("checked");
                
                if (isCheck) {
                    sub = 'yes';
                } else {
                    sub = 'no';
                }
                
                if (sub == vm.part3.question[order][2]) {
                    
                } else {
                    mark3 = 0;
                }
                
                vm.submission.q3[1][order] = sub;
            }
            vm.submission.score += mark3;
            marklist[2] = mark3;
            
            // mark part 4, 5, 6
            vm.submission.q4[0] = this.part4['idx'];
            vm.submission.q4[1] = this.part4['ans'];
            sub = Number(Number($("#ans3").val()).toFixed(1));
            if (isFinite(sub) && ($("#ans3").val() !== '')) {
                if (Math.abs(sub - this.part4['ans']) <= 2) {
                    vm.submission.score += mark[3];
                    marklist.push(mark[3]);
                } else {
                    
                }
                vm.submission.q4[2] = sub;
            } else {
                vm.submission.q4[2] = 'invalid';
            }
            
            vm.submission.q5[0] = this.part5['idx'];
            vm.submission.q5[1] = this.part5['ans'];
            sub = Number(Number($("#ans4").val()).toFixed(1));
            if (isFinite(sub) && ($("#ans4").val() !== '')) {
                if (Math.abs(sub - this.part5['ans']) <= 2) {
                    vm.submission.score += mark[4];
                    marklist.push(mark[4]);
                } else {
                    
                }
                vm.submission.q5[2] = sub;
            } else {
                vm.submission.q5[2] = 'invalid';
            }
            
            vm.submission.q6[0] = this.part6['idx'];
            vm.submission.q6[1][0] = this.part6['ans'][0];
            vm.submission.q6[1][1] = this.part6['ans'][1];
            
            sub = Number(Number($("#ans51").val()).toFixed(1));
            if (isFinite(sub) && ($("#ans51").val() !== '')) {
                if (Math.abs(sub - this.part6['ans'][0]) <= 2) {
                    vm.submission.score += mark[5];
                    marklist.push(mark[5]);
                } else {
                    
                }
                vm.submission.q6[2][0] = sub;
            } else {
                vm.submission.q6[2][0] = 'invalid';
            }
            
            sub = Number(Number($("#ans52").val()).toFixed(3));
            if (isFinite(sub) && ($("#ans52").val() !== '')) {
                if (Math.abs(sub - this.part6['ans'][1]) <= 0.2) {
                    vm.submission.score += mark[6];
                    marklist.push(mark[6]);
                } else {
                    
                }
                vm.submission.q6[2][1] = sub;
            } else {
                vm.submission.q6[2][1] = 'invalid';
            }
            
            console.log(JSON.stringify(marklist));
            this.toFinish(e);
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

function init(x1) {
    // window.timer = 3600;
    // $("#min").html(60);
    window.special = ['z3243398', 'z5117393', 'z5020217', 'z5061779', 'z3460253'];
    
    if (window.special.includes(who)) {
        window.timer = 4500;
        $("#min").html(75);
    } else {
        window.timer = 3600;
        $("#min").html(60);
    }

    $("#main-body").css("display", "block");
    $("#score-bar").css("display", "block");
    $("#txtbox").css("display", "block");
    $("#id-bar").css("display", "none");

    $("#clock").css("position", "fixed").show();
    window.start = Math.ceil((new Date()).getTime() / 1000);
    window.requestAnimationFrame(clock);

    $("#myapp").css("display", "block");
    $("#main-body").tabs();
    
    $("#img-3-" + vm.part4.idx.toString()).show();
    $("#img-4-" + vm.part5.idx.toString()).show();
    $("#img-5-" + vm.part6.idx.toString()).show();
    
    $(".uneditable").prop("disabled", true);
    
    if (x1 == 'read') {
        $("#score-bar").css("display", "none");
        $("#score").html(record.score);
        
        vm.part1.forEach(function(ele, idx, arr) {
            $check = $("#p0 input[data-idx='" + idx.toString() + "']");
            $span = $check.closest("li").find("span");
            if (ele.ans == 'no') {
                $span.css("color", "red");
            }
            if (record.q1[idx][2] == 'yes') {
                $check.prop("checked", 'true');
            }
        });
        
        var state1 = "You have ticked: ";
        var state2 = "You have ticked: ";
        
        for (let idx = 0; idx < 5; idx++) {
            if (record.q2[1][idx] == "yes") {
                state1 += (idx + 1).toString() + ", ";
            }
            if (record.q3[1][idx] == "yes") {
                state2 += (idx + 1).toString() + ", ";
            }
            if (vm.part2.question[idx][2] == "no") {
                $("#p1 ol li").eq(idx).css("color", "red");
            }
            if (vm.part3.question[idx][2] == "no") {
                $("#p2 ol li").eq(idx).css("color", "red");
            }
        }
        $("#return1").html(state1).css("font-weight", "bold");
        $("#return2").html(state2).css("font-weight", "bold");
        
        var span4 = record.q4[2].toString() + " / " + record.q4[1].toString();
        $("#ans3").html(span4);
        
        var span5 = record.q5[2].toString() + " / " + record.q5[1].toString();
        $("#ans4").html(span5);
        
        var span61 = record.q6[2][0].toString() + " / " + record.q6[1][0].toString();
        $("#ans51").html(span61);
        
        var span62 = record.q6[2][1].toString() + " / " + record.q6[1][1].toString();
        $("#ans52").html(span62);
        
        $("input").prop("disabled", 'true');
    } else {
        for (let i = 0; i < 5; i++) {
            $("<li>" + option3[i] + "</li>").appendTo($("#option3"));
            $("<li>" + option51[i] + "</li>").appendTo($("#option51"));
            $("<li>" + option52[i] + "</li>").appendTo($("#option52"));
        }            
    }
}

function toSelect(e, objlist) {
    for (let key in objlist) {
        $("#" + key).val(objlist[key].toString());
    }
}