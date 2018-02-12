var zid;
var count;
var special = [];

var height = 250;
var width = 250;

var topbank = [20, 25];
var bottombank = [30, 35, 40, 45];
var webbank = [50, 55, 60, 65];
var dispbank = [30, 40, 50, 60];

var prob = new Problem();

function Problem() {
    this.x1 = width;
    this.y1 = topbank[Math.random() * topbank.length >> 0];
    this.x3 = width;
    this.y3 = bottombank[Math.random() * bottombank.length >> 0];
    this.x2 = webbank[Math.random() * webbank.length >> 0];
    this.y2 = height - this.y1 - this.y3;
    
    this.left = dispbank[Math.random() * dispbank.length >> 0];
    
    this.y = (this.x1*this.y1*(this.y3 + this.y2 + this.y1/2) + this.x2*this.y2*(this.y3 + this.y2/2) + this.x3*this.y3*this.y3/2) / (this.x1*this.y1 + this.x2*this.y2 + this.x3*this.y3);
    
    this.y = Number(this.y.toFixed(2));
    
    this.i = (function(x1, x2, x3, y1, y2, y3, y) {
        var i1 = x1 * Math.pow(y1, 3) / 12;
        var i2 = x2 * Math.pow(y2, 3) / 12;
        var i3 = x3 * Math.pow(y3, 3) / 12;
        var a1 = x1 * y1 * Math.pow((y3 + y2 + y1/2 - y), 2);
        var a2 = x2 * y2 * Math.pow((y3 + y2/2 - y), 2);
        var a3 = x3 * y3 * Math.pow((y3 / 2), 2);
        
        var ixx = i1 + i2 + i3 + a1 + a2 + a3;
        
        return Number(ixx.toExponential(3));
    })(this.x1, this.x2, this.x3, this.y1, this.y2, this.y3, this.y);
    
    this.qde = this.x1 * this.y1 * (this.y2 + this.y3 - this.y);
    this.qhl = this.y3 * this.left * (this.y - this.y3/2);
    this.qim = this.y3 * (this.x3 - this.left - this.x2) * (this.y - this.y3/2);
    
    this.qde = Number(this.qde.toExponential(3));
    this.qhl = Number(this.qhl.toExponential(3));
    this.qim = Number(this.qim.toExponential(3));
}

var app = new Vue({
    el: '#module',
    
    data: {
        question: prob,
    
        problem: {
            x1: prob.x1,
            y1: prob.y1,
            x2: prob.x2,
            y2: prob.y2,
            x3: prob.x3,
            y3: prob.y3,
            left: prob.left,
            y: prob.y,
            i: prob.i,
            qde: prob.qde,
            qhl: prob.qhl,
            qim: prob.qim
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
                "week": "w4",
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
        
        toRecord: function(event) {
            
        }
    }
});