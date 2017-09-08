/*

SVG name convention:

#b-A: rect for activity A
#t1-A: text of est, eft for activity A
#t2-A: text of lst, lft for activity A
#tf-A: text of tf for activity A
#ff-A: text of ff for activity A
#label-A: activity label for activity A

#path-AB: arrow from A to B

.label: svg text tag which need to be shown all the time
.clickable: specify mouse pointer on hover

*/

Array.prototype.removeElement = function(ele) {
    return this.filter(function(e, i, a) {
        if (e === ele) {
            return false;
        } else {
            return true;
        }
    });
}

function toStart(e) {
    $("#answer").css("display", "block");
    $("<p>Step 1: Calculate early start time and early finish time for each activity forwardly. Click the activity box in golden color, and a dialog will pop up. Follow the instruction on the dialog.</p>")
        .css("color", "red").appendTo($("#answer"));
    $(e.target).hide();
    $(".label").addClass("clickable").on("click", svg_click);
    $("svg rect").addClass("clickable").on("click", svg_click);
    $(".static").removeClass("clickable").off("click");
    model.current.forEach(function(ele, idx, arr) {
        $("#b-" + ele).attr("fill", "#FAFAD2");
    });
}

function svg_click(e) {
    var activity = $(e.target).attr("id").slice(-1);
    handle_activity(activity);
}

function handle_activity(act) {
    if (!model.current.includes(act)) {
        $("#warning").dialog({
            resizable: false,
            height: "auto",
            width: "auto",
            modal: true,
            buttons: {
                OK: function() {
                    $(this).dialog("close");
                }
            }
        });
    } else {
        prepareDialog(act);
        $("#dialog").dialog({
            resizable: false,
            height: "auto",
            width: "auto",
            modal: true,
            close: function() {
                $("#dialog input").val("");
                $("#feedback").html("&nbsp;");
            },
            buttons: {
                OK: function() {
                    check_dialog(act);
                },
                Cancel: function() {
                    $(this).dialog("close");
                }
            }
        });
    }
}

function prepareDialog(act) {  
    var lbltext = $("#label-" + act).html();
    $("#lbl").html(lbltext);
}

