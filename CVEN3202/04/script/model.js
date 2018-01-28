class Model {
    constructor() {
        var bank = [54, 56];
        
        this.gs = 2.7;
        this.d1 = 2
        this.d2 = 5;
        this.d3 = 2;
        
        this.boundingbox = [-1, 2, 11, -11];
        
        this.plot = {};
        
        this.q = 1000;
        this.b = 1;
        this.l = 1;
        
        this.gamma1 = 20;
        this.gamma2 = 16;
        
        this.cc = 0.5;
        this.cr = 0.2;
        this.pc = bank[Math.random() * bank.length >> 0];
    }
}