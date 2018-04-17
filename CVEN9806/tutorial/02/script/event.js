function init() {
    $("#myapp").tabs();
    plot_profile();
    plot_continue();
}

function changeColor(e) {
    var color = $(e.target).val();
    $("body").css("background-color", color.toString());
}

function plot_profile() {
    JXG.Options.infobox.fontSize = 0;
    
    window.plot = {};
    
    window.plot.brd = JXG.JSXGraph.initBoard('svg-profile', {
        boundingbox: prob.boundingbox,
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    window.plot.profile = window.plot.brd.create('polygon', [[0, 400], [prob.span, 400], [prob.span, -400], [0, -400]], {
        fillColor: 'transparent',
        highlight: false,
        fixed: true
    });
    
    window.plot.profile.vertices.forEach(function(ele) {
        ele.setAttribute({
            visible: false
        });
    });

    window.plot.profile.borders.forEach(function(ele) {
        ele.setAttribute({
            strokeColor: 'black',
            strokeWidth: 2,
            highlight: false,
            fixed: true
        });
    });
    
    window.plot.glider = window.plot.brd.create('line', [[prob.span / 2, 0], [prob.span / 2, -390]], {visible: false, straightLast: false, straightFirst: false});
    
    window.plot.keypoint = [];
    
    window.plot.keypoint.push(window.plot.brd.create('point', [0, 0], {
        visible: false
    }));
    
    window.plot.keypoint.push(window.plot.brd.create('glider', [prob.span / 2, -prob.e, window.plot.glider], {
        name: '',
        strokeColor: 'transparent',
        fillColor: 'red',
        size: 3,
        highlight: false,
        fixed: false
    }));
    
    window.plot.keypoint.push(window.plot.brd.create('point', [prob.span, 0], {
        visible: false
    }));
    
    window.plot.keypoint[1].on('drag', function() {
        var y = -window.plot.keypoint[1].Y();
        var round = y - y%10;
        
        round = round > 390 ? 390 : round;
        round = round < 10 ? 10 : round;
        
        window.plot.keypoint[1].moveTo([prob.span / 2, -round]);
        prob.e = round;
        vm.$forceUpdate();
        
        try {
            var slope = vm.slope(window.plot.slider.Value());
            $("#theta").html(-slope.toFixed(3));

            var alpha = vm.alpha(window.plot.slider.Value());
            $("#alpha").html(alpha.toFixed(3));
        } catch(e) {
            
        }
    });
    
    window.plot.tendon = window.plot.brd.create('curve', [function(t) {
        return t;
    }, function(t) {
        return (-4 * window.plot.keypoint[1].Y() / prob.span / prob.span) * Math.pow(t - prob.span/2, 2) + window.plot.keypoint[1].Y();
    }, 0, prob.span], {
        strokeWidth: 3,
        strokeColor: 'blue',
        highlight: false,
        fixed: true
    });
}

function createSlider() {
    window.plot.slider = window.plot.brd.create('slider', [[0, -600], [prob.span, -600], [0, 0, prob.span]], {
        snapWidth: 0.1,
        name: 'x',
        highlight: false
    });
        
    window.plot.reference_line = window.plot.brd.create('line', [[function() {
        return window.plot.slider.Value();
    }, 400], [function() {
        return window.plot.slider.Value();
    }, -400]], {
        straightLast: false, 
        straightFirst: false,
        dash: 2,
        strokeWidth: 2,
        color: 'red',
        fixed: true
    });
    
    window.plot.slider.on("drag", function() {
        var slope = vm.slope(window.plot.slider.Value());
        $("#theta").html(-slope.toFixed(3));
        
        var alpha = vm.alpha(window.plot.slider.Value());
        $("#alpha").html(alpha.toFixed(3));
    });
}

function createPlot() {
    JXG.Options.infobox.fontSize = 0;
    
    window.chart = {};
    
    window.chart.brd = JXG.JSXGraph.initBoard('svg-plot', {
        boundingbox: [-2, 5000, 17, 2700],  // pi minimum 3000
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    window.chart.brd.create('arrow', [[0, 2700], [0, 4800]], {
        strokeWidth: 3,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.chart.brd.create('arrow', [[-2, 3000], [17, 3000]], {
        strokeWidth: 3,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    [3500, 4000, 4500].forEach(function(ele, idx, arr) {
        window.chart.brd.create('text', [-0.5, ele, ele.toFixed(0)], {
            anchorX: 'right',
            anchorY: 'middle',
            fontSize: 18,
            fontWeight: 'bold',
            fixed: true,
            highlight: false
        });
        
        window.chart.brd.create('segment', [[0, ele], [17, ele]], {
            strokeWidth: 1,
            dash: 1,
            strokeColor: 'black',
            highlight: false,
            fixed: true
        });
    });
    
    [5, 10, 15].forEach(function(ele, idx, arr) {
        window.chart.brd.create('text', [ele, 2950, ele.toFixed(0)], {
            anchorX: 'middle',
            anchorY: 'top',
            fontSize: 18,
            fontWeight: 'bold',
            fixed: true,
            highlight: false
        });
        
        window.chart.brd.create('segment', [[ele, 3000], [ele, 4800]], {
            strokeWidth: 1,
            dash: 1,
            strokeColor: 'black',
            highlight: false,
            fixed: true
        });
    });
    
    window.chart.label_x = window.chart.brd.create('text', [7.5, 2700, 'Distance from left end x (m)'], {
        anchorX: 'middle',
        anchorY: 'bottom',
        fontSize: 18,
        fontWeight: 'bold',
        fixed: true,
        highlight: false
    });
    
    window.chart.brd.create('text', [0, 5000, 'P (kN)'], {
        anchorX: 'right',
        anchorY: 'top',
        fontSize: 18,
        fontWeight: 'bold',
        fixed: true,
        highlight: false
    });
    
    window.chart.loss_line = window.chart.brd.create('segment', [[0, prob.pj], [15, prob.pi]], {
        color: 'blue',
        strokeWidth: 3,
        dash: 2,
        fixed: true,
        highlight: false
    });
    
    window.chart.glider = window.chart.brd.create('segment', [[0, prob.pj], [0, function() {
        var k = (prob.pj - prob.pi) / 15;
        var delta = 30 * k;
        
        return prob.pj - delta;
    }]], {
        visible: false
    });
    
    window.chart.point1 = window.chart.brd.create('glider', [0, prob.pj, window.chart.glider], {
        size: 6,
        strokeColor: 'blue',
        strokeWidth: 1,
        fillColor: 'blue',
        highlight: false,
        name: ''
    });
    
    window.chart.point2 = window.chart.brd.create('glider', [15, prob.pi, window.chart.loss_line], {
        size: 0,
        strokeColor: 'blue',
        strokeWidth: 1,
        fillColor: 'blue',
        highlight: false,
        fixed: true,
        name: ''
    });
    
    window.chart.brd.create('text', [0.1, prob.pj + 100, function() {
        return '<span>P<sub>j</sub> = ' + prob.pj.toFixed(0) + ' kN</span>';
    }], {
        anchorX: 'left',
        anchorY: 'bottom',
        fontSize: 18,
        fontWeight: 'bold',
        fixed: true,
        highlight: false
    });
    
    window.chart.brd.create('text', [0.1, function() {
        return window.chart.point1.Y() - 100;
    }, function() {
        return '<span>P<sub>j</sub> - &Delta;P = ' + window.chart.point1.Y().toFixed(0) + ' kN</span>';
    }], {
        anchorX: 'left',
        anchorY: 'top',
        fontSize: 18,
        fontWeight: 'bold',
        fixed: true,
        highlight: false,
        visible: function() {
            if (window.chart.point1.Y() < prob.pj) {
                return true
            } else {
                return false
            }
        }
    });
    
    window.chart.brd.create('segment', [window.chart.point1, window.chart.point2], {
        color: 'blue',
        strokeWidth: 3,
        fixed: true,
        highlight: false
    });
    
    window.chart.brd.create('segment', [[15, prob.pi], window.chart.point2], {
        color: 'blue',
        strokeWidth: 3,
        fixed: true,
        highlight: false
    });
    
    window.chart.brd.create('segment', [[0, function() {
        return window.chart.point1.Y() - 700;
    }], [function() {
        if (window.chart.point2.X() < 1) {
            return 0.1;
        } else {
            return window.chart.point2.X();
        }
    }, function() {
        return window.chart.point1.Y() - 700;
    }]], {
        firstArrow: true,
        lastArrow: true,
        color: 'black',
        strokeWidth: 3,
        fixed: true,
        highlight: false,
        visible: function() {
            if (Math.abs(window.chart.point1.Y() - prob.pj) <= 10) {
                return false;
            }
            
            if (window.chart.point2.X() >= 1) {
                return true;
            } else {
                return false;
            }
        }
    });
    
    window.chart.brd.create('segment', [window.chart.point2, [function() {
        if (window.chart.point2.X() < 1) {
            return 0.1;
        } else {
            return window.chart.point2.X();
        }
    }, function() {
        return window.chart.point1.Y() - 700;
    }]], {
        firstArrow: true,
        lastArrow: true,
        color: 'blue',
        strokeWidth: 1,
        dash: 2,
        fixed: true,
        highlight: false,
        visible: function() {
            if (Math.abs(window.chart.point1.Y() - prob.pj) <= 10) {
                return false;
            }
            
            if (window.chart.point2.X() >= 1) {
                return true;
            } else {
                return false;
            }
        }
    });
    
    window.chart.brd.create('text', [function() {
        return window.chart.point2.X() / 2;
    }, function() {
        return window.chart.point1.Y() - 750;
    }, function() {
        return '<span>L<sub>set</sub> = ' + window.chart.point2.X().toFixed(2) + ' m</span>';
    }], {
        anchorX: 'middle',
        anchorY: 'top',
        fontSize: 18,
        fontWeight: 'bold',
        fixed: true,
        highlight: false,
        visible: function() {
            if (Math.abs(window.chart.point1.Y() - prob.pj) <= 10) {
                return false;
            }
            
            if (window.chart.point2.X() >= 1) {
                return true;
            } else {
                return false;
            }
        }
    });
    
    window.chart.point1.on('drag', function() {
        var y = window.chart.point1.Y();
        y = Number(y.toFixed(0));
        window.chart.point1.moveTo([0, y]);
        
        var k = (prob.pj - prob.pi) / 15;
        var middle = (prob.pj + window.chart.point1.Y()) / 2;
        
        var x = (prob.pj - middle) / k;
        window.chart.point2.moveTo([x, middle]);
        
        $("#lset").html(x.toFixed(2));
        $("#dp").val((prob.pj - window.chart.point1.Y()).toFixed(0));
    });
    
    $("#dp").keypress(function(e) {
        if(e.which == 13) {
            $("#dp").css("background-color", "white");
            var dp = Number($("#dp").val());
            
            dp = Number(dp.toFixed(0));
            
            var k = (prob.pj - prob.pi) / 15;
            var delta = 30 * k
            
            if ((dp <= delta) && (dp >= 0)) {
                var y = Number((prob.pj - dp).toFixed(0));
            } else {
                $("#dp").css("background-color", "red");
                return;
            }
            
            window.chart.point1.moveTo([0, y]);
            var middle = (prob.pj + window.chart.point1.Y()) / 2;

            var x = (prob.pj - middle) / k;
            window.chart.point2.moveTo([x, middle]);

            $("#lset").html(x.toFixed(2));
            
            if ($("#dp").val() == "") {
                
            } else {
                $("#dp").val((prob.pj - window.chart.point1.Y()).toFixed(0));
            }
        }
    });
}

function plot_continue() {
    JXG.Options.infobox.fontSize = 0;
    
    window.continue = {};
    
    window.continue.end = 70;
    window.continue.x1 = 7;
    window.continue.x2 = 20;
    window.continue.x3 = 35;
    window.continue.x4 = 50;
    window.continue.x5 = 63;
    
    window.continue.brd = JXG.JSXGraph.initBoard('svg-continue', {
        boundingbox: [-5, 4000, window.continue.end + 5, -5000],
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    window.continue.brd.create('segment', [[0, 2000], [window.continue.end, 2000]], {
        strokeWidth: 2,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.continue.brd.create('segment', [[0, -2000], [window.continue.end, -2000]], {
        strokeWidth: 2,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.continue.brd.create('segment', [[0, 2000], [0, -2000]], {
        strokeWidth: 2,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.continue.brd.create('segment', [[window.continue.end, 2000], [window.continue.end, -2000]], {
        strokeWidth: 2,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.continue.brd.create('segment', [[-4, 0], [window.continue.end + 4, 0]], {
        strokeWidth: 1,
        strokeColor: 'black',
        dash: 1,
        highlight: false,
        fixed: true
    });
    
    window.continue.support = [];
    
    window.continue.support.push(window.continue.brd.create('polygon', [[0, -2000], [0 - 1, -2000 - 800], [0 + 1, -2000 - 800]], {
        fillColor: 'transparent',
        highlight: false,
        fixed: true
    }));
    
    window.continue.support.push(window.continue.brd.create('polygon', [[window.continue.x2, -2000], [window.continue.x2 - 1, -2000 - 800], [window.continue.x2 + 1, -2000 - 800]], {
        fillColor: 'transparent',
        highlight: false,
        fixed: true
    }));
    
    window.continue.support.push(window.continue.brd.create('polygon', [[window.continue.x4, -2000], [window.continue.x4 - 1, -2000 - 800], [window.continue.x4 + 1, -2000 - 800]], {
        fillColor: 'transparent',
        highlight: false,
        fixed: true
    }));
    
    window.continue.support.push(window.continue.brd.create('polygon', [[window.continue.end, -2000], [window.continue.end - 1, -2000 - 800], [window.continue.end + 1, -2000 - 800]], {
        fillColor: 'transparent',
        highlight: false,
        fixed: true
    }));
    
    window.continue.support.forEach(function(ele, idx, arr) {
        ele.vertices.forEach(function(e) {
            e.setAttribute({visible: false});
        });
        
        ele.borders.forEach(function(e) {
            e.setAttribute({
                strokeWidth: 2,
                strokeColor: 'black',
                highlight: false,
                fixed: true
            });
        });
    });
    
    window.continue.glider1 = window.continue.brd.create('segment', [[window.continue.x1, -500], [window.continue.x1, -1400]], {
        visible: false
    });
    
    window.continue.glider2 = window.continue.brd.create('segment', [[window.continue.x2, 500], [window.continue.x2, 1400]], {
        visible: false
    });
    
    window.continue.glider3 = window.continue.brd.create('segment', [[window.continue.x3, -500], [window.continue.x3, -1400]], {
        visible: false
    });
    
    window.continue.glider4 = window.continue.brd.create('segment', [[window.continue.x4, 500], [window.continue.x4, 1400]], {
        visible: false
    });
    
    window.continue.glider5 = window.continue.brd.create('segment', [[window.continue.x5, -500], [window.continue.x5, -1400]], {
        visible: false
    });
    
    window.continue.glidee0 = window.continue.brd.create('point', [0, 0], {
        visible: false
    });
    
    window.continue.glidee1 = window.continue.brd.create('glider', [window.continue.x1, -700, window.continue.glider1], {
        name: '',
        size: 3,
        fillColor: 'blue',
        strokeColor: 'blue'
    });
    
    window.continue.glidee2 = window.continue.brd.create('glider', [window.continue.x2, 700, window.continue.glider2], {
        name: '',
        size: 3,
        fillColor: 'blue',
        strokeColor: 'blue'
    });
    
    window.continue.glidee3 = window.continue.brd.create('glider', [window.continue.x3, -700, window.continue.glider3], {
        name: '',
        size: 3,
        fillColor: 'blue',
        strokeColor: 'blue'
    });
    
    window.continue.glidee4 = window.continue.brd.create('glider', [window.continue.x4, 700, window.continue.glider4], {
        name: '',
        size: 3,
        fillColor: 'blue',
        strokeColor: 'blue'
    });
    
    window.continue.glidee5 = window.continue.brd.create('glider', [window.continue.x5, -700, window.continue.glider5], {
        name: '',
        size: 3,
        fillColor: 'blue',
        strokeColor: 'blue'
    });
    
    window.continue.glidee6 = window.continue.brd.create('point', [window.continue.end, 0], {
        visible: false
    });
    
    window.continue.control = [window.continue.glidee0, window.continue.glidee1, window.continue.glidee2, window.continue.glidee3, window.continue.glidee4, window.continue.glidee5, window.continue.glidee6];
    
    window.continue.control.forEach(function(ele, idx, arr) {
        ele.on('drag', function() {
            var y = ele.Y();
            y = Number(y.toFixed(0));
            var remaider = Math.abs(y) % 10;
            y = ((y > 0) ? (y - remaider) : (y + remaider));
            
            ele.moveTo([ele.X(), y]);
            
            if (idx == 1) {
                vm.e1 = y;
            } else if (idx == 2) {
                arr[4].moveTo([ele.X(), y]);
                vm.e2 = y;
                vm.e4 = y;
            } else if (idx == 3) {
                vm.e3 = y;
            } else if (idx == 4) {
                arr[2].moveTo([ele.X(), y]);
                vm.e2 = y;
                vm.e4 = y;
            } else if (idx == 5) {
                vm.e5 = y;
            }
        });
    });
    
    showLength();
    showCurve();
}

function showLength() {
    window.continue.control.forEach(function(ele, idx, arr) {
        window.continue.brd.create('segment', [ele, [ele.X(), -3500]], {
            strokeWidth: 1,
            strokeColor: 'black',
            dash: 1,
            highlight: false,
            fixed: true
        });
    });
    
    [0, 7, 20, 35, 50, 63, 70].forEach(function(ele, idx, arr) {
        if (ele != 70) {
            window.continue.brd.create('text', [(arr[idx] + arr[idx + 1]) / 2, -3500, '<span style="font-style: normal; font-weight: bold;">' + (arr[idx + 1] - arr[idx]).toFixed(0) + '</span>'], {
                anchorX: 'middle',
                anchorY: 'middle',
                fontSize: 16,
                highlight: false,
                fixed: true
            });
        }
        
        window.continue.brd.create('text', [ele, -3800, '<span style="font-style: italic; font-weight: bold;">' + String.fromCharCode(65 + idx) + '</span>'], {
            anchorX: 'middle',
            anchorY: 'middle',
            fontSize: 18,
            highlight: false,
            fixed: true
        });
    });
}

function showCurve() {
    var c11 = window.continue.brd.create('point', [function() {
        return window.continue.glidee1.X() - 3;
    }, function () {
        return window.continue.glidee1.Y();
    }], {
        visible: false
    });
    
    var c12 = window.continue.brd.create('point', [function() {
        return window.continue.glidee1.X() - 1;
    }, function () {
        return window.continue.glidee1.Y();
    }], {
        visible: false
    });
    
    var c1 = window.continue.brd.create('curve', JXG.Math.Numerics.bezier([window.continue.glidee0, c11, c12, window.continue.glidee1]), {
        strokeColor: 'blue',
        strokeWidth: 3,
        highlight: false,
        fixed: true
    });
    
    var c21 = window.continue.brd.create('point', [function() {
        return (window.continue.glidee1.X() + window.continue.glidee2.X()) / 2;
    }, function () {
        return window.continue.glidee1.Y();
    }], {
        visible: false
    });
    
    var c22 = window.continue.brd.create('point', [function() {
        return (window.continue.glidee1.X() + window.continue.glidee2.X()) / 2;
    }, function () {
        return window.continue.glidee2.Y();
    }], {
        visible: false
    });
    
    var c2 = window.continue.brd.create('curve', JXG.Math.Numerics.bspline([window.continue.glidee1, c21, c22, window.continue.glidee2], 4), {
        strokeColor: 'blue',
        strokeWidth: 3,
        highlight: false,
        fixed: true
    });
    
    var c31 = window.continue.brd.create('point', [function() {
        return (window.continue.glidee2.X() + window.continue.glidee3.X()) / 2;
    }, function () {
        return window.continue.glidee2.Y();
    }], {
        visible: false
    });
    
    var c32 = window.continue.brd.create('point', [function() {
        return (window.continue.glidee2.X() + window.continue.glidee3.X()) / 2;
    }, function () {
        return window.continue.glidee3.Y();
    }], {
        visible: false
    });
    
    var c3 = window.continue.brd.create('curve', JXG.Math.Numerics.bspline([window.continue.glidee2, c31, c32, window.continue.glidee3], 4), {
        strokeColor: 'blue',
        strokeWidth: 3,
        highlight: false,
        fixed: true
    });
    
    var c41 = window.continue.brd.create('point', [function() {
        return (window.continue.glidee3.X() + window.continue.glidee4.X()) / 2;
    }, function () {
        return window.continue.glidee3.Y();
    }], {
        visible: false
    });
    
    var c42 = window.continue.brd.create('point', [function() {
        return (window.continue.glidee3.X() + window.continue.glidee4.X()) / 2;
    }, function () {
        return window.continue.glidee4.Y();
    }], {
        visible: false
    });
    
    var c4 = window.continue.brd.create('curve', JXG.Math.Numerics.bspline([window.continue.glidee3, c41, c42, window.continue.glidee4], 4), {
        strokeColor: 'blue',
        strokeWidth: 3,
        highlight: false,
        fixed: true
    });
    
    var c51 = window.continue.brd.create('point', [function() {
        return (window.continue.glidee4.X() + window.continue.glidee5.X()) / 2;
    }, function () {
        return window.continue.glidee4.Y();
    }], {
        visible: false
    });
    
    var c52 = window.continue.brd.create('point', [function() {
        return (window.continue.glidee4.X() + window.continue.glidee5.X()) / 2;
    }, function () {
        return window.continue.glidee5.Y();
    }], {
        visible: false
    });
    
    var c5 = window.continue.brd.create('curve', JXG.Math.Numerics.bspline([window.continue.glidee4, c51, c52, window.continue.glidee5], 4), {
        strokeColor: 'blue',
        strokeWidth: 3,
        highlight: false,
        fixed: true
    });
    
    var c61 = window.continue.brd.create('point', [function() {
        return window.continue.glidee5.X() + 1;
    }, function () {
        return window.continue.glidee5.Y();
    }], {
        visible: false
    });
    
    var c62 = window.continue.brd.create('point', [function() {
        return window.continue.glidee5.X() + 3;
    }, function () {
        return window.continue.glidee5.Y();
    }], {
        visible: false
    });
    
    var c6 = window.continue.brd.create('curve', JXG.Math.Numerics.bezier([window.continue.glidee5, c61, c62, window.continue.glidee6]), {
        strokeColor: 'blue',
        strokeWidth: 3,
        highlight: false,
        fixed: true
    });
    
    window.curve = [c2, c3, c4, c5];
}

function showPoints() {
    var e1 = Math.abs(vm.e1);
    var e2 = Math.abs(vm.e2);
    var e3 = Math.abs(vm.e3);
    var e4 = Math.abs(vm.e4);
    var e5 = Math.abs(vm.e5);
    
    window.points = {};
    window.points.x = [];
    window.points.x.push(Number((7 + 13*e2/(e1 + e2)).toFixed(2)));
    window.points.x.push(Number((7 + 13 + 15*e3/(e2 + e3)).toFixed(2)));
    window.points.x.push(Number((7 + 13 + 15 + 15*e4/(e3 + e4)).toFixed(2)));
    window.points.x.push(Number((7 + 13 + 15 + 15 + 13*e5/(e4 + e5)).toFixed(2)));
    
    vm.x1 = window.points.x[0];
    vm.x2 = window.points.x[1];
    vm.x3 = window.points.x[2];
    vm.x4 = window.points.x[3];
    
    for (var i = 0; i < 4; i++) {
        var line = window.continue.brd.create('line', [[window.points.x[i], -5000], [window.points.x[i], 4000]], {
            visible: false
        });
        
        window.continue.brd.create('intersection', [window.curve[i], line, 0], {
            size: 2,
            fillColor: 'black',
            strokeColor: 'black',
            name: "<span style='font-weight: bold;'>P<sub>" + (i+1).toString() + "</sub></p>",
            highlight: false,
            fixed: true
        });
    }
    
    vm.s0 = Number((2 * (vm.e1 - 0) / 7 / 1000).toFixed(3));
    vm.s1 = Number((2 * (vm.e2 - vm.e1) / 13 / 1000).toFixed(3));
    vm.s2 = Number((2 * (vm.e3 - vm.e2) / 15 / 1000).toFixed(3));
    vm.s3 = Number((2 * (vm.e4 - vm.e3) / 15 / 1000).toFixed(3));
    vm.s4 = Number((2 * (vm.e5 - vm.e4) / 13 / 1000).toFixed(3));
    vm.s5 = Number((2 * (0 - vm.e5) / 7 / 1000).toFixed(3));
}

function partition() {
    window.continue.control.forEach(function(ele, idx, arr) {
        ele.setAttribute({visible: false});
    });
}

function plotLoss() {
    $("#svg-loss").html("");
    var inputs = $('#calculation td[data-col="4"]').find("input");
    var friction = [3906];
    
    for (var i = 0; i < inputs.length; i++) {
        var in1 = inputs.eq(i).val();
        in1 = Number(in1);
        friction.push(in1);
    }
    
    var pX = [0, 7, vm.x1, 20, vm.x2, 35, vm.x3, 50, vm.x4, 63, 70];
    
    var max = 4200;
    var min = Math.max(friction[10] - (friction[6] - friction[10]), 0);
    
    JXG.Options.infobox.fontSize = 0;
    
    window.loss = {};
    
    var offsetX = 10;
    var offsetY = 100;
    
    window.loss.brd = JXG.JSXGraph.initBoard('svg-loss', {
        boundingbox: [-offsetX, max + offsetY, 70 + offsetX, min - offsetY],  // pi max 3906
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    var pointList = [];
    var nameList = ['A', 'B', 'P1', 'C', 'P2', 'D', 'P3', 'E', 'P4', 'F', 'G'];
    
    pX.forEach(function(ele, idx, arr) {
        pointList.push(window.loss.brd.create("point", [ele, friction[idx]], {
            size: 2,
            name: nameList[idx],
            fillColor: 'black',
            strokeColor: 'transparent',
            highlight: false,
            fixed: true
        }));
    });
    
    pointList.forEach(function(ele, idx, arr) {
        if (idx != (arr.length - 1)) {
            window.loss.brd.create("segment", [arr[idx], arr[idx + 1]], {
                strokeColor: 'blue',
                strokeWidth: 3,
                highlight: false,
                fixed: true
            })
        }
    });
    
    window.loss.brd.create('arrow', [[0, min], [0, max + offsetY]], {
        strokeWidth: 3,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.loss.brd.create('arrow', [[0, min], [70 + offsetX, min]], {
        strokeWidth: 3,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.loss.brd.create('text', [70, min, 'Distance from left end'], {
        anchorX: 'right',
        anchorY: 'bottom',
        fontSize: 18,
        fontWeight: 'bold',
        fixed: true,
        highlight: false
    });
    
    window.loss.brd.create('text', [offsetX / 2, max, 'P (kN)'], {
        anchorX: 'left',
        anchorY: 'top',
        fontSize: 18,
        fontWeight: 'bold',
        fixed: true,
        highlight: false
    });
    
    window.loss.brd.create('text', [0 - offsetX/5, friction[0], friction[0].toString()], {
        anchorX: 'right',
        anchorY: 'middle',
        fontSize: 16,
        fontWeight: 'bold',
        fixed: true,
        highlight: false
    });
}