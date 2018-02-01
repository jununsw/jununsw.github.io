function changeColor(e) {
    var color = $(e.target).val();
    $("body").css("background-color", color.toString());
}

function init() {
    plot_diagram();
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
        
        // change diagram
        
        // line A
        window.diagram.linaA_dot.point1.moveTo([1/vm.alpha, 0]);
        window.diagram.linaA_dot.point2.moveTo([0, vm.p1(0)]);
        
        window.diagram.linaA.point1.moveTo([1/vm.alpha, 0]);
        
        // line B
        window.diagram.linaB.point1.moveTo([-1/vm.alpha, 0]);
        window.diagram.linaB.point2.moveTo([0, vm.p2(0)]);
        
        // line C
        window.diagram.linaC.point1.moveTo([-1/vm.alpha, 0]);
        window.diagram.linaC.point2.moveTo([0, vm.p3(0)]);
        
        // line D
        window.diagram.linaD.point1.moveTo([1/vm.alpha, 0]);
        window.diagram.linaD.point2.moveTo([0, vm.p4(0)]);
        
        // line Ae
        window.diagram.linaAe_dot.point1.moveTo([1/vm.alpha, 0]);
        window.diagram.linaAe_dot.point2.moveTo([0, vm.p1e(0)]);
        
        window.diagram.linaAe.point1.moveTo([1/vm.alpha, 0]);
        
        // line Be
        window.diagram.linaBe.point1.moveTo([-1/vm.alpha, 0]);
        window.diagram.linaBe.point2.moveTo([0, vm.p2e(0)]);
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

function plot_diagram() {
    window.diagram = {};
    
    window.diagram.brd = JXG.JSXGraph.initBoard('svg-diagram', {
        boundingbox: [-40, Number(vm.p1(100).toFixed(0)) + 1, 100, -1],
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: true,
        zoom: {
            factorX: 1.25,
            factorY: 1.25,
            wheel: true,
            needshift: true,
            eps: 0.1
	    }
    });
    
    window.diagram.checkBox = window.diagram.brd.create('checkbox', [-35, 5.5, '<span> for M<sub>o</sub>=0</span>'], {
        fontSize: 16,
        fontWeight: 'bold',
        fixed: true
    });
    
    window.diagram.brd.create('text', [5, 5.5, '<span> 1/P<sub>i</sub> (10<sup>-6</sup> N<sup>-1</sup>)</span>'], {
        anchorX: 'left',
        anchorY: 'bottom',
        fontSize: 20,
        fontWeight: 'bold',
        fixed: true
    });
    
    window.diagram.brd.create('text', [100, 0.1, '<span> e (mm)</span>'], {
        anchorX: 'right',
        anchorY: 'bottom',
        fontSize: 20,
        fontWeight: 'bold',
        fixed: true
    });
    
    window.diagram.linaA_dot = window.diagram.brd.create('line', [[1/vm.alpha, 0], [0, vm.p1(0)]], {
        strokeColor: 'green',
        strokeWidth: 2,
        straightFirst: false,
        visible: false,
        fixed: true
    });
    
    window.diagram.linaB = window.diagram.brd.create('line', [[-1/vm.alpha, 0], [0, vm.p2(0)]], {
        strokeColor: 'red',
        strokeWidth: 2,
        straightFirst: false,
        visible: true,
        fixed: true,
        highlight: true,
    });
    
    window.diagram.linaC = window.diagram.brd.create('line', [[-1/vm.alpha, 0], [0, vm.p3(0)]], {
        strokeColor: 'blue',
        strokeWidth: 2,
        straightFirst: false,
        visible: true,
        fixed: true,
        highlight: true,
    });
    
    window.diagram.linaD = window.diagram.brd.create('line', [[1/vm.alpha, 0], [0, vm.p4(0)]], {
        strokeColor: 'yellow',
        strokeWidth: 2,
        straightFirst: false,
        visible: true,
        fixed: true,
        highlight: true,
    });
    
    window.diagram.pointAC = window.diagram.brd.create('intersection', [window.diagram.linaA_dot, window.diagram.linaC, 0], {
        visible: false                                               
    });
    
    window.diagram.linaA = window.diagram.brd.create('line', [[1/vm.alpha, 0], window.diagram.pointAC], {
        strokeColor: 'green',
        strokeWidth: 2,
        straightFirst: false,
        visible: true,
        fixed: true,
        highlight: true,
    });
    
    window.diagram.linaAe_dot = window.diagram.brd.create('line', [[1/vm.alpha, 0], [0, vm.p1e(0)]], {
        strokeColor: 'green',
        strokeWidth: 2,
        straightFirst: false,
        visible: false,
        fixed: true
    });
    
    window.diagram.linaBe = window.diagram.brd.create('line', [[-1/vm.alpha, 0], [0, vm.p2e(0)]], {
        strokeColor: 'red',
        strokeWidth: 2,
        straightFirst: false,
        dash: 2,
        visible: function() {
            return window.diagram.checkBox.Value();
        },
        fixed: true,
        highlight: true,
    });
    
    window.diagram.pointACe = window.diagram.brd.create('intersection', [window.diagram.linaAe_dot, window.diagram.linaC, 0], {
        visible: false                                               
    });
    
    window.diagram.linaAe = window.diagram.brd.create('line', [[1/vm.alpha, 0], window.diagram.pointACe], {
        strokeColor: 'green',
        strokeWidth: 2,
        straightFirst: false,
        dash: 2,
        visible: function() {
            return window.diagram.checkBox.Value();
        },
        fixed: true,
        highlight: true,
    });
    
    window.diagram.trial = window.diagram.brd.create('point', [0, 0], {
        size: 5,
        strokeColor: 'black',
        fillColor: 'blue',
        name: '',
        highlight: false,
        fixed: true,
        visible: false
    });
}

function show_pe(e) {
    var x = Number($("#try-pi").val());
    var y = Number($("#try-e").val());
    
    if (isNaN(x) || isNaN(y) || (x == 0)) {
        return
    } else {
        x = 1 / x;
        x = x * 1e3;
        window.diagram.trial.moveTo([y, x]);
        window.diagram.trial.setAttribute({visible: true});
    }
}