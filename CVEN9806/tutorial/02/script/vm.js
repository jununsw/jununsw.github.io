var prob = new Model(15, 350);

var vm = new Vue({
    el: "#myapp",
    data: {
        prob: prob
    },
    computed: {
        slope0: function() {
            return 2 * (-4 * (-prob.e) / prob.span / prob.span) * (0 - prob.span/2) / 100;
        }
    },
    methods: {
        displacement: function(x) {
            return ((-4 * (-prob.e) / prob.span / prob.span) * Math.pow(x - prob.span/2, 2) - prob.e) / 100;
        },
        
        slope: function(x) {
            return (2 * (-4 * (-prob.e) / prob.span / prob.span) * (x - prob.span/2)) / 100;
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
            
        }
    }
});