var zid;
var count;
var special = [];

var xbank = [180, 200, 220, 240, 260];
var ybank = [30, 40, 50, 60];

var x = xbank[Math.random() * xbank.length >> 0];
var y = ybank[Math.random() * ybank.length >> 0];

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
        create_problem(x, y, 60);
        
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

var vm = new Vue({
    el: "#myapp",
    data: {
        score: 0,
        x: x,
        y: y,
        submit: {
            part1: {
                
            },
            part2: {
                
            },
            part3: {
                
            }
        },
        input_A1: "",
        input_A2: "",
        input_A3: "",
        input_x1: "",
        input_x2: "",
        input_x3: "",
        input_y1: "",
        input_y2: "",
        input_y3: "",
        input_xbar: "",
        input_ybar: "",
        input_Ixx: "",
        input_Iyy: "",
        input_Ixy: "",
        mark_part: [0, 0, 0, 0, 0, 0, 0, 0]  // table1, sub1, table2, sub2, input_table2, input_sub2, sub3, tabl3
    },
    computed: {
        coordinates: function() {
            return {
                A: [0, 0],
                B: [0, this.y],
                C: [this.x, this.y],
                D: [this.x, 0],
                E: [(this.x - this.y) / 2, this.y],
                F: [(this.x - this.y) / 2, this.x],
                G: [(this.x - this.y) / 2 + y, this.x],
                H: [(this.x - this.y) / 2 + y, this.y],
                I: [(this.x - this.y) / 2 + y, this.x - this.y],
                J: [this.x - 10, this.x - this.y],
                K: [this.x - 10, this.x]
            };
        },
        height1: function() {
            return this.coordinates.B[1] - this.coordinates.A[1];
        },
        width1: function() {
            return this.coordinates.D[0] - this.coordinates.A[0];
        },
        height2: function() {
            return this.coordinates.F[1] - this.coordinates.E[1];
        },
        width2: function() {
            return this.coordinates.H[0] - this.coordinates.E[0];
        },
        height3: function() {
            return this.coordinates.G[1] - this.coordinates.I[1];
        },
        width3: function() {
            return this.coordinates.J[0] - this.coordinates.I[0];
        },
        part1: function () {
            var result = {
                A1: this.width1 * this.height1,
                x1: this.coordinates.C[0] / 2,
                y1: this.coordinates.C[1] / 2,
                Ax1: this.width1 * this.height1 * (this.coordinates.C[0] / 2),
                Ay1: this.width1 * this.height1 * (this.coordinates.C[1] / 2),
                A2: this.width2 * this.height2,
                x2: this.coordinates.E[0] + this.width2 / 2,
                y2: this.coordinates.E[1] + this.height2 / 2,
                Ax2: this.width2 * this.height2 * (this.coordinates.E[0] + this.width2 / 2),
                Ay2: this.width2 * this.height2 * (this.coordinates.E[1] + this.height2 / 2),
                A3: this.width3 * this.height3,
                x3: this.coordinates.I[0] + this.width3 / 2,
                y3: this.coordinates.I[0] + this.height3 / 2,
                Ax3: this.width3 * this.height3 * (this.coordinates.I[0] + this.width3 / 2),
                Ay3: this.width3 * this.height3 * (this.coordinates.I[0] + this.height3 / 2),
            };
            
            result.Asum = result.A1 + result.A2 + result.A3;
            result.Axsum = result.Ax1 + result.Ax2 + result.Ax3;
            result.Aysum = result.Ay1 + result.Ay2 + result.Ay3;
            
            result.xbar = Number((result.Axsum / result.Asum).toFixed(3));
            result.ybar = Number((result.Aysum / result.Asum).toFixed(3));
            
            return result;
        },
        part2: function () {
            var result = {
                xbar1 : Number((this.part1.xbar - this.part1.x1).toFixed(3)),
                xbar2 : Number((this.part1.xbar - this.part1.x2).toFixed(3)),
                xbar3 : Number((this.part1.xbar - this.part1.x3).toFixed(3)),
                ybar1 : Number((this.part1.ybar - this.part1.y1).toFixed(3)),
                ybar2 : Number((this.part1.ybar - this.part1.y2).toFixed(3)),
                ybar3 : Number((this.part1.ybar - this.part1.y3).toFixed(3))
            };
            
            result.Ax21 = Number((this.part1.A1 * result.xbar1 * result.xbar1).toPrecision(4));
            result.Ax22 = Number((this.part1.A2 * result.xbar2 * result.xbar2).toPrecision(4));
            result.Ax23 = Number((this.part1.A3 * result.xbar3 * result.xbar3).toPrecision(4));
            result.Ax2sum = Number((result.Ax21 + result.Ax22 + result.Ax23).toPrecision(4));
            
            result.Iyy1 = Number((this.height1 * this.width1 * this.width1 * this.width1 / 12).toPrecision(4));
            result.Iyy2 = Number((this.height2 * this.width2 * this.width2 * this.width2 / 12).toPrecision(4));
            result.Iyy3 = Number((this.height3 * this.width3 * this.width3 * this.width3 / 12).toPrecision(4));
            result.Iyysum = Number((result.Iyy1 + result.Iyy2 + result.Iyy3).toPrecision(4));
            
            result.Ay21 = Number((this.part1.A1 * result.ybar1 * result.ybar1).toPrecision(4));
            result.Ay22 = Number((this.part1.A2 * result.ybar2 * result.ybar2).toPrecision(4));
            result.Ay23 = Number((this.part1.A3 * result.ybar3 * result.ybar3).toPrecision(4));
            result.Ay2sum = Number((result.Ay21 + result.Ay22 + result.Ay23).toPrecision(4));
            
            result.Ixx1 = Number((this.width1 * this.height1 * this.height1 * this.height1 / 12).toPrecision(4));
            result.Ixx2 = Number((this.width2 * this.height2 * this.height2 * this.height2 / 12).toPrecision(4));
            result.Ixx3 = Number((this.width3 * this.height3 * this.height3 * this.height3 / 12).toPrecision(4));
            result.Ixxsum = Number((result.Ixx1 + result.Ixx2 + result.Ixx3).toPrecision(4));
            
            result.Axy1 = Number((this.part1.A1 * result.xbar1 * result.ybar1).toPrecision(4));
            result.Axy2 = Number((this.part1.A2 * result.xbar2 * result.ybar2).toPrecision(4));
            result.Axy3 = Number((this.part1.A3 * result.xbar3 * result.ybar3).toPrecision(4));
            result.Axysum = Number((result.Axy1 + result.Axy2 + result.Axy3).toPrecision(4));
            
            result.Ixy1 = Number((0).toPrecision(4));
            result.Ixy2 = Number((0).toPrecision(4));
            result.Ixy3 = Number((0).toPrecision(4));
            result.Ixysum = Number((0).toPrecision(4));
            
            result.Ixx = result.Ixxsum + result.Ay2sum;
            result.Iyy = result.Iyysum + result.Ax2sum;
            result.Ixy = result.Ixysum + result.Axysum;
            
            return result;
        },
        part3: function() {
            var Ixy = this.part2.Ixy;
            var Ixx = this.part2.Ixx;
            var Iyy = this.part2.Iyy;
            
            var theta_radian = Math.atan(-2 * Ixy / (Ixx - Iyy));
            var theta = theta_radian / Math.PI * 180;
            
            var cos = Math.cos(theta_radian);
            var sin = Math.sin(theta_radian);
            
            var I1 = Ixx * cos * cos + Iyy * sin * sin - 2 * Ixy * sin * cos;
            var I2 = Ixx * sin * sin + Iyy * cos * cos + 2 * Ixy * sin * cos;
            
            var result = {
                theta: Number(theta.toFixed(3)),
                I1: Number(I1.toExponential(4)),
                I2: Number(I2.toExponential(4))
            };
            
            return result;
        },
        value: function() {
            return {
                coordinates: this.coordinates,
                part1: this.part1,
                part2: this.part2,
                part3: this.part3
            };
        }
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
            this.score = this.score < 0 ? 0 : this.score > 100 ? 100 : this.score;
            
            
            // postData is the "data" attribute in AJAX post method
            var postData = {};
            postData["zid"] = zid;
            postData["answer"] = this.submit;
            postData["score"] = this.score;
            postData["value"] = this.value;
            
            // submitData is the one to send with post method
            var submitData = {
                "zid": postData.zid,
                "week": "w1",
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
        
        toCheck: function(event) {
            var trial = Number($(event.target).attr("data-trial"));
            if (trial != 1) {
                $(event.target).prop("disabled", true);
                return;
            } else {
                $(event.target).attr("data-trial", "0").prop("disabled", true).html("5 marks will be taken from your final score!");
                
                // 5 marks penalty
                this.score -= 5;
                
                // check inputs
                // obtain tab number
                var tab_div = $(event.target).closest("div");
                var tab_num = $(tab_div).attr("id").slice(-1);
                var inputs = $(tab_div).find("input");

                if (tab_num === "1") {
                    var self = this;
                    inputs.each(function(idx, ele) {
                        var tag = $(ele).prop("id");
                        var value = $(ele).val();
                        
                        // parse value to number
                        if (value == "") {
                            value = NaN;
                        } else {
                            value = Number(value);
                        }
                        
                        if ($(ele).attr("data-type") == "n") {
                            // decimal form round to 1 decimals
                            if (isEqual(value, self.part1[tag], 1)) {
                                
                            } else {
                                if ($(ele).hasClass("sub-final")) {
                                    $(ele).css("background-color", "#FFB6C1");
                                }
                            }
                        } else {
                            // exponential form round to 2 exponential
                            if (isPrecise(value, self.part1[tag], 2)) {
                                
                            } else {
                                if ($(ele).hasClass("sub-final")) {
                                    $(ele).css("background-color", "#FFB6C1");
                                }
                            }
                        }
                    });
                } else if (tab_num === "2") {
                    var self = this;
                    inputs.each(function(idx, ele) {
                        var tag = $(ele).prop("id");
                        var value = $(ele).val();
                        
                        // parse value to number
                        if (value == "") {
                            value = NaN;
                        } else {
                            value = Number(value);
                        }
                        
                        if ($(ele).attr("data-type") == "n") {
                            // decimal form round to 1 decimals
                            if (isEqual(value, self.part2[tag], 1)) {
                                
                            } else {
                                if ($(ele).hasClass("sub-final")) {
                                    $(ele).css("background-color", "#FFB6C1");
                                }
                            }
                        } else {
                            // exponential form round to 2 exponential
                            if (isPrecise(value, self.part2[tag], 2)) {
                                
                            } else {
                                if ($(ele).hasClass("sub-final")) {
                                    $(ele).css("background-color", "#FFB6C1");
                                }
                            }
                        }
                    });
                } else {
                    var self = this;
                    inputs.each(function(idx, ele) {
                        var tag = $(ele).prop("id");
                        var value = $(ele).val();
                        
                        // parse value to number
                        if (value == "") {
                            value = NaN;
                        } else {
                            value = Number(value);
                        }
                        
                        if ($(ele).attr("data-type") == "n") {
                            // decimal form round to 1 decimals
                            if (isEqual(value, self.part3[tag], 1)) {
                                
                            } else {
                                if ($(ele).hasClass("sub-final")) {
                                    $(ele).css("background-color", "#FFB6C1");
                                }
                            }
                        } else {
                            // exponential form round to 2 exponential
                            if (isPrecise(value, self.part3[tag], 2)) {
                                
                            } else {
                                if ($(ele).hasClass("sub-final")) {
                                    $(ele).css("background-color", "#FFB6C1");
                                }
                            }
                        }
                    });
                }
            }
        },
        
        toRecord: function(event) {
            /*
             * There are 3 tabs, each tab contains two parts (the one in the table and the one with .sub-final)
             * Also consider carry over marks in tab2 and tab3
             */
            var self = this;
            
            /*
             * function for carry on mark for part 2
             */
            function carry_part2() {
                var input_xbar = Number(self.input_xbar);
                var input_ybar = Number(self.input_ybar);
                
                var result = {
                    xbar1 : Number((input_xbar - self.part1.x1).toFixed(3)),
                    xbar2 : Number((input_xbar - self.part1.x2).toFixed(3)),
                    xbar3 : Number((input_xbar - self.part1.x3).toFixed(3)),
                    ybar1 : Number((input_ybar - self.part1.y1).toFixed(3)),
                    ybar2 : Number((input_ybar - self.part1.y2).toFixed(3)),
                    ybar3 : Number((input_ybar - self.part1.y3).toFixed(3))
                };

                result.Ax21 = Number((self.part1.A1 * result.xbar1 * result.xbar1).toPrecision(4));
                result.Ax22 = Number((self.part1.A2 * result.xbar2 * result.xbar2).toPrecision(4));
                result.Ax23 = Number((self.part1.A3 * result.xbar3 * result.xbar3).toPrecision(4));
                result.Ax2sum = Number((result.Ax21 + result.Ax22 + result.Ax23).toPrecision(4));

                result.Iyy1 = Number((self.height1 * self.width1 * self.width1 * self.width1 / 12).toPrecision(4));
                result.Iyy2 = Number((self.height2 * self.width2 * self.width2 * self.width2 / 12).toPrecision(4));
                result.Iyy3 = Number((self.height3 * self.width3 * self.width3 * self.width3 / 12).toPrecision(4));
                result.Iyysum = Number((result.Iyy1 + result.Iyy2 + result.Iyy3).toPrecision(4));

                result.Ay21 = Number((self.part1.A1 * result.ybar1 * result.ybar1).toPrecision(4));
                result.Ay22 = Number((self.part1.A2 * result.ybar2 * result.ybar2).toPrecision(4));
                result.Ay23 = Number((self.part1.A3 * result.ybar3 * result.ybar3).toPrecision(4));
                result.Ay2sum = Number((result.Ay21 + result.Ay22 + result.Ay23).toPrecision(4));

                result.Ixx1 = Number((self.width1 * self.height1 * self.height1 * self.height1 / 12).toPrecision(4));
                result.Ixx2 = Number((self.width2 * self.height2 * self.height2 * self.height2 / 12).toPrecision(4));
                result.Ixx3 = Number((self.width3 * self.height3 * self.height3 * self.height3 / 12).toPrecision(4));
                result.Ixxsum = Number((result.Ixx1 + result.Ixx2 + result.Ixx3).toPrecision(4));

                result.Axy1 = Number((self.part1.A1 * result.xbar1 * result.ybar1).toPrecision(4));
                result.Axy2 = Number((self.part1.A2 * result.xbar2 * result.ybar2).toPrecision(4));
                result.Axy3 = Number((self.part1.A3 * result.xbar3 * result.ybar3).toPrecision(4));
                result.Axysum = Number((result.Axy1 + result.Axy2 + result.Axy3).toPrecision(4));

                result.Ixy1 = Number((0).toPrecision(4));
                result.Ixy2 = Number((0).toPrecision(4));
                result.Ixy3 = Number((0).toPrecision(4));
                result.Ixysum = Number((0).toPrecision(4));

                result.Ixx = result.Ixxsum + result.Ay2sum;
                result.Iyy = result.Iyysum + result.Ax2sum;
                result.Ixy = result.Ixysum + result.Axysum;

                return result;
            }
            
            /*
             * function for carry on mark for part 3
             */
            function carry_part3() {
                var Ixy = Number(self.input_Ixx);
                var Ixx = Number(self.input_Iyy);
                var Iyy = Number(self.input_Ixy);

                var theta_radian = Math.atan(-2 * Ixy / (Ixx - Iyy));
                var theta = theta_radian / Math.PI * 180;

                var cos = Math.cos(theta_radian);
                var sin = Math.sin(theta_radian);

                var I1 = Ixx * cos * cos + Iyy * sin * sin - 2 * Ixy * sin * cos;
                var I2 = Ixx * sin * sin + Iyy * cos * cos + 2 * Ixy * sin * cos;

                var result = {
                    theta: Number(theta.toFixed(3)),
                    I1: Number(I1.toExponential(4)),
                    I2: Number(I2.toExponential(4))
                };

                return result; 
            }
            
            // obtain tab number
            var tab_div = $(event.target).closest("div");
            var tab_num = $(tab_div).attr("id").slice(-1);
            var inputs = $(tab_div).find("input");
            
            if (tab_num === "1") {
                table_mark = 10;  // mark for table 1
                sub_mark = 20;  // mark for sub 1
                
                inputs.each(function(idx, ele) {
                    var tag = $(ele).prop("id");
                    var value = $(ele).val();

                    // parse value to number
                    if (value == "") {
                        value = NaN;
                    } else {
                        value = Number(value);
                    }
                    
                    if ($(ele).hasClass("sub-final")) {
                        // for sub 1
                        if ($(ele).attr("data-type") == "n") {
                            // decimal form round to 1 decimals
                            if (isEqual(value, self.part1[tag], 1)) {
                                console.log(tag + ": correct");
                                $("<li>" + tag + ": correct" + "</li>").appendTo($("#console-result"));
                            } else {
                                console.log(tag + ": wrong");
                                $("<li>" + tag + ": wrong" + "</li>").appendTo($("#console-result"));
                                sub_mark = 0;
                            }
                            
                            self.submit.part1[tag] = (isNaN(value) ? "blank" : value);
                        } else {
                            // exponential form round to 2 exponential
                            if (isPrecise(value, self.part1[tag], 2)) {
                                console.log(tag + ": correct");
                                $("<li>" + tag + ": correct" + "</li>").appendTo($("#console-result"));
                            } else {
                                sub_mark = 0;
                                console.log(tag + ": wrong");
                                $("<li>" + tag + ": wrong" + "</li>").appendTo($("#console-result"));
                            }
                            
                            self.submit.part1[tag] = (isNaN(value) ? "blank" : value);
                        }
                    } else {
                        // for table 1
                        if ($(ele).attr("data-type") == "n") {
                            // decimal form round to 1 decimals
                            if (isEqual(value, self.part1[tag], 1)) {
                                console.log(tag + ": correct");
                                $("<li>" + tag + ": correct" + "</li>").appendTo($("#console-result"));
                            } else {
                                table_mark = 0;
                                console.log(tag + ": wrong");
                                $("<li>" + tag + ": wrong" + "</li>").appendTo($("#console-result"));
                            }
                            
                            self.submit.part1[tag] = (isNaN(value) ? "blank" : value);
                        } else {
                            // exponential form round to 2 exponential
                            if (isPrecise(value, self.part1[tag], 2)) {
                                console.log(tag + ": correct");
                                $("<li>" + tag + ": correct" + "</li>").appendTo($("#console-result"));
                            } else {
                                table_mark = 0;
                                console.log(tag + ": wrong");
                                $("<li>" + tag + ": wrong" + "</li>").appendTo($("#console-result"));
                            }
                            
                            self.submit.part1[tag] = (isNaN(value) ? "blank" : value);
                        }
                    }
                });
                
                // update score
                self.score += table_mark + sub_mark;
                self.mark_part[0] = table_mark;
                self.mark_part[1] = sub_mark;
                
            } else if (tab_num === "2") {
                table_mark = 10;  // mark for table 2
                sub_mark = {Ixx: 15, Iyy: 15, Ixy: 15};  // mark for sub 2
                
                inputs.each(function(idx, ele) {
                    var tag = $(ele).prop("id");
                    var value = $(ele).val();

                    // parse value to number
                    if (value == "") {
                        value = NaN;
                    } else {
                        value = Number(value);
                    }
                    
                    if ($(ele).hasClass("sub-final")) {
                        // for sub 2
                        if ($(ele).attr("data-type") == "n") {
                            // decimal form round to 1 decimals
                            if (isEqual(value, self.part1[tag], 1)) {
                                console.log(tag + ": correct");
                                $("<li>" + tag + ": correct" + "</li>").appendTo($("#console-result"));
                            } else {
                                sub_mark[tag] = 0;
                                console.log(tag + ": wrong");
                                $("<li>" + tag + ": wrong" + "</li>").appendTo($("#console-result"));
                            }
                            
                            self.submit.part2[tag] = (isNaN(value) ? "blank" : value);
                        } else {
                            // exponential form round to 2 exponential
                            if (isPrecise(value, self.part1[tag], 2)) {
                                console.log(tag + ": correct");
                                $("<li>" + tag + ": correct" + "</li>").appendTo($("#console-result"));
                            } else {
                                sub_mark[tag] = 0;
                                console.log(tag + ": wrong");
                                $("<li>" + tag + ": wrong" + "</li>").appendTo($("#console-result"));
                            }
                            
                            self.submit.part2[tag] = (isNaN(value) ? "blank" : value);
                        }
                    } else {
                        // for table 2
                        if ($(ele).attr("data-type") == "n") {
                            // decimal form round to 1 decimals
                            if (isEqual(value, self.part2[tag], 1)) {
                                console.log(tag + ": correct");
                                $("<li>" + tag + ": correct" + "</li>").appendTo($("#console-result"));
                            } else {
                                table_mark = 0;
                                console.log(tag + ": wrong");
                                $("<li>" + tag + ": wrong" + "</li>").appendTo($("#console-result"));
                            }
                            
                            self.submit.part2[tag] = (isNaN(value) ? "blank" : value);
                        } else {
                            // exponential form round to 2 exponential
                            if (isPrecise(value, self.part2[tag], 2)) {
                                console.log(tag + ": correct");
                                $("<li>" + tag + ": correct" + "</li>").appendTo($("#console-result"));
                            } else {
                                table_mark = 0;
                                console.log(tag + ": wrong");
                                $("<li>" + tag + ": wrong" + "</li>").appendTo($("#console-result"));
                            }
                            
                            self.submit.part2[tag] = (isNaN(value) ? "blank" : value);
                        }
                    }
                });
                
                // consider carry-on mark
                var user_input = carry_part2();
                var inputs = $(tab_div).find("input");
                
                input_table_mark = 10;  // mark for table 2
                input_sub_mark = {Ixx: 15, Iyy: 15, Ixy: 15};  // mark for sub 2
                
                inputs.each(function(idx, ele) {
                    var tag = $(ele).prop("id");
                    var value = $(ele).val();

                    // parse value to number
                    if (value == "") {
                        value = NaN;
                    } else {
                        value = Number(value);
                    }
                    
                    if ($(ele).hasClass("sub-final")) {
                        // for sub 2
                        if ($(ele).attr("data-type") == "n") {
                            // decimal form round to 1 decimals
                            if (isEqual(value, user_input[tag], 1)) {
                                console.log(tag + " (user-input based): correct");
                                $("<li>" + tag + " (user-input based): correct" + "</li>").appendTo($("#console-result"));
                            } else {
                                input_sub_mark[tag] = 0;
                                console.log(tag + " (user-input based): wrong");
                                $("<li>" + tag + " (user-input based): wrong" + "</li>").appendTo($("#console-result"));
                            }
                        } else {
                            // exponential form round to 2 exponential
                            if (isPrecise(value, user_input[tag], 2)) {
                                console.log(tag + " (user-input based): correct");
                                $("<li>" + tag + " (user-input based): correct" + "</li>").appendTo($("#console-result"));
                            } else {
                                input_sub_mark[tag] = 0;
                                console.log(tag + " (user-input based): wrong");
                                $("<li>" + tag + " (user-input based): wrong" + "</li>").appendTo($("#console-result"));
                            }
                        }
                    } else {
                        // for table 2
                        if ($(ele).attr("data-type") == "n") {
                            // decimal form round to 1 decimals
                            if (isEqual(value, self.part2[tag], 1)) {
                                console.log(tag + " (user-input based): correct");
                                $("<li>" + tag + " (user-input based): correct" + "</li>").appendTo($("#console-result"));
                            } else {
                                input_table_mark = 0;
                                console.log(tag + " (user-input based): wrong");
                                $("<li>" + tag + " (user-input based): wrong" + "</li>").appendTo($("#console-result"));
                            }
                        } else {
                            // exponential form round to 2 exponential
                            if (isPrecise(value, self.part2[tag], 2)) {
                                console.log(tag + " (user-input based): correct");
                                $("<li>" + tag + " (user-input based): correct" + "</li>").appendTo($("#console-result"));
                            } else {
                                input_table_mark[tag] = 0;
                                console.log(tag + " (user-input based): wrong");
                                $("<li>" + tag + ": (user-input based): wrong" + "</li>").appendTo($("#console-result"));
                            }
                        }
                    }
                });
                
                // update score
                self.score += Math.max(table_mark + (sub_mark.Ixx + sub_mark.Iyy + sub_mark.Ixy), input_table_mark + (input_sub_mark.Ixx + input_sub_mark.Iyy + input_sub_mark.Ixy));
                self.mark_part[2] = table_mark;
                self.mark_part[3] = sub_mark.Ixx + sub_mark.Iyy + sub_mark.Ixy;
                self.mark_part[4] = input_table_mark;
                self.mark_part[5] = input_sub_mark.Ixx + input_sub_mark.Iyy + input_sub_mark.Ixy;
                
            } else {
                sub_mark = {I1: 5, I2: 5, theta: 5};  // mark for sub 3
                
                inputs.each(function(idx, ele) {
                    var tag = $(ele).prop("id");
                    var value = $(ele).val();

                    // parse value to number
                    if (value == "") {
                        value = NaN;
                    } else {
                        value = Number(value);
                    }
                    
                    // for sub 3
                    if ($(ele).attr("data-type") == "n") {
                        // decimal form round to 1 decimals
                        if (isEqual(value, self.part1[tag], 1)) {
                            console.log(tag + ": correct");
                            $("<li>" + tag + ": correct" + "</li>").appendTo($("#console-result"));
                        } else {
                            sub_mark[tag] = 0;
                            console.log(tag + ": wrong");
                            $("<li>" + tag + ": wrong" + "</li>").appendTo($("#console-result"));
                        }
                            
                        self.submit.part3[tag] = (isNaN(value) ? "blank" : value);
                    } else {
                        // exponential form round to 2 exponential
                        if (isPrecise(value, self.part1[tag], 2)) {
                            console.log(tag + ": correct");
                            $("<li>" + tag + ": correct" + "</li>").appendTo($("#console-result"));
                        } else {
                            sub_mark[tag] = 0;
                            console.log(tag + ": wrong");
                            $("<li>" + tag + ": wrong" + "</li>").appendTo($("#console-result"));
                        }
                            
                        self.submit.part3[tag] = (isNaN(value) ? "blank" : value);
                    }
                });
                
                // consider carry-on mark
                var user_input = carry_part3();
                var inputs = $(tab_div).find("input");
                
                input_sub_mark = {I1: 5, I2: 5, theta: 5};  // mark for sub 3
                
                inputs.each(function(idx, ele) {
                    var tag = $(ele).prop("id");
                    var value = $(ele).val();

                    // parse value to number
                    if (value == "") {
                        value = NaN;
                    } else {
                        value = Number(value);
                    }
                    
                    // for sub 3
                    if ($(ele).attr("data-type") == "n") {
                        // decimal form round to 1 decimals
                        if (isEqual(value, user_input[tag], 1)) {
                            console.log(tag + ": (user-input based): correct");
                            $("<li>" + tag + ": (user-input based): correct" + "</li>").appendTo($("#console-result"));
                        } else {
                            input_sub_mark[tag] = 0;
                            console.log(tag + ": (user-input based): wrong");
                            $("<li>" + tag + ": (user-input based): wrong" + "</li>").appendTo($("#console-result"));
                        }
                    } else {
                        // exponential form round to 2 exponential
                        if (isPrecise(value, user_input[tag], 2)) {
                            console.log(tag + ": (user-input based): correct");
                            $("<li>" + tag + ": (user-input based): correct" + "</li>").appendTo($("#console-result"));
                        } else {
                            input_sub_mark[tag] = 0;
                            console.log(tag + ": (user-input based): wrong");
                            $("<li>" + tag + ": (user-input based): wrong" + "</li>").appendTo($("#console-result"));
                        }
                    }
                });
                
                // update score
                self.score += Math.max((sub_mark.I1 + sub_mark.I2 + sub_mark.theta), (input_sub_mark.I1 + input_sub_mark.I2 + input_sub_mark.theta));
                self.mark_part[6] = sub_mark.I1 + sub_mark.I2 + sub_mark.theta;
                self.mark_part[7] = input_sub_mark.I1 + input_sub_mark.I2 + input_sub_mark.theta;
            }
            
            self.$forceUpdate();
        }
    }
});

function create_problem(x, y, offset) {
    JXG.Options.infobox.strokeColor = 'red';
    
    var board = JXG.JSXGraph.initBoard('svg-prob', {
                        boundingbox: [-offset, x + offset, x + offset, -offset],
                        axis: true,
                        grid: false,
                        showCopyright: false,
                        showNavigation: false,
                        keepaspectratio: true});
    
    var pointLabel = {
        cssClass: 'pointLabel',
        highlightCssClass: 'pointLabel'
    }
    
    var pA = board.create('point', [0, 0], {name: 'A', size: 2, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pB = board.create('point', [0, y], {name: 'B', size: 2, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pC = board.create('point', [x, y], {name: 'C', size: 2, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pD = board.create('point', [x, 0], {name: 'D', size: 2, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pE = board.create('point', [(x - y) / 2, y], {name: 'E', size: 2, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pF = board.create('point', [(x - y) / 2, x], {name: 'F', size: 2, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pG = board.create('point', [(x - y) / 2 + y, x], {name: 'G', size: 2, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pH = board.create('point', [(x - y) / 2 + y, y], {name: 'H', size: 2, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pI = board.create('point', [(x - y) / 2 + y, x - y], {name: 'I', size: 2, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pJ = board.create('point', [x - 10, x - y], {name: 'J', size: 2, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pK = board.create('point', [x - 10, x], {name: 'K', size: 2, color: 'black', highlight: false, fixed: true, label: pointLabel});
    
    var r1 = board.create('polygon', [pA, pB, pC, pD], {strokeColor: 'black', fillColor: '#32CD32', highlight: false, fixed: true});
    var r2 = board.create('polygon', [pE, pF, pG, pH], {strokeColor: 'black', fillColor: '#6495ED', highlight: false, fixed: true});
    var r3 = board.create('polygon', [pG, pI, pJ, pK], {strokeColor: 'black', fillColor: '#F08080', highlight: false, fixed: true});
    
    [r1, r2, r3].forEach(function(e) {
        e.borders.forEach(function(ele) {
            ele.setAttribute({
                highlight: false
            });
        });
    });
}

$(document).ready(function() {
    $("#answers").tabs();
    $("#myapp").css("display", "block");
    // $(".after-show").hide();

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