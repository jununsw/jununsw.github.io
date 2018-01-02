JXG.Options.infobox.fontSize = 0;

var board = JXG.JSXGraph.initBoard('main-plot', {
    boundingbox: [0, 650, 1000, 0],
    showNavigation: false,
    keepaspectratio: true,
    showCopyright: false,
    axis: false
});

var leftStart = 200;
var bottomStart = 20;
var maxHeight = 550;
var height = Math.random() * 150 + 380;
var thickness = 20;

var b = 250;
var a = Math.pow(height - 300, 2) / (-b); // y^2 = -a(x - b)

var k = a / 2 / Math.sqrt(-a * (500 - b));
k = -1 / k;

var topStart = 500 + (maxHeight - height) / k;

var linelist = [];

linelist.push(createCustomCurve(board, function(t) {
    return t + 500
}, function(t) {
    return Math.sqrt(a * (t - b)) + 300;
}, 250, '#00bfff'));

linelist.push(createCustomCurve(board, function(t) {
    if (t < 300 - bottomStart) {
        return leftStart;
    } else if (t < 300 - bottomStart + 950 - leftStart) {
        return leftStart + (t - (300 - bottomStart));
    } else {
        return 950;
    }
}, function(t) {
    if (t < 300 - bottomStart) {
        return 300 - t;
    } else if (t < 300 - bottomStart + 950 - leftStart) {
        return bottomStart;
    } else {
        return bottomStart + (t - (300 - bottomStart + 950 - leftStart));
    }
}, 300 - thickness - bottomStart + 300 - bottomStart + 950 - leftStart, '#000080'));

linelist.push(createCustomCurve(board, function(t) {
    return 500 - t
}, function(t) {
    if (t < (height - 300) / k) {
        return height - t*k;
    } else {
        return 300;
    }
}, 500 - leftStart, 'red'));

linelist.push(createCustomCurve(board, function(t) {
    if (t < 100) {
        return 750 - t;
    } else if (t < 100 + thickness) {
        return 650;
    } else {
        return 650 + (t - thickness - 100);
    }
}, function(t) {
    if (t < 100) {
        return 300;
    } else if (t < 100 + thickness) {
        return 300 - (t - 100);
    } else {
        return 300 - thickness;
    }
}, 400 + thickness, 'red'));

var net = createFlowNet(board, linelist);

board.create('segment', [[500, height], [topStart, maxHeight]], {strokecolor: "black", highlight: false, fixed: true});
board.create('segment', [[650, maxHeight], [topStart, maxHeight]], {strokecolor: "black", highlight: false, fixed: true});
board.create('segment', [[650, maxHeight], [850, 300 - thickness]], {strokecolor: "black", highlight: false, fixed: true});
board.create('segment', [[650 + 100, 300], [650 + (maxHeight - 300) / ((maxHeight - 300 + thickness) / (850 - 650)), 300]], {strokecolor: "transparent", highlight: false, fixed: true});

board.create('segment', [[500, height], [leftStart, height]], {strokecolor: "green", strokewidth: 2, dash: 2, highlight: false, fixed: true});
board.create('segment', [[950, 300], [650 + (maxHeight - 300) / ((maxHeight - 300 + thickness) / (850 - 650)), 300]], {strokecolor: "green", strokewidth: 2, dash: 2, highlight: false, fixed: true});

var shadow = board.create('polygon', [
    [650, 300],
    [650 + (maxHeight - 300) / ((maxHeight - 300 + thickness) / (850 - 650)), 300],
    [850, 300 - thickness],
    [650, 300 - thickness]
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