JXG.Options.infobox.fontSize = 0;

var board = JXG.JSXGraph.initBoard('main-plot', {
    boundingbox: [-50, 600, 950, 0],
    showNavigation: false,
    keepaspectratio: true,
    showCopyright: false,
    axis: false
});

var height = 100;

var depth = Math.random() * 30 + 20;
var width = Math.random() * 40 + 200;

var trenchStart = 50 + (800 - width) / 2;
var trenchEnd = trenchStart + width;

var k = Math.random() * 100 + 20;

var linelist = [];

linelist.push(createCustomCurve(board, function(t) {
    if (t < height + depth) {
        return trenchStart;
    } else if (t < height + depth + width) {
        return trenchStart + (t - height - depth);
    } else {
        return trenchEnd;
    }
}, function(t) {
    if (t < height + depth) {
        return 500 - t;
    } else if (t < height + depth + width) {
        return 500 - height - depth;
    } else {
        return 500 - height - (t - width - height - depth);
    }
}, height + depth + width + depth, '#00bfff'));

linelist.push(createCustomCurve(board, function(t) {
    if (t < 400) {
        return 50;
    } else if (t < 1200) {
        return 50 + (t - 400);
    } else {
        return 850;
    }
}, function(t) {
    if (t < 400) {
        return 500 - t;
    } else if (t < 1200) {
        return 100 + (t - 400) * k / 800;
    } else {
        return 100 + k + (t - 1200);
    }
}, 400 + 800 + 400 - height - k, '#000080'));

linelist.push(createCustomCurve(board, function(t) {
    return t + 50;
}, function(t) {
    return 500;
}, trenchStart - 50, 'red'));

linelist.push(createCustomCurve(board, function(t) {
    return 850 - t;
}, function(t) {
    return 500 - height;
}, trenchStart - 50, 'red'));

var net = createFlowNet(board, linelist);

board.create('segment', [[50, 500], [-50, 500]], {strokecolor: "green", strokewidth: 3, dash: 2, highlight: false, fixed: true});
board.create('segment', [[850, 500 - height], [950, 500 - height]], {strokecolor: "green", strokewidth: 3, dash: 2, highlight: false, fixed: true});