// button information
var btn_info = {
    pole: "",
    theta2: "<p>&theta; can be calculate as:</p><p>&nbsp;&nbsp;&nbsp;tan 2&theta; = 2&tau; / (&sigma;<sub>A</sub> - &sigma;<sub>B</sub>)</p><p>Therefore:</p><p>&nbsp;&nbsp;&nbsp;2&theta; = <span id='theta-2'></span>&deg;, &nbsp;&nbsp;&nbsp;&theta; = <span id='theta-1'></span>&deg;</p><p>Note: 2&theta; will be between -90&deg; to 90&deg;</p>",
    stress: "<p>centre: (&sigma;<sub>c</sub>, 0), &sigma;<sub>c</sub> = (&sigma;<sub>1</sub> + &sigma;<sub>3</sub>) / 2, and</p><p>Radius: R<sup>2</sup> = ((&sigma;<sub>1</sub> - &sigma;<sub>3</sub>) / 2)<sup>2</sup> + &tau;<sup>2</sup>, so</p><ul><li>&sigma;<sub>1</sub> = &sigma;<sub>c</sub> + R</li><li>&sigma;<sub>3</sub> = &sigma;<sub>c</sub> - R</li></ul><p>&sigma;<sub>1</sub> and &sigma;<sub>3</sub> are shown in the Mohr's Circle</p>",
    principal: "<p>Please select the following three options to calculate principal stress and direction:</p>&nbsp;&nbsp;&nbsp;<button id='btn-usingA' class='btn btn-info btn-sm btn-postproc'>Using direction A</button><button id='btn-usingB' class='btn btn-info btn-sm btn-postproc'>Using direction B</button><button id='btn-usingPole' class='btn btn-info btn-sm btn-postproc'>Using Pole</button><div style='margin-top: 20px;' id='info-principal'></div>"
}

function clear_previous_btn() {
    // clear what has shown for the previous button events (svg group and div info)
    if (prob.flag.pole == true) {
        $("#g-pole").attr("opacity", "0");
    }
    
    $(".group-useA").attr("opacity", "0");
    $(".group-useB").attr("opacity", "0");
    $(".group-usePole").attr("opacity", "0");
    $(".group-stress").attr("opacity", "0");
    $("#btn-info").html("");
    
    try {
        $("#inlet2").dialog("close");
    } catch (e) {
        
    }
}

function connect_line(x1, y1, x2, y2, offset1, offset2, svg_tag) {
    // add an svg line element connecting (x1, y1) and (x2, y2) with offset (additional length) on each side to the svg_tag using d3, and return this
    // if offset1 and offset2 are negative, line is shorter
    var l = Math.pow((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2), 0.5);
    var sin = Math.abs(y2 - y1) / l;
    var cos = Math.abs(x2 - x1) / l;
    
    if (x1 < x2) {
        if (y1 < y2) {
            var ax = x1 - offset1*cos;
            var ay = y1 - offset1*sin;
            var bx = x2 + offset2*cos;
            var by = y2 + offset2*sin;
        } else {
            var ax = x1 - offset1*cos;
            var ay = y1 + offset1*sin;
            var bx = x2 + offset2*cos;
            var by = y2 - offset2*sin;
        }
    } else {
        if (y1 < y2) {
            var ax = x1 + offset1*cos;
            var ay = y1 - offset1*sin;
            var bx = x2 - offset2*cos;
            var by = y2 + offset2*sin;
        } else {
            var ax = x1 + offset1*cos;
            var ay = y1 + offset1*sin;
            var bx = x2 - offset2*cos;
            var by = y2 - offset2*sin;
        }
    }
    
    return d3.select(svg_tag).append("line")
             .attr("x1", ax)
             .attr("x2", bx)
             .attr("y1", ay)
             .attr("y2", by);
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
    clear_previous_btn();
    
    // if pole has already plotted but hidden, show them
    if (prob.flag.pole == true) {
        $("#g-pole").attr("opacity", "1");
    } else {
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

        // obtain and draw pole point
        var pole_x = bx;
        var pole_y = ay;

        var pole = point_rotate(pole_x, pole_y, cx, cy, -2 * prob.beta);

        pole_x = pole[0];
        pole_y = pole[1];

        prob.pole_x = pole_x;
        prob.pole_y = pole_y;
        
        // draw two lines
        connect_line(ax, ay, pole_x, pole_y, 40, 40, "#g-pole")
            .attr("stroke-width", 2)
            .attr("stroke", "blue")
            .attr("stroke-dasharray", "2, 2")
            .attr("fill", "none");
        
        connect_line(bx, by, pole_x, pole_y, 40, 40, "#g-pole")
            .attr("stroke-width", 2)
            .attr("stroke", "red")
            .attr("stroke-dasharray", "2, 2")
            .attr("fill", "none");

        // draw the pole point
        d3.select("#g-pole")
          .append("circle")
          .attr("cx", pole_x)
          .attr("cy", pole_y)
          .attr("r", 3)
          .attr("stroke-width", 3)
          .attr("fill", "black")
          .attr("stroke", "black");
        
        prob.flag.pole = true;
    }

    // show inlet 2
    if ($("#inlet2").dialog("isOpen")) {
        
    } else {
        $("#btn-in2").trigger("click");
    }
}

