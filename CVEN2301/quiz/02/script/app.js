var zid;
var count;
var special = [];

var bank = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var sign = [1, -1];

function Problem(young, pos) {
    this.x = bank[Math.random() * bank.length >> 0] * sign[Math.random() * sign.length >> 0] * 10;
    this.y = bank[Math.random() * bank.length >> 0] * sign[Math.random() * sign.length >> 0] * 10;
    this.xy = bank[Math.random() * bank.length >> 0] * sign[Math.random() * sign.length >> 0] * 10;
    
    this.x1 = (function(x, y, xy, beta) {
        var sin = Math.sin(beta / 180 * Math.PI);
        var cos = Math.cos(beta / 180 * Math.PI);
        
        var result = x*cos*cos + y*sin*sin + 2*xy*sin*cos;
        return Number(result.toFixed(3));
    })(this.x, this.y, this.xy, 40);
    
    this.y1 = (function(x, y, xy, beta) {
        var sin = Math.sin(beta / 180 * Math.PI);
        var cos = Math.cos(beta / 180 * Math.PI);
        
        var result = y*cos*cos + x*sin*sin - 2*xy*sin*cos;
        return Number(result.toFixed(3));
    })(this.x, this.y, this.xy, 40);
    
    this.x1y1 = (function(x, y, xy, beta) {
        var sin = Math.sin(beta / 180 * Math.PI);
        var cos = Math.cos(beta / 180 * Math.PI);
        
        var result = (y - x)*sin*cos + xy*(cos*cos - sin*sin);
        return Number(result.toFixed(3));
    })(this.x, this.y, this.xy, 40);
    
    this.young = young;
    this.pos = pos;
    
    this.g = this.young / 2 / (1 + this.pos);
    this.ex = (this.x - this.pos*this.y) / this.young * 1e12;
    this.ey = (this.y - this.pos*this.x) / this.young * 1e12;
    this.exy = this.xy / this.g * 1e12;

    this.ex = Number(this.ex.toFixed(3));
    this.ey = Number(this.ey.toFixed(3));
    this.exy = Number(this.exy.toFixed(3));
    
    var theta = Math.atan(-2*this.xy/(this.x-this.y));
    theta = theta / 2;
    var thetad = theta  * 180 / Math.PI;

    this.theta = theta;
    this.thetad = thetad;
    this.s1 = this.x*Math.pow(Math.cos(theta), 2) + this.y*Math.pow(Math.sin(theta), 2) - 2*this.xy*Math.cos(theta)*Math.sin(theta);
    this.s2 = this.x*Math.pow(Math.sin(theta), 2) + this.y*Math.pow(Math.cos(theta), 2) + 2*this.xy*Math.cos(theta)*Math.sin(theta);

    this.theta = Number(this.theta.toFixed(3));
    this.thetad = Number(this.thetad.toFixed(3));
    this.s1 = Number(this.s1.toFixed(3));
    this.s2 = Number(this.s2.toFixed(3));
    
    var etheta = Math.atan(-2*this.exy/(this.ex-this.ey));
    etheta = etheta / 2;
    var ethetad = etheta  * 180 / Math.PI;

    this.etheta = etheta;
    this.ethetad = ethetad;
    this.es1 = this.ex*Math.pow(Math.cos(etheta), 2) + this.ey*Math.pow(Math.sin(etheta), 2) - 2*this.exy*Math.cos(etheta)*Math.sin(etheta);
    this.es2 = this.ex*Math.pow(Math.sin(etheta), 2) + this.ey*Math.pow(Math.cos(etheta), 2) + 2*this.exy*Math.cos(etheta)*Math.sin(etheta);

    this.etheta = Number(this.etheta.toFixed(3));
    this.ethetad = Number(this.ethetad.toFixed(3));
    this.es1 = Number(this.es1.toFixed(3));
    this.es2 = Number(this.es2.toFixed(3));
}

