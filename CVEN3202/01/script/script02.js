function prepare_inlet1() {
    var beta = prob.beta;
    var a = prob.a;
    var b = prob.b;
    var tau = prob.tau;
    
    d3.select("#inlet1")
      .append("svg")
      .attr("id", "svg-inlet1")
      .attr("width", 300)
      .attr("height", 300)
      .append("g")
      .attr("id", "inlet1-g");
    
    d3.select("#svg-inlet1")
      .append("line")
      .attr("stroke-width", 3)
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("x1", 150)
      .attr("x2", 300)
      .attr("y1", 150)
      .attr("y2", 150);
    
    var g1 = d3.select("#inlet1-g");
    
    g1.append("rect")
      .attr("x", 150)
      .attr("y", 70)
      .attr("width", 80)
      .attr("height", 80)
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("stroke", "black");

    g1.append("line")
      .attr("stroke-width", 1)
      .attr("stroke", "black")
      .attr("stroke-dasharray", "10, 5")
      .attr("fill", "none")
      .attr("x1", 260)
      .attr("x2", 300)
      .attr("y1", 150)
      .attr("y2", 150);
    
    if (a > 0) {
        g1.append("path")
          .attr("stroke", "blue")
          .attr("fill", "none")
          .attr("stroke-width", 2)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("d", "M 190 50 l -5 -10 5 10 5 -10 -5 10 0 -40");
        
        g1.append("text")
          .attr("x", 200)
          .attr("y", 40)
          .attr("stroke-width", 0)
          .attr("fill", "blue")
          .attr("stroke", "white")
          .attr("font-family", "Sans-serif")
          .style("font-size", "18px")
          .text("\u03c3\u1d00");
    } else if (a < 0) {
        g1.append("path")
          .attr("stroke", "blue")
          .attr("fill", "none")
          .attr("stroke-width", 2)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("d", "M 190 50 l 0 -40 -5 10 5 -10 5 10 -5 -10");
        
        g1.append("text")
          .attr("x", 200)
          .attr("y", 40)
          .attr("stroke-width", 0)
          .attr("fill", "blue")
          .attr("stroke", "white")
          .attr("font-family", "Sans-serif")
          .style("font-size", "18px")
          .text("\u03c3\u1d00");
    } else {
        
    }
    
    if (b > 0) {
        g1.append("path")
          .attr("stroke", "red")
          .attr("fill", "none")
          .attr("stroke-width", 2)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("d", "M 250 110 l 10 -5 -10 5 10 5 -10 -5 40 0");
        
        g1.append("text")
          .attr("x", 260)
          .attr("y", 100)
          .attr("stroke-width", 0)
          .attr("fill", "red")
          .attr("stroke", "white")
          .attr("font-family", "Sans-serif")
          .style("font-size", "18px")
          .text("\u03c3\u0299");
    } else if (b < 0) {
        g1.append("path")
          .attr("stroke", "red")
          .attr("fill", "none")
          .attr("stroke-width", 2)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("d", "M 250 110 l 40 0 -5 -10 5 10 -5 10 5 -10");
        
        g1.append("text")
          .attr("x", 260)
          .attr("y", 100)
          .attr("stroke-width", 0)
          .attr("fill", "red")
          .attr("stroke", "white")
          .attr("font-family", "Sans-serif")
          .style("font-size", "18px")
          .text("\u03c3\u0299");
    } else {
        
    }
    
    if (tau > 0) {
        g1.append("path")
          .attr("stroke", "black")
          .attr("fill", "none")
          .attr("stroke-width", 2)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("d", "M 150 60 l 80 0 -10 -5 M 240 150 l 0 -80 5 10 M 230 160 l -80 0 10 5 M 140 70 l 0 80 -5 -10");
        
        g1.append("text")
          .attr("x", 240)
          .attr("y", 60)
          .attr("stroke-width", 0)
          .attr("fill", "black")
          .attr("stroke", "white")
          .attr("font-family", "Serif")
          .style("font-size", "18px")
          .text("\u03c4");
    } else if (tau < 0) {
        g1.append("path")
          .attr("stroke", "black")
          .attr("fill", "none")
          .attr("stroke-width", 2)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("d", "M 230 60 l -80 0 10 -5 M 240 70 l 0 80 5 -10 M 150 160 l 80 0 -10 5 M 140 150 l 0 -80 -5 10");
        
        g1.append("text")
          .attr("x", 240)
          .attr("y", 60)
          .attr("stroke-width", 0)
          .attr("fill", "black")
          .attr("stroke", "white")
          .attr("font-family", "Serif")
          .style("font-size", "18px")
          .text("\u03c4");
    } else {
        
    }

    if (beta > 0) {
        d3.select("#svg-inlet1")
          .append("text")
          .attr("x", 290)
          .attr("y", 145)
          .attr("stroke-width", 0)
          .attr("fill", "black")
          .attr("stroke", "white")
          .attr("font-family", "Sans-serif")
          .style("font-size", "16px")
          .text("\u03b2");
    } else if (beta < 0) {
        d3.select("#svg-inlet1")
          .append("text")
          .attr("x", 290)
          .attr("y", 170)
          .attr("stroke-width", 0)
          .attr("fill", "black")
          .attr("stroke", "white")
          .attr("font-family", "Sans-serif")
          .style("font-size", "16px")
          .text("\u03b2");
    }
    
    g1.attr("transform", "rotate(" + (-beta).toString() +" 150 150)");
    
    $("#btn-in1").on("click", function(e) {
        $(e.target).prop("disabled", true);
        
        $("#inlet1").dialog({
            resizable: false,
            height: 400,
            width: 400,
            position: { 
                my: "left top", 
                at: "left+100 top+100"
            },
            close: function() {
                $("#btn-in1").prop("disabled", false);
            }
        });
    });
}

