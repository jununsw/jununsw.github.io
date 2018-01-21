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
        highlight: false
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
            highlight: false
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
        highlight: false
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
        
        var slope = vm.slope(window.plot.slider.Value());
        $("#theta").html(-slope.toFixed(3));
        
        var alpha = vm.alpha(window.plot.slider.Value());
        $("#alpha").html(alpha.toFixed(3));
    });
    
    window.plot.tendon = window.plot.brd.create('curve', [function(t) {
        return t;
    }, function(t) {
        return (-4 * window.plot.keypoint[1].Y() / prob.span / prob.span) * Math.pow(t - prob.span/2, 2) + window.plot.keypoint[1].Y();
    }, 0, prob.span], {
        strokeWidth: 3,
        strokeColor: 'blue',
        highlight: false
    });
}

function createSlider() {
    window.plot.slider = window.plot.brd.create('slider', [[0, -600], [prob.span, -600], [0, 0, prob.span]], {
        snapWidth: 0.1,
        name: 'x'
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
        color: 'red'
    });
    
    window.plot.slider.on("drag", function() {
        var slope = vm.slope(window.plot.slider.Value());
        $("#theta").html(-slope.toFixed(3));
        
        var alpha = vm.alpha(window.plot.slider.Value());
        $("#alpha").html(alpha.toFixed(3));
    });
}