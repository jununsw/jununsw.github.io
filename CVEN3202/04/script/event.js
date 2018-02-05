function init() {
    plot_soil();
    // plot_chart('soil-chart', vm.prob.pc, vm.prob.cr, vm.prob.cc, vm.prob.omega);
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
        
        prob.chart.slider.moveTo([vm.sigma_0, vm.sigma_f]);
        vm.delta_e = Number((prob.chart.p0.Y() - prob.chart.pf.Y()).toFixed(4));
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
    
    prob.plot.depth_text1 = prob.plot.brd.create('text', [-0.1, -prob.d1 / 2, 'd1=2.0m'], {
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
        return 'd2=' + (-prob.plot.level_handler.Y() - 2).toFixed(1) + 'm';
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
    }, 'd3=2.0m'], {
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
    var y_top = vm.e(prob.pc * 0.5);
    var y_btn = vm.e(prob.pc * 1.54);
    var x_left = Math.log10(prob.pc * 0.5);
    var x_right = Math.log10(prob.pc * 1.54);
    var x0 = Math.log10(prob.pc * 0.6);
    var y0 = vm.e(prob.pc * 1.5)
    
    prob.chart.brd = JXG.JSXGraph.initBoard(brd, {
        boundingbox: [x_left, y_top, x_right, y_btn],
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    prob.chart.axis_x = prob.chart.brd.create('arrow', [[x0, y0], [x_right, y0]], {
        strokeWidth: 4,
        strokeColor: 'black',
        firstArrow: true,
        lastArrow: true,
        highlight: false,
        fixed: true
    });
    
    prob.chart.brd.create('text', [(x_left + x0) / 2, y_top, 'e'], {
        anchorX: 'middle', 
        anchorY: 'top', 
        fontSize: 18,
        fontWeight: 'bold', 
        highlight: false,
        fixed: true
    });
    
    prob.chart.axis_y = prob.chart.brd.create('arrow', [[x0, y0], [x0, y_top]], {
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
    
    prob.chart.brd.create('text', [(x_left + x0) / 2, e0, 'e0'], {
        anchorX: 'middle', 
        anchorY: 'middle',
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold', 
        highlight: false,
        fixed: true,
        visible: false
    });
    
    prob.chart.arrow_pc = prob.chart.brd.create('arrow', [[Math.log10(prob.pc), e0], [Math.log10(prob.pc), y0]], {
        strokeWidth: 3,
        strokeColor: 'red',
        firstArrow: true,
        lastArrow: true,
        highlight: false,
        fixed: true,
        visible: false
    });
    
    prob.chart.arrow_ec = prob.chart.brd.create('arrow', [[Math.log10(prob.pc), e0], [x0, e0]], {
        strokeWidth: 3,
        strokeColor: 'red',
        firstArrow: true,
        lastArrow: true,
        highlight: false,
        fixed: true,
        visible: false
    });
    
    prob.chart.point_start = prob.chart.brd.create('point', [Math.log10(prob.pc * 0.6), vm.e(prob.pc * 0.6)], {
        size: 2,
        color: 'green',
        name: '',
        highlight: false,
        fixed: true,
        visible: false
    });
    
    prob.chart.point_end = prob.chart.brd.create('point', [Math.log10(prob.pc * 1.5), vm.e(prob.pc * 1.5)], {
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
    
    prob.chart.slider = prob.chart.brd.create('point', [vm.sigma_0, vm.sigma_f], {
        visible: false
    });
    
    prob.chart.p0 = prob.chart.brd.create('point', [function () {
        return Math.log10(prob.chart.slider.X())
    }, function() {
        return vm.e(prob.chart.slider.X())
    }], {
        fixed: true,
        name: '\u03c30',
        fontSize: 20,
        color: 'black',
        label: { 
           cssClass: 'pointFont'
        }
    });
    
    prob.chart.pf = prob.chart.brd.create('point', [function () {
        return Math.log10(prob.chart.slider.Y())
    }, function() {
        return vm.e(prob.chart.slider.Y())
    }], {
        fixed: true,
        name: '\u03c3f',
        color: 'black',
        label: { 
           cssClass: 'pointFont'
        }
    });
    
    prob.chart.arrow_x0 = prob.chart.brd.create('arrow', [prob.chart.p0, [function() {
        return prob.chart.p0.X();
    }, y0]], {
        strokeWidth: 2,
        strokeColor: function() {
            if (prob.chart.p0.X() <= prob.chart.point_pc.X()) {
                return 'blue';
            } else {
                return 'green';
            }
        },
        firstArrow: true,
        lastArrow: true,
        highlight: false,
        fixed: true
    });
    
    prob.chart.arrow_y0 = prob.chart.brd.create('arrow', [prob.chart.p0, [x0, function() {
        return prob.chart.p0.Y();
    }]], {
        strokeWidth: 2,
        strokeColor: function() {
            if (prob.chart.p0.X() <= prob.chart.point_pc.X()) {
                return 'blue';
            } else {
                return 'green';
            }
        },
        firstArrow: true,
        lastArrow: true,
        highlight: false,
        fixed: true
    });
    
    prob.chart.arrow_x0 = prob.chart.brd.create('arrow', [prob.chart.pf, [function() {
        return prob.chart.pf.X();
    }, y0]], {
        strokeWidth: 2,
        strokeColor: function() {
            if (prob.chart.pf.X() <= prob.chart.point_pc.X()) {
                return 'blue';
            } else {
                return 'green';
            }
        },
        firstArrow: true,
        lastArrow: true,
        highlight: false,
        fixed: true
    });
    
    prob.chart.arrow_y0 = prob.chart.brd.create('arrow', [prob.chart.pf, [x0, function() {
        return prob.chart.pf.Y();
    }]], {
        strokeWidth: 2,
        strokeColor: function() {
            if (prob.chart.pf.X() <= prob.chart.point_pc.X()) {
                return 'blue';
            } else {
                return 'green';
            }
        },
        firstArrow: true,
        lastArrow: true,
        highlight: false,
        fixed: true
    });
    
    prob.chart.delta_e = prob.chart.brd.create('segment', [[x0, function() {
        return prob.chart.p0.Y();
    }], [x0, function() {
        return prob.chart.pf.Y();
    }]], {
        strokeWidth: 8,
        strokeColor: 'blue',
        highlight: false,
        fixed: true
    });
    
    prob.chart.brd.create('text', [(x_left + x0) / 2, function() {
        return (prob.chart.p0.Y() + prob.chart.pf.Y()) / 2;
    }, '\u0394e'], {
        anchorX: 'middle', 
        anchorY: 'middle',
        color: 'blue',
        fontSize: 18,
        fontWeight: 'bold', 
        highlight: false,
        fixed: true
    });
    
    prob.chart.brd.create('arrow', [[function() {
        return prob.chart.p0.X()
    }, y0], [function() {
        return prob.chart.pf.X()
    }, y0]], {
        strokeWidth: 8,
        strokeColor: 'blue',
        highlight: false,
        fixed: true
    });
    
    prob.plot.level_handler.setAttribute({visible: true});
    $("#soil-chart-label").show();
    
    vm.delta_e = Number((prob.chart.p0.Y() - prob.chart.pf.Y()).toFixed(4));
    
    $("#handle-info").show();
}