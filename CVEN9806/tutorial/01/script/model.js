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
    
    return depth / 1000 * this.width / 1000 * 24;
}

Problem.prototype.assumeDepth = function(depth) {
    // push an asumption of depth in assumption
    this.assumption["depth"] = depth;
}

Problem.prototype.mt = function() {
    var w = this.live*1.2 + this.selfWeight();
    var mt = w * this.span * this.span / 8;
    
    return Number(mt.toFixed(3));
}

Problem.prototype.fti = function() {
    var fti = 0.25 * Math.sqrt(this.fc);
    
    return Number(fti.toFixed(3));
}

Problem.prototype.ft = function() {
    var ft = 0.25 * Math.sqrt(this.fc);
    
    return Number(ft.toFixed(3));
}

Problem.prototype.fci = function() {
    var fci = -0.5 * this.fc;
    
    return Number(fci.toFixed(3));
}

Problem.prototype.zbmin = function() {
    var zbmin = this.mt() * 1e6 / (this.ft() - (1 - this.loss)*this.fci());
    
    return Number(zbmin.toExponential(3));
}

Problem.prototype.z = function(depth) {
    depth = this.assumption.depth ? this.assumption.depth : depth;
    var z = this.width * depth * depth / 6;
    
    return Number(z.toExponential(3));
}

Problem.prototype.pi = function() {
    var a = this.width * this.assumption.depth / 1e6;  // mm^2 -> m^2
    var r = 1 - this.loss;  // dimenisonless
    
    var mt = this.mt() * 1000 // kN/m -> N/m
    var z = this.z() / 1e9 // mm^3 -> m^3
    var ft = this.ft() * 1e6; // MPa -> Pa
    var fti = this.fti() * 1e6; // MPa -> Pa
    
    var pi = -a * (r*fti*z - mt + ft*z) / r / (z+z);
    
    return Number((pi / 1000).toFixed(0));
}

Problem.prototype.n = function() {
    return Math.ceil(this.pi() / (1 - this.loss) / this.break);
}

Problem.prototype.s = function() {
    var s = this.width / this.n();
    
    return Number(s.toExponential(1));
}

/**
 * MAGNEL'S DIAGRAM
 */

Problem.prototype.e = function() {
    var a = this.width * this.assumption.depth / 1e6;  // mm^2 -> m^2
    var r = 1 - this.loss;  // dimenisonless
    
    var mt = this.mt() * 1000 // kN/m -> N/m
    var z = this.z() / 1e9 // mm^3 -> m^3
    var ft = this.ft() * 1e6; // MPa -> Pa
    var fti = this.fti() * 1e6; // MPa -> Pa
    
    var e = (-mt*z + ft*z*z - r*fti*z*z) / a / (r*fti*z - mt + ft*z);
    
    return Number((e * 1000).toFixed(2));
}

Problem.prototype.alpha = function() {
    return this.width * this.assumption.depth / this.z();
}

Problem.prototype.m0 = function() {
    var w = this.selfWeight();
    var mt = w * this.span * this.span / 8;
    
    return Number(mt.toFixed(3));
}

