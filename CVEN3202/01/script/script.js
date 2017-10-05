function makeModel(a, b, tau, beta) {
    this.a = a;
    this.b = b;
    this.tau = tau;
    this.beta = beta;
    
    this.c = getPrecision(((this.a + this.b) / 2).toString(), 3, "n");
    this.r = getPrecision((Math.pow(Math.pow((this.a - this.b) / 2), 2) + Math.pow(this.tau, 2), 0.5).toString(), 3, "n");
    this.s1 = getPrecision((this.c + this.r).toString(), 3, "n");
    this.s2 = getPrecision((this.c - this.r).toString(), 3, "n");
    
    this.getTheta = function() {
        var tan2theta = this.tau / (this.a - this.b);
        var radian2theta = Math.atan(tan2theta);
        var deg2theta = radian2theta / math.PI * 180;
        
        return getPrecision((deg2theta / 2).toString(), 3, "n");
    };
    
    this.getLineLength = function(boxSize) {
        var max = Math.max(this.a, this.b, this.tau);
        var lst = [this.a / max * boxSize, this.b / max * boxSize, this.tau / max * boxSize];
        
        return lst.map(function(ele) {
            return math.max(ele, 20);
        });
    }
}

function draw_mohr(e) {
    var beta = getPrecision($("#beta").val(), 2, "n");
    
    if ((beta > 90) || (beta < -90)) {
        $("#after-draw").css("color", "red").html("Your input is not valid");
    } else {
        rotate_block(beta);
    }
}

function rotate_block(ang) {
    d3.select("#svg-block")
      .attr("transform", "rotate(" + (-ang).toString() + " 100 300)");
    
    var dx = 20 - 20 * Math.cos(ang * (Math.PI / 180));
    var dy = 20 * Math.sin(ang * (Math.PI / 180));
    
    d3.select("#beta-arc")
      .attr("d", "M 120 300 a 20 20 0 0 0 " + (-dx).toString() + " " + (-dy).toString());
}

function draw_figure() {
    d3.select("#svg-main")
      .append("line")
      .attr("stroke-width", 3)
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("x1", 100)
      .attr("x2", 350)
      .attr("y1", 300)
      .attr("y2", 300);
    
    d3.select("#svg-main")
      .append("text")
      .attr("x", 300)
      .attr("y", 320)
      .attr("stroke-width", 0)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("font-family", "Sans-serif")
      .style("font-size", "14px")
      .text("horizontal");
    
    d3.select("#svg-main")
      .append("path")
      .attr("id", "beta-arc")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 120 300 a 20 20 0 0 0 -2.68 -10")
    
    d3.select("#svg-main")
      .append("g")
      .attr("id", "svg-block");
    
    d3.select("#svg-block")
      .append("line")
      .attr("stroke-width", 3)
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("x1", 100)
      .attr("x2", 350)
      .attr("y1", 300)
      .attr("y2", 300);
    
    d3.select("#svg-block")
      .append("rect")
      .attr("x", 220)
      .attr("y", 250)
      .attr("width", 50)
      .attr("height", 50)
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("stroke", "black");
    
    d3.select("#svg-block")
      .append("path")
      .attr("id", "path-tau1")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 245 240 l -25 0 50 0 -10 -5 10 5 -10 5 10 -5");
    
    d3.select("#svg-block")
      .append("path")
      .attr("id", "path-tau2")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 245 310 l 25 0 -50 0 10 -5 -10 5 10 5 -10 -5");
    
    d3.select("#svg-block")
      .append("path")
      .attr("id", "path-tau3")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 210 275 l 0 -25 0 50 -5 -10 5 10 5 -10 -5 10");
    
    d3.select("#svg-block")
      .append("path")
      .attr("id", "path-tau4")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 280 275 l 0 25 0 -50 -5 10 5 -10 5 10 -5 -10");
    
    d3.select("#svg-block")
      .append("path")
      .attr("id", "path-sa1")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 245 230 l -5 -10 5 10 5 -10 -5 10 0 -50");
    
    d3.select("#svg-block")
      .append("path")
      .attr("id", "path-sa2")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 245 320 l -5 10 5 -10 5 10 -5 -10 0 50");
    
    d3.select("#svg-block")
      .append("path")
      .attr("id", "path-sb1")
      .attr("stroke", "red")
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 200 270 l -10 -5 10 5 -10 5 10 -5 -50 0");
    
    d3.select("#svg-block")
      .append("path")
      .attr("id", "path-sb2")
      .attr("stroke", "red")
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 290 270 l 10 -5 -10 5 10 5 -10 -5 50 0");
    
    d3.select("#svg-block")
      .attr("transform", "rotate(-30 100 300)");
}