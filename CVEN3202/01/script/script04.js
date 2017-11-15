// Script for rotating Mohr's circle

// draw coordinate
function draw_coordinate() {  // invoked immediately after prob is created
    var a = prob.a;
    var b = prob.b;
    var tau = prob.tau;
    var r = prob.r;
    var c = prob.c;
    
    var minX = c - r - 0.2*r;
    var maxX = c + r + 0.2*r;
    
    var minY = -r - 0.2*r;
    var maxY = r + 0.2*r;
    
    JXG.Options.text.fontSize = 16;
    
    var board= JXG.JSXGraph.initBoard('coord', {
            boundingbox: [minX, maxY, maxX, minY],
            axis: true,
            showNavigation: false,
            keepaspectratio: true,
            showCopyright: false});
    
    var o = board.create('point', [c, 0], {name: 'O', color: 'black', fixed: true, size: 1});
    var z2 = board.create('point', [c + r, 0], {name: 'O', color: 'black', fixed: true, visible: false});
    var z1 = board.create('point', [c - r, 0], {name: 'O', color: 'black', fixed: true, visible: false});
    var circle = board.create('circle', [o, z2], {fixed: true, strokeColor: 'black', strokeWidth: 3, highlight: false});
    
    var pa_fixed = board.create('glider', [a, -tau, circle], {name: 'A', face:'[]', size: 3, color: 'blue', fixed: true});
    var pb_fixed = board.create('point', [b, tau], {name: 'B', face:'[]', size: 3, color: 'red', fixed: true});
    var l_fixed = board.create('line', [pa_fixed, pb_fixed], {straightFirst: false, straightLast: false, strokeColor: "black", strokeWidth: 1, dash:2});
    
    var pa = board.create('glider', [a, -tau, circle], {name: 'A\'', size: 4, color: 'blue'});
    var pb = board.create('point', [b, tau], {name: 'B\'', size: 4, color: 'red', fixed: true});
    var l = board.create('line', [pa, pb], {straightFirst: false, straightLast: false, strokeColor: "black", strokeWidth: 2});
    
    var pole = board.create('point', prob.getPole(), {name: 'Pole', size: 3, color: 'black', fixed: true});
    
    var l1 = board.create('line', [pa, pole], {straightFirst: false, straightLast: false, strokeColor: "blue", dash: 1, strokeWidth: 1});
    var l2 = board.create('line', [pb, pole], {straightFirst: false, straightLast: false, strokeColor: "red", dash: 1, strokeWidth: 1});
    
    var start_point = board.create('point', [function() {
                if (pa.X() <= o.X()) {
                    if (pa.Y() >= 0) {
                        return pa.X();
                    } else {
                        return z1.X()
                    }
                } else {
                    if (pb.Y() >= 0) {
                        return pb.X();
                    } else {
                        return z1.X();
                    }
                }
            }, function() {
                if (pa.X() <= o.X()) {
                    if (pa.Y() >= 0) {
                        return pa.Y();
                    } else {
                        return z1.Y()
                    }
                } else {
                    if (pb.Y() >= 0) {
                        return pb.Y();
                    } else {
                        return z1.Y();
                    }
                }
            }], {name: 'start', visible: false});
    
    var end_point = board.create('point', [function() {
                if (pa.X() <= o.X()) {
                    if (pa.Y() < 0) {
                        return pa.X();
                    } else {
                        return z1.X()
                    }
                } else {
                    if (pb.Y() < 0) {
                        return pb.X();
                    } else {
                        return z1.X();
                    }
                }
            }, function() {
                if (pa.X() <= o.X()) {
                    if (pa.Y() < 0) {
                        return pa.Y();
                    } else {
                        return z1.Y()
                    }
                } else {
                    if (pb.Y() < 0) {
                        return pb.Y();
                    } else {
                        return z1.Y();
                    }
                }
            }], {name: 'end', visible: false});
    
    angle = board.create('angle', [start_point, o, end_point], {name: "2θ\'", radius: prob.r / 10, orthoType: "sector"});
    
    var theta = (function() {
        var eng_point = pa.X() <= o.X() ? pa : pb;
        var sign = eng_point.Y() >= 0 ? 1 : -1;
        
        var dy = Math.abs(eng_point.Y());
        var dx = Math.abs(eng_point.X() - o.X());
        
        if (dx == 0) {
            return 90;
        } else {
            t = Math.atan(dy / dx);
            return sign * (t / Math.PI * 180);
        }
    })();
    
    $("#rotation-a").html("A\': (<span id='new-a'>" + pa.X().toFixed(1) + "</span>, " + pa.Y().toFixed(1) + ")");
    $("#rotation-b").html("B\': (<span id='new-b'>" + pb.X().toFixed(1) + "</span>, <span id='new-tau'>" + pb.Y().toFixed(1) + "</span>)");
    $("#rotation-theta").html("&theta;\': <span id='new-theta'> " + (theta / 2).toFixed(1) + "</span>&deg;");
    
    pa.on("drag", function() {
        var x = pa.X();
        var y = pa.Y();

        pb.moveTo([2*c - x, -y]);
        
        var theta = (function() {
            var eng_point = pa.X() <= o.X() ? pa : pb;
            var sign = eng_point.Y() >= 0 ? 1 : -1;

            var dy = Math.abs(eng_point.Y());
            var dx = Math.abs(eng_point.X() - o.X());

            if (dx == 0) {
                return 90;
            } else {
                t = Math.atan(dy / dx);
                return sign * (t / Math.PI * 180);
            }
        })();
        
        $("#rotation-a").html("A\': (<span id='new-a'>" + pa.X().toFixed(1) + "</span>, " + pa.Y().toFixed(1) + ")");
        $("#rotation-b").html("B\': (<span id='new-b'>" + pb.X().toFixed(1) + "</span>, <span id='new-tau'>" + pb.Y().toFixed(1) + "</span>)");
        $("#rotation-theta").html("&theta;: <span id='new-theta'>" + (theta / 2).toFixed(1) + "</span>&deg;");
        
        draw_rotation_block1();
        draw_rotation_block2();
    });
}

