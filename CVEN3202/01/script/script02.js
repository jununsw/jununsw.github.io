function prepare_inlet1() {
    var beta = prob.beta
    
    d3.select("#inlet1")
      .append("svg")
      .attr("id", "svg-inlet1")
      .attr("width", 300)
      .attr("height", 300)
      .append("g")
      .attr("id", "inlet1-g")
    
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
    
    g1.append("text")
      .attr("x", 240)
      .attr("y", 60)
      .attr("stroke-width", 0)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("font-family", "Serif")
      .style("font-size", "18px")
      .text("\u03c4");
    
    g1.append("text")
      .attr("x", 200)
      .attr("y", 40)
      .attr("stroke-width", 0)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("font-family", "Sans-serif")
      .style("font-size", "18px")
      .text("\u03c3\u1d00");
    
    g1.append("text")
      .attr("x", 260)
      .attr("y", 100)
      .attr("stroke-width", 0)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("font-family", "Sans-serif")
      .style("font-size", "18px")
      .text("\u03c3\u0299");
    
    g1.append("path")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 190 50 l -5 -10 5 10 5 -10 -5 10 0 -40");
    
    g1.append("path")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 250 110 l 10 -5 -10 5 10 5 -10 -5 40 0");
    
    g1.append("line")
      .attr("stroke-width", 1)
      .attr("stroke", "black")
      .attr("stroke-dasharray", "10, 5")
      .attr("fill", "none")
      .attr("x1", 260)
      .attr("x2", 300)
      .attr("y1", 150)
      .attr("y2", 150);

    if (beta > 0) {
        g1.append("path")
          .attr("stroke", "black")
          .attr("fill", "none")
          .attr("stroke-width", 2)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("d", "M 150 60 l 80 0 -10 -5 M 240 150 l 0 -80 5 10 M 230 160 l -80 0 10 5 M 140 70 l 0 80 -5 -10");
        
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
        g1.append("path")
          .attr("stroke", "black")
          .attr("fill", "none")
          .attr("stroke-width", 2)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("d", "M 230 60 l -80 0 10 -5 M 240 70 l 0 80 5 -10 M 150 160 l 80 0 -10 5 M 140 150 l 0 -80 -5 10");
        
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
    })
}