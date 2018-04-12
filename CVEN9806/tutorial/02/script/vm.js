var prob = new Model(15, 350);

var vm = new Vue({
    el: "#myapp",
    data: {
        prob: prob,
        e: 700
    },
    computed: {
        slope0: function() {
            return 4 * (-prob.e / 1000 / prob.span);
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
            partition();
            
            $("#calculation").find("input").on("keypress", function(ev) {
                if (ev.keyCode == 13) {
                    $(ev.target).css("background-color", "white");
                    var col = Number($(ev.target).closest("td").attr("data-col"));
                    var seg = Number($(ev.target).closest("tr").attr("data-seg"));
                    
                    if (col == 1) {
                        var ans = vm.e * 2 / 20 / 1000;
                        
                        var in1 = $(ev.target).val();
                        in1 = (in1 == "") ? NaN : Number(Number(in1).toFixed(3));
                        
                        if (Math.abs(in1 - ans) < 0.1) {
                            $(ev.target).prop("disabled", true).css("background", "#FFF8DC").val(ans.toString());
                        } else {
                            $(ev.target).prop("disabled", false).css("background", "red");
                        }
                    } else if (col == 2) {
                        var alpha = vm.e * 2 / 20 / 1000;
                        var ans = Number((alpha*0.2 + 0.002*10).toFixed(3));
                        
                        var in1 = $(ev.target).val();
                        in1 = (in1 == "") ? NaN : Number(Number(in1).toFixed(3));
                        
                        if (Math.abs(in1 - ans) < 0.1) {
                            $(ev.target).prop("disabled", true).css("background", "#FFF8DC").val(ans.toString());
                        } else {
                            $(ev.target).prop("disabled", false).css("background", "red");
                        }
                    } else if (col == 3) {
                        var alpha = vm.e * 2 / 20 / 1000;
                        var ans = Number((-(alpha*0.2 + 0.002*10) * seg).toFixed(3));
                        
                        var in1 = $(ev.target).val();
                        in1 = (in1 == "") ? NaN : Number(Number(in1).toFixed(3));
                        
                        if (Math.abs(in1 - ans) < 0.1) {
                            $(ev.target).prop("disabled", true).css("background", "#FFF8DC").val(ans.toString());
                        } else {
                            $(ev.target).prop("disabled", false).css("background", "red");
                        }
                    } else if (col == 4) {
                        var alpha = vm.e * 2 / 20 / 1000;
                        var ans = Number((Math.exp(-(alpha*0.2 + 0.002*10) * seg) * 3906).toFixed(0));
                        
                        var in1 = $(ev.target).val();
                        in1 = (in1 == "") ? NaN : Number(Number(in1).toFixed(0));
                        
                        if (Math.abs(in1 - ans) < 2) {
                            $(ev.target).prop("disabled", true).css("background", "#FFF8DC").val(ans.toString());
                        } else {
                            $(ev.target).prop("disabled", false).css("background", "red");
                        }
                    } else {
                        
                    }
                    
                    // check if all correct
                    var allCorrect = (($("#calculation").find("input").filter(":not([disabled])").length) == 0);
                    
                    if (allCorrect) {
                        vm.last();
                    }
                }
            });
        },
        
        last: function(e) {
            $("#last").show();
            
            $("#p-value").html(((3609 - Number($("#pb").val())) / 10).toFixed(1) + " kN/m");
            
            $("#final").on("keypress", function(ev) {
                if (ev.keyCode == 13) {
                    
                }
            });
        }
    }
});