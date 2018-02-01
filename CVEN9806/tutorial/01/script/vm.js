var prob = new Model();

var vm = new Vue({
    el: "#myapp",
    
    data: {
        prob: prob,
        d2: 5
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
            
            $("<p>Step 1.</p>").appendTo($("#step1"));
        }
    }
});