function check_id() {
    // check zID
    var re = new RegExp('^z[0-9]{7}$');
    
    zid = $("#zid").val();
    
    // developing mode
    if ((zid === "z3243398") || (zid === "z7701732") || (zid === "z3290765")) {
        isFirst = "first attempt";
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
        
        if (special.includes(zid)) {
            timer = 8100000;
            $("#min").html(135);
        } else {
            timer = 5400000;
            $("#min").html(90);
        }
        
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
            $("#timeup").html("").css("color", "red").html("Your time is up. It is time to take screenshots/photos of your answers and submit!")
            $("input").prop("disabled", true);

            // TODO submit result
        }, timer);
        
    } else {
        toblock("&nbsp;Your zID does not match your profile!");
    }
}

var app = angular.module("app", []);

app.controller("Controller", function($scope) {
    $scope.question = new Problem(200e9, 0.25);
    
    $scope.prob = {
        s1: $scope.question.s1,
        s2: $scope.question.s2,
        theta_stress: $scope.question.thetad,
        x1: $scope.question.x1,
        y1: $scope.question.y1,
        x1y1: $scope.question.x1y1,
        es1: $scope.question.es1,
        es2: $scope.question.es2,
        theta_strain: $scope.question.ethetad,
        
        centre: ($scope.question.s1 + $scope.question.s2) / 2,
        radius: Math.abs($scope.question.s1 - $scope.question.s2) / 2,
        
        x: $scope.question.x,
        y: $scope.question.y,
        xy: $scope.question.xy,
        ex: $scope.question.ex,
        ey: $scope.question.ey,
        exy: $scope.question.exy,
        young: $scope.question.young,
        pos: $scope.question.pos
    };
    
    $scope.record = {
        score: 0,
        answers: {
            s1: 0,
            s2: 0,
            theta_stress: 0,
            x1: 0,
            y1: 0,
            x1y1: 0,
            ex: 0,
            ey: 0,
            exy: 0,
            es1: 0,
            es2: 0,
            theta_strain: 0,
            centre: 0,
            radius: 0
        }
    };
    
    $scope.tofinish = function(event) {
        function toSubmit(scope, e) {
            $("#after-submit").html("");
            
            // change button label
            $(e.target).html("Submitting...").prop("disabled", true);
            setTimeout(function() {
                $(e.target).html("Finish and Submit").prop("disabled", false);
            }, 8000);
            
            // fire all record button and calculate final score
            $(".record").trigger("click");
            scope.record.score = scope.record.score < 0 ? 0 : scope.record.score > 100 ? 100 : scope.record.score;
            
            // postData is the "data" attribute in AJAX post method
            var postData = {};
            postData["zid"] = zid;
            postData["score"] = scope.record.score;
            postData["record"] = scope.record;
            postData["prob"] = scope.prob;
            
            // submitData is the one to send with post method
            var submitData = {
                "zid": postData.zid,
                "week": "w2",
                "mark": postData.score,
                "data": JSON.stringify(postData),
                "text": $("#text-data").val()
            };
            
            $.post("../query.php", submitData, function(data, status) {
                if (data.toString() == "1") {
                    $(e.target).hide();
                    
                    $("#after-submit").html("<br/><br/><strong>You have submitted sucessfully.<br/><br/>Your submitted answers are shown in the tab below. Please keep a record of this tab.</strong>");
                    $(".after-hide").hide();
                    $(".after-show").show();
                    
                    $("#answers").tabs("option", "active", 3);
                } else {
                    $("#after-submit").html("<br/><br/><strong>We have confronted a problem when sending the mark. Please try again and if problem still exists, please send a screenshot of this quiz with your zID to xiaojun.chen@unsw.edu.au together with the following error infomation<br/><br/>" + "Error Info: " + data.toString() + "</strong>");
                    $(e.target).html("Finish and Submit").prop("disabled", false);
                }
            });
        };
        
        var e = event;
        var scope = $scope;

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
                    toSubmit(scope, e);
                },
                "No, I'll do it later": function() {
                    $(this).dialog("close");
                }
            }
        });
    };
    
    $scope.toRecord = function(event) {
        var tab = $(event.target).attr("data-tab");
        
        if (tab == "1") {
            var inputs = $(event.target).closest("div").find("input");
            var marks = [];
            
            inputs.each(function(i, e) {
                var idx = parseInt($(e).attr("data-group"));
                if (marks.length < (idx + 1)) {
                    marks.push(parseInt($(e).attr("data-mark")));
                } else {
                    
                }
            });
            
            inputs.each(function(i, e) {
                var idx = parseInt($(e).attr("data-group"));
                var name = $(e).attr("id");
                var value = $(e).val();
                
                value = (value.trim().length == 0) ? NaN : Number(value); 
                
                if (Math.abs($scope.prob[name] - value) <= 0.2) {
                    
                } else {
                    marks[idx] = 0;
                }
                
                $scope.record.answers[name] = isNaN(value) ? "blank" : value;
            });
            
            $scope.record.score += marks.reduce(function(a, v) {
                return a + v;
            });
        } else if (tab == "2") {
            var inputs = $(event.target).closest("div").find("input");
            var marks = [];
            
            inputs.each(function(i, e) {
                var idx = parseInt($(e).attr("data-group"));
                if (marks.length < (idx + 1)) {
                    marks.push(parseInt($(e).attr("data-mark")));
                } else {
                    
                }
            });
            
            inputs.each(function(i, e) {
                var idx = parseInt($(e).attr("data-group"));
                var name = $(e).attr("id");
                var value = $(e).val();
                
                value = (value.trim().length == 0) ? NaN : Number(value); 
                
                if (Math.abs($scope.prob[name] - value) <= 0.2) {
                    
                } else {
                    marks[idx] = 0;
                }
                
                $scope.record.answers[name] = isNaN(value) ? "blank" : value;
            });
            
            $scope.record.score += marks.reduce(function(a, v) {
                return a + v;
            });
        } else if (tab == "3") {
            var centre = Number(Number($("#ox").html()).toFixed(0));
            var radius = Number(Number($("#radius").html()).toFixed(0));
            
            $scope.record.answers.centre = centre;
            $scope.record.answers.radius = radius;
            
            var diff1 = Math.abs(centre - $scope.prob.centre);
            var diff2 = Math.abs(radius - $scope.prob.radius);
            
            if ((diff1 <= 3) && (diff2 <= 3)) {
                $scope.record.score += 10;
            }
        } else {
            
        }
    };
});

