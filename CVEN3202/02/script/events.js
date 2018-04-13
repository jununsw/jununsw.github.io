var cntrlIsPressed = false;
var editable = true;

$(document).keydown(function(event) {
    if ((event.which == "17") && (editable == true)) {
        cntrlIsPressed = true;
    }
    
    if (editable == false) {
        return;
    }
    
    if (event.which == "65") {  // left
        try {
            var boundingbox = net.board.getBoundingBox();
            var p = net.active.p;
            
            (function(speed) {
                var step = Math.min(Math.abs(boundingbox[2] - boundingbox[0]), Math.abs(boundingbox[3] - boundingbox[1])) / 100;
                
                if (p.filter(function(ele) {
                    return ((ele.X() - step*speed) <= boundingbox[0]); 
                }).length == 0) {
                    p.forEach(function(ele, idx, arr) {
                        ele.moveTo([ele.X() - step*speed, ele.Y()]);
                    });
                }
            })(1);
        } catch(e) {
            
        }
    } else if (event.which == "87") {  // up
        try {
            var boundingbox = net.board.getBoundingBox();
            var p = net.active.p;
            
            (function(speed) {
                var step = Math.min(Math.abs(boundingbox[2] - boundingbox[0]), Math.abs(boundingbox[3] - boundingbox[1])) / 100;
                
                if (p.filter(function(ele) {
                    return ((ele.Y() + step*speed) >= boundingbox[1]); 
                }).length == 0) {
                    p.forEach(function(ele, idx, arr) {
                        ele.moveTo([ele.X(), ele.Y() + step*speed]);
                    });
                }
            })(1);
        } catch(e) {
            
        }
    } else if (event.which == "68") {  // right
        try {
            var boundingbox = net.board.getBoundingBox();
            var p = net.active.p;
            
            (function(speed) {
                var step = Math.min(Math.abs(boundingbox[2] - boundingbox[0]), Math.abs(boundingbox[3] - boundingbox[1])) / 100;
                
                if (p.filter(function(ele) {
                    return ((ele.X() + step*speed) >= boundingbox[2]); 
                }).length == 0) {
                    p.forEach(function(ele, idx, arr) {
                        ele.moveTo([ele.X() + step*speed, ele.Y()]);
                    });
                }
            })(1);
        } catch(e) {
            
        }
    } else if (event.which == "83") {  // down
        try {
            var boundingbox = net.board.getBoundingBox();
            var p = net.active.p;
            
            (function(speed) {
                var step = Math.min(Math.abs(boundingbox[2] - boundingbox[0]), Math.abs(boundingbox[3] - boundingbox[1])) / 100;
                
                if (p.filter(function(ele) {
                    return ((ele.Y() - step*speed) <= boundingbox[3]); 
                }).length == 0) {
                    p.forEach(function(ele, idx, arr) {
                        ele.moveTo([ele.X(), ele.Y() - step*speed]);
                    });
                }
            })(1);
        } catch(e) {
            
        }
    }
});

$(document).keyup(function() {
    cntrlIsPressed = false;
});

function toFeedStream(x1, y1, x2, y2) {
    net.feedlines(x1, y1, x2, y2, 5, "stream");
}

function toFeedPotential(x1, y1, x2, y2) {
    net.feedlines(x1, y1, x2, y2, 5, "potential");
}

function toDuplicate() {
    net.duplicate();
}

function toCalculate() {
    $("#btn-finish").prop("disabled", true);
    net.calculate();
}

function toAddNode() {
    net.changeNode('add');
}

function toRemoveNode() {
    net.changeNode('remove');
}

function toDelete() {
    net.delete();
}