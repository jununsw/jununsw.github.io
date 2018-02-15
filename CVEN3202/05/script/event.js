function init() {
    $("html").on("contextmenu", function(e) {
        (new Audio('css/warning.wav')).play();
        
        /*
        setTimeout(function() {
            alert("Right-click is disabled");
        }, 100);
        */
        
        return false;
    });
    
    $("#tabs").tabs();
    plot_figure(vm.h1, vm.h2, vm.l1, vm.l2, vm.l3, vm.angle, true);
    
    $(".slider").each(function(idx, ele) {
        var min = Number($(ele).attr("data-min"));
        var max = Number($(ele).attr("data-max"));
        var snap = Number($(ele).attr("data-snap"));
        var id = $(ele).attr("data-id");
        
        $(ele).slider({
            value: vm[id],
            min: min,
            max: max,
            step: snap,
            slide: function(event, ui) {
                vm[id] = ui.value;
                plot_figure(vm.h1, vm.h2, vm.l1, vm.l2, vm.l3, vm.angle, false);
                window.scrollTo(0, document.body.scrollHeight);
            }
        });
    });
    
    console.log("gamma_sat = " + vm.gammaSat.toFixed(1));
}

function plot_figure(h1, h2, l1, l2, l3, angle, isNew) {
    JXG.Options.infobox.fontSize = 0;
    
    var xMin = -2;
    var xMax = (l1 + l2 + l3) * Math.cos(angle / 180 * Math.PI) - xMin;
    var yMin = -1;
    var yMax = Math.max(h1, (l1 + l2 + l3)*Math.sin(angle / 180 * Math.PI) + h2) - yMin;
    
    var ratio = (yMax - yMin) / (xMax - xMin);
    
    if (!isNew) {
        $("#main-plot").html("");
    }
    
    $("#main-plot").height($("#main-plot").width() * ratio);
    
    window.plot = {};
    
    window.plot.brd = JXG.JSXGraph.initBoard('main-plot', {
        boundingbox: [xMin - 0.5, yMax, xMax, yMin],
        showNavigation: false,
        keepaspectratio: true,
        showCopyright: false,
        axis: false
    });
    
    window.plot.l1 = window.plot.brd.create("segment", [[0, 0], [l1 * Math.cos(angle / 180 * Math.PI),  l1 * Math.sin(angle / 180 * Math.PI)]], {
        strokeWidth: 70,
        strokeColor: 'red',
        opacity: 0.3,
        highlight: false,
        fixed: true
    });
    
    window.plot.l2 = window.plot.brd.create("segment", [window.plot.l1.point2, [window.plot.l1.point2.X() + l2*Math.cos(angle / 180 * Math.PI),  window.plot.l1.point2.Y() + l2*Math.sin(angle / 180 * Math.PI)]], {
        strokeWidth: 70,
        strokeColor: 'blue',
        opacity: 0.3,
        highlight: false,
        fixed: true
    });
    
    window.plot.l3 = window.plot.brd.create("segment", [window.plot.l2.point2, [window.plot.l2.point2.X() + l3*Math.cos(angle / 180 * Math.PI),  window.plot.l2.point2.Y() + l3*Math.sin(angle / 180 * Math.PI)]], {
        strokeWidth: 70,
        strokeColor: 'green',
        opacity: 0.3,
        highlight: false,
        fixed: true
    });
    
    window.plot.tube1 = window.plot.brd.create('polygon', [[function() {
        return window.plot.l1.point1.X() - 0.1*Math.sin(angle / 180 * Math.PI);
    }, function() {
        return window.plot.l1.point1.Y() + 0.1*Math.cos(angle / 180 * Math.PI);
    }], [function() {
        return window.plot.l1.point1.X() + 0.1*Math.sin(angle / 180 * Math.PI);
    }, function() {
        return window.plot.l1.point1.Y() - 0.1*Math.cos(angle / 180 * Math.PI);
    }], [function() {
        return -1 - 0.1;
    }, function() {
        return window.plot.l1.point1.Y() - 0.1*Math.cos(angle / 180 * Math.PI);
    }], [-1 - 0.1, h1], [-1 + 0.1, h1], [function() {
        return -1 + 0.1;
    }, function() {
        return window.plot.l1.point1.Y() + 0.1*Math.cos(angle / 180 * Math.PI);
    }]], {
        fillColor: 'black',
        opacity: 0.3,
        highlight: false,
        fixed: true
    });
    
    window.plot.tube2 = window.plot.brd.create('polygon', [[function() {
        return window.plot.l3.point2.X() - 0.1*Math.sin(angle / 180 * Math.PI);
    }, function() {
        return window.plot.l3.point2.Y() + 0.1*Math.cos(angle / 180 * Math.PI);
    }], [function() {
        return window.plot.l3.point2.X() + 0.1*Math.sin(angle / 180 * Math.PI);
    }, function() {
        return window.plot.l3.point2.Y() - 0.1*Math.cos(angle / 180 * Math.PI);
    }], [function() {
        return (l1 + l2 + l3) * Math.cos(angle / 180 * Math.PI) + 1 + 0.1;
    }, function() {
        return window.plot.l3.point2.Y() - 0.1*Math.cos(angle / 180 * Math.PI);
    }], [
        (l1 + l2 + l3)*Math.cos(angle / 180 * Math.PI) + 1 + 0.1, 
        (l1 + l2 + l3)*Math.sin(angle / 180 * Math.PI) + h2
    ], [
        (l1 + l2 + l3)*Math.cos(angle / 180 * Math.PI) + 1 - 0.1, 
        (l1 + l2 + l3)*Math.sin(angle / 180 * Math.PI) + h2
    ], [function() {
        return (l1 + l2 + l3)*Math.cos(angle / 180 * Math.PI) + 1 - 0.1;
    }, function() {
        return window.plot.l3.point2.Y() + 0.1*Math.cos(angle / 180 * Math.PI);
    }]], {
        fillColor: 'black',
        opacity: 0.3,
        highlight: false,
        fixed: true
    });
    
    [window.plot.tube1, window.plot.tube2].forEach(function(ele, idx, arr) {
        ele.vertices.forEach(function(e) {
            e.setAttribute({
                visible: false
            });
        });

        ele.borders.forEach(function(e) {
            e.setAttribute({
                visible: false
            });
        });
    });
    
    window.plot.brd.create('segment', [[-1 - 1, h1], [-1 + 0.5, h1]], {
        strokeWidth: 2,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.plot.brd.create('segment', [[
        (l1 + l2 + l3)*Math.cos(angle / 180 * Math.PI) + 1 - 0.5,
        (l1 + l2 + l3)*Math.sin(angle / 180 * Math.PI) + h2
    ], [
        (l1 + l2 + l3)*Math.cos(angle / 180 * Math.PI) + 1 + 1, 
        (l1 + l2 + l3)*Math.sin(angle / 180 * Math.PI) + h2
    ]], {
        strokeWidth: 2,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.plot.water1 = window.plot.brd.create('polygon', [[-1 - 0.5, h1], [
        -1 - 0.5 - 0.5*0.3*Math.sin(Math.PI / 3),
        h1 + 0.3*Math.sin(Math.PI / 3)
    ], [
        -1 - 0.5 + 0.5*0.3*Math.sin(Math.PI / 3),
        h1 + 0.3*Math.sin(Math.PI / 3)
    ]], {
        fillColor: 'transparent',
        highlight: false,
        fixed: true
    });
    
    window.plot.water2 = window.plot.brd.create('polygon', [[
        (l1 + l2 + l3)*Math.cos(angle / 180 * Math.PI) + 1 + 0.5,
        (l1 + l2 + l3)*Math.sin(angle / 180 * Math.PI) + h2
    ], [
        (l1 + l2 + l3)*Math.cos(angle / 180 * Math.PI) + 1 + 0.5 - 0.5*0.3*Math.sin(Math.PI / 3),
        (l1 + l2 + l3)*Math.sin(angle / 180 * Math.PI) + h2 + 0.3*Math.sin(Math.PI / 3)
    ], [
        (l1 + l2 + l3)*Math.cos(angle / 180 * Math.PI) + 1 + 0.5 + 0.5*0.3*Math.sin(Math.PI / 3),
        (l1 + l2 + l3)*Math.sin(angle / 180 * Math.PI) + h2 + 0.3*Math.sin(Math.PI / 3)
    ]], {
        fillColor: 'transparent',
        highlight: false,
        fixed: true
    });
    
    [window.plot.water1, window.plot.water2].forEach(function(ele, idx, arr) {
        ele.vertices.forEach(function(e) {
            e.setAttribute({
                visible: false
            });
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
    
    window.plot.arrow1 = window.plot.brd.create('segment', [window.plot.l1.point1, window.plot.l1.point2], {
        strokeWidth: 4,
        firstArrow: true,
        lastArrow: true,
        strokeColor: 'black',
        opacity: 0.4,
        highlight: false,
        fixed: true
    });
    
    window.plot.brd.create('text', [
        (window.plot.l1.point1.X() + window.plot.l1.point2.X()) / 2 + 0.2*Math.sin(angle / 180 * Math.PI), 
        (window.plot.l1.point1.Y() + window.plot.l1.point2.Y()) / 2 - 0.2*Math.cos(angle / 180 * Math.PI),
        "<span style='font-weight: bold;'>L<sub>1</sub></span>"
    ], {
        anchorX: 'middle',
        anchorY: 'middle',
        fontSize: 20,
        highlight: false,
        fixed: true
    });
    
    window.plot.arrow2 = window.plot.brd.create('segment', [window.plot.l2.point1, window.plot.l2.point2], {
        strokeWidth: 4,
        firstArrow: true,
        lastArrow: true,
        strokeColor: 'black',
        opacity: 0.4,
        highlight: false,
        fixed: true
    });
    
    window.plot.brd.create('text', [
        (window.plot.l2.point1.X() + window.plot.l2.point2.X())/2 + 0.2*Math.sin(angle / 180 * Math.PI), 
        (window.plot.l2.point1.Y() + window.plot.l2.point2.Y())/2 - 0.2*Math.cos(angle / 180 * Math.PI),
        "<span style='font-weight: bold;'>L<sub>2</sub></span>"
    ], {
        anchorX: 'middle',
        anchorY: 'middle',
        fontSize: 20,
        highlight: false,
        fixed: true
    });
    
    window.plot.arrow3 = window.plot.brd.create('segment', [window.plot.l3.point1, window.plot.l3.point2], {
        strokeWidth: 4,
        firstArrow: true,
        lastArrow: true,
        strokeColor: 'black',
        opacity: 0.4,
        highlight: false,
        fixed: true
    });
    
    window.plot.brd.create('text', [
        (window.plot.l3.point1.X() + window.plot.l3.point2.X())/2 + 0.2*Math.sin(angle / 180 * Math.PI), 
        (window.plot.l3.point1.Y() + window.plot.l3.point2.Y())/2 - 0.2*Math.cos(angle / 180 * Math.PI),
        "<span style='font-weight: bold;'>L<sub>3</sub></span>"
    ], {
        anchorX: 'middle',
        anchorY: 'middle',
        fontSize: 20,
        highlight: false,
        fixed: true
    });
    
    window.plot.brd.create('text', [
        window.plot.l1.point1.X() + 0.8*Math.sin(angle / 180 * Math.PI), 
        window.plot.l1.point1.Y() - 0.8*Math.cos(angle / 180 * Math.PI),
        "<span style='font-weight: bold;'>A</span>"
    ], {
        anchorX: 'middle',
        anchorY: 'middle',
        fontSize: 20,
        highlight: false,
        fixed: true
    });
    
    window.plot.brd.create('text', [
        window.plot.l2.point1.X() + 0.8*Math.sin(angle / 180 * Math.PI), 
        window.plot.l2.point1.Y() - 0.8*Math.cos(angle / 180 * Math.PI),
        "<span style='font-weight: bold;'>B</span>"
    ], {
        anchorX: 'middle',
        anchorY: 'middle',
        fontSize: 20,
        highlight: false,
        fixed: true
    });
    
    window.plot.brd.create('text', [
        window.plot.l3.point1.X() + 0.8*Math.sin(angle / 180 * Math.PI), 
        window.plot.l3.point1.Y() - 0.8*Math.cos(angle / 180 * Math.PI),
        "<span style='font-weight: bold;'>C</span>"
    ], {
        anchorX: 'middle',
        anchorY: 'middle',
        fontSize: 20,
        highlight: false,
        fixed: true
    });
    
    window.plot.brd.create('text', [
        window.plot.l3.point2.X() + 0.8*Math.sin(angle / 180 * Math.PI), 
        window.plot.l3.point2.Y() - 0.8*Math.cos(angle / 180 * Math.PI),
        "<span style='font-weight: bold;'>D</span>"
    ], {
        anchorX: 'middle',
        anchorY: 'middle',
        fontSize: 20,
        highlight: false,
        fixed: true
    });
    
    window.plot.brd.create('segment', [window.plot.l1.point1, [-2.5, 0]], {
        strokeColor: 'black',
        strokeWidth: 1,
        dash: 2,
        opacity: 0.8,
        highlight: false,
        fixed: true
    });
    
    window.plot.brd.create('segment', [window.plot.l3.point2, [xMax, window.plot.l3.point2.Y()]], {
        strokeColor: 'black',
        strokeWidth: 1,
        dash: 2,
        opacity: 0.8,
        highlight: false,
        fixed: true
    });
    
    window.plot.brd.create('text', [-2.5, 0, 'Datum'], {
        anchorX: 'left',
        anchorY: 'bottom',
        fontSize: 16,
        highlight: false,
        fixed: true
    });
    
    window.plot.brd.create('segment', [[-1.5, h1], [-1.5, 0]], {
        strokeColor: 'black',
        strokeWidth: 3,
        firstArrow: true,
        lastArrow: true,
        highlight: false,
        fixed: true
    });
    
    window.plot.brd.create('segment', [[
        (l1 + l2 + l3)*Math.cos(angle / 180 * Math.PI) + 1 + 0.5,
        (l1 + l2 + l3)*Math.sin(angle / 180 * Math.PI) + h2
    ], [
        (l1 + l2 + l3)*Math.cos(angle / 180 * Math.PI) + 1 + 0.5,
        (l1 + l2 + l3)*Math.sin(angle / 180 * Math.PI)
    ]], {
        strokeColor: 'black',
        strokeWidth: 3,
        firstArrow: true,
        lastArrow: true,
        highlight: false,
        fixed: true
    });
    
    window.plot.brd.create('text', [-1.6, h1 / 2, "<span style='font-weight: bold;'>h<sub>1</sub></span>"], {
        anchorX: 'right',
        anchorY: 'middle',
        fontSize: 16,
        highlight: false,
        fixed: true
    });
    
    window.plot.brd.create('text', [
        (l1 + l2 + l3)*Math.cos(angle / 180 * Math.PI) + 1 + 0.6, 
        (l1 + l2 + l3)*Math.sin(angle / 180 * Math.PI) + h2/2, 
        "<span style='font-weight: bold;'>h<sub>2</sub></span>"
    ], {
        anchorX: 'left',
        anchorY: 'middle',
        fontSize: 16,
        highlight: false,
        fixed: true
    });
}