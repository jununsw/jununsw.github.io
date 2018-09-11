var zid;
var count;
var special = [];

function check_id() {
    // check zID
    var re = new RegExp('^z[0-9]{7}$');
    
    zid = $("#zid").val();
    
    isFirst = "first attempt";

    //$("#id-submit").prop("disabled", false);

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
        s1: 4,  // used for coefficients for q1
        s2: 4,  // used for coefficients for q2
        s3: 4,  // used for coefficients for q3
        s4: 4,  // used for coefficients for q4
        part0: window.q0,
        part1: window.q1,
        part2: window.q2,
        part3: window.q3,
        part4: window.q4,
        set: window.set,
        submit: {
            'part1': ['', '', ''],
            'part2': ['', ''],
            'part3': [['', ''], ['', ''], ['', ''], ['', ''], ''],
            'part4': [['', ''], ['', ''], '']
        },
        multi: [q0[5], ["null", "null", "null", "null", "null"], [q0[0].choice.toString(), q0[1].choice.toString(), q0[2].choice.toString(), q0[3].choice.toString(), q0[4].choice.toString()]],
        text: {
            co0: co0,
            co1: co1,
            co2: co2,
            co3: co3,
            input0: {
                'bef': '',
                'phi': '',
                'k1': '',
                'k13': '',
                'k14': '',
                'k16': '',
                'k17': '',
                'Qk': '',
                'Qsk': ''
            },
            input1: {
                'E1': '',
                'E2': '',
                'E3': '',
                'E4': '',
                'E5': '',
                'A1': '',
                'A2': '',
                'A3': '',
                'A4': '',
                'A5': '',
                'I1': '',
                'I2': '',
                'I3': '',
                'I4': '',
                'I5': '',
                'gamma1': '',
                'gamma2': '',
                'gamma3': '',
                'gamma4': '',
                'gamma5': '',
                'a1': '',
                'a2': '',
                'a3': '',
                'a4': '',
                'a5': '',
                'K1': '',
                'K2': '',
                'K4': '',
                'K5': ''
            },
            input2: {
                'E1': '',
                'E2': '',
                'E3': '',
                'A1': '',
                'A2': '',
                'A3': '',
                'Aef': '',
                'I1': '',
                'I2': '',
                'I3': '',
                'Ief': '',
                'Zef': '',
                'kc90': '',
                'gammaM': '',
                'gamma1': '',
                'gamma3': '',
                'a1': '',
                'a3': '',
                'bef': '',
                'EIef': '',
                'K1': '',
                'K3': '',
                'fmk': '',
                'fc90k': '',
                'kmod': '',
                'kdef': '',
                'ksys': '',
                'Sef': '',
                'SW': '',
                'Md': '',
                'Nd': '',
                'Vd': '',
                'ultimateLoad': '',
                'serviceLoad': ''
            },
            input3: {
                'A2': '',
                'A4': '',
                'a2': '',
                'a4': '',
                'E1': '',
                'E2': '',
                'E3': '',
                'E4': '',
                'E5': '',
                'fc0k': '',
                'I2': '',
                'I4': '',
                'Ief': '',
                'EIef': '',
                'K2': '',
                'K4': '',
                'kmod': '',
                'ksys': '',
                'Ndcompression': '',
                'Ndtension': '',
                'gammaM': '',
                'gamma2': '',
                'gamma4': '',
                'SW': '',
                'ft0k': '',
                'At': '',
                'E005': '',
                'Ac': '',
                'Lef': '',
                'lambda': '',
                'lamhdarel': '',
                'betac': '',
                'k': '',
                'kc': ''
            },
            submit: {
                co0: {},
                co1: {},
                co2: {},
                co3: {}
            }
        }
    },
    methods: {
        toAjax: function(event) {
            // check coefficients. It should be done first to decide vm.s1-s4
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
            postData["q3"] = this.part3;
            postData["q4"] = this.part4;
            postData["q0"] = this.multi;
            postData["set"] = JSON.stringify(this.set)
            
            // submitData is the one to send with post method
            window.submitData = {
                "zid": postData.zid,
                "week": "w3",
                "mark": postData.score,
                "data": JSON.stringify(postData),
                "text": JSON.stringify(this.text.submit)
            };

            window.sId = scoreEncode(this.score);

            toSubmit('http://www.lindenbaum.net.au/unsw/elearning/CVEN4309/quiz/01/process.php', window.submitData, window.sId);
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
        
        check: function(mark, inputID, partID, no1, no2) {
            // inputID: id of the associated input tag
            // no1, no2: index of the answer stored in vue
            // no2: only for question groups i.e. 1a, 1b,...
            // if inputID is 'choice', it is a choice question, then partID also corresponds to the <form> id
            // record answer into this.submit
            // no1, no2 indexed from 0
            if (inputID == 'choice') {
                var ans = $("#" + partID).find("input:checked").attr("value");
                if (ans == undefined) {
                    ans = 'null';
                } else {
                    ans = ans;
                }
                var co1 = vm[partID]['answer'][no1];
                
                if (co1 == ans) {
                    vm.score += 2;
                    console.log("#" + partID + "." + no1.toString());
                } else {
                    vm.score += 0;
                }
                
                vm.submit[partID][no1] = ans;
            } else {
                var ans = $("#" + inputID).val();
                if (no2 == undefined) {
                    var co1 = vm[partID]['answer'][no1];
                } else {
                    var co1 = vm[partID]['answer'][no1][no2];
                }
                
                var diff = Math.abs(ans - co1);
                var isCorrect = (diff <= 0.02) ? true : false;
                if (isCorrect) {
                    vm.score += 4;
                    console.log("#" + partID + "." + no1.toString());
                } else {
                    var partial = (partID == 'part1') ? vm.s1 : (partID == 'part2') ? vm.s2 : (partID == 'part3') ? vm.s3 : vm.s4;
                    vm.score += partial;
                }
                
                if (no2 == undefined) {
                    vm.submit[partID][no1] = ans;
                } else {
                    vm.submit[partID][no1][no2] = ans;
                }
            }
        },
        
        toSelect: function(idx, event){
            // check part1 - multiple choice
            // idx = 0, 1, 2, 3, 4, which are the four form tag: s0, s1, s2, s3, s4
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
            // loop over this.text.input1-4 to generate this.text.submit
            var no1 = this.part1.SetNo;  // index (0..) for vm.text.co0
            var no2 = this.part2.SetNo;  // index (0..) for vm.text.co1
            var no3 = this.part3.SetNo;  // index (0..) for vm.text.co2
            var no4 = this.part4.SetNo;  // index (0..) for vm.text.co3
            
            // check0..3 against this.text.input0..3
            var check0 = {};
            var check1 = {};
            var check2 = {};
            var check3 = {};
            
            for (let key in this.text.co0) {
                check0[key] = this.text.co0[key][no1];
            }
            
            for (let key in this.text.co1) {
                check1[key] = this.text.co1[key][no2];
            }
            
            for (let key in this.text.co2) {
                check2[key] = this.text.co2[key][no3];
            }
            
            for (let key in this.text.co3) {
                check3[key] = this.text.co3[key][no4];
            }
            
            // check this.text.input0; set this.s1
            for (let key in this.text.input0) {
                if (check0.hasOwnProperty(key)) {
                    var in1 = (this.text.input0[key] == '') ? NaN : Number(this.text.input0[key]);
                    in1 = in1.toFixed(3);
                    var diff = Math.abs(Number(in1) - check0[key]);
                    
                    if (diff <= 0.02) {
                        in1 = check0[key];
                    } else {
                        this.s1 = ((this.s1 - 1) <= 0) ? 0 : (this.s1 - 1);
                    }
                    
                    this.text.submit.co0[key] = isNaN(Number(in1)) ? [check0[key], 'invalid'] : [check0[key], in1];
                } else {
                    
                }
            }
            
            // check this.text.input1; set this.s2
            for (let key in this.text.input1) {
                if (check1.hasOwnProperty(key)) {
                    var in1 = (this.text.input1[key] == '') ? NaN : Number(this.text.input1[key]);
                    in1 = in1.toFixed(3);
                    var diff = Math.abs(Number(in1) - check1[key]);
                    
                    if (diff <= 0.02) {
                        in1 = check1[key];
                    } else {
                        this.s2 = ((this.s2 - 1) <= 0) ? 0 : (this.s2 - 1);
                    }
                    
                    this.text.submit.co1[key] = isNaN(Number(in1)) ? [check1[key], 'invalid'] : [check1[key], in1];
                } else {
                    
                }
            }
            
            // check this.text.input2; set this.s3
            for (let key in this.text.input2) {
                if (check2.hasOwnProperty(key)) {
                    var in1 = (this.text.input2[key] == '') ? NaN : Number(this.text.input2[key]);
                    in1 = in1.toFixed(3);
                    var diff = Math.abs(Number(in1) - check2[key]);
                    
                    if (diff <= 0.02) {
                        in1 = check2[key];
                    } else {
                        this.s3 = ((this.s3 - 1) <= 0) ? 0 : (this.s3 - 1);
                    }
                    
                    this.text.submit.co2[key] = isNaN(Number(in1)) ? [check2[key], 'invalid'] : [check2[key], in1];
                } else {
                    
                }
            }
            
            // check this.text.input3; set this.s4
            for (let key in this.text.input3) {
                if (check3.hasOwnProperty(key)) {
                    var in1 = (this.text.input3[key] == '') ? NaN : Number(this.text.input3[key]);
                    in1 = in1.toFixed(3);
                    var diff = Math.abs(Number(in1) - check3[key]);
                    
                    if (diff <= 0.02) {
                        in1 = check3[key];
                    } else {
                        this.s4 = ((this.s4 - 1) <= 0) ? 0 : (this.s4 - 1);
                    }
                    
                    this.text.submit.co3[key] = isNaN(Number(in1)) ? [check3[key], 'invalid'] : [check3[key], in1];
                } else {
                    
                }
            }
            
            console.log(JSON.stringify(vm.text.submit));
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
        $("#myFile").prop("disabled", false);
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

function toSubmit(url, data, display) {
    
}

$(document).ready(function() {
    $("#myapp").css("display", "block");
    $("#main-body").tabs();
    
    $("button").filter(function(idx, ele) {
        return ($(ele).html() == "Record Answers");
    }).addClass("record").css("display", "none");
});