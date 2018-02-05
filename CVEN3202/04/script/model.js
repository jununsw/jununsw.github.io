class Model {
    constructor() {
        this.gs = 2.7;
        this.d1 = 2
        this.d2 = 5;
        this.d3 = 2;
        
        this.omega = 57.5;
        
        this.boundingbox = [-2, 2, 11, -11];
        
        this.plot = {};
        this.chart = {};
        
        this.q = 40;
        this.b = 5;
        this.l = 5;
        
        this.gamma1 = 20;
        this.gamma2 = 16;
        
        this.cc = 0.7;
        this.cr = 0.2;
        
        this.sigma0 = (function(gamma1, gamma2, d1, d2) {
            var r = gamma1*d1 + gamma2*d2/2 - d2/2*9.8;
            
            r = Number(r.toFixed(2));
            
            return r;
        })(this.gamma1, this.gamma2, this.d1, 4);
        
        this.sigma1 = (function(gamma1, gamma2, d1, d2, q, b, l) {
            var r0 = gamma1*d1 + gamma2*d2/2 - d2/2*9.8;
            
            var r = q * b * l;
            r /= b + d1 + d2/2;
            r /= l + d1 + d2/2;
            
            var r1 = Number((r + r0).toFixed(2));
            
            return r1;
        })(this.gamma1, this.gamma2, this.d1, 4, this.q, this.b, this.l);
        
        this.pc = [this.sigma0, this.sigma1].random(0);
        
        var s0 = (function(gamma1, gamma2, d1, d2) {
            var r = gamma1*d1 + gamma2*d2/2 - d2/2*9.8;
            
            r = Number(r.toFixed(2));
            
            return r;
        })(this.gamma1, this.gamma2, this.d1, 5);
        
        if (Math.abs(this.pc - s0) < 1) {
            this.pc = [this.sigma0, this.sigma1].random(0);
        }
    }
}