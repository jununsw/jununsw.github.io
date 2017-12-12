function Problem() {
    this.width = 1200;
    this.span = 4;
    this.diameter = 7;
    this.live = 6;
    this.loss = 0.2;
    this.cover = 20;
    
    this.fc = 32;
    this.fcp = 32;
    this.fp = 1700;
    this.break = 65.5;
    
    this.assumption = {};
}

Problem.prototype.selfWeight = function(depth) {
    // depth in mm, self weight in kn/m
    depth = this.assumption.depth ? this.assumption.depth : depth;
    
    return depth / 1000 * this.width * 24;
}

Problem.prototype.assumeDepth = function(depth) {
    // push an asumption of depth in assumption
    this.assumption["depth"] = depth;
}