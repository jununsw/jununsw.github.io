var board = JXG.JSXGraph.initBoard('main-plot', {
    boundingbox:[0, 600, 800, 0],
    showNavigation: false,
    keepaspectratio: true,
    showCopyright: false,
    axis: false
});

var p11 = board.create('point', [10, 590], {name:'', size:3, fixed: true});
var p12 = board.create('point', [790, 590], {name:'', size:3, fixed: true});
var p21 = board.create('point', [10, 10], {name:'', size:3, fixed: true});
var p22 = board.create('point', [790, 10], {name:'', size:3, fixed: true});

var row1 = board.create('line', [p11, p12], {straightFirst:false, straightLast:false, strokeWidth:2});
var row2 = board.create('line', [p21, p22], {straightFirst:false, straightLast:false, strokeWidth:2});
var column1 = board.create('line', [p11, p21], {straightFirst:false, straightLast:false, strokeWidth:2});
var column2 = board.create('line', [p12, p22], {straightFirst:false, straightLast:false, strokeWidth:2});

var net = new FlowNet(board, {
    p11: p11,
    p12: p12,
    p21: p21,
    p22: p22,
    row1: row1,
    row2: row2,
    column1: column1,
    column2: column2,
    
    jsxoption_line: {
        straightFirst: false, 
        straightLast: false
    },
    
    jsxoption_point: {
        name: '', 
        size: 3
    }
});