function show_rotate() {
    $("#inlet1").dialog("close");
    $("#inlet2").dialog("close");
    
    draw_rotation_block1();
    draw_rotation_block2();
    
    $("#rotation").css("display", "block");
}

function draw_rotation_block1() {
    $("#rotation-left").html("");
    var rot1_div = d3.select("#rotation-left");
    var principle_angle = prob.beta + Number(prob.getTheta().toFixed(1));
    var rotate_angle = Number($("#new-theta").html());
    
    var sigma_a = Number($("#new-a").html());
    var sigma_b = Number($("#new-b").html());
    var tau = Number($("#new-tau").html());
    
    var ratio_normal = 80 / Math.max(Math.abs(prob.s1), Math.abs(prob.s2));
    var ratio_shear = 80 / Math.abs(prob.r);
    
    sigma_a *= ratio_normal;
    sigma_b *= ratio_normal;
    tau *= ratio_shear;
    tau /= 2;
    
    rot1_div.append("line")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .attr("stroke-linecap", "round")
            .attr("fill", "none")
            .attr("x1", 200)
            .attr("x2", 380)
            .attr("y1", 200)
            .attr("y2", 200);
    
    rot1_div.append("rect")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "3")
            .attr("stroke", "black")
            .attr("fill", "none")
            .attr("x", 200)
            .attr("y", 120)
            .attr("width", 80)
            .attr("height", 80)
            .attr("transform", "rotate(" + (-prob.beta).toFixed(1) + " 200 200)");
    
    rot1_div.append("g").attr("id", "rotation1")
    
    rot1_div.select("#rotation1")
            .append("rect")
            .attr("stroke-width", 1)
            .attr("stroke", "blue")
            .attr("fill", "none")
            .attr("x", 200)
            .attr("y", 120)
            .attr("width", 80)
            .attr("height", 80);
    
    
    if (sigma_a > 0) {
        rot1_div.select("#rotation1")
                .append("path")
                .attr("stroke", "blue")
                .attr("fill", "none")
                .attr("opacity", 1)
                .attr("stroke-width", 2)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("d", "M 240 100 l -5 -10 5 10 5 -10 -5 10 0 -" + sigma_a.toString() + "");

        rot1_div.select("#rotation1")
                .append("text")
                .attr("text-anchor", "start")
                .attr("alignment-baseline", "middle")
                .attr("x", 250)
                .attr("y", 60)
                .text("\u03c3A\'");
    } else if (sigma_a < 0) {
        rot1_div.select("#rotation1")
                .append("path")
                .attr("stroke", "blue")
                .attr("fill", "none")
                .attr("opacity", 1)
                .attr("stroke-width", 2)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("d", "M 240 100 l 0 -" + (-sigma_a).toString() + " -5 10 5 -10 5 10 -5 -10");

        rot1_div.select("#rotation1")
                .append("text")
                .attr("text-anchor", "start")
                .attr("alignment-baseline", "middle")
                .attr("x", 250)
                .attr("y", 60)
                .text("\u03c3A\'");
    } else {

    }

    if (sigma_b > 0) {
        rot1_div.select("#rotation1")
                .append("path")
                .attr("stroke", "red")
                .attr("fill", "none")
                .attr("opacity", 1)
                .attr("stroke-width", 2)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("d", "M 300 160 l 10 -5 -10 5 10 5 -10 -5 " + sigma_b.toString() + " 0");

        rot1_div.select("#rotation1")
                .append("text")
                .attr("text-anchor", "start")
                .attr("alignment-baseline", "baseline")
                .attr("x", 340)
                .attr("y", 150)
                .text("\u03c3B\'");
    } else if (sigma_b < 0) {
        rot1_div.select("#rotation1")
                .append("path")
                .attr("stroke", "red")
                .attr("fill", "none")
                .attr("opacity", 1)
                .attr("stroke-width", 2)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("d", "M 300 160 l " + (-sigma_b).toString() + " 0 -10 -5 10 5 -10 5 10 -5");

        rot1_div.select("#rotation1")
                .append("text")
                .attr("text-anchor", "start")
                .attr("alignment-baseline", "baseline")
                .attr("x", 340)
                .attr("y", 150)
                .text("\u03c3B\'");
    } else {

    }

    if (tau > 0) {
        rot1_div.select("#rotation1")
                .append("path")
                .attr("stroke", "black")
                .attr("fill", "none")
                .attr("opacity", 1)
                .attr("stroke-width", 2)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("d", "M 240 110 l -" + tau.toString() + " 0 " + (2 * tau).toString() + " 0 -10 -5 10 5 -10 5 10 -5");

        rot1_div.select("#rotation1")
                .append("path")
                .attr("stroke", "black")
                .attr("fill", "none")
                .attr("opacity", 1)
                .attr("stroke-width", 2)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("d", "M 290 160 l 0 " + tau.toString() + " 0 -" + (2 * tau).toString() + " -5 10 5 -10 5 10 -5 -10");

        rot1_div.select("#rotation1")
                .append("text")
                .attr("text-anchor", "start")
                .attr("alignment-baseline", "baseline")
                .attr("x", 290)
                .attr("y", 110)
                .text("\u03c4\'");
    } else if (tau < 0) {
        rot1_div.select("#rotation1")
                .append("path")
                .attr("stroke", "black")
                .attr("fill", "none")
                .attr("opacity", 1)
                .attr("stroke-width", 2)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("d", "M 240 110 l " + (-tau).toString() + " 0 -" + (-2 * tau).toString() + " 0 10 -5 -10 5 10 5 -10 -5");

        rot1_div.select("#rotation1")
                .append("path")
                .attr("stroke", "black")
                .attr("fill", "none")
                .attr("opacity", 1)
                .attr("stroke-width", 2)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("d", "M 290 160 l 0 -" + (-tau).toString() + " 0 " + (-2 * tau).toString() + " -5 -10 5 10 5 -10 -5 10");

        rot1_div.select("#rotation1")
                .append("text")
                .attr("text-anchor", "start")
                .attr("alignment-baseline", "baseline")
                .attr("x", 190)
                .attr("y", 110)
                .text("\u03c4\'");
    } else {

    }
    
    rot1_div.select("#rotation1").attr("transform", "rotate(" + (rotate_angle - principle_angle).toString() + " 200 200)");
    
    rot1_div.append("path")
            .attr("stroke", "none")
            .attr("fill", "#00BFFF")
            .attr("opacity", 0.5)
            .attr("d", path_arcByEnd(220, 200, 200, 200, rotate_angle - principle_angle) + " L 200 200 220 200");
}

