var bmd = new (function() {
    this.x1 = 1;
    this.x2 = 2;
    this.getY1 = function() {
        return (3 - this.d1);
    };
    this.getY2 = function() {
        return (3 - this.d2);
    };
    this.getR1 = function() {
        return (24 - this.getR2());
    };
    this.getR2 = function() {
        return (4 * (this.x1 + this.x2));
    };
    this.getM1 = function() {
        if (this.x1 <= this.x2) {
            return (this.getR1() * this.x1);
        } else {
            return (this.getR2() * (3 - this.x1));
        }
    };
    this.getM2 = function() {
        if (this.x2 <= this.x1) {
            return (this.getR1() * this.x2);
        } else {
            return (this.getR2() * (3 - this.x2));
        }
    }
})();

var scaleM = 120 / 18;
var scaleL = 600 / 3;

function onchange() {
    var x1 = Number((Number($("#rp1").val()) / 100).toFixed(2));
    var x2 = Number((Number($("#rp2").val()) / 100).toFixed(2));
    $("#labelp1").html(x1.toString() + " m");
    $("#labelp2").html(x2.toString() + " m");
    
    // update model
    bmd.x1 = x1;
    bmd.x2 = x2;
    
    // change force arrow
    var d1 = "M " + (x1 * scaleL).toFixed(2) + " 145 l -10 -20 10 20 10 -20 -10 20 0 -120";
    var d2 = "M " + (x2 * scaleL).toFixed(2) + " 145 l -10 -20 10 20 10 -20 -10 20 0 -120";
    $("#p1").attr("d", d1);
    $("#p2").attr("d", d2);
    $("#vp1").attr("x", (x1*scaleL - 40).toFixed(2)).html(bmd.getM1().toFixed(2) + "kNm");
    $("#vp2").attr("x", (x2*scaleL - 40).toFixed(2)).html(bmd.getM2().toFixed(2) + "kNm");
    
    // draw bmd
    var point1 = bmd.getM1();
    var point2 = bmd.getM2();
    
    var dm = "M 0 150 l 200 80 200 0 L 600 150";
    
    if (x1 <= x2) {  // p1 on the left
        dm = "M 0 150 l " + (x1 * scaleL).toFixed(2) + " " + (point1 * scaleM).toFixed(2) + " " + ((x2 - x1) * scaleL).toFixed(2) + " " + ((point2 - point1) * scaleM).toFixed(2) + " L 600 150";
    } else {
        dm = "M 0 150 l " + (x2 * scaleL).toFixed(2) + " " + (point2 * scaleM).toFixed(2) + " " + ((x1 - x2) * scaleL).toFixed(2) + " " + ((point1 - point2) * scaleM).toFixed(2) + " L 600 150";
    }
    
    $("#moment").attr("d", dm);
}