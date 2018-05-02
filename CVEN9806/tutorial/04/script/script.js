function changeColor(e) {
    var color = $(e.target).val();
    $("body").css("background-color", color.toString());
}

function init() {
    createTest('svg-block');
    createDiagram('svg-diagram');
    
    $(document).tooltip({
        tooltipClass: "mytooltip"
    });
    
    /*
    $("i[data-hint]").click(function(e) {
        var hint = $(e.target).attr("data-hint");
        $('<div title="Help"></div>').append('<p style="margin: 10px; font-weight: normal; font-style: italic; color: black; font-size: 0.9em;">' + hint + '</p>').dialog({
            modal: true,
            draggable: false,
            resizable: false,
            width: $(window).width() / 3,
            create: function() {
                $(this).parent().css({position:"fixed"});
            },
            close: function() {
                $(this).dialog('destroy').remove();
            },
            buttons: {
                'Close and continue': function() {
                    $(this).dialog('close');
                }
            }
        });
    });
    */
}

function choice_check(e, co) {
    var in1 = $(e.target).find(":selected").text();
    if (in1 === co) {
        $(e.target).css("background-color", "white").prop("disabled", true).css("background", "#d3d3d3")
                   .after("<span>&nbsp;</span><span class='glyphicon glyphicon-ok' style='color: blue;'></span>");
        if ($(e.target).closest("section").find("input:not([disabled]),select:not([disabled])").length == 0) {
            var next = $(e.target).closest("section").next();    // display next section
            if (next.is("section")) {
                next.css("display", "block");
            }
        }
    } else {
        $(e.target).css("background-color", "red").prop("disabled", false);
    }
}

/*
function question_check(e, co, tol) {
    if (e.keyCode == 13) {
        var in1 = $(e.target).val();
        in1 = Number(Number(in1).toFixed(tol));
        var isTure = isEqual(in1, co, tol);
        if (isTure) {
            $(e.target).css("background-color", "white").prop("disabled", true).css("background", "#d3d3d3").val(co.toString());
            $(e.target).after("<span>&nbsp;</span><span class='glyphicon glyphicon-ok' style='color: blue;'></span>");
            if ($(e.target).closest("section").find("input:not([disabled]),select:not([disabled])").length == 0) {
                var next = $(e.target).closest("section").next();    // display next section
                if (next.is("section")) {
                    next.css("display", "block");
                }
            }
        } else {
            $(e.target).css("background-color", "red").prop("disabled", false);
        }
    }
}
*/