function check_dialog(act) {
    if (model.state == "early") {
        var est = parseInt($("#est").val());
        var eft = parseInt($("#eft").val());
        if (model.prob[act].chechEarly(est, eft)) {
            $("#t1-" + act).attr("opacity", "1").html(model.prob[act].est.toString() + " - " + model.prob[act].eft.toString());
            
            model.current = model.current.removeElement(act);
            
            model.prob[act].post.forEach(function(ele, idx, arr) {
                var available = true;
                model.prob[ele].pre.forEach(function(el, i, a) {
                    if ($("#t1-" + el).attr("opacity") == "0") {
                        available = false
                    }
                });
                if (available) {
                    model.current.push(ele);
                }
            });
            
            if (model.current.length == 0) {
                model.state = "late";
                $(".early").prop("disabled", true);
                $(".late").prop("disabled", false);
                
                $("#answer p").css("color", "black");
                $("<p>Step 2: Calculate late start time and late finish time for each activity backwardly.</p>")
                    .css("color", "red").appendTo($("#answer"));
                
                model.current.push("j");
            }
            
            $("rect").attr("fill", "white");
            $("rect .static").attr("fill", "skyblue");
            model.current.forEach(function(ele, idx, arr) {
                $("#b-" + ele).attr("fill", "#FAFAD2");
            });
            
            $("#dialog").dialog("close");
        } else {
            $("#feedback").html("Incorrect!");
        }
    } else if (model.state == "late") {
        var lst = parseInt($("#lst").val());
        var lft = parseInt($("#lft").val());
        if (model.prob[act].chechLate(lst, lft)) {
            $("#t2-" + act).attr("opacity", "1").html(model.prob[act].lst.toString() + " - " + model.prob[act].lft.toString());
            
            model.current = model.current.removeElement(act);
            
            model.prob[act].pre.forEach(function(ele, idx, arr) {
                var available = true;
                model.prob[ele].post.forEach(function(el, i, a) {
                    if ($("#t2-" + el).attr("opacity") == "0") {
                        available = false
                    }
                });
                if (available) {
                    model.current.push(ele);
                }
            });
            
            if (model.current.length == 0) {
                model.state = "final";
                $(".late").prop("disabled", true);
                $(".final").prop("disabled", false);
                
                $("#answer p").css("color", "black");
                $("<p>Step 3: Now you can calculate the free float and total float. Meanwhile:<br/><br/>Please find the critial path (answer in the sequence of activity name, i.e. ADHJ, uppercase only, press ENTER after input):<br/><textarea rows='1' cols='10' style='resize: none; overflow: hidden; color: black;' onkeypress='check_critical(event);'></textarea><br/>After you answer all floats and the critical path, this question is completed.</p>").css("color", "red").appendTo($("#answer"));
                
                model.current = ["a", "b", "c", "d", "e", "f", "g", "h", "j"];
            }
            
            $("rect").attr("fill", "white");
            $("rect .static").attr("fill", "skyblue");
            model.current.forEach(function(ele, idx, arr) {
                $("#b-" + ele).attr("fill", "#FAFAD2");
            });
            
            $("#dialog").dialog("close");
        } else {
            $("#feedback").html("Incorrect!");
        }
    } else if (model.state == "final") {
        var ff = parseInt($("#ff").val());
        var tf = parseInt($("#tf").val());
        if (model.prob[act].chechFloat(ff, tf)) {
            $("#ff-" + act).attr("opacity", "1").html(model.prob[act].ff.toString());
            $("#tf-" + act).attr("opacity", "1").html(model.prob[act].tf.toString());
            
            model.current = model.current.removeElement(act);
            
            $("rect").attr("fill", "white");
            $("rect .static").attr("fill", "skyblue");
            model.current.forEach(function(ele, idx, arr) {
                $("#b-" + ele).attr("fill", "#FAFAD2");
            });
            
            if (model.current.length == 0) {
                check_final();
            }
            
            $("#dialog").dialog("close");
        } else {
            $("#feedback").html("Incorrect!");
        }
    }
}

function check_critical(e) {
    if (e.keyCode == 13) {
        var in1 = $(e.target).val().replace(/\s/g, "").toUpperCase();
        var isTure = (in1 == "BFEHJ");
        if (isTure) {
            $(e.target).css("background-color", "white").prop("disabled", true).css("background", "#d3d3d3")
                       .after("<span>&nbsp;</span><span class='glyphicon glyphicon-ok' style='color: blue;'></span><span> Critical path in the figure is shown in red</span>");
            $(".critical").attr("stroke", "red");
            if (model.current.length == 0) {
                check_final();
            }
        } else {
            $(e.target).after("<span>&nbsp;</span><span class='glyphicon glyphicon-remove' style='color: red;'></span>");
        }
    } 
}

function check_final() {
    if ($("textarea").prop("disabled")) {
        $(".clickable").off("click");
        $("#answer p").css("color", "black");
        $("<p>Congratulations! This question is completed.</p>").css("font-weight", "bold").appendTo($("#answer"));
        startFirework();
    }
}

$(document).ready(function() {
    $(".accordion").accordion({
        collapsible: true,
        heightStyle: "content"
    });
    
    draw_path();
    draw_arrows();
    
    model.prob.a.drawRect(150, 100);
    model.prob.b.drawRect(150, 250);
    model.prob.c.drawRect(150, 450);
    model.prob.d.drawRect(400, 100);
    model.prob.e.drawRect(400, 250);
    model.prob.f.drawRect(270, 350);
    model.prob.g.drawRect(400, 450);
    model.prob.h.drawRect(600, 250);
    model.prob.j.drawRect(600, 450);
    
    for (var key in model.prob) {
        model.prob[key].drawLabel();
        model.prob[key].drawText();
    }
    
    draw_others();
    
    $("svg text").attr("opacity", "0");
    $(".label").attr("opacity", "1");
    
    $("canvas").on("click", function(e) {
        $("canvas").hide(); 
        e.stopPropagation();
    });
});

