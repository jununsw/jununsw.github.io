var model = new Problem();

var vm = new Vue({
    el: "#myapp",
    
    data: {
        prob: model,
        d: 150  // in mm
    },
    
    computed: {
        z: function() {
            var r = this.prob.b * this.d * this.d / 6;
            
            return Number(r.toExponential(3));
        },
        
        alpha: function() {
            return Number((6 / this.d).toExponential(2));
        },
        
        m0: function() {
            var r = this.prob.b / 1000 * this.d / 1000 * 24;
            r = r * this.prob.span * this.prob.span / 8;
            
            return Number(r.toFixed(2));
        },
        
        mt: function() {
            var r = this.prob.b / 1000 * this.d / 1000 * 24;
            r = (r * 1.2 + this.prob.ll) * this.prob.span * this.prob.span / 8;
            
            return Number(r.toFixed(2));
        },
        
        rmt: function() {
            var r = this.mt;
            
            return Number((this.prob.R * r).toFixed(2));
        },
        
        e_max: function() {
            var r = this.d/2 - this.prob.cover - this.prob.dia/2;
            
            return Number(r.toFixed(1));
        },
        
        e_limit: function() {
            var alpha1 = this.alpha;
            var r = this.prob.R;
            var A = this.prob.b * this.d;

            var alpha = (A * r * this.prob.fti) / (-A*this.prob.ft + alpha1*this.mt*1e6);
            var result = (1 + alpha1) / (alpha1 - alpha*alpha1);
            
            return Number(result.toFixed(1));
        },
        
        zb_min: function() {
            var r = this.mt * 1e6 / (this.prob.ft - (this.prob.R * this.prob.fci));
            
            return Number(r.toExponential(3));
        }
    },
    
    methods: {
        p1: function(e) {
            var nom = 1 * (this.alpha*e - 1);
            var A = this.prob.b * this.d;
            var denom = A * this.prob.fti + this.alpha*this.m0*1e6;
            
            return (nom / denom) * 1e6;
        },
        
        p2: function(e) {
            var nom = 1 * (this.alpha*e + 1);
            var A = this.prob.b * this.d;
            var denom = -A * this.prob.fci + this.alpha*this.m0*1e6;
            
            return (nom / denom) * 1e6;
        },
        
        p3: function(e) {
            var nom = this.prob.R * (this.alpha*e + 1);
            var A = this.prob.b * this.d;
            var denom = -A * this.prob.ft + this.alpha*this.mt*1e6;
            
            return (nom / denom) * 1e6;
        },
        
        p4: function(e) {
            var nom = this.prob.R * (this.alpha*e - 1);
            var A = this.prob.b * this.d;
            var denom = A * this.prob.fc + this.alpha*this.mt*1e6;
            
            return (nom / denom) * 1e6;
        },
        
        p1e: function(e) {
            var nom = 1 * (this.alpha*e - 1);
            var A = this.prob.b * this.d;
            var denom = A * this.prob.fti;
            
            return (nom / denom) * 1e6;
        },
        
        p2e: function(e) {
            var nom = 1 * (this.alpha*e + 1);
            var A = this.prob.b * this.d;
            var denom = -A * this.prob.fci;
            
            return (nom / denom) * 1e6;
        },
        
        toStart: function(e) {
            $(e.target).closest("div").find("section").first().css("display", "block");
            $(e.target).css("display", "none");
            show_handle();
            $("#answer-tabs").tabs();
        },
        
        toFinish: function(e) {
            if (this.toCheckAnswer()) {
                $("#final-result").css("color", "black").show().html("This module is completed. You can close the page at any time.");
                $(e.target).hide();
            } else {
                $("#final-result").css("color", "red").show().html("Your answer is not correct");
            }
        },
        
        toCheckAnswer() {
            var d = Number($("#final-d").val());
            var p = Number($("#final-p").val());
            var e = Number($("#final-e").val());
            var n = Number($("#final-n").val());
            var s = Number($("#final-s").val());
            
            var pp = 1000 / p;
            
            var check_d = (d >= 80) && (d <= 150);
            var check_e = (e > 0) && (e <= (d/2 - 20));
            var check_n = (n * this.prob.R * this.prob.break <= p * 1.2) && (n * this.prob.R * this.prob.break >= p * 0.8);
            var check_s = (s * (n - 1) <= 1200) && (s * (n - 1) >= 800);
            var check_p = (pp >= this.p1e(e)) && (pp >= this.p2e(e)) && (pp <= this.p3(e)) && (pp >= this.p4(e));
            
            if (check_d && check_e && check_n && check_p && check_s) {
                return true;
            } else {
                return false;
            }
        }
    }
});