function init() {
    plot_chart();
    plot_distrib();
    plot_fine();
    
    $(document).keydown(function(event) {
        if (event.which == "17") {
            prob.controls.forEach(function(ele) {
                ele.setAttribute({
                    visible: true
                });
            });
        }
    });
    
    $(document).keyup(function(event) {
        prob.controls.forEach(function(ele) {
            ele.setAttribute({
                visible: false
            });
        });
    });
}

function plot_chart() {
    JXG.Options.infobox.fontSize = 0;
    
    prob.distribution = JXG.JSXGraph.initBoard('distribution-plot', {
        boundingbox: prob.boundingbox,
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    var distribution_area = prob.distribution.create('polygon', [[-4, 0], [-4, 100], [2, 100], [2, 0]], {
        fillColor: 'transparent',
        highlight: false
    });
    
    distribution_area.vertices.forEach(function(ele) {
        ele.setAttribute({
            visible: false
        });
    });

    distribution_area.borders.forEach(function(ele) {
        ele.setAttribute({
            strokeColor: 'black',
            strokeWidth: 3,
            highlight: false,
            fixed: true
        });
    });
    
    var y = 10;
    while (y < 100) {
        prob.distribution.create('line', [[-4, y], [2, y]], {strokeColor: 'black', strokeWidth: 1, straightFirst: false, straightLast: false, highlight: false, dash: 1, fixed: true});
        y += 10;
    }
    
    var scale = [2, 4, 6, 8, 10];
    var factor = [0.0001, 0.001, 0.01, 0.1, 1, 10];
    window.x = [];
    factor.forEach(function(ele, idx, arr) {
        scale.forEach(function(e, i, a) {
            x.push(Number((ele * e).toExponential(1)));
        })
    });
    x.forEach(function(ele, idx, arr) {
        if (ele < 100) {
            prob.distribution.create('line', [[Math.log10(ele), 0], [Math.log10(ele), 100]], {strokeColor: 'black', strokeWidth: 1, straightFirst: false, straightLast: false, highlight: false, dash: 1, fixed: true});
        }
    });
    
    [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].forEach(function(ele, idx, arr) {
        prob.distribution.create('text', [-4.2, ele, ele.toString()], {anchorX: 'right', anchorY: 'middle', fontSize: 20, fontWeight: 'bold', highlight: false, fixed: true});
    });
    
    factor.forEach(function(ele, idx, arr) {
        prob.distribution.create('text', [Math.log10(ele), -2, ele.toString()], {anchorX: 'middle', anchorY: 'top', fontSize: 20, fontWeight: 'bold', highlight: false, fixed: true});
        prob.distribution.create('line', [[Math.log10(ele), 100], [Math.log10(ele), -2]], {strokeColor: 'black', strokeWidth: 2, straightFirst: false, straightLast: false, highlight: false, fixed: true});
    });
    prob.distribution.create('text', [2, -2, '100'], {anchorX: 'middle', anchorY: 'top', fontSize: 20, fontWeight: 'bold', highlight: false, fixed: true});
    
    prob.distribution.create('line', [[-4, 100], [-4, -2]], {strokeColor: 'black', strokeWidth: 3, straightFirst: false, straightLast: false, highlight: false, fixed: true});
    prob.distribution.create('line', [[2, 100], [2, -2]], {strokeColor: 'black', strokeWidth: 3, straightFirst: false, straightLast: false, highlight: false, fixed: true});
}

function plot_distrib() {
    prob.gliders = [];
    prob.gliders.push(prob.distribution.create('line', [[-4, 0], [2, 0]], {visible: false, straightFirst: false, straightLast: false}));
    prob.gliders.push(prob.distribution.create('line', [[-4, 20], [2, 20]], {visible: false, straightFirst: false, straightLast: false}));
    prob.gliders.push(prob.distribution.create('line', [[-4, 50], [2, 50]], {visible: false, straightFirst: false, straightLast: false}));
    prob.gliders.push(prob.distribution.create('line', [[-4, 80], [2, 80]], {visible: false, straightFirst: false, straightLast: false}));
    prob.gliders.push(prob.distribution.create('line', [[-4, 100], [2, 100]], {visible: false, straightFirst: false, straightLast: false}));
    
    prob.controls = [];
    prob.controls.push(prob.distribution.create('glider', [prob.controlX[0], 0, prob.gliders[0]], {
        name: '',
        strokeColor: 'transparent',
        fillColor: 'red',
        size: 4,
        visible: false
    }));
    prob.controls.push(prob.distribution.create('glider', [prob.controlX[1], 20, prob.gliders[1]], {
        name: '',
        strokeColor: 'transparent',
        fillColor: 'purple',
        size: 4,
        visible: false
    }));
    prob.controls.push(prob.distribution.create('glider', [prob.controlX[2], 50, prob.gliders[2]], {
        name: '',
        strokeColor: 'transparent',
        fillColor: 'red',
        size: 4,
        visible: false
    }));
    prob.controls.push(prob.distribution.create('glider', [prob.controlX[3], 80, prob.gliders[3]], {
        name: '',
        strokeColor: 'transparent',
        fillColor: 'purple',
        size: 4,
        visible: false
    }));
    prob.controls.push(prob.distribution.create('glider', [prob.controlX[4], 100, prob.gliders[4]], {
        name: '',
        strokeColor: 'transparent',
        fillColor: 'red',
        size: 4,
        visible: false
    }));
    
    prob.curve = prob.distribution.create('curve', JXG.Math.Numerics.CardinalSpline(prob.controls, 0.5), {
        strokecolor: 'blue',
        strokeWidth: 3,
        highlight: false
    });
    
    prob.controls.forEach(function(ele, idx, arr) {
        ele.on('up', function() {
            prob.controls.forEach(function(e, i, a) {
                prob.controlX[i] = e.X();
            });
        });
    });
    
    prob.controls[0].on('drag', function() {
        var max = -4/8 + prob.controls[4].X()*7/8;
        var ratio1 = (prob.controlX[1] - prob.controlX[0]) / (prob.controlX[4] - prob.controlX[0]);
        var ratio2 = (prob.controlX[2] - prob.controlX[0]) / (prob.controlX[4] - prob.controlX[0]);
        var ratio3 = (prob.controlX[3] - prob.controlX[0]) / (prob.controlX[4] - prob.controlX[0]);
        
        if (prob.controls[0].X() >= max) {
            prob.controls[0].moveTo([max, 0]);
        }
        
        prob.controls[1].moveTo([prob.controls[0].X() + ratio1*(prob.controls[4].X() - prob.controls[0].X()), 20]);
        prob.controls[2].moveTo([prob.controls[0].X() + ratio2*(prob.controls[4].X() - prob.controls[0].X()), 50]);
        prob.controls[3].moveTo([prob.controls[0].X() + ratio3*(prob.controls[4].X() - prob.controls[0].X()), 80]);
    });
    
    prob.controls[1].on('drag', function() {
        var min = prob.controls[0].X()*2/3 + prob.controls[2].X()/3;
        var max = prob.controls[0].X()/3 + prob.controls[2].X()*2/3;
        
        if (prob.controls[1].X() <= min) {
            prob.controls[1].moveTo([min, 20]);
        }
        
        if (prob.controls[1].X() >= max) {
            prob.controls[1].moveTo([max, 20]);
        }
    });
    
    prob.controls[2].on('drag', function() {
        var min = prob.controls[0].X()*7/8 + prob.controls[4].X()/8;
        var max = prob.controls[0].X()/8 + prob.controls[4].X()*7/8;
        
        var ratio1 = (prob.controlX[1] - prob.controlX[0]) / (prob.controlX[2] - prob.controlX[0]);
        var ratio2 = (prob.controlX[3] - prob.controlX[2]) / (prob.controlX[4] - prob.controlX[2]);
        
        if (prob.controls[2].X() <= min) {
            prob.controls[2].moveTo([min, 50]);
        }
        
        if (prob.controls[2].X() >= max) {
            prob.controls[2].moveTo([max, 50]);
        }
        
        prob.controls[1].moveTo([prob.controls[0].X() + ratio1*(prob.controls[2].X() - prob.controls[0].X()), 20]);
        prob.controls[3].moveTo([prob.controls[2].X() + ratio2*(prob.controls[4].X() - prob.controls[2].X()), 80]);
    });
    
    prob.controls[3].on('drag', function() {
        var min = prob.controls[2].X()*2/3 + prob.controls[4].X()/3;
        var max = prob.controls[2].X()/3 + prob.controls[4].X()*2/3;
        
        if (prob.controls[3].X() <= min) {
            prob.controls[3].moveTo([min, 80]);
        }
        
        if (prob.controls[3].X() >= max) {
            prob.controls[3].moveTo([max, 80]);
        }
    });
    
    prob.controls[4].on('drag', function() {
        var min = prob.controls[0].X()*7/8 + 2/8;
        var ratio1 = (prob.controlX[1] - prob.controlX[0]) / (prob.controlX[4] - prob.controlX[0]);
        var ratio2 = (prob.controlX[2] - prob.controlX[0]) / (prob.controlX[4] - prob.controlX[0]);
        var ratio3 = (prob.controlX[3] - prob.controlX[0]) / (prob.controlX[4] - prob.controlX[0]);
        
        if (prob.controls[4].X() <= min) {
            prob.controls[4].moveTo([min, 100]);
        }
        
        prob.controls[1].moveTo([prob.controls[0].X() + ratio1*(prob.controls[4].X() - prob.controls[0].X()), 20]);
        prob.controls[2].moveTo([prob.controls[0].X() + ratio2*(prob.controls[4].X() - prob.controls[0].X()), 50]);
        prob.controls[3].moveTo([prob.controls[0].X() + ratio3*(prob.controls[4].X() - prob.controls[0].X()), 80]);
    });
}

function plot_fine() {
    prob.fine = JXG.JSXGraph.initBoard('fine-plot', {
        boundingbox: [-20, 80, 120, -20],
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    var fine_area = prob.fine.create('polygon', [[0, 0], [100, 0], [100, 60], [0, 60]], {
        fillColor: 'transparent',
        highlight: false
    });
    
    fine_area.vertices.forEach(function(ele) {
        ele.setAttribute({
            visible: false
        });
    });

    fine_area.borders.forEach(function(ele) {
        ele.setAttribute({
            strokeColor: 'black',
            strokeWidth: 3,
            highlight: false, 
            fixed: true
        });
    });
    
    [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].forEach(function(ele, idx, arr) {
        prob.fine.create('line', [[ele, 0], [ele, 2]], {
            strokeColor: 'black',
            strokeWidth: 3,
            highlight: false,
            straightFirst: false, 
            straightLast: false, 
            fixed: true
        });
        prob.fine.create('text', [ele - 2, -1, ele.toString()], {anchorX: 'left', anchorY: 'top', fontSize: 20, highlight: false, fixed: true});
    });
    
    prob.fine.create('text', [50 - 10, -15, 'Liquid Limit'], {anchorX: 'left', anchorY: 'bottom', fontSize: 20, highlight: false, fixed: true});
    
    [0, 10, 20, 30, 40, 50, 60].forEach(function(ele, idx, arr) {
        prob.fine.create('line', [[0, ele], [2, ele]], {
            strokeColor: 'black',
            strokeWidth: 3,
            highlight: false,
            straightFirst: false, 
            straightLast: false, 
            fixed: true
        });
        prob.fine.create('text', [-2, ele + 2.5, ele.toString()], {anchorX: 'right', anchorY: 'top', fontSize: 20, highlight: false, fixed: true});
    });
    
    prob.fine.create('text', [-12, 20, 'Plasticity Index'], {anchorX: 'left', anchorY: 'bottom', fontSize: 20, highlight: false, display: 'internal', rotate: '90', fixed: true});
    
    prob.fine.create('line', [[20, 0], [100, 0.73 * (100 - 20)]], {
        strokeColor: 'blue',
        strokeWidth: 4,
        highlight: false,
        straightFirst: false, 
        straightLast: false,
        fixed: true
    });
    
    prob.fine.create('line', [[50, 0], [50, 60]], {
        strokeColor: 'red',
        strokeWidth: 4,
        highlight: false,
        straightFirst: false, 
        straightLast: false, 
        fixed: true
    });
    
    var clml_area = prob.fine.create('polygon', [[0, 4], [0, 7], [7/0.73 + 20, 7], [4/0.73 + 20, 4]], {
        fillColor: 'red',
        opacity: 0.5,
        highlight: false
    });
    
    clml_area.vertices.forEach(function(ele) {
        ele.setAttribute({
            visible: false
        });
    });

    clml_area.borders.forEach(function(ele) {
        ele.setAttribute({
            strokeColor: 'transparent',
            highlight: false, 
            fixed: true
        });
    });
    
    prob.fine.create('text', [-1, 4 + 1.5, '4'], {anchorX: 'right', anchorY: 'top', fontSize: 12, highlight: false, fixed: true});
    prob.fine.create('text', [-1, 7 + 1.5, '7'], {anchorX: 'right', anchorY: 'top', fontSize: 12, highlight: false, fixed: true});
    
    prob.fine.create('text', [5, 0.00, 'ML'], {anchorX: 'left', anchorY: 'bottom', fontSize: 12, highlight: false, fixed: true});
    prob.fine.create('text', [5, 3.8, 'CL-ML'], {anchorX: 'left', anchorY: 'bottom', fontSize: 12, highlight: false, fixed: true});
    prob.fine.create('text', [20, 30, 'CL'], {anchorX: 'left', anchorY: 'bottom', fontSize: 16, highlight: false, fixed: true});
    prob.fine.create('text', [31, 1, 'ML or OL'], {anchorX: 'left', anchorY: 'bottom', fontSize: 16, highlight: false, fixed: true});
    prob.fine.create('text', [60, 40, 'CH'], {anchorX: 'left', anchorY: 'bottom', fontSize: 16, highlight: false, fixed: true});
    prob.fine.create('text', [70, 10, 'MH or OH'], {anchorX: 'left', anchorY: 'bottom', fontSize: 16, highlight: false, fixed: true});
    
    prob.fine.create('text', [80, 44, 'A-line'], {
        color: 'blue', 
        anchorX: 'left', 
        anchorY: 'bottom', 
        fontSize: 18, 
        highlight: false,
        display: 'internal', 
        fixed: true,
        rotate: (Math.atan(0.73) / Math.PI * 180).toFixed(2)
    });
}

function toggle_confirm(e) {
    var label = $(e.target).html();
    
    if (label == "Confirm") {
        $(e.target).html("Restart").removeClass("btn-primary").addClass("btn-danger");
        
        $(document).trigger("keyup");
        $(document).off("keydown").off("keyup");
        
        $(".main-body").css("display", "block");
        
        calculate();
        
    } else if (label == "Restart") {
        $(e.target).html("Confirm").removeClass("btn-danger").addClass("btn-primary");
        $(".main-body").css("display", "none");
        clear_previous();
        
        $(document).keydown(function(event) {
            if (event.which == "17") {
                prob.controls.forEach(function(ele) {
                    ele.setAttribute({
                        visible: true
                    });
                });
            }
        });

        $(document).keyup(function(event) {
            prob.controls.forEach(function(ele) {
                ele.setAttribute({
                    visible: false
                });
            });
        });
    }
}

function calculate() {
    $(".main-body").css("display", "block");
    $("#fine-plot").css("display", "block");
    
    prob.plot.line75 = prob.distribution.create('line', [[Math.log10(0.075), 0], [Math.log10(0.075), 100]], {
        strokeColor: 'green',
        strokeWidth: 3,
        highlight: false,
        straightFirst: false, 
        straightLast: false,
        fixed: true
    });
    
    prob.plot.d10 = prob.distribution.create('line', [[-4, 10], [2, 10]], {visible: false, straightFirst: false, straightLast: false, fixed: true});
    prob.plot.d30 = prob.distribution.create('line', [[-4, 30], [2, 30]], {visible: false, straightFirst: false, straightLast: false, fixed: true});
    prob.plot.d60 = prob.distribution.create('line', [[-4, 60], [2, 60]], {visible: false, straightFirst: false, straightLast: false, fixed: true});
    
    prob.plot.p10 = prob.distribution.create('intersection', [prob.plot.d10, prob.curve, 0], {
        visible: false,
        name: '',
        strokeColor: 'transparent',
        fillColor: 'red',
        size: 4
    });
    
    prob.plot.p30 = prob.distribution.create('intersection', [prob.plot.d30, prob.curve, 0], {
        visible: false,
        name: '',
        strokeColor: 'transparent',
        fillColor: 'red',
        size: 4
    });
    
    prob.plot.p60 = prob.distribution.create('intersection', [prob.plot.d60, prob.curve, 0], {
        visible: false,
        name: '',
        strokeColor: 'transparent',
        fillColor: 'red',
        size: 4
    });
    
    try {
        prob.plot.p75 = prob.distribution.create('intersection', [prob.plot.line75, prob.curve, 0], {
            name: '',
            strokeColor: 'transparent',
            fillColor: 'blue',
            size: 4
        });
        
        prob.plot.d75 = prob.distribution.create('line', [[-4, prob.plot.p75.Y()], prob.plot.p75], {strokeColor: 'blue', straightFirst: false, straightLast: false, fixed: true, dash: 2});
        
        prob.F = prob.plot.p75.Y().toFixed(3);
    } catch (e) {
        if (prob.plot.p60.X() <= Math.log10(0.075)) {
            prob.F = 100;
        } else {
            prob.F = 0;
        }
    }
    
    if (prob.F <= 50) {
        try {
            prob.plot.p10.setAttribute({visible: true});
            prob.plot.p30.setAttribute({visible: true});
            prob.plot.p60.setAttribute({visible: true});

            prob.d10 = Math.pow(10, prob.plot.p10.X());
            prob.d30 = Math.pow(10, prob.plot.p30.X());
            prob.d60 = Math.pow(10, prob.plot.p60.X());
        } catch(e) {
            prob.d10 = 0;
            prob.d30 = 0;
            prob.d60 = 0;
        }
        
        $("#fine-plot").css("display", "none");
    }
}

function clear_previous() {
    for (var key in prob.plot) {
        prob.distribution.removeObject(prob.plot[key]);
        delete prob.plot[key];
    }
}