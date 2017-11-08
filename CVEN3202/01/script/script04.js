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
    
    var board= JXG.JSXGraph.initBoard('coord', {
            boundingbox: [minX, maxY, maxX, minY],
            axis: true,
            showNavigation: false,
            keepaspectratio: true,
            showCopyright: false});
    
    var o = board.create('point', [c, 0], {name: 'O', color: 'black', fixed: true, size: 1});
    var z = board.create('point', [c + r, 0], {name: 'O', color: 'black', fixed: true, visible: false});
    var circle = board.create('circle', [o, z], {fixed: true, strokeColor: 'black', strokeWidth: 3, highlight: false});
    
    var pa = board.create('glider', [a, -tau, circle], {name: 'A', size: 3, color: 'blue'});
    var pb = board.create('point', [b, tau], {name: 'B', size: 3, color: 'red', fixed: true});
    var l = board.create('line', [pa, pb], {straightFirst: false, straightLast: false, strokeColor: "black", strokeWidth: 1});
    
    var pole = board.create('point', prob.getPole(), {name: 'Pole', size: 3, color: 'black', fixed: true});
    
    var l1 = board.create('line', [pa, pole], {straightFirst: false, straightLast: false, strokeColor: "blue", dash: 1, strokeWidth: 1});
    var l2 = board.create('line', [pb, pole], {straightFirst: false, straightLast: false, strokeColor: "red", dash: 1, strokeWidth: 1});
    
    pa.on("drag", function() {
        var x = pa.X();
        var y = pa.Y();

        pb.moveTo([2*c - x, -y]);
    });
}

function show_rotate() {
    $("#rotation").css("display", "block");
}