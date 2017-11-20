JXG.Options.infobox.fontSize = 0;

var board = JXG.JSXGraph.initBoard('main-plot', {
    boundingbox: [0, 550, 400, -50],
    showNavigation: false,
    keepaspectratio: true,
    showCopyright: false,
    axis: false
});

var linelist = [];
linelist.push(createCustomCurve(board, function(t) {
    return 50;
}, function(t) {
    return t + 100;
}, 300, 'blue'));

linelist.push(createCustomCurve(board, function(t) {
    if (t < 50) {
        return 50;
    } else if (t < 350) {
        return t;
    } else {
        return 350;
    }
}, function(t) {
    if (t < 50) {
        return 50 - t;
    } else if (t < 350) {
        return 0;
    } else {
        return t - 350;
    }
}, 750, 'blue'));

linelist.push(createCustomCurve(board, function(t) {
    if (t < 50) {
        return 100 - t;
    } else if (t < 100) {
        return 100;
    } else {
        return 100 - (t - 100);
    }
}, function(t) {
    if (t < 50) {
        return 100;
    } else if (t < 100) {
        return 100 - (t - 50);
    } else {
        return 50;
    }
}, 150, 'red'));

linelist.push(createCustomCurve(board, function(t) {
    return t + 50;
}, function(t) {
    return 400;
}, 300, 'red'));

var net = createFlowNet(board, linelist);

var cntrlIsPressed = false;
var editable = true;

$(document).keydown(function(event) {
    if ((event.which=="17") && (editable == true)) {
        cntrlIsPressed = true;
    }
});

$(document).keydown(function(event) {
    if ((event.which=="17") && (editable == true)) {
        cntrlIsPressed = true;
    }
});

$(document).keyup(function() {
    cntrlIsPressed = false;
});

function toFeedStream() {
    net.feedlines(50, 480, 350, 480, 5, "stream");
}

function toFeedPotential() {
    net.feedlines(50, 480, 350, 480, 5, "potential");
}

function toCalculate() {
    net.calculate();
}

function toAddNode() {
    net.changeNode('add');
}

function toRemoveNode() {
    net.changeNode('remove');
}