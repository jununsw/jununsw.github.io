var prob;

function makeModel(a, b, tau, beta) {
    this.a = a;
    this.b = b;
    this.tau = tau;
    this.beta = beta;
    
    this.c = getPrecision(((this.a + this.b) / 2).toString(), 3, "n");
    
    var x1 = (this.a - this.b) / 2;
    var x2 = this.tau;
    var x3 = x1*x1 + x2*x2;
    var x4 = Math.pow(x3, 0.5);
    this.r = getPrecision(x4.toString(), 3, "n");
    
    this.s1 = getPrecision((this.c + this.r).toString(), 3, "n");
    this.s2 = getPrecision((this.c - this.r).toString(), 3, "n");
    
    this.getTheta = function() {
        var tan2theta = this.tau / (this.a - this.b);
        var radian2theta = Math.atan(tan2theta);
        var deg2theta = radian2theta / Math.PI * 180;
        
        return getPrecision((deg2theta / 2).toString(), 3, "n");
    };
    
    this.getLineLength = function(boxSize) {
        var max = Math.max(this.a, this.b, Math.abs(this.tau));
        var lst = [this.a / max * boxSize, this.b / max * boxSize, this.tau / max * boxSize];
        
        return lst.map(function(ele) {
            return Math.max(ele, 20);
        });
    }
}

function draw_mohr(e) {
    var beta = getPrecision($("#beta").val(), 0, "n");
    var a = getPrecision($("#a").val(), 0, "n");
    var b = getPrecision($("#b").val(), 0, "n");
    var tau = getPrecision($("#tau").val(), 0, "n");
    
    var beta_ok = (beta >= -90) && (beta <= 90);
    var a_ok = (a >= 1) && (a <= 1000);
    var b_ok = (b >= 1) && (b <= 1000);
    var tau_ok = (tau >= -1000) && (tau <= 1000);
    
    if ((a_ok) && (b_ok) && (tau_ok) && (beta_ok)) {
        prob = new makeModel(a, b, tau, beta);
        rotate_block(beta);
        scale_arrow(a, b, tau);
        
        $("#beta").val(beta.toString()).prop("disabled", true).prop("background-color", "white");
        $("#a").val(a.toString()).prop("disabled", true).prop("background-color", "white");
        $("#b").val(b.toString()).prop("disabled", true).prop("background-color", "white");
        $("#tau").val(tau.toString()).prop("disabled", true).prop("background-color", "white");
        
        prepare_mohr();
        apply_mohr();
        
        $("#after-draw").hide();
        $(e.target).after("<br/><br/><br/>Mohr's Circle is plotted as follows").hide();
        
    } else {
        $("#after-draw").css("color", "red").html("Your input is not valid");
    }
}

function rotate_block(ang) {
    d3.select("#svg-block")
      .attr("transform", "rotate(" + (-ang).toString() + " 100 300)");
    
    var dx = 20 - 20 * Math.cos(ang * (Math.PI / 180));
    var dy = 20 * Math.sin(ang * (Math.PI / 180));
    
    var dir = ang > 0 ? 0 : 1;
    
    d3.select("#beta-arc")
      .attr("d", "M 120 300 a 20 20 0 0 " + dir.toString() + " " + (-dx).toString() + " " + (-dy).toString());
    
    d3.select("#text-beta")
      .text("\u03b2 = " + ang.toString() + "\u00b0");
    
    if (ang < 0) {
        d3.select("#text-beta").attr("y", 315);
    }
}

