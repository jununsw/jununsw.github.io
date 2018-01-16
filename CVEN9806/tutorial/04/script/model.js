class Model {
    constructor(wf, hf, ww, hw, d0) {
        this.wf = wf;
        this.hf = hf;
        this.ww = ww;
        this.hw = hw;
        
        this.d0 = d0;
        
        this.span = 40;
        this.load = 22;
        
        this.fcp = 40;
        this.fc = 40;
        this.fsy = 500;
        
        this.es = 2e5;
        
        this.as = 1880;
        this.ap = 5428;
        
        this.pt = 7738;
        this.pe = 6500;
        
        this.duct = 140;
        
        this.check = 1;
    }
    
    get a() {  // total area
        return this.wf*this.hf*2 + this.ww*this.hw;
    }
    
    get sw() {  // self weight
        return this.a / 1e6 * 24;
    }
    
    get w() {  // total load
        var result = 1.2*this.sw + 1.5*this.load;
        
        return Number(result.toFixed(0));
    }
    
    get vmax() {
        return this.w * this.span / 2;
    }
    
    get mmax() {
        return this.w * this.span * this.span / 8;
    }
    
    get v() {  // factored designed shear force
        return this.vmax - this.w*this.check;
    }
    
    get m() {  // factored designed moment
        return this.vmax*this.check - this.w*this.check*this.check/2
    }
    
    y(x) {  // displacement of tendon
        var e = this.hw / 2;
        var l = this.span * 1000;
        var result = 4 * e * (x*1000/l - Math.pow(x*1000/l, 2));
        
        return Number(result.toFixed(2));
    }
    
    y_p(x) {  // slope of tendon
        var e = this.hw / 2;
        var l = this.span * 1000;
        var result = 4 * e / l * (1 - 2*x*1000/l);
        
        return Number(result.toFixed(4));
    }
    
    pv(x) {  // vertical component of pe
        var result = this.pe * this.y_p(x);
        
        return Number(result.toFixed(0));
    }
    
    /**
     * CHECKING SHEAR CRACKING AT X
     */
    get i() {  // second moment of inertia
        var result = this.wf * Math.pow(2*this.hf + this.hw, 3) / 12;
        result -= (this.wf - this.ww) * Math.pow(this.hw, 3) / 12;
        
        return Number(result.toExponential(4));
    }
    
    m0(x) {
        var e = this.y(x);
        x *= 1000;
        var zb = this.i / x;
        
        var result = zb * (this.pe*1000/this.a + this.pe*1000*e/zb);
        
        return Number((result / 1e6).toFixed(1));
    }
    
    v0(x) {
        var m0 = this.m0(x);
        
        var result = m0 * this.v / this.m;
        
        return Number(result.toFixed(1));
    }
}