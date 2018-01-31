function changeColor(e) {
    var color = $(e.target).val();
    $("body").css("background-color", color.toString());
}

function init() {
    plot_beam();
}

function plot_beam() {
    JXG.Options.infobox.fontSize = 0;
    
    window.plot = {};
    
    window.plot.brd = JXG.JSXGraph.initBoard('svg-profile', {
        boundingbox: [-1, 120, 5, -120],
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    window.plot.glider_line = window.plot.brd.create('segment', [[4.5, -75], [4.5, 25]], {
        strokeColor: 'black',
        strokeWidth: 2,
        dash: 2,
        visible: false,
        fixed: true
    });
    
    window.plot.glider = window.plot.brd.create('glider', [4.5, -75, window.plot.glider_line], {
        size: 4,
        fillColor: 'blue',
        strokeColor: 'blue',
        name: '',
        visible: false
    });
    
    window.plot.glider.on('drag', function() {
        var x = window.plot.glider.X();
        var y = window.plot.glider.Y();
        y = y - y%5;
        y = Number(y.toFixed(0));
        
        depth = 75 - y;
        window.plot.glider.moveTo([x, y]);
        
        vm.d = depth;
    });
    
    window.plot.profile = window.plot.brd.create('polygon', [[0, 75], [4, 75], [4, function() {
        return window.plot.glider.Y();
    }], [0, function() {
        return window.plot.glider.Y();
    }]], {
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
            strokeWidth: 4,
            highlight: false,
            fixed: true
        });
    });
    
    window.plot.width = window.plot.brd.create('segment', [[0, 95], [4, 95]], {
        strokeColor: 'black',
        strokeWidth: 2,
        firstArrow: true,
        lastArrow: true,
        fixed: true
    });
    
    window.plot.brd.create('text', [2, 100, '1200mm'], {
        anchorX: 'middle', 
        anchorY: 'bottom', 
        fontSize: 18, 
        fontWeight: 'bold', 
        highlight: false,
        fixed: true
    });
    
    window.plot.height = window.plot.brd.create('segment', [[-0.2, 75], [-0.2, function() {
        return window.plot.glider.Y();
    }]], {
        strokeColor: 'black',
        strokeWidth: 2,
        firstArrow: true,
        lastArrow: true,
        fixed: true
    });
    
    window.plot.height_text = window.plot.brd.create('text', [-0.3, function() {
        return (75 + window.plot.glider.Y()) / 2;
    }, function() {
        return (vm.d).toFixed(0) + "mm";
    }], {
        anchorX: 'right', 
        anchorY: 'middle', 
        fontSize: 18, 
        fontWeight: 'bold', 
        highlight: false,
        fixed: true,
        visible: false
    });
    
    window.plot.brd.create('text', [2, -120, 'Plank X-section'], {
        anchorX: 'middle', 
        anchorY: 'bottom', 
        fontSize: 20, 
        fontWeight: 'bold', 
        highlight: false,
        fixed: true
    });
    
    [0.5, 1, 1.5, 2, 2.5, 3, 3.5].forEach(function(ele, idx, arr) {
        window.plot.brd.create('point', [ele, function() {
            return (75 + window.plot.glider.Y()) / 2 - vm.e_limit;
        }], {
            size: 2,
            fillColor: 'black',
            strokeColor: 'black',
            name: '',
            visible: true,
            fixed: true
        })
    });
    
    window.plot.neural = window.plot.brd.create('segment', [[-0.1, function() {
        return (75 + window.plot.glider.Y()) / 2;
    }], [4.1, function() {
        return (75 + window.plot.glider.Y()) / 2;
    }]], {
        strokeColor: 'black',
        strokeWidth: 2,
        dash: 2,
        visible: true,
        fixed: true
    });
}

function show_handle() {
    window.plot.glider_line.setAttribute({visible: true});
    window.plot.glider.setAttribute({visible: true});
    window.plot.height_text.setAttribute({visible: true});
}

function hide_handle() {
    window.plot.glider_line.setAttribute({visible: false});
    window.plot.glider.setAttribute({visible: false});
    window.plot.height_text.setAttribute({visible: false});
}