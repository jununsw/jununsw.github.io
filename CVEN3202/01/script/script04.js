// Script for rotating Mohr's circle

// Use two layers of group so that rotation can be performed after rotation

// draw coordinate
function draw_coordinate() {
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
    
    var pa = board.create('glider', [a, -tau, circle], {name: 'A', size: 4, color: 'blue'});
    var pb = board.create('point', [b, tau], {name: 'B', size: 4, color: 'red', fixed: true});
    var l = board.create('line', [pa, pb], {straightFirst: false, straightLast: false, strokeColor: "black", strokeWidth: 1});
    
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
    
    angle = board.create('angle', [start_point, o, end_point], {name: "2θ", radius: prob.r / 10, orthoType: "sector"});
    
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
    
    $("#rotation-a").html("A: (" + pa.X().toFixed(2) + ", " + pa.Y().toFixed(2) + ")");
    $("#rotation-b").html("B: (" + pb.X().toFixed(2) + ", " + pb.Y().toFixed(2) + ")");
    $("#rotation-theta").html("&theta;: <span id='new-theta'> " + (theta / 2).toFixed(2) + "</span>&deg;");
    
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
        
        $("#rotation-a").html("A: (<span id='new-a'>" + pa.X().toFixed(2) + "</span>, " + pa.Y().toFixed(2) + ")");
        $("#rotation-b").html("B: (<span id='new-b'>" + pb.X().toFixed(2) + "</span>, <span id='new-tau'>" + pb.Y().toFixed(2) + "</span>)");
        $("#rotation-theta").html("&theta;: <span id='new-theta'>" + (theta / 2).toFixed(2) + "</span>&deg;");
        
        draw_rotation_block1();
        draw_rotation_block2();
    });
}

function show_rotate() {
    draw_rotation_block1();
    draw_rotation_block2();
    
    $("#rotation").css("display", "block");
}

function draw_rotation_block1() {
    $("#rotation-left").html("");
    var rot1_div = d3.select("#rotation-left");
    var principle_angle = prob.beta + Number(prob.getTheta().toFixed(2));
    var rotate_angle = Number($("#new-theta").html());
    
    var sigma_a = Number($("#new-a").html());
    var sigma_b = Number($("#new-b").html());
    var tau = Number($("#new-tau").html());
    
    rot1_div.append("line")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .attr("stroke-linecap", "round")
            .attr("fill", "none")
            .attr("x1", 200)
            .attr("x2", 380)
            .attr("y1", 200)
            .attr("y2", 200);
    
    rot1_div.append("g").attr("id", "rotation")
    
    rot1_div.select("#rotation")
            .append("rect")
            .attr("stroke-width", 1)
            .attr("stroke", "blue")
            .attr("fill", "none")
            .attr("x", 200)
            .attr("y", 120)
            .attr("width", 80)
            .attr("height", 80);
    
    rot1_div.select("#rotation").attr("transform", "rotate(" + (rotate_angle - principle_angle).toString() + " 200 200)");
    
    rot1_div.append("path")
            .attr("stroke", "none")
            .attr("fill", "#00BFFF")
            .attr("opacity", 0.5)
            .attr("d", path_arcByEnd(220, 200, 200, 200, rotate_angle - principle_angle) + " L 200 200 220 200");
}

function draw_rotation_block2() {
    
}