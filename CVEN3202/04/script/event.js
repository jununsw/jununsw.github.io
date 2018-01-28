function init() {
    plot_soil();
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
    
    prob.load_dash1 = prob.plot.brd.create('line', [[4, 0], [1, -3]], {
        strokeColor: 'black',
        strokeWidth: 1,
        dash: 2,
        straightFirst: false,
        highlight: false,
        fixed: true
    });
    
    prob.load_dash2 = prob.plot.brd.create('line', [[7, 0], [10, -3]], {
        strokeColor: 'black',
        strokeWidth: 1,
        dash: 2,
        straightFirst: false,
        highlight: false,
        fixed: true
    });
    
    prob.load_dash3 = prob.plot.brd.create('segment', [[8, 1], [11, -0.5]], {
        strokeColor: 'black',
        strokeWidth: 1,
        dash: 2,
        highlight: false,
        fixed: true
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
        strokeColor: 'blue',
        fillColor: 'blue'
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
    
    prob.plot.brd.create('text', [11, -prob.d1 / 2, 'Gravel'], {
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
    }, 'Clay'], {
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
    }, 'Sand'], {
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
}