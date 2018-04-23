var prob = new Model(15, 350);

var vm = new Vue({
    el: "#myapp",
    data: {
        prob: prob,
        e: 700,
        e1: -700,
        e2: 700,
        e3: -700,
        e4: 700,
        e5: -700,
        s0: -0.2,
        s1: 0.215,
        s2: -0.187,
        s3: 0.187,
        s4: -0.215,
        s5: 0.2,
        x0: 0,
        x1: 13.5,
        x2: 27.5,
        x3: 42.5,
        x4: 56.5,
        x5: 70,
        dp1: 10,
        dp2: 10,
        pav: 0
    },
    computed: {
        slope0: function() {
            return 4 * (-prob.e / 1000 / prob.span);
        },
        
        lset1: function() {
            var r = 6 * 195000 * 2800 / this.dp1;
            r = Math.sqrt(Math.abs(r)) / 1000;
            return Math.min(70, Number(r.toFixed(1)));
        },
        
        lset2: function() {
            var r = 6 * 195000 * 2800 / this.dp2;
            r = Math.sqrt(Math.abs(r)) / 1000;
            return Math.min(70, Number(r.toFixed(1)));
        }
    },
    methods: {
        slope: function(x) {
            return 4 * (-prob.e / 1000 / prob.span) * (1 - 2*x/prob.span);
        },
        
        alpha: function(x) {
            if (x <= prob.span / 2) {
                return Math.abs(this.slope0) - Math.abs(this.slope(x));
            } else {
                return Math.abs(this.slope0) + Math.abs(this.slope(x));
            }
        },
        
        checkTable: function(row, col) {
            var p0 = 3906;
            
            var length = [7, this.x1 - 7, 20 - this.x1, this.x2 - 20, 35 - this.x2, this.x3 - 35, 50 - this.x3, this.x4 - 50, 63 - this.x4, 7];
            var alpha = [Math.abs(this.s0), Math.abs(this.s1), Math.abs(this.s1), Math.abs(this.s2), Math.abs(this.s2), Math.abs(this.s3), Math.abs(this.s3), Math.abs(this.s4), Math.abs(this.s4), Math.abs(this.s5)];
            
            var mu = alpha.map(function(ele, idx, arr) {
                var r = 0.2*ele + 0.002*length[idx];
                return Number(r.toFixed(3));
            });
            
            var sigma = mu.map(function(ele, idx, arr) {
                var r = 0;
                for (var i = 0; i <= idx; i++) {
                    r += mu[i];
                }
                
                return -Number(r.toFixed(3));
            });
            
            var p = sigma.map(function(ele, idx, arr) {
                var r = p0 * Math.exp(ele);
                
                return Number(r.toFixed(0));
            });
            
            if (col == 1) {
                return alpha[row];
            } else if (col == 2) {
                return mu[row];
            } else if (col == 3) {
                return sigma[row];
            } else if (col == 4) {
                return p[row];
            } else {
                return false;
            }
        },
        
        start: function(e) {
            $(e.target).css("display", "none");
            $(e.target).closest(".section").find("section:first-of-type").css("display", "block");
            createSlider();
        },
        
        part1: function(e) {
            $(e.target).css("display", "none");
            $(e.target).closest("section").next("section").css("display", "block");
            
            var e = ([10, 25].random(0)) * 10;
            
            prob.e = e;
            window.plot.keypoint[1].moveTo([window.plot.keypoint[1].X(), -e]);
            window.plot.keypoint[1].setAttribute({fixed: true});
            
            var atot = this.alpha(prob.span);
            var pi = 4520 * (1 - 0.2*(atot + 0.01*prob.span));
            
            prob.pi = Number(pi.toFixed(0));
            prob.pj = 4520;
        },
        
        part2: function(e) {
            var in1 = getPrecision($("#pi").val(), 0, 'n');
            
            if (Math.abs(in1 - prob.pi) <= 1) {
                $("#pi").prop("disabled", true);
                
                $(e.target).next("span").css("color", "red").html("");
                $(e.target).css("display", "none");
                $(e.target).closest("section").next("section").css("display", "block");
                
                prob.pi = in1;
            } else {
                $(e.target).next("span").css("color", "red").html("&nbsp;&nbsp;&nbsp;Incorrect");
                return;
            }
            
            createPlot();
        },
        
        part3: function(e) {
            $(e.target).hide().after("You have completed this module.");
        },
        
        tab2: function(e) {
            $(e.target).css("display", "none");
            $(e.target).closest(".section").find("section:first-of-type").css("display", "block");
            showPoints();
            partition();
            
            $("#calculation").find("input").on("keypress", function(ev) {
                if (ev.keyCode == 13) {
                    $(ev.target).css("background-color", "white");
                    var col = Number($(ev.target).closest("td").attr("data-col"));
                    var row = Number($(ev.target).closest("tr").attr("data-seg"));
                    
                    var ans = vm.checkTable(row, col);
                    
                    if (col == 4) {
                        var in1 = $(ev.target).val();
                        in1 = (in1 == "") ? NaN : Number(Number(in1).toFixed(3));
                        
                        if (Math.abs(in1 - ans) < 2) {
                            $(ev.target).prop("disabled", true).css("background", "#FFF8DC").val(ans.toString());
                        } else {
                            $(ev.target).prop("disabled", false).css("background", "red");
                        }
                    } else {
                        var in1 = $(ev.target).val();
                        in1 = (in1 == "") ? NaN : Number(Number(in1).toFixed(3));
                        
                        if (Math.abs(in1 - ans) < 0.01) {
                            $(ev.target).prop("disabled", true).css("background", "#FFF8DC").val(ans.toString());
                        } else {
                            $(ev.target).prop("disabled", false).css("background", "red");
                        }
                    }
                    
                    var allCorrect = (($("#calculation").find("input").filter(":not([disabled])").length) == 0);
                    
                    if (allCorrect) {
                        vm.tab2_2(e);
                    }
                }
            });
        },
        
        tab2_2: function(e) {
            $(e.target).closest(".section").find("section:nth-of-type(2)").css("display", "block");
            plotLoss();
        },
        
        debug: function(e) {
            $("#calculation").find("input").each(function(idx, ele) {
                var col = Number($(ele).closest("td").attr("data-col"));
                var row = Number($(ele).closest("tr").attr("data-seg"));
                
                var ans = vm.checkTable(row, col);
                $(ele).val(ans.toString());
            });
            
            $("#calculation").find("input").each(function(idx, ele) {
                $(ele).prop("disabled", true).css("background", "#FFF8DC");
            });
            
            $("#debug").closest(".section").find("section:nth-of-type(2)").css("display", "block");
            plotLoss();
        }
    }
});