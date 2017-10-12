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
    var a_ok = (a >= -1000) && (a <= 1000);
    var b_ok = (b >= -1000) && (b <= 1000);
    var tau_ok = (tau >= -1000) && (tau <= 1000);
    
    if ((a_ok) && (b_ok) && (tau_ok) && (beta_ok)) {
        prob = new makeModel(a, b, tau, beta);
        
        if (prob.r == 0) {
            $("#after-draw").css("color", "red").html("You have a hydrostatic condition, in which the Mohr's cricle is a point. Please re-try another stress condition!");
        } else {
            rotate_block(beta);
            scale_arrow(a, b, tau);

            $("#beta").val(beta.toString()).prop("disabled", true).prop("background-color", "white");
            $("#a").val(a.toString()).prop("disabled", true).prop("background-color", "white");
            $("#b").val(b.toString()).prop("disabled", true).prop("background-color", "white");
            $("#tau").val(tau.toString()).prop("disabled", true).prop("background-color", "white");

            prepare_mohr();
            apply_mohr();
            prepare_inlet1();
            prepare_inlet2();

            $("#after-draw").hide();
            $(e.target).hide();
        }
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
    
    if (a > 0) {
        d3.select("#path-sa1")
          .attr("d", "M 245 230 l -5 -10 5 10 5 -10 -5 10 0 " + (-length[0]).toString());
        d3.select("#path-sa2")
          .attr("d", "M 245 320 l -5 10 5 -10 5 10 -5 -10 0 " + length[0].toString());
    } else if (a < 0) {
        d3.select("#path-sa1")
          .attr("d", "M 245 230 l 0 " + (-length[0]).toString() + " -5 10 5 -10 5 10 -5 -10");
        d3.select("#path-sa2")
          .attr("d", "M 245 320 l 0 " + length[0].toString() + " -5 -10 5 10 5 -10 -5 10");
    } else {
        $("#path-sa1").attr("opacity", "0");
        $("#path-sa2").attr("opacity", "0");
    }
    
    if (b > 0) {
        d3.select("#path-sb1")
          .attr("d", "M 200 270 l -10 -5 10 5 -10 5 10 -5 " + (-length[1]).toString() + " 0");
        d3.select("#path-sb2")
          .attr("d", "M 290 270 l 10 -5 -10 5 10 5 -10 -5 " + length[1].toString() + " 0");
    } else if (b < 0) {
        d3.select("#path-sb1")
          .attr("d", "M 200 270 l " + (-length[1]).toString() + " 0 10 -5 -10 5 10 5 -10 -5");
        d3.select("#path-sb2")
          .attr("d", "M 290 270 l " + length[1].toString() + " 0 -10 -5 10 5 -10 5 10 -5");
    } else {
        $("#path-sb1").attr("opacity", "0");
        $("#path-sb2").attr("opacity", "0");
    }
    
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
    $("#div-mohr").css("display", "block");
    
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
      .attr("y", 30)
      .attr("stroke-width", 0)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("font-family", "serif")
      .style("font-size", "18px")
      .text("\u03c4 (kPa)");
    
    d3.select("#svg-mohr")
      .append("circle")
      .attr("cx", 420)
      .attr("cy", 250)
      .attr("r", 180)
      .attr("stroke-width", 3)
      .attr("fill", "none")
      .attr("stroke", "black");
    
    d3.select("#svg-mohr")
      .append("circle")
      .attr("cx", 420)
      .attr("cy", 250)
      .attr("r", 3)
      .attr("stroke-width", 3)
      .attr("fill", "black")
      .attr("stroke", "black");
    
    d3.select("#svg-mohr")
      .append("line")
      .attr("stroke-width", 1)
      .attr("stroke", "black")
      .attr("stroke-dasharray", "5, 5")
      .attr("fill", "none")
      .attr("x1", 420)
      .attr("x2", 100)
      .attr("y1", 70)
      .attr("y2", 70);
    
    d3.select("#svg-mohr")
      .append("line")
      .attr("stroke-width", 1)
      .attr("stroke", "black")
      .attr("stroke-dasharray", "5, 5")
      .attr("fill", "none")
      .attr("x1", 420)
      .attr("x2", 100)
      .attr("y1", 430)
      .attr("y2", 430);
    
    d3.select("#svg-mohr")
      .append("circle")
      .attr("cx", 240)
      .attr("cy", 250)
      .attr("r", 5)
      .attr("stroke-width", 3)
      .attr("fill", "black")
      .attr("stroke", "black");
    
    d3.select("#svg-mohr")
      .append("circle")
      .attr("cx", 600)
      .attr("cy", 250)
      .attr("r", 5)
      .attr("stroke-width", 3)
      .attr("fill", "black")
      .attr("stroke", "black");
}

