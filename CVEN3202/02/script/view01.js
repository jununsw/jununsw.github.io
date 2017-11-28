JXG.Options.infobox.fontSize = 0;

var board = JXG.JSXGraph.initBoard('main-plot', {
    boundingbox: [0, 500, 800, 0],
    showNavigation: false,
    keepaspectratio: true,
    showCopyright: false,
    axis: false
});

var linelist = [];
linelist.push(createCustomCurve(board, function(t) {
    if (t < 300) {
        return 100;
    } else if (t < 900) {
        return t - 200;
    } else {
        return 700;
    }
}, function(t) {
    if (t < 300) {
        return 400 - t;
    } else if (t < 900) {
        return 100;
    } else {
        return 100 + (t - 900);
    }
}, 1200, 'blue'));

linelist.push(createCustomCurve(board, function(t) {
    if (t < 350) {
        return 350;
    } else if (t < 450) {
        return t;
    } else {
        return 450;
    }
}, function(t) {
    if (t < 350) {
        return 400 - t/2;
    } else if (t < 450) {
        return 225;
    } else {
        return 225 + (t - 450)/2;
    }
}, 800, 'blue'));

linelist.push(createCustomCurve(board, function(t) {
    return t + 100;
}, function(t) {
    return 400;
}, 250, 'red'));

linelist.push(createCustomCurve(board, function(t) {
    return 700 - t;
}, function(t) {
    return 400;
}, 250, 'red'));

var net = createFlowNet(board, linelist, []);