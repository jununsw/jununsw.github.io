function check_id() {
    // check zID
    var re = new RegExp('^z[0-9]{7}$');
    
    zid = $("#zid").val();
    
    // developing mode
    if ((zid === "z3243398") || (zid === "z7701732") || (zid === "z3290765")) {
        isFirst = "first attempt";
    }
    
    function toshow() {
        $("#main-body").css("display", "block");
        $("#score-bar").css("display", "block");
        $("#id-bar").css("display", "none");
    }
    
    function toblock() {
        $("#zid").css("background", "red");
        $("#after-id").css("color", "red").html(arguments[0]);
    }
    
    // check if attempted
    if (isFirst === "first attempt") {
        
    } else {
        toblock("&nbsp;You have already attempted this quiz. If you require additional attempt, please contact the course coordinator");
        $("#zid").prop("disabled", true);
        $("#id-btn").prop("disabled", true).hide();
        return;
    }
    
    if (!re.test(zid)) {
        toblock("&nbsp;Your zID is invalid!");
        return;
    }
    
    if ((zid === who)) {
        toshow();
        window.brd = create_beam("svg-prob", 0.2, true, true, true);
        window.bmd = create_bmd("svg-bmd", 0.5);
        
        if (special.includes(zid)) {
            timer = 8100000;
            $("#min").html(135);
        } else {
            timer = 5400000;
            $("#min").html(90);
        }
        
        // set interval and timer
        count = setInterval(function() {
            
            var min = Number($("#min").html());
            var sec = Number($("#sec").html());
            
            if (sec === 0) {
                min -= 1;
                sec = "59";
                min = min.toFixed(0);
            } else if (sec <= 10) {
                sec -= 1;
                sec = "0" + sec.toFixed(0);
                min = min.toFixed(0);
            } else {
                sec -= 1;
                sec = sec.toFixed(0);
                min = min.toFixed(0);
            }
            
            $("#min").html(min);
            $("#sec").html(sec);
            
        }, 1000);
        
        setTimeout(function() {
            clearInterval(count);
            
            // TODO disable submit
            $(".timer").css("display", "none");
            $("#timeup").html("").css("color", "red").html("Your time is up. It is time to take screenshots/photos of your answers and submit!")
            $("input").prop("disabled", true);

            // TODO submit result
        }, timer);
        
    } else {
        toblock("&nbsp;Your zID does not match your profile!");
    }
}