function calculate_theta() {
    clear_previous_btn();
    $("#btn-info").html(btn_info.theta2);
    $("#theta-2").html((prob.getTheta() * 2).toFixed(2));
    $("#theta-1").html((prob.getTheta() * 1).toFixed(2));
}

function calculate_stress() {
    clear_previous_btn();
    $("#btn-info").html(btn_info.stress);
    
    if (prob.flag.stress == true) {
        $("#g-stress").attr("opacity", "1");
    } else {
        prob.flag.stress = true;
        
        // write sigma 1 and 3
        d3.select("#svg-mohr")
          .append("g")
          .attr("id", "g-stress")
          .attr("class", "group-stress");
        
        d3.select("#g-stress")
          .append("text")
          .attr("x", 230)
          .attr("y", 260)
          .attr("font-weight", "bold")
          .attr("text-anchor", "end")
          .attr("alignment-baseline", "hanging")
          .attr("stroke-width", 0)
          .attr("fill", "black")
          .attr("stroke", "white")
          .attr("font-family", "serif")
          .style("font-size", "22px")
          .text("\u03c33");
        
        d3.select("#g-stress")
          .append("text")
          .attr("x", 610)
          .attr("y", 260)
          .attr("font-weight", "bold")
          .attr("text-anchor", "start")
          .attr("alignment-baseline", "hanging")
          .attr("stroke-width", 0)
          .attr("fill", "black")
          .attr("stroke", "white")
          .attr("font-family", "serif")
          .style("font-size", "22px")
          .text("\u03c31");
    }
}

function show_principal() {
    clear_previous_btn();
    $("#btn-info").html(btn_info.principal);
    
    $("#btn-usingA").click(principal_A);
    $("#btn-usingB").click(principal_B);
    $("#btn-usingPole").click(principal_Pole);
}

function clear_principal() {
    $("#info-principal").html("");
    $(".group-useA").attr("opacity", "0");
    $(".group-useB").attr("opacity", "0");
    $(".group-usePole").attr("opacity", "0");
    $(".group-stress").attr("opacity", "0");
}

