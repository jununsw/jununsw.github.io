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
            r /= this.prob.b + this.prob.d1 + this.d2;
            r /= this.prob.l + this.prob.d1 + this.d2;
            
            var r1 = Number((r + r0).toFixed(2));
            
            return r1;
        }
    },
    
    methods: {
        
    }
});