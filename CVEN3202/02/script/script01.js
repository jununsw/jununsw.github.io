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
    net.feedlines(150, 450, 650, 450, 5, "stream");
}

function toFeedPotential() {
    net.feedlines(150, 450, 650, 450, 5, "potential");
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