$(document).ready(function() {
    $("#myapp").css("display", "block");
    $(".after-show").hide();
    $("#answers").tabs();
    create_mohr();

    $("textarea").on("keyup", function(e) {
        var in1 = $(e.target).val();
        var len = in1.length;
        if (len <= 500) {
            $(e.target).parent().find("span").html((500 - len).toString() + " characters remains");
        } else {
            $(e.target).parent().find("span").html("maximum text length reached");
            $(e.target).val(in1.slice(0, 500));
        }
    });
});

function create_mohr() {
    $("#p3 ul li").hide();
    
    JXG.Options.infobox.fontSize = 0;
    
    var scope = angular.element($("#myapp").get(0)).scope();
    
    var left = Math.min(scope.prob.s1, scope.prob.s2);
    var right = Math.max(scope.prob.s1, scope.prob.s2);
    var radius = Math.abs(scope.prob.s1 - scope.prob.s2) / 2;
    var offset = Math.abs(scope.prob.s1 - scope.prob.s2) / 10;
    
    var board = JXG.JSXGraph.initBoard('svg-mohr', {
                        boundingbox: [left - offset, radius + offset, right + offset, -radius - offset],
                        axis: true,
                        grid: false,
                        showCopyright: false,
                        showNavigation: false,
                        keepaspectratio: true});
    
    var pointLabel = {
        cssClass: 'pointLabel',
        highlightCssClass: 'pointLabel'
    }
    
    var left_point = board.create('point', [left - offset, 0], {visible: false});
    var right_point = board.create('point', [right + offset, 0], {visible: false});
    var base = board.create('line', [left_point, right_point], {visible: false});
    
    var pO = board.create('glider', [left + 3*offset, 0, base], {name: 'O', size: 2, color: 'black', highlight: false, label: pointLabel});
    var pA = board.create('point', [left + 0*offset, 0], {name: 'A', size: 4, color: 'black', highlight: false, label: pointLabel});
    
    var c = board.create('circle', [pO, pA], {fixed: true, strokeColor: 'black', strokeWidth: 3, highlight: false});
    var pB = board.create('glider', [left + 6*offset, 0, c], {name: 'B', size: 4, color: 'black'});
    var l1 = board.create('line', [pA, pO], {straightFirst: false, straightLast: false, strokeColor: 'black', dash: 1, strokeWidth: 1});
    var l2 = board.create('line', [pB, pO], {straightFirst: false, straightLast: false, strokeColor: 'black', dash: 1, strokeWidth: 1});
    
    pO.on("drag", function() {
        var ox = Number(pO.X().toFixed(0));
        var oy = Number(pO.Y().toFixed(0));
        pO.moveTo([ox, oy]);
        
        var ax = Number(pA.X().toFixed(0));
        var ay = Number(pA.Y().toFixed(0));
        pA.moveTo([ax, ay]);
        
        var bx = Number(pB.X().toFixed(0));
        var by = Number(pB.Y().toFixed(0));
        pB.moveTo([bx, by]);
        
        $("#ox").html(ox.toString());
        $("#oy").html(oy.toString());
        
        $("#ax").html(ax.toString());
        $("#ay").html(ay.toString());
        
        $("#bx").html(bx.toString());
        $("#by").html(by.toString());
        
        $("#radius").html(c.Radius().toFixed(1));
        
        $("#list-o").show();
    });
    
    pA.on("drag", function() {
        var ox = Number(pO.X().toFixed(0));
        var oy = Number(pO.Y().toFixed(0));
        pO.moveTo([ox, oy]);
        
        var ax = Number(pA.X().toFixed(0));
        var ay = Number(pA.Y().toFixed(0));
        pA.moveTo([ax, ay]);
        
        var bx = Number(pB.X().toFixed(0));
        var by = Number(pB.Y().toFixed(0));
        pB.moveTo([bx, by]);
        
        $("#ox").html(ox.toString());
        $("#oy").html(oy.toString());
        
        $("#ax").html(ax.toString());
        $("#ay").html(ay.toString());
        
        $("#bx").html(bx.toString());
        $("#by").html(by.toString());
        
        $("#radius").html(c.Radius().toFixed(1));
        
        $("#list-a").show();
        $("#list-r").show();
    });
    
    pB.on("drag", function() {
        var ox = Number(pO.X().toFixed(0));
        var oy = Number(pO.Y().toFixed(0));
        pO.moveTo([ox, oy]);
        
        var ax = Number(pA.X().toFixed(0));
        var ay = Number(pA.Y().toFixed(0));
        pA.moveTo([ax, ay]);
        
        var bx = Number(pB.X().toFixed(0));
        var by = Number(pB.Y().toFixed(0));
        pB.moveTo([bx, by]);
        
        $("#ox").html(ox.toString());
        $("#oy").html(oy.toString());
        
        $("#ax").html(ax.toString());
        $("#ay").html(ay.toString());
        
        $("#bx").html(bx.toString());
        $("#by").html(by.toString());
        
        $("#radius").html(c.Radius().toFixed(1));
        
        $("#list-b").show();
    });
}