function draw_path() {
    d3.select("#svg-main")
      .append("path")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-dasharray", "5, 10")
      .attr("stroke-width", "5")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 60 250 L 60 125 150 125 M 60 300 L 60 475 150 475");
    
    d3.select("#svg-main")
      .append("path")
      .attr("class", "critical")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-dasharray", "5, 10")
      .attr("stroke-width", "5")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 110 275 L 150 275");
    
    d3.select("#svg-main")
      .append("path")
      .attr("class", "critical")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-dasharray", "5, 10")
      .attr("stroke-width", "5")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 650 500 L 650 580");
}

function draw_arrows() {
    d3.select("#svg-main")
      .append("path")
      .attr("id", "path-bf")
      .attr("class", "critical")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-width", "5")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 200 300 l 0 75 70 0 -20 -5 20 5 -20 5 20 -5");
    
    d3.select("#svg-main")
      .append("path")
      .attr("id", "path-fe")
      .attr("class", "critical")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-width", "5")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 370 375 l 80 0 0 -75 -5 20 5 -20 5 20 -5 -20");
    
    d3.select("#svg-main")
      .append("path")
      .attr("id", "path-eh")
      .attr("class", "critical")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-width", "5")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 500 275 l 100 0 -20 -5 20 5 -20 5 20 -5");
    
    d3.select("#svg-main")
      .append("path")
      .attr("id", "path-hj")
      .attr("class", "critical")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-width", "5")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 700 275 l 50 0 0 200 -50 0 20 -5 -20 5 20 5 -20 -5");
    
    d3.select("#svg-main")
      .append("path")
      .attr("id", "path-ad")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-width", "5")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 250 125 l 150 0 -20 -5 20 5 -20 5 20 -5");
    
    d3.select("#svg-main")
      .append("path")
      .attr("id", "path-be")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-width", "5")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 250 275 l 150 0 -20 -5 20 5 -20 5 20 -5");
    
    d3.select("#svg-main")
      .append("path")
      .attr("id", "path-cg")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-width", "5")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 250 475 l 150 0 -20 -5 20 5 -20 5 20 -5");
    
    d3.select("#svg-main")
      .append("path")
      .attr("id", "path-dh")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-width", "5")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 500 125 l 50 0 0 135 50 0 -20 -5 20 5 -20 5 20 -5");
    
    d3.select("#svg-main")
      .append("path")
      .attr("id", "path-fj")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-width", "5")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 370 385 l 180 0 0 75 50 0 -20 -5 20 5 -20 5 20 -5");
    
    d3.select("#svg-main")
      .append("path")
      .attr("id", "path-gj")
      .attr("stroke", "blue")
      .attr("fill", "none")
      .attr("stroke-width", "5")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", "M 500 475 l 100 0 -20 -5 20 5 -20 5 20 -5");
}

function draw_others() {
    d3.select("#svg-main")
      .append("rect")
      .attr("x", 10)
      .attr("y", 250)
      .attr("rx", 15)
      .attr("ry", 15)
      .attr("width", 100)
      .attr("height", 50)
      .attr("stroke-width", 5)
      .attr("fill", "skyblue")
      .attr("class", "static")
      .attr("stroke", "red");
    
    d3.select("#svg-main")
      .append("rect")
      .attr("x", 600)
      .attr("y", 540)
      .attr("rx", 15)
      .attr("ry", 15)
      .attr("width", 100)
      .attr("height", 50)
      .attr("stroke-width", 5)
      .attr("fill", "skyblue")
      .attr("class", "static")
      .attr("stroke", "red");
    
    d3.select("#svg-main")
      .append("text")
      .attr("x", 20)
      .attr("y", 290)
      .attr("stroke-width", 0)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("font-family", "Sans-serif")
      .style("font-size", "24px")
      .attr("class", "label static")
      .text("START");
    
    d3.select("#svg-main")
      .append("text")
      .attr("x", 625)
      .attr("y", 580)
      .attr("stroke-width", 0)
      .attr("fill", "black")
      .attr("stroke", "white")
      .attr("font-family", "Sans-serif")
      .style("font-size", "24px")
      .attr("class", "label static")
      .text("END");    
}