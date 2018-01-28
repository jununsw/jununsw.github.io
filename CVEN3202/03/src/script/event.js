function init() {
    plot_chart();
    plot_distrib();
    
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
        highlight: false,
        fixed: true
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
    prob.gliders.push(prob.distribution.create('line', [[-4, 5], [2, 5]], {visible: false, straightFirst: false, straightLast: false}));
    prob.gliders.push(prob.distribution.create('line', [[-4, 20], [2, 20]], {visible: false, straightFirst: false, straightLast: false}));
    prob.gliders.push(prob.distribution.create('line', [[-4, 50], [2, 50]], {visible: false, straightFirst: false, straightLast: false}));
    prob.gliders.push(prob.distribution.create('line', [[-4, 80], [2, 80]], {visible: false, straightFirst: false, straightLast: false}));
    prob.gliders.push(prob.distribution.create('line', [[-4, 95], [2, 95]], {visible: false, straightFirst: false, straightLast: false}));
    
    prob.controls = [];
    prob.controls.push(prob.distribution.create('glider', [prob.controlX[0], 5, prob.gliders[0]], {
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
    prob.controls.push(prob.distribution.create('glider', [prob.controlX[4], 95, prob.gliders[4]], {
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
            prob.controls[0].moveTo([max, 5]);
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
            prob.controls[4].moveTo([min, 95]);
        }
        
        prob.controls[1].moveTo([prob.controls[0].X() + ratio1*(prob.controls[4].X() - prob.controls[0].X()), 20]);
        prob.controls[2].moveTo([prob.controls[0].X() + ratio2*(prob.controls[4].X() - prob.controls[0].X()), 50]);
        prob.controls[3].moveTo([prob.controls[0].X() + ratio3*(prob.controls[4].X() - prob.controls[0].X()), 80]);
    });
}

function toggle_confirm(e) {
    var label = $(e.target).html();
    
    if (label == "Confirm") {
        $(e.target).html("Restart").removeClass("btn-primary").addClass("btn-danger");
        
        $(document).trigger("keyup");
        $(document).off("keydown").off("keyup");
        
    } else if (label == "Restart") {
        $(e.target).html("Confirm").removeClass("btn-danger").addClass("btn-primary");
        
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