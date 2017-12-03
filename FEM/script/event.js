function load(e) {
    window.gui = new gui(new controller(new model()), $("#body"), $("#plot"));
    $("#plot").outerHeight(window.innerHeight - 1.5 * $("nav").outerHeight()).css("min-width", $("#plot").width());
    
    window.gui.plotSize = [-10, 10, 10 * (gui.$plot.outerHeight() / gui.$plot.outerWidth()), -10 * (gui.$plot.outerHeight() / gui.$plot.outerWidth())];
    
    window.gui.setBoard();
    
    $("#control-tabs").tabs();
    $(".panel").show();
}

function resize(e) {
    
} 

function setArea(e) {
    var xmin = Number($("#xmin").val());
    var xmax = Number($("#xmax").val());
    var ymax = Number($("#ymax").val());
    
    window.gui.setSize(xmin, xmax, ymax, e);
    if (window.gui.board) {
        window.gui.board.setBoundingBox(gui.plotSize);
    }
}

function snap_check(e) {
    var checked = $(e.target).closest("p").find("input").prop("checked") ? 1 : 0;
    var snap = Number($(e.target).closest("p").find("select").find(":selected").attr("value"));
    
    window.gui.changeSnap(checked, snap);
}

function mouseout(e) {
    if (window.gui == undefined) {
        return;
    } else {
        $("#x-pos").html("");
        $("#y-pos").html("");
        if (window.gui.snapPoint == undefined) {
            return;
        } else {
            window.gui.snapPoint.setAttribute({
                visible: false
            });
        }
    }
}