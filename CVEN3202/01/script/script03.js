// button information
var btn_info = {
    pole: ""
}

function point_rotate(x, y, cx, cy, ang) {
    // rotate a point about (cx, cy) with an angle
    // x, y, cx, cy are coordiate of svg (y axis downward)
    // ang: clock-wise is positive
    // return: array of new [x, y]
    
    // tranform into Cartesian coordinate:
    y = -y;
    cy = -cy;
    ang = -ang;
    
    var rad = ang / 180 * Math.PI;
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);
    
    dx = x - cx;
    dy = y - cy;
    
    dxp = dx * cos - dy * sin;
    dyp = dx * sin + dy * cos;
    
    xp = cx + dxp;
    yp = cy + dyp;
    
    return [xp, -yp];
}

function show_pole() {
    // center of the circle: 420 250, radius: 180
    var cx = 420;
    var cy = 250;
    
    var ang = prob.getTheta() * 2;
    
    // coordinate of point A
    var ax = Number(d3.select("#point-a").attr("cx"));
    var ay = Number(d3.select("#point-a").attr("cy"));
    
    var pa = point_rotate(ax, ay, cx, cy, ang);
    
    ax = pa[0];
    ay = pa[1];
    
    // coordinate of point B
    var bx = Number(d3.select("#point-b").attr("cx"));
    var by = Number(d3.select("#point-b").attr("cy"));
    
    var pb = point_rotate(bx, by, cx, cy, ang);
    
    bx = pb[0];
    by = pb[1];
    
    // create pole group
    d3.select("#svg-mohr")
      .append("g")
      .attr("id", "g-pole");
    
    // draw two indicate line
    var ia = "M " + ax.toString() + " " + ay.toString() + " l -50 0 m 50 0 l 50 0";
    var ib = "M " + bx.toString() + " " + by.toString() + " l 0 -50 m 0 50 l 0 50";
    
    d3.select("#g-pole")
      .append("path")
      .attr("stroke-width", 2)
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("d", ia);
    
    d3.select("#g-pole")
      .append("path")
      .attr("stroke-width", 2)
      .attr("stroke", "red")
      .attr("fill", "none")
      .attr("d", ib);
    
    // draw two lines
    var da = "M " + ax.toString() + " " + ay.toString() + " l -360 0 m 360 0 l 360 0";
    var db = "M " + bx.toString() + " " + by.toString() + " l 0 -360 m 0 360 l 0 720";
    
    d3.select("#g-pole")
      .append("path")
      .attr("id", "pole-a")
      .attr("stroke-width", 1)
      .attr("stroke", "blue")
      .attr("stroke-dasharray", "10, 5")
      .attr("fill", "none")
      .attr("d", da)
      .attr("transform", "rotate(" + (-prob.beta).toString() + " " + ax.toString() + " " + ay.toString() + ")");
    
    d3.select("#g-pole")
      .append("path")
      .attr("id", "pole-b")
      .attr("stroke-width", 1)
      .attr("stroke", "red")
      .attr("stroke-dasharray", "10, 5")
      .attr("fill", "none")
      .attr("d", db)
      .attr("transform", "rotate(" + (-prob.beta).toString() + " " + bx.toString() + " " + by.toString()+ ")");
    
    // obtain and draw pole point
    var pole_x = bx;
    var pole_y = ay;
    
    var pole = point_rotate(pole_x, pole_y, cx, cy, -2 * prob.beta);
    
    pole_x = pole[0];
    pole_y = pole[1];
    
    prob.pole_x = pole_x;
    prob.pole_y = pole_y;
    
    d3.select("#g-pole")
      .append("circle")
      .attr("cx", pole_x)
      .attr("cy", pole_y)
      .attr("r", 3)
      .attr("stroke-width", 3)
      .attr("fill", "black")
      .attr("stroke", "black");
    
    // show inlet 2
    if ($("#btn-in2").prop("disabled") == false) {
        $("#btn-in2").trigger("click");
    } else {
        $("#inlet2").dialog("close");
        $("#btn-in2").trigger("click");
    }
    
    // toggle this button
    $("#btn-pole").off("click");
    $("#btn-pole").on("click", function() {
        // since pole is created, button event only need to show / hide it
    });
}