function scale_arrow(a, b, tau) {
    var length = prob.getLineLength(50);
    var ltau = length[2];
    
    d3.select("#path-sa1")
      .attr("d", "M 245 230 l -5 -10 5 10 5 -10 -5 10 0 " + (-length[0]).toString());
    
    d3.select("#path-sa2")
      .attr("d", "M 245 320 l -5 10 5 -10 5 10 -5 -10 0 " + length[0].toString());
    
    d3.select("#path-sb1")
      .attr("d", "M 200 270 l -10 -5 10 5 -10 5 10 -5 " + (-length[1]).toString() + " 0");
    
    d3.select("#path-sb2")
      .attr("d", "M 290 270 l 10 -5 -10 5 10 5 -10 -5 " + length[1].toString() + " 0");
    
    if (tau == 0) {
        $("#path-tau1").attr("opacity", "0");
        $("#path-tau2").attr("opacity", "0");
        $("#path-tau3").attr("opacity", "0");
        $("#path-tau4").attr("opacity", "0");
    } else if (tau > 0) {
        d3.select("#path-tau1")
          .attr("d", "M 245 240 l " + (-ltau / 2).toString() + " 0 " + (ltau).toString() + " 0 -10 -5 10 5 -10 5 10 -5");
        d3.select("#path-tau2")
          .attr("d", "M 245 310 l " + (ltau / 2).toString() + " 0 " + (-ltau).toString() + " 0 10 -5 -10 5 10 5 -10 -5");
        d3.select("#path-tau3")
          .attr("d", "M 210 275 l 0 " + (-ltau / 2).toString() + " 0 " + (ltau).toString() + " -5 -10 5 10 5 -10 -5 10");
        d3.select("#path-tau4")
          .attr("d", "M 280 275 l 0 " + (ltau / 2).toString() + " 0 " + (-ltau).toString() + " -5 10 5 -10 5 10 -5 -10");
    } else {
        ltau = -ltau;
        
        d3.select("#path-tau1")
          .attr("d", "M 245 240 l " + (-ltau / 2).toString() + " 0 " + (ltau).toString() + " 0 10 -5 -10 5 10 5 -10 -5");
        d3.select("#path-tau2")
          .attr("d", "M 245 310 l " + (ltau / 2).toString() + " 0 " + (-ltau).toString() + " 0 -10 -5 10 5 -10 5 10 -5");
        d3.select("#path-tau3")
          .attr("d", "M 210 275 l 0 " + (-ltau / 2).toString() + " 0 " + (ltau).toString() + " -5 10 5 -10 5 10 -5 -10");
        d3.select("#path-tau4")
          .attr("d", "M 280 275 l 0 " + (ltau / 2).toString() + " 0 " + (-ltau).toString() + " -5 -10 5 10 5 -10 -5 10");
    }
}

function prepare_mohr() {
    $("#svg-mohr").css("display", "block");
    
    d3.select("#svg-mohr")
      .append("path")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("stroke-width", 4)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 50 250 l 700 0 -20 -10 20 10 -20 10 20 -10");
    
    d3.select("#svg-mohr")
      .append("path")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("stroke-width", 4)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 100 250 l 0 230 0 -460 -10 20 10 -20 10 20 -10 -20");
    
    d3.select("#svg-mohr")
      .append("text")
      .attr("x", 700)
      .attr("y", 280)
      .attr("stroke-width", 0)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("font-family", "serif")
      .style("font-size", "18px")
      .text("\u03c3 (kPa)");
    
    d3.select("#svg-mohr")
      .append("text")
      .attr("x", 30)
      .attr("y", 50)
      .attr("stroke-width", 0)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("font-family", "serif")
      .style("font-size", "18px")
      .text("\u03c4 (kPa)");
    
    (function() {
        var lx = 600;
        var centre = prob.c;
        var radius = prob.r;
    })();
}

function apply_mohr() {
    
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
      .append("text")
      .attr("id", "text-beta")
      .attr("x", 130)
      .attr("y", 295)
      .attr("stroke-width", 0)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("font-family", "Sans-serif")
      .style("font-size", "14px")
      .text("\u03b2");
    
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
      .append("text")
      .attr("x", 250)
      .attr("y", 210)
      .attr("stroke-width", 0)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("font-family", "Sans-serif")
      .style("font-size", "16px")
      .text("\u03c3\u1d00");
    
    d3.select("#svg-block")
      .append("text")
      .attr("x", 320)
      .attr("y", 265)
      .attr("stroke-width", 0)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("font-family", "Sans-serif")
      .style("font-size", "16px")
      .text("\u03c3\u0299");
    
    d3.select("#svg-block")
      .append("text")
      .attr("x", 280)
      .attr("y", 240)
      .attr("stroke-width", 0)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("font-family", "Serif")
      .style("font-size", "16px")
      .text("\u03c4");
    
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