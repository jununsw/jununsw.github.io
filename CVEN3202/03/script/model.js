class Model {
    constructor() {
        this.ymax = 100;
        this.xmin = 0.0001;
        this.xmax = 100;
        this.boundingbox = [-4.5, 110, 2.5, -10];
        
        this.controlX = [-3.8, -3.5/3 - 1*2/3, -1, 1.5/3 - 1*2/3, 1.8];
        
        this.pl = 0;
        this.ll = 0;
        
        this.result = {};
        this.plot = {};
    }
}