function apply_mohr() {
    d3.select("#svg-mohr")
      .append("text")
      .attr("x", 230)
      .attr("y", 240)
      .attr("text-anchor", "end")
      .attr("stroke-width", 0)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("font-family", "serif")
      .style("font-size", "18px")
      .text(prob.s2.toString());
    
    d3.select("#svg-mohr")
      .append("text")
      .attr("x", 610)
      .attr("y", 240)
      .attr("text-anchor", "start")
      .attr("stroke-width", 0)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("font-family", "serif")
      .style("font-size", "18px")
      .text(prob.s1.toString());
    
    d3.select("#svg-mohr")
      .append("text")
      .attr("x", 90)
      .attr("y", 70)
      .attr("text-anchor", "end")
      .attr("alignment-baseline", "middle")
      .attr("stroke-width", 0)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("font-family", "serif")
      .style("font-size", "18px")
      .text(Math.abs(prob.r).toString());
    
    d3.select("#svg-mohr")
      .append("text")
      .attr("x", 90)
      .attr("y", 430)
      .attr("text-anchor", "end")
      .attr("alignment-baseline", "middle")
      .attr("stroke-width", 0)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("font-family", "serif")
      .style("font-size", "18px")
      .text((-Math.abs(prob.r)).toString());
    
    d3.select("#svg-mohr")
      .append("g")
      .attr("id", "mohr-main");
    
    d3.select("#mohr-main")
      .append("line")
      .attr("stroke-width", 3)
      .attr("stroke", "blue")
      .attr("stroke-dasharray", "10, 5")
      .attr("fill", "none")
      .attr("x1", 240)
      .attr("x2", 600)
      .attr("y1", 250)
      .attr("y2", 250);
    
    (function () {
        var thetad = prob.getTheta() * 2;
        var theta = thetad / 180 * Math.PI;
        var cx = 420;
        var cy = 250;
        var r = 30;
        var end_x = cx - r*Math.cos(theta);
        var end_y = cy - r*Math.sin(theta);
        
        
        if (theta > 0) {
            // point1 above, point2 below
            var d = "M " + (cx - r) + " " + cy + " A " + r + " " + r + " 0 0 1 " + end_x + " " + end_y;
            var d_arrow = "M " + (cx - r) + " " + cy + " l -5 10 5 -10 5 10 -5 -10";
            
            d3.select("#svg-mohr")
              .append("path")
              .attr("stroke", "black")
              .attr("fill", "none")
              .attr("stroke-width", 2)
              .attr("stroke-linejoin", "round")
              .attr("stroke-linecap", "round")
              .attr("d", d);
            
            d3.select("#svg-mohr")
              .append("path")
              .attr("stroke", "black")
              .attr("fill", "none")
              .attr("stroke-width", 2)
              .attr("stroke-linejoin", "round")
              .attr("stroke-linecap", "round")
              .attr("d", d_arrow)
              .attr("transform", "rotate(" + thetad.toString() + " " + cx.toString() + " " + cy.toString() + ")");
            
            d3.select("#svg-mohr")
              .append("text")
              .attr("text-anchor", "middle")
              .attr("x", cx - r - 15)
              .attr("y", cy - 10)
              .attr("stroke-width", 0)
              .attr("fill", "black")
              .attr("stroke", "none")
              .attr("font-family", "Sans-serif")
              .style("font-size", "20px")
              .text("2\u03b8");
            
            // left node is labeled as 1, right node if labed as 2
            d3.select("#mohr-main")
              .append("circle")
              .attr("id", "point-1")
              .attr("cx", 240)
              .attr("cy", 250)
              .attr("r", 10)
              .attr("stroke-width", 0)
              .attr("stroke", "none");
            
            d3.select("#mohr-main")
              .append("circle")
              .attr("id", "point-2")
              .attr("cx", 600)
              .attr("cy", 250)
              .attr("r", 10)
              .attr("stroke-width", 0)
              .attr("stroke", "none");

            d3.select("#mohr-main")
              .append("text")
              .attr("id", "text-1")
              .attr("text-anchor", "middle")
              .attr("alignment-baseline", "middle")
              .attr("x", 215)
              .attr("y", 250)
              .attr("stroke-width", 0)
              .attr("stroke", "none")
              .attr("font-family", "Sans-serif")
              .style("font-size", "20px");

            d3.select("#mohr-main")
              .append("text")
              .attr("id", "text-2")
              .attr("text-anchor", "middle")
              .attr("alignment-baseline", "middle")
              .attr("x", 625)
              .attr("y", 250)
              .attr("stroke-width", 0)
              .attr("stroke", "none")
              .attr("font-family", "Sans-serif")
              .style("font-size", "20px");
            
            d3.select("#text-1").attr("transform", "rotate(" + (-prob.getTheta() * 2).toString() + " 215 250)");
            d3.select("#text-2").attr("transform", "rotate(" + (-prob.getTheta() * 2).toString() + " 625 250)");
            
            if (prob.tau > 0) {
                // A <- 2; B <- 1;
                d3.select("#text-1").attr("id", "text-b").text("B");
                d3.select("#point-1").attr("id", "point-b").attr("fill", "red");
                d3.select("#text-2").attr("id", "text-a").text("A");
                d3.select("#point-2").attr("id", "point-a").attr("fill", "blue");
            } else {
                // A <- 1; B <- 2;
                d3.select("#text-1").attr("id", "text-a").text("A");
                d3.select("#point-1").attr("id", "point-a").attr("fill", "blue");
                d3.select("#text-2").attr("id", "text-b").text("B");
                d3.select("#point-2").attr("id", "point-b").attr("fill", "red");
            }
            
        } else if (theta < 0) {
            
            var d = "M " + (cx - r) + " " + cy + " A " + r + " " + r + " 0 0 0 " + end_x + " " + end_y;
            var d_arrow = "M " + (cx - r) + " " + cy + " l -5 -10 5 10 5 -10 -5 10";
            
            d3.select("#svg-mohr")
              .append("path")
              .attr("stroke", "black")
              .attr("fill", "none")
              .attr("stroke-width", 2)
              .attr("stroke-linejoin", "round")
              .attr("stroke-linecap", "round")
              .attr("d", d);
            
            d3.select("#svg-mohr")
              .append("path")
              .attr("stroke", "black")
              .attr("fill", "none")
              .attr("stroke-width", 2)
              .attr("stroke-linejoin", "round")
              .attr("stroke-linecap", "round")
              .attr("d", d_arrow)
              .attr("transform", "rotate(" + thetad.toString() + " " + cx.toString() + " " + cy.toString() + ")");
            
            d3.select("#svg-mohr")
              .append("text")
              .attr("text-anchor", "middle")
              .attr("x", cx - r - 15)
              .attr("y", cy + 25)
              .attr("stroke-width", 0)
              .attr("fill", "black")
              .attr("stroke", "none")
              .attr("font-family", "Sans-serif")
              .style("font-size", "20px")
              .text("2\u03b8");
            
            // left node is labeled as 1, right node if labed as 2
            d3.select("#mohr-main")
              .append("circle")
              .attr("id", "point-1")
              .attr("cx", 240)
              .attr("cy", 250)
              .attr("r", 10)
              .attr("stroke-width", 0)
              .attr("stroke", "none");
            
            d3.select("#mohr-main")
              .append("circle")
              .attr("id", "point-2")
              .attr("cx", 600)
              .attr("cy", 250)
              .attr("r", 10)
              .attr("stroke-width", 0)
              .attr("stroke", "none");

            d3.select("#mohr-main")
              .append("text")
              .attr("id", "text-1")
              .attr("text-anchor", "middle")
              .attr("alignment-baseline", "middle")
              .attr("x", 215)
              .attr("y", 250)
              .attr("stroke-width", 0)
              .attr("stroke", "none")
              .attr("font-family", "Sans-serif")
              .style("font-size", "20px");

            d3.select("#mohr-main")
              .append("text")
              .attr("id", "text-2")
              .attr("text-anchor", "middle")
              .attr("alignment-baseline", "middle")
              .attr("x", 625)
              .attr("y", 250)
              .attr("stroke-width", 0)
              .attr("stroke", "none")
              .attr("font-family", "Sans-serif")
              .style("font-size", "20px");
            
            d3.select("#text-1").attr("transform", "rotate(" + (-prob.getTheta() * 2).toString() + " 215 250)");
            d3.select("#text-2").attr("transform", "rotate(" + (-prob.getTheta() * 2).toString() + " 625 250)");
            
            if (prob.tau < 0) {
                // A <- 2; B <- 1;
                d3.select("#text-1").attr("id", "text-b").text("B");
                d3.select("#point-1").attr("id", "point-b").attr("fill", "red");
                d3.select("#text-2").attr("id", "text-a").text("A");
                d3.select("#point-2").attr("id", "point-a").attr("fill", "blue");
            } else {
                // A <- 1; B <- 2;
                d3.select("#text-1").attr("id", "text-a").text("A");
                d3.select("#point-1").attr("id", "point-a").attr("fill", "blue");
                d3.select("#text-2").attr("id", "text-b").text("B");
                d3.select("#point-2").attr("id", "point-b").attr("fill", "red");
            }
            
        } else {
            
            d3.select("#svg-mohr")
              .append("text")
              .attr("text-anchor", "middle")
              .attr("x", cx - r - 35)
              .attr("y", cy - 10)
              .attr("stroke-width", 0)
              .attr("fill", "black")
              .attr("stroke", "none")
              .attr("font-family", "Sans-serif")
              .style("font-size", "20px")
              .text("2\u03b8 = 0");
            
            // left node is labeled as 1, right node if labed as 2
            d3.select("#mohr-main")
              .append("circle")
              .attr("id", "point-1")
              .attr("cx", 240)
              .attr("cy", 250)
              .attr("r", 10)
              .attr("stroke-width", 0)
              .attr("stroke", "none");
            
            d3.select("#mohr-main")
              .append("circle")
              .attr("id", "point-2")
              .attr("cx", 600)
              .attr("cy", 250)
              .attr("r", 10)
              .attr("stroke-width", 0)
              .attr("stroke", "none");

            d3.select("#mohr-main")
              .append("text")
              .attr("id", "text-1")
              .attr("text-anchor", "middle")
              .attr("alignment-baseline", "middle")
              .attr("x", 215)
              .attr("y", 250)
              .attr("stroke-width", 0)
              .attr("stroke", "none")
              .attr("font-family", "Sans-serif")
              .style("font-size", "20px");

            d3.select("#mohr-main")
              .append("text")
              .attr("id", "text-2")
              .attr("text-anchor", "middle")
              .attr("alignment-baseline", "middle")
              .attr("x", 625)
              .attr("y", 250)
              .attr("stroke-width", 0)
              .attr("stroke", "none")
              .attr("font-family", "Sans-serif")
              .style("font-size", "20px");
            
            if (prob.a > prob.b) {
                // A <- 2; B <- 1;
                d3.select("#text-1").attr("id", "text-b").text("B");
                d3.select("#point-1").attr("id", "point-b").attr("fill", "red");
                d3.select("#text-2").attr("id", "text-a").text("A");
                d3.select("#point-2").attr("id", "point-a").attr("fill", "blue");
            } else {
                // A <- 1; B <- 2;
                d3.select("#text-1").attr("id", "text-a").text("A");
                d3.select("#point-1").attr("id", "point-a").attr("fill", "blue");
                d3.select("#text-2").attr("id", "text-b").text("B");
                d3.select("#point-2").attr("id", "point-b").attr("fill", "red");
            }
        }
        
    })();
    
    d3.select("#mohr-main").attr("transform", "rotate(" + (prob.getTheta() * 2).toString() + " 420 250)");
    d3.select("#text-a").attr("fill", "blue").attr("font-weight", "bold");
    d3.select("#text-b").attr("fill", "red").attr("font-weight", "bold");
    
    $("#mohr-data ul").append($("<li style='color: blue;'> Point A: (" + prob.a + ", " + (-prob.tau) + ")</li>"))
        .append($("<li style='color: red;'> Point B: (" + prob.b + ", " + prob.tau + ")</li>"))
        .append($("<li style='color: black;'> Center of the Mohr Circle: (" + prob.c + ", 0)</li>"))
        .append($("<li style='color: black;'> Radius of the Mohr Circle: " + prob.r + "</li>"))
        .append($("<li style='color: black;'> In order to plot the Mohr's circle neatly, note the &tau; axis does not cross through the origin. </li>"))
}

function draw_figure() {
    d3.select("#svg-main")
      .append("line")
      .attr("stroke-width", 3)
      .attr("stroke", "blue")
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