function create_beam(id, offset, load_flag, support_flag, axis_flag) {
    JXG.Options.infobox.strokeColor = 'transparent';
    
    var pointLabel = {
        offset: [-5, 10],
        cssClass: 'pointLabel',
        highlightCssClass: 'pointLabel'
    }
    
    var board = JXG.JSXGraph.initBoard(id, {
        boundingbox: [-offset, 5, 4 + offset, -5],
        axis: false,
        grid: false,
        showCopyright: false,
        showNavigation: false,
        keepaspectratio: false
    });
    
    var pA = board.create('point', [0, 0], {name: 'A', size: 2, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pB = board.create('point', [prob.l, 0], {name: 'B', size: 2, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pC = board.create('point', [4, 0], {name: 'C', size: 2, color: 'black', highlight: false, fixed: true, label: pointLabel});
    
    var l1 = board.create('line', [pA, pB], {straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: 'black', highlight: false, fixed: true});
    var l2 = board.create('line', [pB, pC], {straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: 'black', highlight: false, fixed: true});
    
    if (load_flag) {
        var pP = board.create('point', [0, 3], {name: 'P', size: 1, color: 'transparent', highlight: false, fixed: true, label: pointLabel});
        var arrow1 = board.create('arrow', [pP, [0, 1]], {strokeWidth: 3, strokeColor: 'blue', highlight: false, fixed: true});
        var arrow_line = board.create('line', [[prob.l, 2], [4, 2]], {straightFirst: false, straightLast: false, strokeWidth: 2, strokeColor: 'black', highlight: false, fixed: true});
        var pw = board.create('point', [prob.l + (4 - prob.l)/2, 2], {name: 'w', size: 1, color: 'transparent', highlight: false, fixed: true, label: pointLabel});
        
        let x = prob.l;
        var arrows = [];
        
        while (true) {
            arrows.push(board.create('arrow', [[x, 2], [x, 1]], {strokeWidth: 2, strokeColor: 'black', highlight: false, fixed: true}));
            
            if (x >= 4) {
                break
            } else {
                x += 0.2;
            }
        }
    }
    
    if (support_flag) {
        var support_B = board.create('polygon', [[pB.X(), 0], [pB.X() - 0.1, -1], [pB.X() + 0.1, -1]], {
                fillColor: '#000000',
                fillOpacity: 1,
                highlight: false, 
                fixed: true
            });
        
        var support_C = board.create('polygon', [[pC.X(), 0], [pC.X() - 0.1, -1], [pC.X() + 0.1, -1]], {
                fillColor: '#000000',
                fillOpacity: 1,
                highlight: false, 
                fixed: true
            });
        
        var pB1 = board.create('point', [pB.X() - 0.06, -1], {name: '', size: 1, color: 'black', highlight: false, fixed: true, label: pointLabel});
        var pB2 = board.create('point', [pB.X() + 0.06, -1], {name: '', size: 1, color: 'black', highlight: false, fixed: true, label: pointLabel});
        
        [support_B, support_C].forEach(function(e) {
            e.vertices.forEach(function(ele) {
                ele.setAttribute({
                    visible: false
                });
            });
            
            e.borders.forEach(function(ele) {
                ele.setAttribute({
                    visible: false
                });
            });
        });
    }
    
    if (axis_flag) {
        var axisY_arrow = board.create('arrow', [[0, -3.6], [0, -1.5]], {strokeWidth: 3, strokeColor: 'black', highlight: false, fixed: true});
        var axisX_arrow = board.create('arrow', [[0, -3.5], [1.5, -3.5]], {strokeWidth: 3, strokeColor: 'black', highlight: false, fixed: true});
        var axis_labelX = board.create('point', [1.5, -3.5], {name: 'X', size: 1, color: 'transparent', highlight: false, fixed: true, label: {offset: [5, 0]}});
        var axis_labely = board.create('point', [0, -1.5], {name: 'Y', size: 1, color: 'transparent', highlight: false, fixed: true, label: {offset: [5, 0]}});
    }
    
    return board;
}

function create_bmd(id, offset) {
    // return an object to window.bmd
    JXG.Options.infobox.strokeColor = 'transparent';
    
    var dispatch = {};
    
    dispatch.brd = JXG.JSXGraph.initBoard(id, {
        boundingbox: [-offset, 4, 4 + offset, -4],
        axis: false,
        showCopyright: false,
        showNavigation: false,
        keepaspectratio: false
    });
    
    dispatch.brd.create('segment', [[0, 0], [4, 0]], {
        strokeWidth: 3,
        strokeColor: 'black',
        fixed: true,
        highlight: false
    });
    
    dispatch.lineA = dispatch.brd.create('segment', [[0, -3], [0, 3]], {
        visible: false
    });
    
    dispatch.lineB = dispatch.brd.create('segment', [[prob.l, -3], [prob.l, 3]], {
        visible: false
    });
    
    dispatch.lineBC = dispatch.brd.create('segment', [[prob.l + (4 - prob.l)/2, -3], [prob.l + (4 - prob.l)/2, 3]], {
        visible: false
    });
    
    dispatch.lineC = dispatch.brd.create('segment', [[4, -3], [4, 3]], {
        visible: false
    });
    
    dispatch.pA = dispatch.brd.create('glider', [0, 0, dispatch.lineA], {
        name: "<span style='font-weight: bold;'>A</span>",
        size: 3,
        color: 'blue'
    });
    
    dispatch.pB = dispatch.brd.create('glider', [prob.l, 0, dispatch.lineB], {
        name: "<span style='font-weight: bold;'>B</span>",
        size: 3,
        color: 'blue'
    });
    
    dispatch.pBC = dispatch.brd.create('glider', [prob.l + (4 - prob.l)/2, 0, dispatch.lineBC], {
        name: "",
        size: 3,
        color: 'blue'
    });
    
    dispatch.pC = dispatch.brd.create('glider', [4, 0, dispatch.lineC], {
        name: "<span style='font-weight: bold;'>C</span>",
        size: 3,
        color: 'blue'
    });
    
    dispatch.pAB = dispatch.brd.create('point', [prob.l / 2, function() {
        return (dispatch.pA.Y() + dispatch.pB.Y()) / 2;
    }], {
        visible: false
    });
    
    [dispatch.pA, dispatch.pB, dispatch.pBC, dispatch.pC].forEach(function(ele, idx, arr) {
        ele.on('drag', function() {
            var x = ele.X();
            var y = ele.Y();
            y = y - y%0.2;
            
            ele.moveTo([x, y]);
        });
    });
    
    dispatch.brd.create('segment', [dispatch.pA, [0, 0]], {
        strokeWidth: 2,
        strokeColor: 'blue',
        fixed: true,
        highlight: false,
        visible: function() {
            if (dispatch.pA.Y() == 0) {
                return "false";
            } else {
                return "true";
            }
        }
    });
    
    dispatch.brd.create('segment', [dispatch.pC, [4, 0]], {
        strokeWidth: 2,
        strokeColor: 'blue',
        fixed: true,
        highlight: false,
        visible: function() {
            if (dispatch.pC.Y() == 0) {
                return "false";
            } else {
                return "true";
            }
        }
    });
    
    dispatch.brd.create('spline', [dispatch.pA, dispatch.pAB, dispatch.pB], {
        strokeWidth: 2,
        strokeColor: 'blue',
        fixed: true,
        highlight: false
    });
    
    dispatch.brd.create('spline', [dispatch.pB, dispatch.pBC, dispatch.pC], {
        strokeWidth: 2,
        strokeColor: 'blue',
        fixed: true,
        highlight: false
    });
    
    return dispatch;
}

$(document).ready(function() {
    $("#myapp").css("display", "block");
    $(".after-show").hide();
    $("#answers").tabs();
    $("#answer-tabs").tabs();

    $("textarea").on("keyup", function(e) {
        var in1 = $(e.target).val();
        var len = in1.length;
        if (len <= 500) {
            $(e.target).parent().find("span").html((500 - len).toString() + " characters remains");
        } else {
            $(e.target).parent().find("span").html("maximum text length reached");
            $(e.target).val(in1.slice(0, 500));
        }
    });
});