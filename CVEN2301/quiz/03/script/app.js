var zid;
var count;
var special = [];

var bank = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var left = [0.4, 0.6, 0.8, 1, 1.2, 1.4];
var prob = new Problem();

function step(x, a, n) {  // <x-a>^n
    var r = x - a;
    
    if (r >= 0) {
        return Math.pow(r, n);
    } else {
        return 0;
    }
}

function Problem() {
    this.p = bank[Math.random() * bank.length >> 0] * 10;
    this.w = bank[Math.random() * bank.length >> 0];
    this.l = left[Math.random() * left.length >> 0];

    this.r1 = (4*this.p + this.w/2*Math.pow(4 - this.l, 2)) / (4 - this.l);
    this.r2 = this.p + this.w*(4 - this.l) - this.r1;
    
    this.r1 = Number(this.r1.toFixed(3));
    this.r2 = Number(this.r2.toFixed(3));

    this.d = function(x) {
        return this.p/6*Math.pow(x, 3) - this.r1/6*step(x, this.l, 3) + this.w/24*step(x, this.l, 4);
    };
    
    this.getConstant = function() {
        var A = [[this.l, 1], [4, 1]];
        var B = [-this.d(this.l), -this.d(4)];
        
        var arr = JXG.Math.Numerics.Gauss(A, B);
        
        return [Number(arr[0].toFixed(3)), Number(arr[1].toFixed(3))];
    };
    
    this.disp = function(x) {
        return this.d(x) + this.getConstant()[0]*x + this.getConstant()[1];
    };
    
    this.coeff = {
        
    }
}

var app = new Vue({
    el: '#module',
    
    data: {
        prob: prob,
        
        problem: {
            p: prob.p,
            w: prob.w,
            l: prob.l,
            r1: prob.r1,
            r2: prob.r2
        },

        record: {
            score: 0,
            answers: {

            }
        }
    },
    
    computed: {
        
    },
    
    methods: {
        toAjax: function(event) {
            $("#after-submit").html("");
            
            // change button label
            $(event.target).html("Submitting...").prop("disabled", true);
            setTimeout(function() {
                $(event.target).html("Finish and Submit").prop("disabled", false);
            }, 8000);
            
            // fire all record button and calculate final score
            $(".record").trigger("click");
            $(".trial").hide();
            this.record.score = this.record.score < 0 ? 0 : this.record.score > 100 ? 100 : this.record.score;
            
            
            // postData is the "data" attribute in AJAX post method
            var postData = {};
            postData["zid"] = zid;
            postData["answer"] = this.record.submit;
            postData["score"] = this.record.score;
            
            // submitData is the one to send with post method
            var submitData = {
                "zid": postData.zid,
                "week": "w3",
                "mark": postData.score,
                "data": JSON.stringify(postData),
                "text": $("#text-data").val()
            };
            
            /*This line for debugging only*/
            $("#console").css("display", "block");
            /*This line for debugging only*/
            
            $.post("../query.php", submitData, function(data, status) {
                if (data.toString() == "1") {
                    $(event.target).hide();
                    
                    $("#after-submit").html("<br/><br/><strong>You have submitted sucessfully.<br/><br/>Your submitted answers are shown in the tab below. Please keep a record of this tab.</strong>");
                    $(".after-hide").hide();
                    $(".after-show").show();
                    
                    $("#answers").tabs("option", "active", 4);
                } else {
                    $("#after-submit").html("<br/><br/><strong>We have confronted a problem when sending the mark. Please try again and if problem still exists, please send a screenshot of this quiz with your zID to xiaojun.chen@unsw.edu.au together with the following error infomation<br/><br/>" + "Error Info: " + data.toString() + "</strong>");
                    $(event.target).html("Finish and Submit").prop("disabled", false);
                }
            });
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
                        currentInstance.toAjax(currentEvent);
                    },
                    "No, I'll do it later": function() {
                        $(this).dialog("close");
                    }
                }
            });
        },
        
        updateDisplacement: function(event) {
            
        },
        
        addTerm: function(event) {
            var $span = $(event.target).closest("span")
            var $select = $span.find("select");
            var $option = $select.find(":selected");
            var $input = $span.find("input")
            var coefficient = getPrecision($input.val(), 3, 'n');
            
            // add to object
            
            // display selected formula
            
            // add new span
        },
        
        resetTerm: function(event, type) {
            
        },
        
        toRecord: function(event) {
            
        }
    }
});