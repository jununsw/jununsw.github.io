JXG.Options.infobox.fontSize = 0;

var board = JXG.JSXGraph.initBoard('main-plot', {
    boundingbox: [-50, 600, 950, 0],
    showNavigation: false,
    keepaspectratio: true,
    showCopyright: false,
    axis: false
});

var depth = [90, 100, 110, 120, 130];
var width = [20, 30, 40, 50, 60];

var depth = Math.random() * 40 + 90;
var width = Math.random() * 40 + 20;

var trenchStart = 50 + (800 - width) / 2;
var trenchEnd = 50 + (800 - width) / 2 + width;

var linelist = [];

linelist.push(createCustomCurve(board, function(t) {
    if (t < depth) {
        return trenchStart;
    } else if (t < depth + width) {
        return trenchStart + (t - depth);
    } else {
        return trenchEnd;
    }
}, function(t) {
    if (t < depth) {
        return 400 - t;
    } else if (t < depth + width) {
        return 400 - depth;
    } else {
        return 400 - depth + (t - depth - width);
    }
}, 2*depth + width, '#00bfff'));

linelist.push(createCustomCurve(board, function(t) {
    if (t < 300) {
        return 50;
    } else if (t < 1100) {
        return 50 + (t - 300);
    } else {
        return 850;
    }
}, function(t) {
    if (t < 300) {
        return 400 - t;
    } else if (t < 1100) {
        return 100;
    } else {
        return 100 + (t - 1100);
    }
}, 300 + 800 + 300, '#000080'));

linelist.push(createCustomCurve(board, function(t) {
    return t + 50;
}, function(t) {
    return 400;
}, trenchStart - 50, 'red'));

linelist.push(createCustomCurve(board, function(t) {
    return 850 - t;
}, function(t) {
    return 400;
}, trenchStart - 50, 'red'));

var net = createFlowNet(board, linelist);

var shadow = board.create('polygon', [
    [trenchStart, 400 + 100],
    [trenchStart, 400 - depth],
    [trenchStart + width, 400 - depth],
    [trenchStart + width, 400 + 100]
], {
    fillColor: 'grey',
    highlight: false
});

shadow.vertices.forEach(function(ele) {
    ele.setAttribute({
        visible: false
    });
});

shadow.borders.forEach(function(ele) {
    ele.setAttribute({
        visible: false
    });
});

board.create('segment', [[trenchStart, 480], [50, 480]], {strokecolor: "green", strokewidth: 2, dash: 2, highlight: false, fixed: true});
board.create('segment', [[trenchEnd, 420], [850, 420]], {strokecolor: "green", strokewidth: 2, dash: 2, highlight: false, fixed: true});