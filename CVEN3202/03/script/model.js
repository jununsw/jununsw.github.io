// pl upper bound: y = 0.9*(x-8)
// pl lower bound: y = 0.003*x*x -0.1183*x+2.2485

class Model {
    constructor() {
        function getPi(ll) {
            var r;
            
            if (ll < 16) {
                var r = [4, 7].random(0);
            } else if (ll < 30) {
                var max = upper(ll);
                var r = [4, max].random(0);
            } else {
                var max = upper(ll);
                var min = lower(ll);
                var r = [min, max].random(0);
            }
            
            while (((r >= 4) && (r <= 7)) || (r >= 59)) {
                if (ll < 16) {
                    var r = [4, 7].random(0);
                } else if (ll < 30) {
                    var max = upper(ll);
                    var r = [4, max].random(0);
                } else {
                    var max = upper(ll);
                    var min = lower(ll);
                    var r = [min, max].random(0);
                }              
            }
            
            return Number(r.toFixed(0));
        }
        
        var upper = function(x) {return 0.9 * (x - 8);};
        var lower = function(x) {return 0.003*x*x -0.1183*x+2.2485;};
        
        this.ymax = 100;
        this.xmin = 0.0001;
        this.xmax = 100;
        this.boundingbox = [-5, 110, 2.5, -12];
        
        this.controlX = [-3.8, -3.5/3 - 1*2/3, -1, 1.5/3 - 1*2/3, 1.8];
        
        this.ll = Number((Math.random() * 100).toFixed(0));
        
        var pi = getPi(this.ll);
        
        this.pl = pi + this.ll;
        
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