function prepare_inlet2() {
    var beta = prob.beta;
    
    d3.select("#inlet2")
      .append("svg")
      .attr("id", "svg-inlet2")
      .attr("width", 300)
      .attr("height", 300)
      .append("g")
      .attr("id", "inlet2-g");
    
    d3.select("#svg-inlet2")
      .append("line")
      .attr("stroke-width", 3)
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("x1", 150)
      .attr("x2", 300)
      .attr("y1", 150)
      .attr("y2", 150);
    
    d3.select("#svg-inlet2")
      .append("circle")
      .attr("cx", 150)
      .attr("cy", 150)
      .attr("r", 5)
      .attr("stroke-width", 1)
      .attr("fill", "black")
      .attr("stroke", "black");
    
    if (beta > 0) {
        d3.select("#svg-inlet2")
          .append("text")
          .attr("x", 170)
          .attr("y", 140)
          .attr("text-anchor", "start")
          .attr("alignment-baseline", "baseline")
          .attr("stroke-width", 0)
          .attr("fill", "black")
          .attr("stroke", "white")
          .attr("font-family", "Sans-serif")
          .style("font-size", "18px")
          .text("\u03b2");        
    } else if (beta < 0) {
        d3.select("#svg-inlet2")
          .append("text")
          .attr("x", 170)
          .attr("y", 160)
          .attr("text-anchor", "start")
          .attr("alignment-baseline", "hanging")
          .attr("stroke-width", 0)
          .attr("fill", "black")
          .attr("stroke", "white")
          .attr("font-family", "Sans-serif")
          .style("font-size", "18px")
          .text("\u03b2"); 
    }
    
    var g1 = d3.select("#inlet2-g");
    
    g1.append("line")
      .attr("stroke-width", 3)
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("x1", 10)
      .attr("x2", 290)
      .attr("y1", 150)
      .attr("y2", 150);
    
    g1.append("line")
      .attr("stroke-width", 3)
      .attr("stroke", "red")
      .attr("fill", "none")
      .attr("x1", 10)
      .attr("x2", 290)
      .attr("y1", 150)
      .attr("y2", 150)
      .attr("transform", "rotate(90 150 150)");
    
    g1.append("text")
      .attr("x", 295)
      .attr("y", 145)
      .attr("text-anchor", "end")
      .attr("stroke-width", 0)
      .attr("fill", "blue")
      .attr("stroke", "white")
      .attr("font-family", "Sans-serif")
      .style("font-size", "14px")
      .text("A-direction");
    
    g1.append("text")
      .attr("x", 5)
      .attr("y", 145)
      .attr("text-anchor", "start")
      .attr("stroke-width", 0)
      .attr("fill", "red")
      .attr("stroke", "white")
      .attr("font-family", "Sans-serif")
      .style("font-size", "14px")
      .text("B-direction")
      .attr("transform", "rotate(90 150 150)");
    
    g1.attr("transform", "rotate(" + (-beta).toString() +" 150 150)");
    
    $("#btn-in2").on("click", function(e) {
        $(e.target).prop("disabled", true);
        
        $("#inlet2").dialog({
            resizable: false,
            height: 400,
            width: 400,
            position: { 
                my: "right top", 
                at: "right-100 top+100"
            },
            close: function() {
                $("#btn-in2").prop("disabled", false);
            }
        });
    });
}