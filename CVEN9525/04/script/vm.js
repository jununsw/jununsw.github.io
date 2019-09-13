var prob = new Model();

var vm = new Vue({
    el: "#myapp",
    
    data: {
        prob: prob,
        d2: 5,
        delta_e: 0
    },
    
    computed: {
        sigma_0: function() {
            var r = this.prob.gamma1*this.prob.d1 + this.prob.gamma2*this.d2/2 - this.d2/2*9.8;
            
            r = Number(r.toFixed(2));
            
            return r;
        },
        
        sigma_delta: function() {
            var r = this.prob.q * this.prob.b * this.prob.l;
            r /= this.prob.b + this.prob.d1 + this.d2;
            r /= this.prob.l + this.prob.d1 + this.d2;
            r = Number(r.toFixed(2));
            
            return r;
        },
        
        sigma_f: function() {
            var r0 = this.prob.gamma1*this.prob.d1 + this.prob.gamma2*this.d2/2 - this.d2/2*9.8;
            
            var r = this.prob.q * this.prob.b * this.prob.l;
            r /= this.prob.b + this.prob.d1 + this.d2/2;
            r /= this.prob.l + this.prob.d1 + this.d2/2;
            
            var r1 = Number((r + r0).toFixed(2));
            
            return r1;
        },
        
        text_compare: function() {
            if (this.sigma_0 <= prob.pc) {
                return "σ\'0 < σ\'pc";
            } else {
                return "σ\'0 = σ\'pc";
            }
        },
        
        e0: function() {
            if (this.prob.pc > 50) {
                var r = (this.prob.oedometer['100'] - this.prob.oedometer['50']) / 50 * (this.prob.pc - 50) + this.prob.oedometer['50'];
                
                return Number(r.toFixed(4));
            } else {
                var r = (this.prob.oedometer['50'] - this.prob.oedometer['25']) / 25 * (this.prob.pc - 25) + this.prob.oedometer['25'];
                
                return Number(r.toFixed(4));
            }
        },
        
        result: function() {
            return Number((this.delta_e / (1 + this.prob.omega / 100 * this.prob.gs) * this.d2 * 1000).toFixed(2))
        }
    },
    
    methods: {
        start: function(e) {
            $("#title").show();
            $(e.target).hide();
            
            prob.plot.dash.forEach(function(ele, idx, arr) {
                ele.setAttribute({visible: true});
            });
            
            $("#question").css("font-size", "16px").accordion({
                collapsible: true,
                active: false
            });
            
            prob.plot.triangle = prob.plot.brd.create('polygon', [[8.5, -3], [9, -3], [9, -4]], {
                fillColor: 'transparent',
                highlight: false,
                fixed: true
            });

            prob.plot.triangle.vertices.forEach(function(ele) {
                ele.setAttribute({
                    visible: false
                });
            });

            prob.plot.triangle.borders.forEach(function(ele) {
                ele.setAttribute({
                    strokeColor: 'black',
                    strokeWidth: 1,
                    highlight: false,
                    fixed: true
                });
            });
            
            // prob.plot.middle_point.setAttribute({visible: true});
            $("#step1").show();
        },
        
        step2: function(e) {
            $("#title1").show();
            $(e.target).hide();
            
            $("#answer1").css("font-size", "16px").accordion({
                collapsible: true,
                active: false
            });
            
            $("#step2").show();
            plot_chart('soil-chart', vm.prob.pc, vm.prob.cr, vm.prob.cc, vm.prob.omega);
        },
        
        e: function(p) {
            if (p >= this.prob.pc) {
                var diff = Math.log10(p) - Math.log10(this.prob.pc);
                var de = diff * this.prob.cc;
                var r = this.e0 - de;
                
                return Number(r.toFixed(4));
            } else {
                var diff = Math.log10(this.prob.pc) - Math.log10(p);
                var de = diff * this.prob.cr;
                var r = this.e0 + de;
                
                return Number(r.toFixed(4));
            }
        }
    }
});
