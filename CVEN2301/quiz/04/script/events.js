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
        create_problem();
        
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

function create_problem() {
    JXG.Options.infobox.strokeColor = 'transparent';
    var offset = 20;
    
    window.plot = {};
    window.plot.arrows = [];
    window.plot.arrow_points = [];
    
    window.plot.board = JXG.JSXGraph.initBoard('svg-prob', {
        boundingbox: [-offset, height + offset, width + 3*offset, -offset],
        axis: false,
        grid: false,
        showCopyright: false,
        showNavigation: false,
        keepaspectratio: true
    });
    
    var pointLabel = {
        offset: [5, 5],
        cssClass: 'pointLabel',
        highlightCssClass: 'pointLabel'
    }
        
    var pA = window.plot.board.create('point', [0, height], {name: 'A', size: 1, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pB = window.plot.board.create('point', [width, height], {name: 'B', size: 1, color: 'black', highlight: false, fixed: true, label: pointLabel});
    
    var pC = window.plot.board.create('point', [0, height - prob.y1], {name: 'C', size: 1, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pD = window.plot.board.create('point', [prob.left, height - prob.y1], {name: 'D', size: 1, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pE = window.plot.board.create('point', [prob.left + prob.x2, height - prob.y1], {name: 'E', size: 1, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pF = window.plot.board.create('point', [width, height - prob.y1], {name: 'F', size: 1, color: 'black', highlight: false, fixed: true, label: pointLabel});
    
    var pG = window.plot.board.create('point', [0, prob.y3], {name: 'G', size: 1, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pH = window.plot.board.create('point', [prob.left, prob.y3], {name: 'H', size: 1, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pI = window.plot.board.create('point', [prob.left + prob.x2, prob.y3], {name: 'I', size: 1, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pJ = window.plot.board.create('point', [width, prob.y3], {name: 'J', size: 1, color: 'black', highlight: false, fixed: true, label: pointLabel});
    
    var pK = window.plot.board.create('point', [0, 0], {name: 'K', size: 1, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pL = window.plot.board.create('point', [prob.left, 0], {name: 'L', size: 1, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pM = window.plot.board.create('point', [prob.left + prob.x2, 0], {name: 'M', size: 1, color: 'black', highlight: false, fixed: true, label: pointLabel});
    var pN = window.plot.board.create('point', [width, 0], {name: 'N', size: 1, color: 'black', highlight: false, fixed: true, label: pointLabel});
    
    var r1 = window.plot.board.create('polygon', [pA, pB, pF, pC], {strokeColor: 'black', fillColor: '#F08080', highlight: false, fixed: true});
    var r2 = window.plot.board.create('polygon', [pD, pE, pM, pL], {strokeColor: 'black', fillColor: '#6495ED', highlight: false, fixed: true});
    var r3 = window.plot.board.create('polygon', [pG, pH, pL, pK], {strokeColor: 'black', fillColor: '#F08080', highlight: false, fixed: true});
    var r4 = window.plot.board.create('polygon', [pI, pJ, pN, pM], {strokeColor: 'black', fillColor: '#F08080', highlight: false, fixed: true});
    
    [r1, r2, r3, r4].forEach(function(e) {
        e.borders.forEach(function(ele) {
            ele.setAttribute({
                highlight: false
            });
        });
    });
    
    draw_centroid(offset);
}

function draw_centroid(offset) {
    var y = prob.y;
    app.record.answers.y = y;
    show_centroid(window.plot.board, y, offset);
}

function show_centroid(brd, y, offset) {
    var x_left = brd.getBoundingBox()[0];
    var x_right = brd.getBoundingBox()[2];
    
    try {
        brd.removeObject(window.plot.centroid_line);
    } catch(e) {
        
    }
    
    if (window.plot.arrow_points.length > 0) {
        window.plot.arrow_points.forEach(function(e, i, a) {
            brd.removeObject(e);
        });
        window.plot.arrows.forEach(function(e, i, a) {
            brd.removeObject(e);
        });
        
        window.plot.arrow_points = [];
        window.plot.arrows = [];
    }
    
    if ((y > brd.getBoundingBox()[3]) && (y < brd.getBoundingBox()[1])) {
        window.plot.centroid_line = brd.create('line', [[x_left, y], [x_right, y]], {
            strokeColor: 'black',
            strokeWidth: 2,
            dash: 2,
            straightFirst: false, 
            straightLast: false,
            highlight: false,
            fixed: true
        });
    } else {
        
    }
    
    brd.create('arrow', [[width + 1.5*offset, 0], [width + 1.5*offset, y]], {
        strokeColor: 'black',
        strokeWidth: 3,
        fixed: true,
        highlight: false
    });
    
    brd.create('text', [width + 2.25*offset, 0, '<span style="border-top: 3px solid black; font-weight: bold;">y</span>'], {
        anchorX: 'middle',
        anchorY: 'bottom',
        fontSize: 18,
        fixed: true,
        highlight: false
    });
    
    // phantom dashed line through block
    window.plot.middle1 = height - prob.y1/2;
    window.plot.middle2 = height - prob.y1 - (prob.y2 + prob.y3 - prob.y)/2;
    window.plot.middle3 = prob.y3 / 2;
    
    window.plot.phantom1 = brd.create('line', [[x_left, window.plot.middle1], [x_right, window.plot.middle1]], {
        dash: 1,
        strokeWidth: 1,
        strokeColor: 'black',
        visible: false,
        fixed: true,
        highlight: false
    });
    
    window.plot.phantom2 = brd.create('line', [[x_left, window.plot.middle2], [x_right, window.plot.middle2]], {
        dash: 1,
        strokeWidth: 1,
        strokeColor: 'black',
        visible: false,
        fixed: true,
        highlight: false
    });
    
    window.plot.phantom3 = brd.create('line', [[x_left, window.plot.middle3], [x_right, window.plot.middle3]], {
        dash: 1,
        strokeWidth: 1,
        strokeColor: 'black',
        visible: false,
        fixed: true,
        highlight: false
    });
}

function add_arrow(e) {
    if (window.plot.arrows.length == 4) {
        return;
    }
    
    if (window.plot.centroid_line == undefined) {
        return;
    }
    
    var x = window.plot.board.getBoundingBox()[0];
    var y = window.plot.board.getBoundingBox()[1];
    var p = window.plot.board.create('point', [x + 5, y - 5], {
        name: "",
        size: 3,
        strokeWidth: 0,
        fillColor: 'blue'
    });
    
    window.plot.arrow_points.push(p);
    
    p.on('drag', function() {
        // decide whether phantom line is shown
        if ((p.Y() <= window.plot.middle1 + prob.y1/4) && (p.Y() >= window.plot.middle1 - prob.y1/4)) {
            window.plot.phantom1.setAttribute({visible: true});
            p.moveTo([p.X(), window.plot.middle1]);
        } else {
            window.plot.phantom1.setAttribute({visible: false});
        }
        
        if ((p.Y() <= window.plot.middle2 + prob.y1/4) && (p.Y() >= window.plot.middle2 - prob.y1/4)) {
            window.plot.phantom2.setAttribute({visible: true});
            p.moveTo([p.X(), window.plot.middle2]);
        } else {
            window.plot.phantom2.setAttribute({visible: false});
        }
        
        if ((p.Y() <= window.plot.middle3 + prob.y1/4) && (p.Y() >= window.plot.middle3 - prob.y1/4)) {
            window.plot.phantom3.setAttribute({visible: true});
            p.moveTo([p.X(), window.plot.middle3]);
        } else {
            window.plot.phantom3.setAttribute({visible: false});
        }
        
        // show length using name
        if ((p.Y() <= height) && (p.Y() >= 0)) {
            p.setAttribute({name: "<span style='font-weight: bold; color: blue; font-size: 16px;'>" + (Math.abs(p.Y() - prob.y)).toFixed(2) + "</span>"});
        } else {
            p.setAttribute({name: "<span style='font-weight: bold; color: blue'></span>"});
        }
    });
    
    window.plot.arrows.push(window.plot.board.create('arrow', [[function() {
        return p.X();
    }, function() {
        return window.plot.centroid_line.point1.Y();
    }], p], {
        strokeWidth: 4,
        strokeColor: 'blue',
        highlight: false
    }));
}

function remove_arrow(e) {
    if (window.plot.arrows.length == 0) {
        return;
    }
    
    if (window.plot.centroid_line == undefined) {
        return;
    }
    
    window.plot.board.removeObject(window.plot.arrows[window.plot.arrows.length - 1]);
    window.plot.board.removeObject(window.plot.arrow_points[window.plot.arrow_points.length - 1]);
    
    window.plot.arrows.pop();
    window.plot.arrow_points.pop();
}

$(document).ready(function() {
    $("#myapp").css("display", "block");
    $(".after-show").hide();
    $("#answers").tabs();

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