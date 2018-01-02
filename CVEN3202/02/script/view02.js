JXG.Options.infobox.fontSize = 0;

var board = JXG.JSXGraph.initBoard('main-plot', {
    boundingbox: [-50, 550, 450, -50],
    showNavigation: false,
    keepaspectratio: true,
    showCopyright: false,
    axis: false
});

var width = [40, 50, 60, 70, 80];
var depth = [90, 100, 60, 70, 80];

var width = Math.random() * 40 + 40;
var depth = Math.random() * 40 + 60;

var length = 400 - width - depth;

var linelist = [];
linelist.push(createCustomCurve(board, function(t) {
    return 50;
}, function(t) {
    return t + width + depth;
}, length, '#00bfff'));

linelist.push(createCustomCurve(board, function(t) {
    if (t < depth) {
        return 50;
    } else if (t < 300 + depth) {
        return 50 + t - depth;
    } else {
        return 350;
    }
}, function(t) {
    if (t < depth) {
        return depth - t;
    } else if (t < 300 + depth) {
        return 0;
    } else {
        return t - 300 - depth;
    }
}, 700 + depth, '#000080'));

linelist.push(createCustomCurve(board, function(t) {
    if (t < width) {
        return 50 + t;
    } else if (t < 2 * width) {
        return 50 + width;
    } else {
        return 50 + (t - 2*width);
    }
}, function(t) {
    if (t < width) {
        return depth + width;
    } else if (t < 2 * width) {
        return depth + width - (t - width);
    } else {
        return depth;
    }
}, 3 * width, 'red'));

linelist.push(createCustomCurve(board, function(t) {
    return t + 50;
}, function(t) {
    return 400;
}, 300, 'red'));

var net = createFlowNet(board, linelist, []);

board.create('segment', [[50, 400], [-50, 400]], {strokecolor: "green", strokewidth: 2, dash: 2, highlight: false, fixed: true});
board.create('segment', [[350, 400], [450, 400]], {strokecolor: "green", strokewidth: 2, dash: 2, highlight: false, fixed: true});