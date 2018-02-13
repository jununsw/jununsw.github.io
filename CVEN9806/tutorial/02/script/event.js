function init() {
    plot_profile();
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