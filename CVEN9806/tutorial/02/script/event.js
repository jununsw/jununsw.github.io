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
        fixed: true
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
        boundingbox: [-0.5, 5000, 4.5, -500],
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: true
    });
    
    window.chart.label_x = window.chart.brd.create('text', [2, -500, 'Dist. from left x (m)'], {
        anchorX: 'middle',
        anchorY: 'bottom',
        fontSize: 18,
        fontWeight: 'bold',
        fixed: true,
        highlight: false
    });
    
    window.chart.brd.create('text', [-0.5, 5000, 'P<sub>1</sub>(kN)'], {
        anchorX: 'left',
        anchorY: 'top',
        fontSize: 18,
        fontWeight: 'bold',
        fixed: true,
        highlight: false
    });
    
    window.chart.loss_line = window.chart.brd.create('segment', [[0, prob.pj], [4, prob.pi]], {
        color: 'blue',
        strokeWidth: 3,
        dash: 2,
        fixed: true,
        highlight: false
    });
    
    window.chart.glider = window.chart.brd.create('segment', [[0, prob.pj], [0, function() {
        var k = (prob.pj - prob.pi) / 4;
        var delta = 8 * k;
        
        return prob.pj - delta;
    }]], {
        visible: false
    });
    
    window.chart.point1 = window.chart.brd.create('glider', [0, prob.pj, window.chart.glider], {
        size: 3,
        strokeColor: 'blue',
        strokeWidth: 1,
        fillColor: 'blue',
        highlight: false,
        name: ''
    });
    
    window.chart.point2 = window.chart.brd.create('glider', [4, prob.pi, window.chart.loss_line], {
        size: 0,
        strokeColor: 'blue',
        strokeWidth: 1,
        fillColor: 'blue',
        highlight: false,
        fixed: true,
        name: ''
    });
    
    window.chart.brd.create('segment', [window.chart.point1, window.chart.point2], {
        color: 'blue',
        strokeWidth: 3,
        fixed: true,
        highlight: false
    });
    
    window.chart.brd.create('segment', [[4, prob.pi], window.chart.point2], {
        color: 'blue',
        strokeWidth: 3,
        fixed: true,
        highlight: false
    });
    
    window.chart.point1.on('drag', function() {
        var y = window.chart.point1.Y();
        y = Number(y.toFixed(0));
        window.chart.point1.moveTo([0, y]);
        
        var k = (prob.pj - prob.pi) / 4;
        var middle = (prob.pj + window.chart.point1.Y()) / 2;
        
        var x = (prob.pj - middle) / k;
        window.chart.point2.moveTo([x, middle]);
        
        $("#lset").html(x.toFixed(2));
        $("#dp").val((prob.pj - window.chart.point1.Y()).toFixed(0));
    });
    
    $("#dp").keypress(function(e) {
        if(e.which == 13) {
            var dp = Number($("#dp").val());
            
            dp = Number(dp.toFixed(0));
            
            var k = (prob.pj - prob.pi) / 4;
            var delta = 8 * k
            
            if (dp <= delta) {
                var y = Number((prob.pj - dp).toFixed(0));
            } else {
                return;
            }
            
            window.chart.point1.moveTo([0, y]);
            var middle = (prob.pj + window.chart.point1.Y()) / 2;

            var x = (prob.pj - middle) / k;
            window.chart.point2.moveTo([x, middle]);

            $("#lset").html(x.toFixed(2));
            $("#dp").val((prob.pj - window.chart.point1.Y()).toFixed(0));
        }
    });
}