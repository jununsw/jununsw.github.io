function init() {
    plot_soil();
    // plot_chart("soil-chart", prob.pc, prob.cr, prob.cc, prob.omega);
}

function plot_soil() {
    JXG.Options.infobox.fontSize = 0;
    
    prob.plot.brd = JXG.JSXGraph.initBoard('soil-plot', {
        boundingbox: prob.boundingbox,
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    prob.plot.load_area = prob.plot.brd.create('polygon', [[4, 0.5], [7, 0.5], [8, 1.5], [5, 1.5]], {
        fillColor: 'transparent',
        highlight: false,
        fixed: true
    });
    
    prob.plot.load_area.vertices.forEach(function(ele) {
        ele.setAttribute({
            visible: false
        });
    });

    prob.plot.load_area.borders.forEach(function(ele) {
        ele.setAttribute({
            strokeColor: 'black',
            strokeWidth: 2,
            highlight: false,
            fixed: true
        });
    });
    
    prob.plot.load_line1 = prob.plot.brd.create('segment', [[4, 0], [7, 0]], {
        strokeColor: 'black',
        strokeWidth: 2,
        highlight: false,
        fixed: true
    });
    
    prob.plot.load_line1 = prob.plot.brd.create('segment', [[7, 0], [8, 1]], {
        strokeColor: 'black',
        strokeWidth: 2,
        highlight: false,
        fixed: true
    });
    
    prob.plot.load_arrows = [];
    
    for (var i = 4; i <= 8; i += 0.25) {
        if (i <= 7) {
            prob.plot.load_arrows.push(prob.plot.brd.create('arrow', [[i, 0.5], [i, 0]], {
                strokeColor: 'black',
                strokeWidth: 3,
                highlight: false,
                fixed: true
            }));
        } else {
            prob.plot.load_arrows.push(prob.plot.brd.create('arrow', [[i, 0.5 + (i - 7)], [i, (i -  7)]], {
                strokeColor: 'black',
                strokeWidth: 3,
                highlight: false,
                fixed: true
            }));
        }
    }
    
    prob.plot.brd.create('text', [6, 0.5, 'B = 5m'], {
        anchorX: 'middle', 
        anchorY: 'bottom', 
        fontSize: 18, 
        fontWeight: 'bold', 
        highlight: false,
        fixed: true
    });
    
    prob.plot.brd.create('text', [4, 1, 'L = 5m'], {
        anchorX: 'right', 
        anchorY: 'middle', 
        fontSize: 18, 
        fontWeight: 'bold', 
        highlight: false,
        fixed: true
    });
    
    prob.plot.brd.create('text', [7, 1.5, '<span>q = 40 kg/m<sup>2</sup></span>'], {
        anchorX: 'middle', 
        anchorY: 'bottom', 
        fontSize: 18, 
        fontWeight: 'bold', 
        highlight: false,
        fixed: true
    });
    
    prob.plot.load_dash1 = prob.plot.brd.create('line', [[4, 0], [1, -6]], {
        strokeColor: 'black',
        strokeWidth: 1,
        dash: 2,
        straightFirst: false,
        straightLast: false,
        highlight: false,
        fixed: true,
        visible: false
    });
    
    prob.plot.load_dash2 = prob.plot.brd.create('line', [[7, 0], [10, -6]], {
        strokeColor: 'black',
        strokeWidth: 1,
        dash: 2,
        straightFirst: false,
        straightLast: false,
        highlight: false,
        fixed: true,
        visible: false
    });
    
    prob.plot.load_dash3 = prob.plot.brd.create('segment', [[8, 1], [10, -1]], {
        strokeColor: 'black',
        strokeWidth: 1,
        dash: 2,
        highlight: false,
        fixed: true,
        visible: false
    });
    
    prob.plot.level1 = prob.plot.brd.create('segment', [[-1, 0], [10, 0]], {
        strokeColor: 'black',
        strokeWidth: 3,
        highlight: false,
        fixed: true
    });
    
    prob.plot.level2 = prob.plot.brd.create('segment', [[-1, -prob.d1], [10, -prob.d1]], {
        strokeColor: 'black',
        strokeWidth: 1,
        highlight: false,
        fixed: true
    });
    
    prob.plot.glider = prob.plot.brd.create('segment', [[-0.7, -prob.d2 - prob.d1 + 1], [-0.7, -prob.d2 - prob.d1 - 1]], {
        visible: false
    });
    
    prob.plot.level_handler = prob.plot.brd.create('glider', [-0.7, -prob.d2 - prob.d1, prob.plot.glider], {
        size: 10,
        face: '>',
        name: '',
        strokeColor: 'black',
        fillColor: 'black',
        visible: false
    });
    
    prob.plot.level_handler.on('drag', function() {
        var y = prob.plot.level_handler.Y();
        y = y.toFixed(1);
        prob.plot.level_handler.moveTo([-0.7, y]);
        
        prob.d2 = -y - 2;
        vm.d2 = -y - 2;
    });
    
    
    prob.plot.level3 = prob.plot.brd.create('segment', [[-1, function() {return prob.plot.level_handler.Y();}], [10, function() {return prob.plot.level_handler.Y();}]], {
        strokeColor: 'black',
        strokeWidth: 1,
        highlight: false,
        fixed: true
    });
    
    prob.plot.level4 = prob.plot.brd.create('segment', [[-1, function() {return prob.plot.level_handler.Y() - 2;}], [10, function() {return prob.plot.level_handler.Y() - 2;}]], {
        strokeColor: 'black',
        strokeWidth: 3,
        highlight: false,
        fixed: true
    });
    
    prob.plot.water_level = prob.plot.brd.create('polygon', [[1, -prob.d1], [1 - 0.4, -prob.d1 + 0.2], [1 + 0.4, -prob.d1 + 0.2]], {
        fillColor: 'blue',
        highlight: false,
        fixed: true
    });
    
    prob.plot.water_level.vertices.forEach(function(ele) {
        ele.setAttribute({
            visible: false
        });
    });

    prob.plot.water_level.borders.forEach(function(ele) {
        ele.setAttribute({
            visible: false
        });
    });
    
    prob.plot.bed_level = prob.plot.brd.create('polygon', [[-1, function() {
        return prob.plot.level_handler.Y() - 2;
    }], [10, function() {
        return prob.plot.level_handler.Y() - 2;
    }], [10, function() {
        return prob.plot.level_handler.Y() - 2 - 0.5;
    }], [-1, function() {
        return prob.plot.level_handler.Y() - 2 - 0.5;
    }]], {
        fillColor: 'gray',
        highlight: false,
        fixed: true
    });
    
    prob.plot.bed_level.vertices.forEach(function(ele) {
        ele.setAttribute({
            visible: false
        });
    });

    prob.plot.bed_level.borders.forEach(function(ele) {
        ele.setAttribute({
            visible: false
        });
    });
    
    prob.plot.depth1 = prob.plot.brd.create('line', [[0, 0], [0, -prob.d1]], {
        straightFirst: false, 
        straightLast: false, 
        strokeWidth: 3,
        strokeColor: 'black',
        firstArrow: true,
        lastArrow: true,
        highlight: false,
        fixed: true
    });
    
    prob.plot.depth2 = prob.plot.brd.create('line', [[0, function () {
        return -prob.d1;
    }], [0, function () {
        return prob.plot.level_handler.Y();
    }]], {
        straightFirst: false, 
        straightLast: false, 
        strokeWidth: 3,
        strokeColor: 'blue',
        firstArrow: true,
        lastArrow: true,
        highlight: false,
        fixed: true
    });
    
    prob.plot.depth3 = prob.plot.brd.create('line', [[0, function () {
        return prob.plot.level_handler.Y();
    }], [0, function () {
        return prob.plot.level_handler.Y() - 2;
    }]], {
        straightFirst: false, 
        straightLast: false, 
        strokeWidth: 3,
        strokeColor: 'black',
        firstArrow: true,
        lastArrow: true,
        highlight: false,
        fixed: true
    });
    
    prob.plot.depth_text1 = prob.plot.brd.create('text', [-0.1, -prob.d1 / 2, '2.0m'], {
        anchorX: 'right', 
        anchorY: 'middle', 
        fontSize: 18, 
        fontWeight: 'bold', 
        highlight: false,
        fixed: true
    });
    
    prob.plot.depth_text2 = prob.plot.brd.create('text', [-0.1, function() {
        return (prob.plot.level_handler.Y() + 2) / 2 - 2;
    }, function() {
        return (-prob.plot.level_handler.Y() - 2).toFixed(1) + 'm';
    }], {
        anchorX: 'right', 
        anchorY: 'middle', 
        fontSize: 18, 
        fontWeight: 'bold', 
        highlight: false,
        fixed: true
    });
    
    prob.plot.depth_text3 = prob.plot.brd.create('text', [-0.1, function() {
        return (prob.plot.level_handler.Y() + 2) - 3;
    }, '2.0m'], {
        anchorX: 'right', 
        anchorY: 'middle', 
        fontSize: 18,
        fontWeight: 'bold', 
        highlight: false,
        fixed: true
    });
    
    prob.plot.brd.create('text', [11, -prob.d1 / 2, 'Layer1. Gravel'], {
        anchorX: 'right', 
        anchorY: 'middle',
        color: 'black',
        fontSize: 20, 
        fontWeight: 'bold', 
        highlight: false,
        fixed: true
    });
    
    prob.plot.brd.create('text', [11, function() {
        return (prob.plot.level_handler.Y() + 2) / 2 - 2;
    }, 'Layer2. Clay'], {
        anchorX: 'right', 
        anchorY: 'middle',
        color: 'black',
        fontSize: 20, 
        fontWeight: 'bold', 
        highlight: false,
        fixed: true
    });
    
    prob.plot.brd.create('text', [11, function() {
        return (prob.plot.level_handler.Y() + 2) - 3;
    }, 'Layer3. Sand'], {
        anchorX: 'right', 
        anchorY: 'middle',
        color: 'black',
        fontSize: 20, 
        fontWeight: 'bold', 
        highlight: false,
        fixed: true
    });
    
    prob.plot.middle_point = prob.plot.brd.create('point', [5.5, function () {
        return (prob.plot.level_handler.Y() + 2) / 2 - 2;
    }], {
        size: 4,
        fillColor: 'red',
        strokeColor: 'red',
        fixed: true,
        highlight: false,
        name: 'A',
        visible: false
    });
    
    prob.plot.middle_point_arrow = prob.plot.brd.create('line', [[5.5, 0], [5.5, function () {
        return (prob.plot.level_handler.Y() + 2) / 2 - 2;
    }]], {
        straightFirst: false, 
        straightLast: false, 
        strokeWidth: 3,
        strokeColor: 'red',
        firstArrow: true,
        lastArrow: true,
        highlight: false,
        fixed: true,
        visible: false
    });
    
    prob.plot.triangle1 = prob.plot.brd.create('text', [8.75, -3, '1'], {
        anchorX: 'middle', 
        anchorY: 'bottom',
        color: 'black',
        fontSize: 12,
        highlight: false,
        fixed: true,
        visible: false
    });
    
    prob.plot.triangle2 = prob.plot.brd.create('text', [9.05, -3.5, '2'], {
        anchorX: 'left', 
        anchorY: 'middle',
        color: 'black',
        fontSize: 12,
        highlight: false,
        fixed: true,
        visible: false
    });
    
    prob.plot.brd.create('text', [0.2, -0.1, " <span id='text-lvl1-1'></span>"], {
        anchorX: 'left', 
        anchorY: 'top',
        color: 'black',
        fontSize: 16
    });
    prob.plot.brd.create('text', [0.2, -0.5, " <span id='text-lvl1-2'></span>"], {
        anchorX: 'left', 
        anchorY: 'top',
        color: 'black',
        fontSize: 16
    });
    prob.plot.brd.create('text', [0.2, -0.9, " <span id='text-lvl1-3'></span>"], {
        anchorX: 'left', 
        anchorY: 'top',
        color: 'black',
        fontSize: 16
    });
    
    $("#text-lvl1-1").html("G<sub>s</sub> = 2.7 kg/m<sup>3<sup>");
    $("#text-lvl1-2").html("&sigma;<sub>pc</sub>\'= " + prob.pc + " kPa");
    $("#text-lvl1-3").html("&gamma;<sub>t1</sub> = " + prob.gamma1 + " kg/m<sup>3</sup>");
    
    prob.plot.brd.create('text', [0.2, -2.1, " <span id='text-lvl2-1'></span>"], {
        anchorX: 'left', 
        anchorY: 'top',
        color: 'black',
        fontSize: 16
    });
    prob.plot.brd.create('text', [0.2, -2.5, " <span id='text-lvl2-2'></span>"], {
        anchorX: 'left', 
        anchorY: 'top',
        color: 'black',
        fontSize: 16
    });
    prob.plot.brd.create('text', [0.2, -2.9, " <span id='text-lvl2-3'></span>"], {
        anchorX: 'left', 
        anchorY: 'top',
        color: 'black',
        fontSize: 16
    });
    prob.plot.brd.create('text', [0.2, -3.3, " <span id='text-lvl2-4'></span>"], {
        anchorX: 'left', 
        anchorY: 'top',
        color: 'black',
        fontSize: 16
    });
    
    $("#text-lvl2-1").html("G<sub>s</sub> = 2.7 kg/m<sup>3<sup>");
    $("#text-lvl2-2").html("&sigma;<sub>pc</sub>\'= " + prob.pc + " kPa");
    $("#text-lvl2-3").html("&gamma;<sub>t2</sub> = " + prob.gamma2 + " kg/m<sup>3</sup>, w = " + prob.omega + " %");
    $("#text-lvl2-4").html("C<sub>c</sub> = " + prob.cc + " , C<sub>r</sub> = " + prob.cr + "");
    
    prob.plot.dash = [prob.plot.load_dash1, prob.plot.load_dash2, prob.plot.load_dash3, prob.plot.triangle1, prob.plot.triangle2];
}

function plot_chart(brd, pc, cr, cc, omega) {
    var e0 = omega * 2.7 / 100;
    var y_top = e0 + (Math.log10(prob.pc) - 0.3) * cr;
    var y0 = (e0 - (3 - Math.log10(prob.pc)) * cc) * 0.7;
    var y_btn = y0 - y_top / 10;
    
    prob.chart.brd = JXG.JSXGraph.initBoard(brd, {
        boundingbox: [-0.5, e0 * 1.5, 3.5, y_btn],
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    prob.chart.axis_x = prob.chart.brd.create('arrow', [[0, y0], [3.5, y0]], {
        strokeWidth: 4,
        strokeColor: 'black',
        firstArrow: true,
        lastArrow: true,
        highlight: false,
        fixed: true
    });
    
    [0, 1, 2, 3].forEach(function(ele, idx, arr) {
        prob.chart.brd.create('segment', [[ele, y0], [ele, y0 + y_top/30]], {
            strokeWidth: 2,
            strokeColor: 'black',
            highlight: false,
            fixed: true
        });
        
        prob.chart.brd.create('text', [ele, y0, Math.pow(10, ele).toString()], {
            anchorX: 'middle', 
            anchorY: 'top', 
            fontSize: 18,
            fontWeight: 'bold', 
            highlight: false,
            fixed: true
        });
    });
    
    prob.chart.brd.create('text', [3.5, y0 + y_top/30, 'Pressure (kPa)'], {
        anchorX: 'right', 
        anchorY: 'bottom', 
        fontSize: 16,
        fontWeight: 'bold', 
        highlight: false,
        fixed: true
    });
    
    prob.chart.brd.create('text', [0.1, e0 * 1.5, 'e'], {
        anchorX: 'left', 
        anchorY: 'top', 
        fontSize: 16,
        fontWeight: 'bold', 
        highlight: false,
        fixed: true
    });
    
    prob.chart.axis_y = prob.chart.brd.create('arrow', [[0, y0], [0, e0 * 1.5]], {
        strokeWidth: 4,
        strokeColor: 'black',
        firstArrow: true,
        lastArrow: true,
        highlight: false,
        fixed: true
    });
    
    prob.chart.point_pc = prob.chart.brd.create('point', [Math.log10(prob.pc), e0], {
        size: 4,
        color: 'red',
        name: '\u03c3pc',
        highlight: false,
        fixed: true
    });
    
    prob.chart.point_pc.label.setAttribute({fontSize: 20});
    
    prob.chart.brd.create('text', [-0.1, e0, 'e0'], {
        anchorX: 'right', 
        anchorY: 'middle', 
        fontSize: 18,
        fontWeight: 'bold', 
        highlight: false,
        fixed: true
    });
    
    prob.chart.arrow_pc = prob.chart.brd.create('arrow', [[Math.log10(prob.pc), e0], [Math.log10(prob.pc), y0]], {
        strokeWidth: 3,
        strokeColor: 'red',
        firstArrow: true,
        lastArrow: true,
        highlight: false,
        fixed: true
    });
    
    prob.chart.arrow_ec = prob.chart.brd.create('arrow', [[Math.log10(prob.pc), e0], [0, e0]], {
        strokeWidth: 3,
        strokeColor: 'red',
        firstArrow: true,
        lastArrow: true,
        highlight: false,
        fixed: true
    });
    
    prob.chart.point_start = prob.chart.brd.create('point', [0.3, e0 + (Math.log10(prob.pc) - 0.3) * cr], {
        size: 2,
        color: 'green',
        name: '',
        highlight: false,
        fixed: true,
        visible: false
    });
    
    prob.chart.point_end = prob.chart.brd.create('point', [3, e0 - (3 - Math.log10(prob.pc)) * cc], {
        size: 2,
        color: 'green',
        name: '',
        highlight: false,
        fixed: true,
        visible: false
    });
    
    prob.chart.line_cr = prob.chart.brd.create('segment', [prob.chart.point_start, prob.chart.point_pc], {
        strokeWidth: 3,
        strokeColor: 'blue',
        highlight: false,
        fixed: true
    });
    
    prob.chart.line_cc = prob.chart.brd.create('segment', [prob.chart.point_end, prob.chart.point_pc], {
        strokeWidth: 3,
        strokeColor: 'green',
        highlight: false,
        fixed: true
    });
}