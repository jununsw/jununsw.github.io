function init() {
    // disableInspect('https://jununsw.github.io/res/warning.wav');
    $("#myapp").tabs();
    
    vm.prob.n_top = 2;
    vm.prob.n_btm = 4;
    
    createBlock('svg-block');
    createTest('svg-test');
    
    $("#mu").keypress(function(e) {
        if(e.which == 13) {
            var in1 = Number($("#mu").val());
            $("#mu").css("background-color", "white");

            if (Math.abs(in1 - vm.mu) <= 1) {
                $("#mu").prop("disabled", true);
                $("#result-1").html("Correct. &phi;M<sub>u</sub> = " + (0.8 * vm.mu).toFixed(1) + " kNm.");
            } else {
                $("#mu").css("background-color", "red");
            }
        }
    });
    
    $("#test-dp").keypress(function(e) {
        if(e.which == 13) {
            var in1 = Number($("#test-dp").val());
            $("#test-dp").css("background-color", "white");
            
            if (isFinite(in1) && (in1 > 100) && (in1 < 1000)) {
                vm.test.inValid = false;
                
                in1 = Number(in1.toFixed(1));
                $("#test-dp").val(in1.toFixed(1));
                
                var r = checkDp(in1);
                
                if (r) {
                    $("#test-dp").css("background-color", "white").prop("disabled", true);
                    vm.test.dp = in1;
                    
                    $("#last").show();
                } else {
                    $("#test-dp").css("background-color", "red").prop("disabled", false);
                }
            } else {
                $("#test-dp").css("background-color", "red");
                vm.test.inValid = true;
            }
            
            $(e.target).closest("section").next("section").show();
            window.scrollTo(0,document.body.scrollHeight);
        }
    });
    
    $("#test-mu").keypress(function(e) {
        if(e.which == 13) {
            $("#test-mu").css("background-color", "white");
            var in1 = Number($("#test-mu").val());
            
            if ((isFinite(in1)) && (Math.abs(in1 - vm.test_mu) <= 2)) {
                // mu = 15456.9
                
                $("#test-mu").prop("disabled", "true");
                $("#test-mu").closest("section").append("<p><strong>Correct, you have completed this module!</strong></p>");
            } else {
                $("#test-mu").css("background-color", "red");
            }
        }
    });
}

function changeColor(e) {
    var color = $(e.target).val();
    $("body").css("background-color", color.toString());
}

function toSelect(e, which) {
    var in1 = Number($(e.target).find(":selected").text());
    if (which == "top") {
        vm.prob.n_top = in1;
        createBlock('svg-block');
    } else if (which == "btm") {
        vm.prob.n_btm = in1;
        createBlock('svg-block');
    } else {
        
    }
}