function draw_rotation_block2() {
    $("#rotation-right").html("");
    var rot2_div = d3.select("#rotation-right");  // svg 400 by 400
    
    var principle_angle = prob.beta + Number(prob.getTheta().toFixed(1));
    var rotate_angle = Number($("#new-theta").html());
    
    rot2_div.append("line")
            .attr("stroke-width", 3)
            .attr("stroke", "black")
            .attr("fill", "none")
            .attr("x1", 200)
            .attr("x2", 380)
            .attr("y1", 200)
            .attr("y2", 200);
    
    rot2_div.append("line")
            .attr("stroke-width", 1)
            .attr("stroke", "black")
            .attr("fill", "none")
            .attr("stroke-dasharray", "2, 2")
            .attr("x1", 200)
            .attr("x2", 20)
            .attr("y1", 200)
            .attr("y2", 200);
    
    var rot2_fix = rot2_div.append("g");
    
    rot2_fix.append("line")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "3")
            .attr("stroke", "blue")
            .attr("fill", "none")
            .attr("x1", 10)
            .attr("x2", 390)
            .attr("y1", 200)
            .attr("y2", 200);
    
    rot2_fix.append("line")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "3")
            .attr("stroke", "red")
            .attr("fill", "none")
            .attr("x1", 10)
            .attr("x2", 390)
            .attr("y1", 200)
            .attr("y2", 200)
            .attr("transform", "rotate(90 200 200)");
    
    rot2_fix.attr("transform", "rotate(" + (-prob.beta).toString() +" 200 200)");
    
    var rot2_grp = rot2_div.append("g");
    
    rot2_grp.append("circle")
            .attr("cx", 200)
            .attr("cy", 200)
            .attr("r", 5)
            .attr("stroke-width", 1)
            .attr("fill", "black")
            .attr("stroke", "black");
    
    rot2_grp.append("line")
            .attr("stroke-width", 2)
            .attr("stroke", "blue")
            .attr("fill", "none")
            .attr("x1", 10)
            .attr("x2", 390)
            .attr("y1", 200)
            .attr("y2", 200);
    
    rot2_grp.append("line")
            .attr("stroke-width", 2)
            .attr("stroke", "red")
            .attr("fill", "none")
            .attr("x1", 10)
            .attr("x2", 390)
            .attr("y1", 200)
            .attr("y2", 200)
            .attr("transform", "rotate(90 200 200)");
    
    rot2_grp.append("text")
            .attr("x", 395)
            .attr("y", 195)
            .attr("text-anchor", "end")
            .attr("stroke-width", 0)
            .attr("fill", "blue")
            .attr("stroke", "white")
            .attr("font-family", "Sans-serif")
            .style("font-size", "14px")
            .text("A\'-direction");
    
    rot2_grp.append("text")
            .attr("x", 5)
            .attr("y", 195)
            .attr("text-anchor", "start")
            .attr("stroke-width", 0)
            .attr("fill", "red")
            .attr("stroke", "white")
            .attr("font-family", "Sans-serif")
            .style("font-size", "14px")
            .text("B\'-direction")
            .attr("transform", "rotate(90 200 200)");
    
    rot2_grp.attr("transform", "rotate(" + (rotate_angle - principle_angle).toString() +" 200 200)");
    
    rot2_div.append("path")
            .attr("stroke", "none")
            .attr("fill", "#00BFFF")
            .attr("opacity", 0.5)
            .attr("d", path_arcByEnd(220, 200, 200, 200, rotate_angle - principle_angle) + " L 200 200 220 200");
}