function createTest(brdId) {
    var offsetX = 100;
    var offsetY = 25;
    
    JXG.Options.infobox.fontSize = 0;
    
    window.test = {};
    
    let width = 800;
    let height = 2000;
    
    let ratio = (width + offsetX*2) / (height + offsetY*2);
    
    $("#" + brdId).height($("#" + brdId).width() / ratio);

    window.test.brd = JXG.JSXGraph.initBoard(brdId, {
        boundingbox: [-offsetX, height + offsetY, width + offsetX, -offsetY],
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    let polygon = [];
    
    polygon.push(window.test.brd.create('point', [0, 0], {visible: false}));
    polygon.push(window.test.brd.create('point', [800, 0], {visible: false}));
    polygon.push(window.test.brd.create('point', [800, 300], {visible: false}));
    polygon.push(window.test.brd.create('point', [575, 300], {visible: false}));
    polygon.push(window.test.brd.create('point', [575, 1700], {visible: false}));
    polygon.push(window.test.brd.create('point', [800, 1700], {visible: false}));
    polygon.push(window.test.brd.create('point', [800, 2000], {visible: false}));
    polygon.push(window.test.brd.create('point', [0, 2000], {visible: false}));
    polygon.push(window.test.brd.create('point', [0, 1700], {visible: false}));
    polygon.push(window.test.brd.create('point', [225, 1700], {visible: false}));
    polygon.push(window.test.brd.create('point', [225, 300], {visible: false}));
    polygon.push(window.test.brd.create('point', [0, 300], {visible: false}));
    
    window.test.cross = window.test.brd.create('polygon', polygon, {
        fillColor: "transparent",
        highlight: false,
        fixed: true
    });
    
    window.test.cross.borders.forEach(function(ele, idx, arr) {
        ele.setAttribute({
            strokeWidth: 3,
            strokeColor: 'blue',
            highlight: false,
            fixed: true
        });
    });
    
    window.test.tendon = window.test.brd.create('point', [400, 300], {
        size: 13,
        name: '',
        strokeWidth: 1,
        strokeColor: 'black',
        fillColor: 'grey',
        fixed: true,
        highlight: false
    });
    
    let reinforcement = [1, 2, 3, 4, 5, 6, 7, 8].map(function(ele, idx, arr) {
        return ele * width / (arr.length + 1);
    });
    
    reinforcement.forEach(function(ele, idx, arr) {
        window.test.brd.create("point", [ele, 100], {
            size: 4,
            name: '',
            strokeColor: 'transparent',
            fillColor: 'black',
            fixed: true,
            highlight: false
        });
    });
    
    window.test.brd.create('segment', [[120, 300], [120, 1700]], {
        firstArrow: true,
        lastArrow: true,
        strokeWidth: 2,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.test.brd.create('text', [80, 1000, '1400 mm'], {
        anchorX: 'middle',
        anchorY: 'middle',
        display: 'internal',
        rotate: 90,
        fontSize: 16,
        highlight: false,
        fixed: true
    });
    
    window.test.brd.create('text', [-60, 150, '300 mm'], {
        anchorX: 'middle',
        anchorY: 'middle',
        display: 'internal',
        rotate: 90,
        fontSize: 16,
        highlight: false,
        fixed: true
    });
    
    window.test.brd.create('text', [-60, 1850, '300 mm'], {
        anchorX: 'middle',
        anchorY: 'middle',
        display: 'internal',
        rotate: 90,
        fontSize: 16,
        highlight: false,
        fixed: true
    });
    
    window.test.brd.create('segment', [[840, 100], [840, 2000]], {
        firstArrow: true,
        lastArrow: true,
        strokeWidth: 2,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.test.brd.create('text', [800, 1000, '1900 mm'], {
        anchorX: 'middle',
        anchorY: 'middle',
        display: 'internal',
        rotate: 90,
        fontSize: 16,
        highlight: false,
        fixed: true
    });
    
    window.test.brd.create('segment', [[800, 2000], [900, 2000]], {
        strokeWidth: 2,
        dash: 2,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.test.brd.create('segment', [[800 - 800/9, 100], [900, 100]], {
        strokeWidth: 2,
        dash: 2,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.test.brd.create('segment', [[0, 1850], [800, 1850]], {
        firstArrow: true,
        lastArrow: true,
        strokeWidth: 2,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.test.brd.create('text', [400, 1890, '800 mm'], {
        anchorX: 'middle',
        anchorY: 'middle',
        display: 'internal',
        fontSize: 16,
        highlight: false,
        fixed: true
    });
    
    window.test.brd.create('segment', [[(800 - 350) / 2, 1000], [800 - (800 - 350)/2, 1000]], {
        firstArrow: true,
        lastArrow: true,
        strokeWidth: 2,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.test.brd.create('text', [400, 1040, '350 mm'], {
        anchorX: 'middle',
        anchorY: 'middle',
        display: 'internal',
        fontSize: 16,
        highlight: false,
        fixed: true
    });
}

function createDiagram(brdId) {
    var offsetX = 0;
    var offsetY = 0;
    
    JXG.Options.infobox.fontSize = 0;
    
    window.diagram = {};
    
    let width = 700;
    let height = 300;

    window.diagram.brd = JXG.JSXGraph.initBoard(brdId, {
        boundingbox: [-50, height + 25 + 50, width + 50, -25 + 50],
        showNavigation: false,
        keepaspectratio: false,
        showCopyright: false,
        axis: false
    });
    
    window.diagram.brd.create('segment', [[200, 320], [500, 320]], {
        strokeWidth: 3,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.diagram.brd.create('text', [180, 320, '<span>Free Body Diagram:</span>'], {
        anchorX: 'right',
        anchorY: 'middle',
        fontSize: 16,
        highlight: false,
        fixed: true
    });
    
    window.diagram.brd.create('text', [350, 300, '<span style="font-style: italic;">40m</span>'], {
        anchorX: 'middle',
        anchorY: 'middle',
        fontSize: 14,
        highlight: false,
        fixed: true
    });
    
    window.diagram.brd.create('text', [200, 300, 'A'], {
        anchorX: 'middle',
        anchorY: 'middle',
        fontSize: 16,
        highlight: false,
        fixed: true
    });
    
    window.diagram.brd.create('text', [500, 300, 'B'], {
        anchorX: 'middle',
        anchorY: 'middle',
        fontSize: 16,
        highlight: false,
        fixed: true
    });
    
    window.diagram.brd.create('text', [350, 350, '<span style="font-style: italic;">w*</span>'], {
        anchorX: 'middle',
        anchorY: 'bottom',
        fontSize: 16,
        highlight: false,
        fixed: true
    });
    
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(function(ele, idx, arr) {
        window.diagram.brd.create('arrow', [[200 + 300/(arr.length - 1)*ele, 340], [200 + 300/(arr.length - 1)*ele, 320]], {
            strokeColor: 'black',
            strokeWidth: 2,
            highlight: false,
            fixed: true
        });
    });
    
    window.diagram.brd.create('text', [0, 250, 'SFD:'], {
        anchorX: 'left',
        anchorY: 'top',
        fontSize: 16,
        highlight: false,
        fixed: true
    });
    
    window.diagram.brd.create('segment', [[0, 150], [300, 150]], {
        strokeWidth: 3,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    window.diagram.brd.create('segment', [[0, 150], [0, 150 + 50]], {
        strokeWidth: 2,
        strokeColor: 'blue',
        highlight: false,
        fixed: true
    });
    
    window.diagram.brd.create('segment', [[300, 150], [300, 150 - 50]], {
        strokeWidth: 2,
        strokeColor: 'blue',
        highlight: false,
        fixed: true
    });
    
    window.diagram.brd.create('segment', [[0, 150 + 50], [300, 150 - 50]], {
        strokeWidth: 2,
        strokeColor: 'blue',
        highlight: false,
        fixed: true
    });
    
    window.diagram.brd.create('text', [0, 200, '<span style="color: blue;">V<sub>A</span></span>'], {
        anchorX: 'left',
        anchorY: 'bottom',
        fontSize: 16,
        highlight: false,
        fixed: true
    });
    
    window.diagram.brd.create('text', [300, 100, '<span style="color: blue;">V<sub>B</span></span>'], {
        anchorX: 'right',
        anchorY: 'top',
        fontSize: 16,
        highlight: false,
        fixed: true
    });
    
    window.diagram.brd.create('text', [400, 250, 'BMD:'], {
        anchorX: 'left',
        anchorY: 'top',
        fontSize: 16,
        highlight: false,
        fixed: true
    });
    
    window.diagram.brd.create('segment', [[400, 150], [700, 150]], {
        strokeWidth: 3,
        strokeColor: 'black',
        highlight: false,
        fixed: true
    });
    
    var p = [];
    p.push(window.diagram.brd.create('point', [400, 150], {visible: false}));
    p.push(window.diagram.brd.create('point', [550, 150 - 80], {visible: false}));
    p.push(window.diagram.brd.create('point', [700, 150], {visible: false}));
    
    window.diagram.brd.create('spline', p, {
        strokeWidth: 2,
        strokeColor: 'red',
        highlight: false,
        fixed: true
    });
    
    window.diagram.brd.create('segment', [[550, 150 - 80], [550, 150]], {
        strokeWidth: 2,
        strokeColor: 'red',
        dash: 2,
        highlight: false,
        fixed: true
    });
    
    window.diagram.brd.create('text', [550, 150 - 90, '<span style="color: red;">M<sub>max</span></span>'], {
        anchorX: 'middle',
        anchorY: 'top',
        fontSize: 16,
        highlight: false,
        fixed: true
    });
}