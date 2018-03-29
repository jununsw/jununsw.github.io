function init() {
    disableInspect('https://jununsw.github.io/res/warning.wav');
    
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
        strokeColor: 'gold',
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
    
    /** 
     * in case theta = 90
     * water head at A B C D
     */
    
    window.plot.brd.create('segment', [window.plot.l1.point1, [-1, window.plot.l1.point1.Y()]], {
        strokeColor: 'black',
        opacity: 0.3,
        strokeWidth: 4,
        highlight: false,
        fixe: true,
        visible: function() {
            if (angle >= 80) {
                return true;
            } else {
                return false;
            }
        }
    });
    
    window.plot.brd.create('segment', [window.plot.l3.point2, [function () {
        return (l1 + l2 + l3) * Math.cos(angle / 180 * Math.PI) + 1;
    }, window.plot.l3.point2.Y()]], {
        strokeColor: 'black',
        opacity: 0.3,
        strokeWidth: 4,
        highlight: false,
        fixe: true,
        visible: function() {
            if (angle >= 80) {
                return true;
            } else {
                return false;
            }
        }
    });
    
    var left = -1;
    var right = (l1 + l2 + l3) * Math.cos(angle / 180 * Math.PI) + 1;
    
    var xB = l1/(l1 + l2 + l3)*left + (l1 + l2)/(l1 + l2 + l3)*right;
    var xC = l1/(l1 + l2 + l3)*right + (l1 + l2)/(l1 + l2 + l3)*left;
}