function principal_A() {
    clear_principal();
    if (prob.flag.useA == false) {
        prob.flag.useA = true;
        
        var ax = prob.xa();
        var ay = prob.ya();
        
        var text_red;
        var text_blue;
        
        if (ay == 250) {
            // tau == 0
            if (prob.xb() < prob.xa()) {
                // only left arc (red)
                d3.select("#svg-mohr")
                  .append("g")
                  .attr("id", "g-useA")
                  .attr("class", "group-useA");
                  
                d3.select("#g-useA")
                  .append("path")
                  .attr("stroke", "red")
                  .attr("fill", "none")
                  .attr("opacity", 1)
                  .attr("stroke-width", 5)
                  .attr("stroke-linejoin", "round")
                  .attr("stroke-linecap", "round")
                  .attr("d", path_arcByEnd(ax, ay, 420, 250, 180));
                
                text_red = " 180\u00b0";
                text_blue = " 0\u00b0";
            } else {
                // only right part
                d3.select("#svg-mohr")
                  .append("g")
                  .attr("id", "g-useA")
                  .attr("class", "group-useA");
                  
                d3.select("#g-useA")
                  .append("path")
                  .attr("stroke", "blue")
                  .attr("fill", "none")
                  .attr("opacity", 1)
                  .attr("stroke-width", 5)
                  .attr("stroke-linejoin", "round")
                  .attr("stroke-linecap", "round")
                  .attr("d", path_arcByEnd(ax, ay, 420, 250, -180));
                
                text_red = " 0\u00b0";
                text_blue = " 180\u00b0";
            }
        } else if (ay > 250) {
            // A below a axis
            var theta = Math.abs(prob.getTheta());
            
            if (ax >= 420) {
                d3.select("#svg-mohr")
                  .append("g")
                  .attr("id", "g-useA")
                  .attr("class", "group-useA");

                d3.select("#g-useA")
                  .append("path")
                  .attr("stroke", "red")
                  .attr("fill", "none")
                  .attr("opacity", 1)
                  .attr("stroke-width", 5)
                  .attr("stroke-linejoin", "round")
                  .attr("stroke-linecap", "round")
                  .attr("d", path_arcByEnd(ax, ay, 420, 250, 180 - 2*theta));

                d3.select("#g-useA")
                  .append("path")
                  .attr("stroke", "blue")
                  .attr("fill", "none")
                  .attr("opacity", 1)
                  .attr("stroke-width", 5)
                  .attr("stroke-linejoin", "round")
                  .attr("stroke-linecap", "round")
                  .attr("d", path_arcByEnd(ax, ay, 420, 250, -2*theta));
                
                text_red = " 180-2\u03b8";
                text_blue = " 2\u03b8";
            } else {
                d3.select("#svg-mohr")
                  .append("g")
                  .attr("id", "g-useA")
                  .attr("class", "group-useA");

                d3.select("#g-useA")
                  .append("path")
                  .attr("stroke", "red")
                  .attr("fill", "none")
                  .attr("opacity", 1)
                  .attr("stroke-width", 5)
                  .attr("stroke-linejoin", "round")
                  .attr("stroke-linecap", "round")
                  .attr("d", path_arcByEnd(ax, ay, 420, 250, 2*theta));

                d3.select("#g-useA")
                  .append("path")
                  .attr("stroke", "blue")
                  .attr("fill", "none")
                  .attr("opacity", 1)
                  .attr("stroke-width", 5)
                  .attr("stroke-linejoin", "round")
                  .attr("stroke-linecap", "round")
                  .attr("d", path_arcByEnd(ax, ay, 420, 250, -180 + 2*theta));
                
                text_red = " 2\u03b8";
                text_blue = " 180-2\u03b8";
            }
        } else {
            // A above a axis
            var theta = Math.abs(prob.getTheta());
            
            if (ax >= 250) {
                d3.select("#svg-mohr")
                  .append("g")
                  .attr("id", "g-useA")
                  .attr("class", "group-useA");

                d3.select("#g-useA")
                  .append("path")
                  .attr("stroke", "red")
                  .attr("fill", "none")
                  .attr("opacity", 1)
                  .attr("stroke-width", 4)
                  .attr("stroke-linejoin", "round")
                  .attr("stroke-linecap", "round")
                  .attr("d", path_arcByEnd(ax, ay, 420, 250, -180 + 2*theta));

                d3.select("#g-useA")
                  .append("path")
                  .attr("stroke", "blue")
                  .attr("fill", "none")
                  .attr("opacity", 1)
                  .attr("stroke-width", 4)
                  .attr("stroke-linejoin", "round")
                  .attr("stroke-linecap", "round")
                  .attr("d", path_arcByEnd(ax, ay, 420, 250, 2*theta));
                
                text_red = " 180-2\u03b8";
                text_blue = " 2\u03b8";
            } else {
                d3.select("#svg-mohr")
                  .append("g")
                  .attr("id", "g-useA")
                  .attr("class", "group-useA");

                d3.select("#g-useA")
                  .append("path")
                  .attr("stroke", "red")
                  .attr("fill", "none")
                  .attr("opacity", 1)
                  .attr("stroke-width", 4)
                  .attr("stroke-linejoin", "round")
                  .attr("stroke-linecap", "round")
                  .attr("d", path_arcByEnd(ax, ay, 420, 250, -2*theta));

                d3.select("#g-useA")
                  .append("path")
                  .attr("stroke", "blue")
                  .attr("fill", "none")
                  .attr("opacity", 1)
                  .attr("stroke-width", 4)
                  .attr("stroke-linejoin", "round")
                  .attr("stroke-linecap", "round")
                  .attr("d", path_arcByEnd(ax, ay, 420, 250, 180 - 2*theta));
                
                text_red = " 2\u03b8";
                text_blue = " 180-2\u03b8";
            }
        }
    } else {
        $("#g-useA").attr("opacity", "1");
    }
    
    if (prob.flag.stress == true) {
        $("#g-stress").attr("opacity", "1");
    } else {
        prob.flag.stress = true;
        
        // write sigma 1 and 3
        d3.select("#svg-mohr")
          .append("g")
          .attr("id", "g-stress")
          .attr("class", "group-stress");
        
        d3.select("#g-stress")
          .append("text")
          .attr("x", 230)
          .attr("y", 260)
          .attr("font-weight", "bold")
          .attr("text-anchor", "end")
          .attr("alignment-baseline", "hanging")
          .attr("stroke-width", 0)
          .attr("fill", "black")
          .attr("stroke", "white")
          .attr("font-family", "serif")
          .style("font-size", "22px")
          .text("\u03c33");
        
        d3.select("#g-stress")
          .append("text")
          .attr("x", 610)
          .attr("y", 260)
          .attr("font-weight", "bold")
          .attr("text-anchor", "start")
          .attr("alignment-baseline", "hanging")
          .attr("stroke-width", 0)
          .attr("fill", "black")
          .attr("stroke", "white")
          .attr("font-family", "serif")
          .style("font-size", "22px")
          .text("\u03c31");
    }
    
    d3.select("#g-useA")
      .append("text")
      .attr("x", 600)
      .attr("y", 430)
      .attr("text-anchor", "start")
      .attr("alignment-baseline", "hanging")
      .attr("stroke-width", 0)
      .attr("fill", "red")
      .attr("stroke", "white")
      .style("font-size", "18px")
      .text("Red Arc:" + text_red);
    
    d3.select("#g-useA")
      .append("text")
      .attr("x", 600)
      .attr("y", 460)
      .attr("text-anchor", "start")
      .attr("alignment-baseline", "hanging")
      .attr("stroke-width", 0)
      .attr("fill", "blue")
      .attr("stroke", "white")
      .style("font-size", "18px")
      .text("Blue Arc:" + text_blue);
    
    $("#info-principal").html("Two arcs moving from point A to &sigma;<sub>1</sub> and &sigma;<sub>3</sub> are plotted");
    
    // plotting on inlet 1
    
    
    // plotting on inlet 2
}

function principal_B() {
    
}

function principal_Pole() {
    clear_principal();
    
    if (prob.flag.pole == false) {
        $("#info-principal").html("Please click the 'Show Pole' to plot the pole first");
    } else {
        
    }
}