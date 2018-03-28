function init() {
    // disableInspect('https://jununsw.github.io/res/warning.wav');
    $("#myapp").tabs();
    
    vm.prob.n_top = 2;
    vm.prob.n_btm = 4;
    
    createBlock('svg-block');
    createTab2('svg-block-2');
    
    $("#test").hide();
    
    $("#mu").keypress(function() {
        var in1 = Number($("#mu").val());
        $("#mu").css("background-color", "white");
        
        if (Math.abs(in1 - vm.mu) <= 1) {
            $("#mu").prop("disabled", true);
            $("#result-1").html("Correct. &phi;M<sub>u</sub> = " + (0.8 * vm.mu).toFixed(1) + " kNm.");
        } else {
            $("#mu").css("background-color", "red");
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

function createTab2(brdId) {
    var offsetX = 50;
    var offsetY = 25;
    
    JXG.Options.infobox.fontSize = 0;
    
    window.block2 = {};
    
    $("#" + brdId).height(($("#" + brdId).width() - offsetX*2)*vm.prob.height/vm.prob.width + offsetY*2);

    window.block2.brd = JXG.JSXGraph.initBoard(brdId, {
        boundingbox: [-50, vm.prob.height + 25, vm.prob.width + 50, -25],
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    window.block2.block = window.block2.brd.create('polygon', [[0, 0], [0, vm.prob.height], [vm.prob.width, vm.prob.height], [vm.prob.width, 0]], {
        fillColor: 'transparent',
        highlight: false,
        fixed: true
    });
    
    window.block2.block.vertices.forEach(function(ele, idx, arr) {
        ele.setAttribute({visible: false});
    });
    
    window.block2.block.borders.forEach(function(ele, idx, arr) {
        ele.setAttribute({
            strokeWidth: 2,
            strokeColor: 'black',
            highlight: false,
            fixed: true
        });
    });
    
    for (var i = vm.prob.cover; Number(i.toFixed(0)) <= (vm.prob.width - vm.prob.cover); i += (vm.prob.width - 2*vm.prob.cover) / (4 - 1)) {
        window.block2.brd.create("point", [i, 50], {
            size: 4,
            name: '',
            strokeColor: 'transparent',
            fillColor: 'black',
            fixed: true,
            highlight: false
        });
    }
    
    window.block2.brd.create("point", [vm.prob.width / 2, vm.prob.height - vm.prob.dp], {
        size: 13,
        name: '',
        strokeWidth: 1,
        strokeColor: 'black',
        fillColor: 'grey',
        fixed: true,
        highlight: false
    });
}

function createDistribution() {
    JXG.Options.infobox.fontSize = 0;
    
    var e_max = 0.1;
    var f_smax = 600;
    var f_pmax = 2000;
    
    var x_min = -e_max / 10;
    var x_max = e_max * (1 + 0.05);
    var y1_min = -f_pmax / 20;
    var y2_min = -f_smax / 20;
    var y1_max = f_pmax * (1 + 0.05);
    var y2_max = f_smax * (1 + 0.05);
    
    window.distribution = {};
    
    window.distribution.brd1 = JXG.JSXGraph.initBoard("svg-dist1", {
        boundingbox: [x_min, y1_max, x_max, y1_min],
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: true
    });
    
    window.distribution.brd2 = JXG.JSXGraph.initBoard("svg-dist2", {
        boundingbox: [x_min, y2_max, x_max, y2_min],
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: true
    });
    
    window.distribution.brd3 = JXG.JSXGraph.initBoard("svg-stress2", {
        boundingbox: [-0.005, vm.prob.height + 50, 0.01, -50],
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    window.distribution.brd3.create("segment", [[0, 0], [0, vm.prob.height]], {
        strokecolor: 'black',
        strokeWidth: 2,
        highlight: false,
        fixed: true
    });
    
    window.distribution.glidee = window.distribution.brd3.create("segment", [[0, 400], [0, 600]], {
        visible: false
    });
    
    window.distribution.glider = window.distribution.brd3.create("glider", [0, 400, window.distribution.glidee], {
        size: 5,
        name: '',
        fillColor: 'blue',
        strokeColor: "transparent",
        highlight: false
    });
    
    window.distribution.brd3.create("segment", [[-0.003, vm.prob.height], [function() {
        var y = window.distribution.glider.Y();
        var x = 0.003 / (800 - y) * y;
        
        return x;
    }, 0]], {
        strokecolor: 'black',
        strokeWidth: 2,
        highlight: false,
        fixed: true
    });
    
    window.distribution.brd3.create("segment", [[0, 0], [function() {
        var y = window.distribution.glider.Y();
        var x = 0.003 / (800 - y) * y;
        
        return x;
    }, 0]], {
        strokecolor: 'black',
        strokeWidth: 2,
        highlight: false,
        fixed: true
    });
    
    window.distribution.brd3.create("segment", [[0, 50], [function() {
        var y = window.distribution.glider.Y();
        var x = 0.003 / (800 - y) * (y - 50);
        
        return x;
    }, 50]], {
        strokecolor: 'green',
        strokeWidth: 4,
        highlight: false,
        fixed: true
    });
    
    window.distribution.brd3.create("segment", [[0, 125], [function() {
        var y = window.distribution.glider.Y();
        var x = 0.003 / (800 - y) * (y - 125);
        
        return x;
    }, 125]], {
        strokecolor: 'red',
        strokeWidth: 4,
        highlight: false,
        fixed: true
    });
    
    window.distribution.brd3.create("segment", [[-0.003, vm.prob.height], [0, vm.prob.height]], {
        strokecolor: 'black',
        strokeWidth: 2,
        highlight: false,
        fixed: false
    });
    
    window.distribution.brd3.create("segment", [[-0.003, function() {
        return window.distribution.glider.Y();
    }], [function() {
        var y = window.distribution.glider.Y();
        var x = 0.003 / (800 - y) * y;
        
        return x;
    }, function() {
        return window.distribution.glider.Y();
    }]], {
        strokecolor: 'black',
        strokeWidth: 2,
        dash: 2,
        highlight: false,
        fixed: false
    });
    
    window.distribution.curve1 = window.distribution.brd1.create('curve', [
        function(t) {
            return t
        }, function(t) {
            if (t < 0.008025) {
                return t * 195000;
            } else {
                return 0.008025*195000 + 243*Math.tanh(802 * (t - 0.008025));
            }
        },
    0, e_max], {
        strokeColor: 'blue', 
        strokeWidth: 2,
        highlight: false,
        fixed: true
    });
    
    window.distribution.curve2 = window.distribution.brd2.create('curve', [
        function(t) {
            return t
        }, function(t) {
            if (t < 0.0025) {
                return t * 200000;
            } else {
                return 0.0025*200000;
            }
        },
    0, e_max], {
        strokecolor: 'blue', 
        strokeWidth: 2,
        highlight: false,
        fixed: true
    });
    
    window.distribution.glider.on("drag", function() {
        var y = window.distribution.glider.Y();
        y = Number(y.toFixed(0));
        
        window.distribution.glider.moveTo([0, y]);
        
        $("#dn").html(800 - y);
    });
}

function adjust(direction) {
    
}