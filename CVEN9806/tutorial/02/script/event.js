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
    window.continue.x1 = 10;
    window.continue.x2 = 30;
    window.continue.x3 = 50;
    
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
    
    window.continue.brd.create('segment', [[window.continue.end, 3000], [window.continue.end, -2000]], {
        strokeWidth: 2,
        strokeColor: 'black',
        dash: 2,
        highlight: false,
        fixed: true
    });
    
    window.continue.brd.create('segment', [[0, 0], [window.continue.end + 4, 0]], {
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
    
    window.continue.glider4 = window.continue.brd.create('segment', [[window.continue.end, 500], [window.continue.end, 1400]], {
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
    
    window.continue.glidee4 = window.continue.brd.create('glider', [window.continue.end, 700, window.continue.glider4], {
        name: '',
        size: 3,
        fillColor: 'blue',
        strokeColor: 'blue'
    });
    
    
    
    window.continue.glidee1.on('drag', function() {
        var y = window.continue.glidee1.Y();
        y = Number(y.toFixed(0));
        y = y + (-y)%10;
        window.continue.glidee1.moveTo([window.continue.glidee1.X(), y]);
        window.continue.glidee2.moveTo([window.continue.glidee2.X(), -y]);
        window.continue.glidee3.moveTo([window.continue.glidee3.X(), y]);
        window.continue.glidee4.moveTo([window.continue.glidee4.X(), -y]);
        
        vm.e = -y;
    });
    
    window.continue.glidee3.on('drag', function() {
        var y = window.continue.glidee3.Y();
        y = Number(y.toFixed(0));
        y = y + (-y)%10;
        window.continue.glidee1.moveTo([window.continue.glidee1.X(), y]);
        window.continue.glidee2.moveTo([window.continue.glidee2.X(), -y]);
        window.continue.glidee3.moveTo([window.continue.glidee3.X(), y]);
        window.continue.glidee4.moveTo([window.continue.glidee4.X(), -y]);
        
        vm.e = -y;
    });
    
    window.continue.glidee2.on('drag', function() {
        var y = window.continue.glidee2.Y();
        y = Number(y.toFixed(0));
        y = y + (y)%10;
        window.continue.glidee1.moveTo([window.continue.glidee1.X(), -y]);
        window.continue.glidee2.moveTo([window.continue.glidee2.X(), y]);
        window.continue.glidee3.moveTo([window.continue.glidee3.X(), -y]);
        window.continue.glidee4.moveTo([window.continue.glidee4.X(), y]);
        
        vm.e = y;
    });
    
    window.continue.glidee4.on('drag', function() {
        var y = window.continue.glidee4.Y();
        y = Number(y.toFixed(0));
        y = y + (y)%10;
        window.continue.glidee1.moveTo([window.continue.glidee1.X(), -y]);
        window.continue.glidee2.moveTo([window.continue.glidee2.X(), y]);
        window.continue.glidee3.moveTo([window.continue.glidee3.X(), -y]);
        window.continue.glidee4.moveTo([window.continue.glidee4.X(), y]);
        
        vm.e = y;
    });
    
    window.continue.brd.create('curve', [function(t) {
        return t;
    }, function(t) {
        var a = vm.e;
        return -a * Math.sin(t * 2 * Math.PI / 40);
    }, 0, window.continue.end], {
        strokeColor: 'blue',
        strokeWidth: 3,
        highlight: false,
        fixed: true
    });
}

function partition() {
    [window.continue.glidee0, window.continue.glidee1, window.continue.glidee2, window.continue.glidee3, window.continue.glidee4].forEach(function(ele, idx, arr) {
        ele.setAttribute({visible: false});
        
        window.continue.brd.create('segment', [ele, [ele.X(), -3500]], {
            strokeWidth: 1,
            strokeColor: 'black',
            dash: 1,
            highlight: false,
            fixed: true
        });
    });
    
    [20, 40, 60].forEach(function(ele, idx, arr) {
        window.continue.glidee0 = window.continue.brd.create('point', [ele, 0], {
            name: '',
            size: 3,
            fillColor: 'blace',
            strokeColor: 'transparent',
            fixed: true,
            highlight: false
        });
        
        window.continue.brd.create('segment', [[ele, 0], [ele, -3500]], {
            strokeWidth: 1,
            strokeColor: 'black',
            dash: 1,
            highlight: false,
            fixed: true
        });
    });
    
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(function(ele, idx, arr) {
        if (ele != 8) {
            window.continue.brd.create('text', [(ele - 1)*10 + 5, -3500, '10m'], {
                anchorX: 'middle',
                anchorY: 'middle',
                fontSize: 16,
                highlight: false,
                fixed: true
            });
        }
        
        window.continue.brd.create('text', [(ele - 1)*10, -4000, '<span style="font-style: italic; font-weight: bold;">' + String.fromCharCode(64 + ele) + '</span>'], {
            anchorX: 'middle',
            anchorY: 'middle',
            fontSize: 18,
            highlight: false,
            fixed: true
        });
    });
}