function plot_chart() {
    var main = `
        <div class="row">
            <div class="col-sm-12 col-md-8">
                <div id="head-chart" style="width: 600px; height: 400px;"></div>
            </div>
            <div class="col-sm-12 col-md-4">
                <table class="table table-bordered" style="font-size: 0.8em; margin-top: 1em;">
                    <thead>
                        <tr>
                            <th></th>
                            <th>A</th>
                            <th>B</th>
                            <th>C</th>
                            <th>D</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>h<sub>e</sub> (m)</th>
                            <th id="hea"></th>
                            <th id="heb"></th>
                            <th id="hec"></th>
                            <th id="hed"></th>
                        </tr>
                        <tr>
                            <th>h<sub>p</sub> (m)</th>
                            <th id="hpa"></th>
                            <th id="hpb"></th>
                            <th id="hpc"></th>
                            <th id="hpd"></th>
                        </tr>
                        <tr>
                            <th>H (m)</th>
                            <th id="ha"></th>
                            <th id="hb"></th>
                            <th id="hc"></th>
                            <th id="hd"></th>
                        </tr>
                    </tbody>
                </table>
                <ul>
                    <li>h<sub>e</sub>: Elevation head</li>
                    <li>h<sub>p</sub>: Pore water pressure head</li>
                    <li>H: Total head</li>
                </ul>
                <p>
                    <strong>Rate of flow Q = <span id="result-q"></span></strong>
                <p>
            </div>
        <div>
    `;
    
    $("#t3").append(main);
    
    var info = `
        <div class="row">
            <div class="col-sm-12>
                <div style="font-weight: bold;">
                    <p style="margin-top: 20px;">The <span style="color: green;">GREEN</span> bars are the elevation head. (If located at datum, elevation head is 0)</p>
                    <p>The <span style="color: blue;">BLUE</span> points and lines are the pore pressure water head</p>
                    <p>The <span style="color: red;">RED</span> points and lines are the total water head</p>
                    <p>You can hover your mouse onto the points to view the value of the corresponding heads</p>
                </div>
            </div>
        </div>
    `;
    
    $("#t3").append(info);
    
    $("#result-q").html(vm.Q.toExponential(2) + " m/s");
    
    JXG.Options.infobox.fontSize = 0;
    var height = Math.max(vm.h1, vm.h2 + (vm.l1 + vm.l2 + vm.l3)*Math.sin(vm.angle / 180 * Math.PI));
    
    window.chart = {};
    
    window.chart.brd = JXG.JSXGraph.initBoard('head-chart', {
        boundingbox: [0 - 2, height + height*0.4, 10 + 2, -height*0.2],
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    window.chart.brd.create("arrow", [[-2, 0], [11, 0]], {
        strokeWidth: 3,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.chart.brd.create("arrow", [[-1, -height * 0.2], [-1, height + height*0.1]], {
        strokeWidth: 3,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.chart.brd.create("text", [-1.5, height / 2, 'Head in metre'], {
        anchorX: 'middle',
        anchorY: 'middle',
        display: 'internal',
        rotate: 90,
        fontSize: 18,
        highlight: false,
        fixed: true
    });
    
    window.chart.base = [];
    
    window.chart.base.push(window.chart.brd.create("point", [0, 0], {
        size: 2,
        name: '',
        highlight: false,
        fixed: true,
        color: 'blue'
    }));
    
    window.chart.base.push(window.chart.brd.create("point", [function() {
        var ratio = vm.l1 / (vm.l1 + vm.l2 + vm.l3);
        return ratio * 10;
    }, 0], {
        size: 2,
        name: '',
        highlight: false,
        fixed: true,
        color: 'blue'
    }));
    
    window.chart.base.push(window.chart.brd.create("point", [function() {
        var ratio = (vm.l1 + vm.l2) / (vm.l1 + vm.l2 + vm.l3);
        return ratio * 10;
    }, 0], {
        size: 2,
        name: '',
        highlight: false,
        fixed: true,
        color: 'blue'
    }));
    
    window.chart.base.push(window.chart.brd.create("point", [10, 0], {
        size: 2,
        name: '',
        highlight: false,
        fixed: true,
        color: 'blue'
    }));
    
    window.chart.base.forEach(function(ele, idx, arr) {
        window.chart.brd.create("text", [ele.X(), -height * 0.02, function() {
            return idx == 0 ? 'A' : idx == 1 ? 'B' : idx == 2 ? 'C' : 'D';
        }], {
            anchorX: 'middle',
            anchorY: 'top',
            fontSize: 18,
            highlight: false,
            fixed: true
        });
    });
    
    window.chart.brd.create("segment", [window.chart.base[1], [window.chart.base[1].X(), vm.l1 * Math.sin(vm.angle / 180 * Math.PI)]], {
        strokeWidth: 25,
        strokeColor: 'green',
        opacity: 0.4,
        fixed: true,
        highlight: false
    });
    
    window.chart.brd.create("segment", [window.chart.base[2], [window.chart.base[2].X(), (vm.l1 + vm.l2) * Math.sin(vm.angle / 180 * Math.PI)]], {
        strokeWidth: 25,
        strokeColor: 'green',
        opacity: 0.4,
        fixed: true,
        highlight: false
    });
    
    window.chart.brd.create("segment", [window.chart.base[3], [window.chart.base[3].X(), (vm.l1 + vm.l2 + vm.l3) * Math.sin(vm.angle / 180 * Math.PI)]], {
        strokeWidth: 25,
        strokeColor: 'green',
        opacity: 0.4,
        fixed: true,
        highlight: false
    });
    
    window.chart.tA = window.chart.brd.create("point", [window.chart.base[0].X(), vm.h1], {
        size: 8,
        name: vm.h1.toFixed(2),
        color: 'red',
        highlight: false,
        fixed: true,
        label: {
            offset: [5, 5],
            anchorX: 'left',
            anchorY: 'bottom',
            fontSize: 18,
            color: 'transparent'
        }
    });
    
    window.chart.tA.on('over', function() {
        this.label.setAttribute({'color': 'red'});
    });
    
    window.chart.tA.on('out', function() {
        this.label.setAttribute({'color': 'transparent'});
    });
    
    window.chart.pB = window.chart.brd.create("point", [window.chart.base[1].X(), vm.hb], {
        size: 8,
        name: vm.hb.toFixed(2),
        color: 'blue',
        highlight: false,
        fixed: true,
        label: {
            offset: [5, 5],
            anchorX: 'left',
            anchorY: 'bottom',
            fontSize: 18,
            color: 'transparent'
        }
    });
    
    window.chart.pB.on('over', function() {
        this.label.setAttribute({'color': 'blue'});
    });
    
    window.chart.pB.on('out', function() {
        this.label.setAttribute({'color': 'transparent'});
    });
    
    window.chart.pC = window.chart.brd.create("point", [window.chart.base[2].X(), vm.hc], {
        size: 8,
        name: vm.hc.toFixed(2),
        color: 'blue',
        highlight: false,
        fixed: true,
        label: {
            offset: [5, 5],
            anchorX: 'left',
            anchorY: 'bottom',
            fontSize: 18,
            color: 'transparent'
        }
    });
    
    window.chart.pC.on('over', function() {
        this.label.setAttribute({'color': 'blue'});
    });
    
    window.chart.pC.on('out', function() {
        this.label.setAttribute({'color': 'transparent'});
    });
    
    window.chart.pD = window.chart.brd.create("point", [window.chart.base[3].X(), vm.h2], {
        size: 8,
        name: vm.h2.toFixed(2),
        color: 'blue',
        highlight: false,
        fixed: true,
        label: {
            offset: [5, 5],
            anchorX: 'left',
            anchorY: 'bottom',
            fontSize: 18,
            color: 'transparent'
        }
    });
    
    window.chart.pD.on('over', function() {
        this.label.setAttribute({'color': 'blue'});
    });
    
    window.chart.pD.on('out', function() {
        this.label.setAttribute({'color': 'transparent'});
    });
    
    window.chart.tB = window.chart.brd.create("point", [window.chart.base[1].X(), vm.hb + vm.l1*Math.sin(vm.angle / 180 * Math.PI)], {
        size: 8,
        name: (vm.hb + vm.l1*Math.sin(vm.angle / 180 * Math.PI)).toFixed(2),
        color: 'red',
        highlight: false,
        fixed: true,
        label: {
            offset: [5, 5],
            anchorX: 'left',
            anchorY: 'bottom',
            fontSize: 18,
            color: 'transparent'
        }
    });
    
    window.chart.tB.on('over', function() {
        this.label.setAttribute({'color': 'red'});
    });
    
    window.chart.tB.on('out', function() {
        this.label.setAttribute({'color': 'transparent'});
    });
    
    window.chart.tC = window.chart.brd.create("point", [window.chart.base[2].X(), vm.hc + (vm.l1 + vm.l2)*Math.sin(vm.angle / 180 * Math.PI)], {
        size: 8,
        name: (vm.hc + (vm.l1 + vm.l2)*Math.sin(vm.angle / 180 * Math.PI)).toFixed(2),
        color: 'red',
        highlight: false,
        fixed: true,
        label: {
            offset: [5, 5],
            anchorX: 'left',
            anchorY: 'bottom',
            fontSize: 18,
            color: 'transparent'
        }
    });
    
    window.chart.tC.on('over', function() {
        this.label.setAttribute({'color': 'red'});
    });
    
    window.chart.tC.on('out', function() {
        this.label.setAttribute({'color': 'transparent'});
    });
    
    window.chart.tD = window.chart.brd.create("point", [window.chart.base[3].X(), vm.h2 + (vm.l1 + vm.l2 + vm.l3)*Math.sin(vm.angle / 180 * Math.PI)], {
        size: 8,
        name: (vm.h2 + (vm.l1 + vm.l2 + vm.l3)*Math.sin(vm.angle / 180 * Math.PI)).toFixed(2),
        color: 'red',
        highlight: false,
        fixed: true,
        label: {
            offset: [5, 5],
            anchorX: 'left',
            anchorY: 'bottom',
            fontSize: 18,
            color: 'transparent'
        }
    });
    
    window.chart.tD.on('over', function() {
        this.label.setAttribute({'color': 'red'});
    });
    
    window.chart.tD.on('out', function() {
        this.label.setAttribute({'color': 'transparent'});
    });
    
    [window.chart.tA, window.chart.tB, window.chart.tC, window.chart.tD, window.chart.pB, window.chart.pC, window.chart.pD].forEach(function(ele, idx, arr) {
        ele.setAttribute({visible: false});
    });
    
    prepare_animate();
    
    (function() {
        $("#hea").html("0");
        $("#heb").html((vm.l1 * Math.sin(vm.angle / 180 * Math.PI)).toFixed(2));
        $("#hec").html(((vm.l1 + vm.l2) * Math.sin(vm.angle / 180 * Math.PI)).toFixed(2));
        $("#hed").html(((vm.l1 + vm.l2 + vm.l3) * Math.sin(vm.angle / 180 * Math.PI)).toFixed(2));
        
        $("#hpa").html((window.chart.tA.Y()).toFixed(2));
        $("#hpb").html((window.chart.pB.Y()).toFixed(2));
        $("#hpc").html((window.chart.pC.Y()).toFixed(2));
        $("#hpd").html((window.chart.pD.Y()).toFixed(2));
        
        $("#ha").html((window.chart.tA.Y()).toFixed(2));
        $("#hb").html((window.chart.tB.Y()).toFixed(2));
        $("#hc").html((window.chart.tC.Y()).toFixed(2));
        $("#hd").html((window.chart.tD.Y()).toFixed(2));
    })();
}

function prepare_animate() {
    window.animatePoint = {};
    window.animateLine = {};
    
    window.animatePoint.pointA = window.chart.brd.create("point", [window.chart.base[0].X(), 0.01], {
        visible: false
    });
    
    window.animatePoint.pointB = window.chart.brd.create("point", [window.chart.base[1].X(), 0.01], {
        visible: false
    });
    
    window.animatePoint.pointC = window.chart.brd.create("point", [window.chart.base[2].X(), 0.01], {
        visible: false
    });
    
    window.animatePoint.pointD = window.chart.brd.create("point", [window.chart.base[3].X(), 0.01], {
        visible: false
    });
    
    window.animatePoint.pAB = window.chart.brd.create("point", [window.chart.tA.X() + 0.001, window.chart.tA.Y()], {
        visible: false
    });
    
    window.animatePoint.pBC = window.chart.brd.create("point", [window.chart.pB.X() + 0.001, window.chart.pB.Y()], {
        visible: false
    });
    
    window.animatePoint.pCD = window.chart.brd.create("point", [window.chart.pC.X() + 0.001, window.chart.pC.Y()], {
        visible: false
    });
    
    window.animatePoint.tAB = window.chart.brd.create("point", [window.chart.tA.X() + 0.001, window.chart.tA.Y()], {
        visible: false
    });
    
    window.animatePoint.tBC = window.chart.brd.create("point", [window.chart.tB.X() + 0.001, window.chart.tB.Y()], {
        visible: false
    });
    
    window.animatePoint.tCD = window.chart.brd.create("point", [window.chart.tC.X() + 0.001, window.chart.tC.Y()], {
        visible: false
    });
    
    window.animateLine.lineA = window.chart.brd.create('segment', [window.chart.base[0], window.animatePoint.pointA], {
        strokeWidth: 8,
        strokeColor: 'blue',
        lineCap: 'round',
        fixed: true,
        highlight: false
    });
    
    window.animateLine.lineB = window.chart.brd.create('segment', [window.chart.base[1], window.animatePoint.pointB], {
        strokeWidth: 8,
        strokeColor: 'blue',
        lineCap: 'round',
        fixed: true,
        highlight: false
    });
    
    window.animateLine.lineC = window.chart.brd.create('segment', [window.chart.base[2], window.animatePoint.pointC], {
        strokeWidth: 8,
        strokeColor: 'blue',
        lineCap: 'round',
        fixed: true,
        highlight: false
    });
    
    window.animateLine.lineD = window.chart.brd.create('segment', [window.chart.base[3], window.animatePoint.pointD], {
        strokeWidth: 8,
        strokeColor: 'blue',
        lineCap: 'round',
        fixed: true,
        highlight: false
    });
    
    window.animateLine.pAB = window.chart.brd.create('segment', [window.chart.tA, window.animatePoint.pAB], {
        strokeWidth: 2,
        strokeColor: 'blue',
        lineCap: 'round',
        dash: 2,
        fixed: true,
        highlight: false
    });
    
    window.animateLine.pBC = window.chart.brd.create('segment', [window.chart.pB, window.animatePoint.pBC], {
        strokeWidth: 2,
        strokeColor: 'blue',
        lineCap: 'round',
        dash: 2,
        fixed: true,
        highlight: false
    });
    
    window.animateLine.pCD = window.chart.brd.create('segment', [window.chart.pC, window.animatePoint.pCD], {
        strokeWidth: 2,
        strokeColor: 'blue',
        lineCap: 'round',
        dash: 2,
        fixed: true,
        highlight: false
    });
    
    window.animateLine.tAB = window.chart.brd.create('segment', [window.chart.tA, window.animatePoint.tAB], {
        strokeWidth: 4,
        strokeColor: 'red',
        lineCap: 'round',
        fixed: true,
        highlight: false
    });
    
    window.animateLine.tBC = window.chart.brd.create('segment', [window.chart.tB, window.animatePoint.tBC], {
        strokeWidth: 4,
        strokeColor: 'red',
        lineCap: 'round',
        fixed: true,
        highlight: false
    });
    
    window.animateLine.tCD = window.chart.brd.create('segment', [window.chart.tC, window.animatePoint.tCD], {
        strokeWidth: 4,
        strokeColor: 'red',
        lineCap: 'round',
        fixed: true,
        highlight: false
    });
    
    for (ele in window.animateLine) {
        window.animateLine[ele].setAttribute({visible: false});
    }
}

function delete_animate() {
    for (ele in window.animateLine) {
        window.chart.brd.removeObject(window.animateLine[ele]);
    }
    
    for (ele in window.animatePoint) {
        window.chart.brd.removeObject(window.animatePoint[ele]);
    }
    
    [window.chart.tA, window.chart.tB, window.chart.tC, window.chart.tD, window.chart.pB, window.chart.pC, window.chart.pD].forEach(function(ele, idx, arr) {
        ele.setAttribute({visible: false});
    });
}

function plot_animate() {
    delete_animate();
    prepare_animate();
    
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve({
                status: 0
            });
        }, 10);
    })
    
    .then(function(msg) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                window.animateLine.lineA.setAttribute({visible: true});
                window.animatePoint.pointA.moveTo([window.chart.tA.X(), window.chart.tA.Y()], 400);

                resolve({
                    status: 1,
                });
            }, 400);
        });
    })
    
    .then(function(msg) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                window.animateLine.lineB.setAttribute({visible: true});
                window.animatePoint.pointB.moveTo([window.chart.pB.X(), window.chart.pB.Y()], 400);

                resolve({
                    status: 1,
                });
            }, 450);
        });
    })
    
    .then(function(msg) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                window.animateLine.lineC.setAttribute({visible: true});
                window.animatePoint.pointC.moveTo([window.chart.pC.X(), window.chart.pC.Y()], 400);

                resolve({
                    status: 1,
                });
            }, 450);
        });
    })
    
    .then(function(msg) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                window.animateLine.lineD.setAttribute({visible: true});
                window.animatePoint.pointD.moveTo([window.chart.pD.X(), window.chart.pD.Y()], 400);

                resolve({
                    status: 1,
                });
            }, 450);
        });
    })
    
    .then(function(msg) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                window.chart.tA.setAttribute({visible: true});

                resolve({
                    status: 1,
                });
            }, 400);
        });
    })
    
    .then(function(msg) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                window.chart.pB.setAttribute({visible: true});

                resolve({
                    status: 1,
                });
            }, 400);
        });
    })
    
    .then(function(msg) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                window.chart.pC.setAttribute({visible: true});

                resolve({
                    status: 1,
                });
            }, 400);
        });
    })
    
    .then(function(msg) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                window.chart.pD.setAttribute({visible: true});

                resolve({
                    status: 1,
                });
            }, 400);
        });
    })
    
    .then(function(msg) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                window.chart.tB.setAttribute({visible: true});

                resolve({
                    status: 1,
                });
            }, 400);
        });
    })
    
    .then(function(msg) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                window.chart.tC.setAttribute({visible: true});

                resolve({
                    status: 1,
                });
            }, 400);
        });
    })
    
    .then(function(msg) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                window.chart.tD.setAttribute({visible: true});

                resolve({
                    status: 1,
                });
            }, 400);
        });
    })
    
    .then(function(msg) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                window.animateLine.pAB.setAttribute({visible: true});
                window.animatePoint.pAB.moveTo([window.chart.pB.X(), window.chart.pB.Y()], 400);

                resolve({
                    status: 1,
                });
            }, 450);
        });
    })
    
    .then(function(msg) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                window.animateLine.pBC.setAttribute({visible: true});
                window.animatePoint.pBC.moveTo([window.chart.pC.X(), window.chart.pC.Y()], 400);

                resolve({
                    status: 1,
                });
            }, 450);
        });
    })
    
    .then(function(msg) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                window.animateLine.pCD.setAttribute({visible: true});
                window.animatePoint.pCD.moveTo([window.chart.pD.X(), window.chart.pD.Y()], 400);

                resolve({
                    status: 1,
                });
            }, 450);
        });
    })
    
    .then(function(msg) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                window.animateLine.tAB.setAttribute({visible: true});
                window.animatePoint.tAB.moveTo([window.chart.tB.X(), window.chart.tB.Y()], 400);

                resolve({
                    status: 1,
                });
            }, 450);
        });
    })
    
    .then(function(msg) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                window.animateLine.tBC.setAttribute({visible: true});
                window.animatePoint.tBC.moveTo([window.chart.tC.X(), window.chart.tC.Y()], 400);

                resolve({
                    status: 1,
                });
            }, 450);
        });
    })
    
    .then(function(msg) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                window.animateLine.tCD.setAttribute({visible: true});
                window.animatePoint.tCD.moveTo([window.chart.tD.X(), window.chart.tD.Y()], 400);

                resolve({
                    status: 1,
                });
            }, 450);
        });
    })
}