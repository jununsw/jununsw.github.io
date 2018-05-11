var vm = new Vue({
    el: "#myapp",
    data: {
        prob: {
            width: 300,
            height: 800,
            
            pe: 1000,
            
            ap: 500,  // area of pre-stress steel
            as: 450,  // area of one conventional steel bar
            
            n_top: 0,
            n_btm: 0,
            
            gamma: 0.82,
            
            fc: 32,  // compressive limit for concrete
            fpy: 1560,    // yielding stress for pre-stress steel
            fsy: 500,  // yielding stress for conventional steel
            
            eps_s: 0.0025,  // yielding strain for conventional steel
            eps_p: 0.0082,  // yielding strain for pre-stress steel
            
            ec: 28600,  // young's modulus for concrete
            ep: 195000,  // young's modulus for prestress steel
            es: 200000,  // young's modulus for conventional steel
            
            sigma_e: 1000,
            
            cover: 50,  // distance from botton to the lower edge of last row of conventional steel
            dp: 675,  // distance from top to the centroid of tendon
            
            dn: 191.45
        },
        
        test: {
            inValid: false,
            dp: 0,
            c1: 0,
            c2: 0,
            cs: 0,
            ts1: 0,
            ts2: 0,
            tp: 0,
            isCorrect: false
        }
    },
    
    computed: {
        d: function() {
            function quad(A, B, C) {
                var delta = B*B - 4*A*C;
                if (delta < 0) {
                    return [NaN, NaN];
                } else {
                    return [(-B + Math.sqrt(delta)) / 2 / A, (-B - Math.sqrt(delta)) / 2 / A];
                }
            }
            
            var a = this.prob.gamma * 0.85 * this.prob.fc * this.prob.width;
            var c = this.prob.as * this.prob.n_top * this.prob.es * 0.003 * (-this.prob.cover);
            var b = this.prob.as * this.prob.n_top * this.prob.es * 0.003 - (this.prob.as*this.prob.n_btm*this.prob.fsy + this.prob.ap*this.prob.fpy);
            
            r = quad(a, b, c);
            
            var dd = ((r[0] > 0) || (r[0] < vm.prob.height)) ? r[0] : r[1];
            
            return Number(dd.toFixed(2));
        },
        
        f_top: function() {
            var r = this.prob.es * 0.003 / this.d * (this.d - this.prob.cover);
            return Number(r.toFixed(1));
        },
        
        s_p: function() {
            var pe = 1000 / this.prob.ep;
            var ce = this.prob.pe * 1000 * (1 + 275*275/240/240) / this.prob.ec / this.prob.width / this.prob.height;
            var cp = 0.003 * (this.prob.dp - this.d) / this.d;

            return (Number((pe + ce + cp).toExponential(3)));
        },
        
        s_s: function() {
            var r = 0.003 / this.d * (this.prob.height - this.prob.cover - this.d);
            return Number(r.toExponential(3));
        },
        
        mu: function() {
            var r = 0;
            
            var offset = this.prob.gamma * this.d / 2;
            
            var tp = this.prob.fpy * this.prob.ap / 1000;  // in kN
            var ts = this.prob.fsy * this.prob.as * this.prob.n_btm / 1000  // in kN
            
            var estop = 0.003 * (this.d - 50) / this.d;
            var cs = this.prob.es * estop * this.prob.as * this.prob.n_top / 1000;  // in kN
            
            r += cs * (offset - this.prob.cover) / 1000;
            r += tp * (this.prob.dp - offset) / 1000;
            r += ts * (this.prob.height - this.prob.cover - offset) / 1000;
            
            return Number(r.toFixed(1));
        },
        
        test_mu: function() {
            var r = 0;
            
            var r1 = ((0.77 * this.test.dp) > 300) ? 300 : (0.77 * this.test.dp);
            r1 /= 2;
            
            var r2 = ((0.77 * this.test.dp) > 300) ? (0.77*this.test.dp - 300) : 0;
            r2 = (r2 == 0) ? 0 : r2/2 + 300;
            
            r += this.test.tp * (2000 - 300);
            r += this.test.ts1 * (2000 - 100);
            r += this.test.ts2 * (2000 - 200);
            
            r -= this.test.cs * 100;
            r -= this.test.c1 * r1;
            r -= this.test.c2 * r2;
            
            return r / 1000;
        }
    },
    
    methods: {
        start: function(e) {
            $(e.target).hide();
            $("#ready").hide();
            $(e.target).next("section").show();
            $("select").prop("disabled", true).css("background-color", "#d3d3d3");
            createStress("svg-stress");
        },
        
        step2: function(e) {
            $(e.target).hide();
            $(e.target).closest("section").next("section").show();
        },
        
        step3: function(e) {
            $(e.target).hide();
            $(e.target).closest("section").next("section").show();
        },
        
        part2: function(e) {
            $(e.target).hide();
            $("#test-ready").hide();
            $(e.target).next("section").show();
            window.scrollTo(0,document.body.scrollHeight);
            
            plotDp();
        }
    }
});