function createBlock(brdId) {
    var offsetX = 50;
    var offsetY = 25;
    
    JXG.Options.infobox.fontSize = 0;
    
    window.block = {};
    
    $("#" + brdId).height(($("#" + brdId).width() - offsetX*2)*vm.prob.height/vm.prob.width + offsetY*2);

    window.block.brd = JXG.JSXGraph.initBoard(brdId, {
        boundingbox: [-50, vm.prob.height + 25, vm.prob.width + 50, -25],
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    window.block.block = window.block.brd.create('polygon', [[0, 0], [0, vm.prob.height], [vm.prob.width, vm.prob.height], [vm.prob.width, 0]], {
        fillColor: 'transparent',
        highlight: false,
        fixed: true
    });
    
    window.block.block.vertices.forEach(function(ele, idx, arr) {
        ele.setAttribute({visible: false});
    });
    
    window.block.block.borders.forEach(function(ele, idx, arr) {
        ele.setAttribute({
            strokeWidth: 2,
            strokeColor: 'black',
            highlight: false,
            fixed: true
        });
    });
    
    for (var i = vm.prob.cover; Number(i.toFixed(0)) <= (vm.prob.width - vm.prob.cover); i += (vm.prob.width - 2*vm.prob.cover) / (vm.prob.n_btm - 1)) {
        window.block.brd.create("point", [i, 50], {
            size: 4,
            name: '',
            strokeColor: 'transparent',
            fillColor: 'black',
            fixed: true,
            highlight: false
        });
    }
    
    for (var i = vm.prob.cover; Number(i.toFixed(0)) <= (vm.prob.width - vm.prob.cover); i += (vm.prob.width - 2*vm.prob.cover) / (vm.prob.n_top - 1)) {
        window.block.brd.create("point", [i, vm.prob.height - 50], {
            size: 4,
            name: '',
            strokeColor: 'transparent',
            fillColor: 'black',
            fixed: true,
            highlight: false
        });
    }
    
    window.block.brd.create("point", [vm.prob.width / 2, vm.prob.height - vm.prob.dp], {
        size: 13,
        name: '',
        strokeWidth: 1,
        strokeColor: 'black',
        fillColor: 'grey',
        fixed: true,
        highlight: false
    });
}

function createStress(brdId) {
    JXG.Options.infobox.fontSize = 0;
    
    window.stress = {};

    var prob = vm.prob;
    
    window.stress.brd = JXG.JSXGraph.initBoard(brdId, {
        boundingbox: [-20, prob.height + 100, 200, -200],
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    window.stress.brd.create('segment', [[0, 0], [30, 0]], {
        strokeWidth: 4,
        strokeColor: 'blue',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('segment', [[30, prob.height], [30, 0]], {
        strokeWidth: 4,
        strokeColor: 'blue',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('segment', [[30, prob.height], [0, prob.height]], {
        strokeWidth: 4,
        strokeColor: 'blue',
        highlight: false,
        fixed: true
    });
    
    // arrow and text for Tp
    window.stress.brd.create('arrow', [[0, prob.height - prob.dp], [30, prob.height - prob.dp]], {
        strokeWidth: 3,
        firstArrow: true,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('text', [-5, prob.height - prob.dp, '<span style="font-weight: bold;">T<sub>p</sub></span>'], {
        anchorX: 'right',
        anchorY: 'middle',
        fontSize: 16,
        fontColor: 'black',
        highlight: false,
        fixed: true
    });
    
    // arrow and text for Ts
    window.stress.brd.create('arrow', [[0, prob.cover], [30, prob.cover]], {
        strokeWidth: 3,
        firstArrow: true,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('text', [-5, prob.cover, '<span style="font-weight: bold;">T<sub>s</sub></span>'], {
        anchorX: 'right',
        anchorY: 'middle',
        fontSize: 16,
        fontColor: 'black',
        highlight: false,
        fixed: true
    });
    
    // arrow and text for Cs
    window.stress.brd.create('arrow', [[30, prob.height - prob.cover], [0, prob.height - prob.cover]], {
        strokeWidth: 3,
        firstArrow: true,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('text', [-5, prob.height - prob.cover, '<span style="font-weight: bold;">C<sub>s</sub></span>'], {
        anchorX: 'right',
        anchorY: 'middle',
        fontSize: 16,
        fontColor: 'black',
        highlight: false,
        fixed: true
    });
    
    // neutral axis
    window.stress.brd.neutral_glider = window.stress.brd.create('segment', [[-15, prob.height - 2*prob.cover], [-15, prob.height / 2]], {
        visible: false
    });
    
    window.stress.brd.neutral_point = window.stress.brd.create('glider', [0, prob.height - prob.dn, window.stress.brd.neutral_glider], {
        size: 3,
        strokeWidth: 0,
        fillColor: 'blue',
        name: '',
        highlight: false,
        visible: false
    });
    
    window.stress.brd.create('segment', [[0, function() {
        return window.stress.brd.neutral_point.Y();
    }], [200, function() {
        return window.stress.brd.neutral_point.Y();
    }]], {
        strokeWidth: 2,
        strokeColor: 'black',
        dash: 1,
        highlight: false,
        fixed: true
    });
    
    // arrow and text for Cc
    window.stress.brd.create('arrow', [[40, prob.height], [30, prob.height]], {
        strokeWidth: 3,
        firstArrow: true,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('arrow', [[40, function() {
        return prob.height - prob.gamma*(prob.height - window.stress.brd.neutral_point.Y());
    }], [30, function() {
        return prob.height - prob.gamma*(prob.height - window.stress.brd.neutral_point.Y());
    }]], {
        strokeWidth: 3,
        firstArrow: true,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('segment', [[40, function() {
        return prob.height;
    }], [40, function() {
        return prob.height - prob.gamma*(prob.height - window.stress.brd.neutral_point.Y());
    }]], {
        strokeWidth: 3,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('text', [42, function () {
        return prob.height - prob.gamma*(prob.height - window.stress.brd.neutral_point.Y())/2;
    }, '<span style="font-weight: bold;">C<sub>c</sub></span>'], {
        anchorX: 'left',
        anchorY: 'middle',
        fontSize: 16,
        fontColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('segment', [[50, function() {
        return prob.height;
    }], [50, function() {
        return prob.height - prob.gamma*(prob.height - window.stress.brd.neutral_point.Y());
    }]], {
        strokeWidth: 2,
        firstArrow: true,
        lastArrow: true,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('text', [52, function () {
        return prob.height - prob.gamma*(prob.height - window.stress.brd.neutral_point.Y())/2;
    }, '<span style="font-weight: bold; font-style: italic">&gamma;d<sub>n</sub></span>'], {
        anchorX: 'left',
        anchorY: 'middle',
        fontSize: 16,
        fontColor: 'black',
        highlight: false,
        fixed: true
    });
    
    // stress distribution at transfer
    window.stress.brd.create('segment', [[50, prob.height - prob.dp + 50], [50, prob.height - prob.dp - 50]], {
        strokeWidth: 4,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    var x = 100;
    
    window.stress.brd.create('segment', [[x, prob.height], [x, 0]], {
        strokeWidth: 1,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.point_trc = window.stress.brd.create('point', [x + 5, prob.height], {
        visible: false
    });
    
    window.stress.transfer = window.stress.brd.create('segment', [window.stress.point_trc, [function() {
        var ratio = prob.height / 100;
        var dx = (window.stress.point_trc.X() - x) * ratio;
        
        return window.stress.point_trc.X() - dx;
    }, 0]], {
        strokeWidth: 1,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('segment', [[x, prob.height], [x + 5, prob.height]], {
        strokeWidth: 1,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('segment', [[x, 0], [function() {
        var ratio = prob.height / 100;
        var dx = (window.stress.point_trc.X() - x) * ratio;
        
        return window.stress.point_trc.X() - dx;
    }, 0]], {
        strokeWidth: 1,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    // stress distribution at service
    var y = 150;
    
    window.stress.brd.create('segment', [[y, prob.height], [y, 0]], {
        strokeWidth: 1,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.point_epsc = window.stress.brd.create('point', [y - 10, prob.height], {
        visible: false
    });
    
    window.stress.service = window.stress.brd.create('segment', [window.stress.point_epsc, [function() {
        var ratio = prob.height / (prob.height - window.stress.brd.neutral_point.Y());
        var dx = (y - window.stress.point_epsc.X()) * ratio;
        
        return window.stress.point_epsc.X() + dx;
    }, 0]], {
        strokeWidth: 1,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('segment', [[y, prob.height], [y - 10, prob.height]], {
        strokeWidth: 1,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('segment', [[y, 0], [function() {
        var ratio = prob.height / (prob.height - window.stress.brd.neutral_point.Y());
        var dx = (y - window.stress.point_epsc.X()) * ratio;
        
        return window.stress.point_epsc.X() + dx;
    }, 0]], {
        strokeWidth: 1,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('text', [y - 10, prob.height, '<span style="font-weight: bold;">0.003</span>'], {
        anchorX: 'middle',
        anchorY: 'bottom',
        fontSize: 16,
        fontColor: 'black',
        highlight: false,
        fixed: true
    });
    
    // text at bottom
    window.stress.brd.create('text', [function() {
        var ratio = prob.height / 100;
        var dx = (window.stress.point_trc.X() - x) * ratio;
        
        return window.stress.point_trc.X() - dx/2;
    }, -100, '<span style="font-weight: bold;">at transfer</span>'], {
        anchorX: 'middle',
        anchorY: 'middle',
        fontSize: 16,
        fontColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('text', [function() {
        var ratio = prob.height / (prob.height - window.stress.brd.neutral_point.Y());
        var dx = (y - window.stress.point_epsc.X()) * ratio;
        
        return window.stress.point_epsc.X() + dx/2;
    }, -100, '<span style="font-weight: bold;">at full service</span>'], {
        anchorX: 'middle',
        anchorY: 'middle',
        fontSize: 16,
        fontColor: 'black',
        highlight: false,
        fixed: true
    });
    
    // arrow and text for strain
    window.stress.ref_line = window.stress.brd.create('segment', [[50, prob.height - prob.dp], [200, prob.height - prob.dp]], {visible: false});
    
    window.stress.p1 = window.stress.brd.create('intersection', [window.stress.ref_line, window.stress.transfer, 0], {visible: false});
    window.stress.p2 = window.stress.brd.create('intersection', [window.stress.ref_line, window.stress.service, 0], {visible: false});
    
    window.stress.brd.create('segment', [[50, prob.height - prob.dp], window.stress.p1], {
        firstArrow: false,
        lastArrow: false,
        strokeWidth: 2,
        strokeColor: 'red',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('segment', [[100, prob.height - prob.dp], window.stress.p1], {
        firstArrow: true,
        lastArrow: true,
        strokeWidth: 2,
        strokeColor: 'blue',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('segment', [[150, prob.height - prob.dp], window.stress.p2], {
        firstArrow: true,
        lastArrow: true,
        strokeWidth: 2,
        strokeColor: 'blue',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('text', [function() {
        return (50 + window.stress.p1.X())/2;
    }, prob.height - prob.dp - 50, '<span style="font-weight: bold;">&epsilon;<sub>pe</sub></span>'], {
        anchorX: 'middle',
        anchorY: 'middle',
        fontSize: 16,
        fontColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('text', [function() {
        return (100 + window.stress.p1.X())/2;
    }, prob.height - prob.dp - 50, '<span style="font-weight: bold;">&epsilon;<sub>ce</sub></span>'], {
        anchorX: 'middle',
        anchorY: 'middle',
        fontSize: 16,
        fontColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.stress.brd.create('text', [function() {
        return (150 + window.stress.p2.X())/2;
    }, prob.height - prob.dp - 50, '<span style="font-weight: bold;">&epsilon;<sub>cp</sub></span>'], {
        anchorX: 'middle',
        anchorY: 'middle',
        fontSize: 16,
        fontColor: 'black',
        highlight: false,
        fixed: true
    });
}

function createTest(brdId) {
    var offsetX = 50;
    var offsetY = 25;
    
    JXG.Options.infobox.fontSize = 0;
    
    window.test = {};
    
    let width = 800;
    let height = 2000;
    
    let ratio = (width + offsetX*2) / (height + offsetY*2);
    
    $("#" + brdId).height($("#" + brdId).width() / ratio);

    window.test.brd = JXG.JSXGraph.initBoard(brdId, {
        boundingbox: [-50, height + 25, width + 50, -25],
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    let polygon = [];
    
    polygon.push(window.test.brd.create('point', [0, 0], {visible: false}));
    polygon.push(window.test.brd.create('point', [800, 0], {visible: false}));
    polygon.push(window.test.brd.create('point', [800, 300], {visible: false}));
    polygon.push(window.test.brd.create('point', [575, 300], {visible: false}));
    polygon.push(window.test.brd.create('point', [575, 1700], {visible: false}));
    polygon.push(window.test.brd.create('point', [800, 1700], {visible: false}));
    polygon.push(window.test.brd.create('point', [800, 2000], {visible: false}));
    polygon.push(window.test.brd.create('point', [0, 2000], {visible: false}));
    polygon.push(window.test.brd.create('point', [0, 1700], {visible: false}));
    polygon.push(window.test.brd.create('point', [225, 1700], {visible: false}));
    polygon.push(window.test.brd.create('point', [225, 300], {visible: false}));
    polygon.push(window.test.brd.create('point', [0, 300], {visible: false}));
    
    window.test.cross = window.test.brd.create('polygon', polygon, {
        fillColor: "transparent",
        highlight: false,
        fixed: true
    });
    
    window.test.cross.borders.forEach(function(ele, idx, arr) {
        ele.setAttribute({
            strokeWidth: 2,
            strokeColor: 'black',
            highlight: false,
            fixed: true
        });
    });
    
    window.test.tendon = window.test.brd.create('point', [400, 300], {
        size: 13,
        name: '',
        strokeWidth: 1,
        strokeColor: 'black',
        fillColor: 'grey',
        fixed: true,
        highlight: false
    });
    
    let reinforcement = [1, 2, 3, 4, 5, 6].map(function(ele, idx, arr) {
        return ele * width / (arr.length + 1);
    });
    
    reinforcement.forEach(function(ele, idx, arr) {
        window.test.brd.create("point", [ele, 100], {
            size: 4,
            name: '',
            strokeColor: 'transparent',
            fillColor: 'black',
            fixed: true,
            highlight: false
        });
        
        if ((idx !== 2) && (idx !== 3)) {
            window.test.brd.create("point", [ele, 200], {
                size: 4,
                name: '',
                strokeColor: 'transparent',
                fillColor: 'black',
                fixed: true,
                highlight: false
            });
        }
        
        if ((idx == 0) || (idx == arr.length - 1)) {
            window.test.brd.create("point", [ele, 1900], {
                size: 4,
                name: '',
                strokeColor: 'transparent',
                fillColor: 'black',
                fixed: true,
                highlight: false
            });
        }
    });
    
    [0, 100, 200, 1900, 2000].forEach(function(ele, idx, arr) {
        window.test.brd.create('segment', [[((idx == 0) || (idx == 4)) ? 800 : 700, ele], [850, ele]], {
            strokeColor: 'black',
            strokeWidth: 2,
            dash: 2,
            fixed: true,
            highlight: false
        });
    });
    
    window.test.brd.create('segment', [[825, 0], [825, 100]], {
        firstArrow: true,
        lastArrow: true,
        strokeColor: 'red',
        strokeWidth: 2,
        fixed: true,
        highlight: false
    });
    
    window.test.brd.create('segment', [[825, 200], [825, 100]], {
        firstArrow: true,
        lastArrow: true,
        strokeColor: 'red',
        strokeWidth: 2,
        fixed: true,
        highlight: false
    });
    
    window.test.brd.create('segment', [[825, 1900], [825, 2000]], {
        firstArrow: true,
        lastArrow: true,
        strokeColor: 'red',
        strokeWidth: 2,
        fixed: true,
        highlight: false
    });
}

function plotDp() {
    // 492.2
    var y = 2000 - 492.2;
    
    window.test.brd.create('segment', [[0, y], [800, y]], {
        strokeColor: 'blue',
        strokeWidth: 3,
        dash: 2,
        fixed: true,
        highlight: false
    });
    
    window.test.brd.create('segment', [[400, y], [400, 2000]], {
        firstArrow: true,
        lastArrow: true,
        strokeColor: 'blue',
        strokeWidth: 3,
        fixed: true,
        highlight: false
    });
    
    window.test.brd.create('text', [420, 2000 - 492.2/2, '<span style="color: blue;">d<sub>p</sub></span>'], {
        fontSize: 18,
        anchorX: 'left',
        anchorY: 'middle',
        fixed: true,
        highlight: false
    });
}

function checkDp(dp) {
    // answer 492.2
    
    var eps_top = 0.003 / dp * (dp - 100);
    var eps_btm1 = 0.003 / dp * (1000 - dp - 100);
    var eps_btm2 = 0.003 / dp * (1000 - dp - 200);
    var eps_p = 0.003 / dp * (1000 - dp - 300);
    
    // force in concrete
    if (0.77 * dp > 300) {
        vm.test.c1 = 0.85 * 800 * 300 * 40 / 1000;
        vm.test.c2 = 0.85 * 350 * (0.77*dp - 300) * 40 / 1000;
    } else {
        vm.test.c1 = 0.85 * 800 * dp * 0.77 * 40 / 1000;
        vm.test.c2 = 0;
    }
    
    // force in the top steel
    if (eps_top > 0.0025) {
        vm.test.cs = 200000 * 0.0025 * 610 * 2 / 1000;
    } else {
        vm.test.cs = 200000 * eps_top * 610 * 2 / 1000;
    }
    
    // force in the btm steel
    if (eps_btm1 > 0.0025) {
        vm.test.ts1 = 200000 * 0.0025 * 610 * 6 / 1000;
    } else {
        vm.test.ts1 = 200000 * eps_btm1 * 610 * 6 / 1000;
    }
    
    if (eps_btm2 > 0.0025) {
        vm.test.ts2 = 200000 * 0.0025 * 610 * 4 / 1000;
    } else {
        vm.test.ts2 = 200000 * eps_btm2 * 610 * 4 / 1000;
    }
    
    // force in tendon
    var eps_pe = 1000 / 195000;
    var eps = eps_pe + 0.00017 + eps_p;
    
    if (eps > 0.008) {
        vm.test.tp = 1560 * 5428 / 1000;
    } else {
        vm.test.tp = 195000 * eps * 5428 / 1000;
    }
    
    var diff = vm.test.c1 + vm.test.c2 + vm.test.cs - vm.test.ts1 - vm.test.ts2 - vm.test.tp;
    diff = Math.abs(diff);
    
    if (diff < 2) {
        vm.test.isCorrect = true;
    } else {
        vm.test.isCorrect = false;
    }
    
    return vm.test.isCorrect;
}