class Model {
    constructor() {
        this.ymax = 100;
        this.xmin = 0.0001;
        this.xmax = 100;
        this.boundingbox = [-4.5, 110, 2.5, -10];
        
        this.controlX = [-3.8, -3.5/3 - 1*2/3, -1, 1.5/3 - 1*2/3, 1.8];
        
        this.ll = Number((Math.random() * 100).toFixed(0));
        this.pl = Number((Math.random() * 60).toFixed(0)) + this.ll;
        
        this.result = [];
        this.plot = {};
        
        this.final = function() {
            if (this.result.length == 1) {
                return this.result[0];
            } else if (this.result.length == 2) {
                return this.result[0] + this.result[1];
            } else if (this.result.length == 3) {
                return this.result[0] + this.result[1] + "-" + this.result[2];
            } else {
                return "";
            }
        }
    }
}