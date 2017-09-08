Array.prototype.removeElement = function(ele) {
    return this.filter(function(e, i, a) {
        if (e === ele) {
            return false;
        } else {
            return true;
        }
    });
}

function deleteStringFrom(arr, ele) {
    var idx;
    for (idx = 0; idx < arr.length; idx++) {
        if (arr[idx] === ele) {
            var temp = arr[idx];
            arr[idx] = arr[0];
            arr[0] = temp;
            break;
        }
    }
    if (arr[0] === ele) {
        arr.shift();
    }
}

function Node(label, est, eft, lst, lft, pre, post) {
    this.label;
    this.est = est;
    this.eft = eft;
    this.lst = lst;
    this.lft = lft;
    this.ft = this.lst - this.est;
    this.pre = pre;
    this.post = post;
    this.chechEarly = function(s, f) {
        if ((this.est == s) && (this.eft == f)) {
            return true;
        } else {
            return false;
        }
    }
}

var model = {
    state: "early",
    current: ["a", "b", "c"],
    prob: {
        "a": new Node("a", 1, 7, 2, 8, [], ["d"]),
        "b": new Node("b", 1, 8, 1, 8, [], ["e", "f"]),
        "c": new Node("c", 1, 6, 12, 17, [], ["g"]),
        "d": new Node("d", 8, 13, 9, 14, ["a"], ["h"]),
        "e": new Node("e", 9, 14, 9, 14, ["b", "f"], ["h"]),
        "f": new Node("f", 9, 16, 14, 21, ["b"], ["e", "j"]),
        "g": new Node("g", 7, 10, 18, 21, ["c"], ["j"]),
        "h": new Node("h", 15, 21, 15, 21, ["d", "e"], ["j"]),
        "j": new Node("j", 22, 24, 22, 24, ["h", "f", "g"], []),
    }
}

function toStart(e) {
    $("#answer").css("display", "block");
    $("<p>Step 1: Calculate early start time and early finish time for each activity. Note the available activity box will be shown in light gold color.</p>")
        .css("color", "red").appendTo($("#answer"));
    $(e.target).hide();
    $(".label").addClass("clickable").on("click", text_click);
    $("svg rect").addClass("clickable").on("click", svg_click);
    model.current.forEach(function(ele, idx, arr) {
        $("#b" + ele).attr("fill", "#FAFAD2");
    });
}

function svg_click(e) {
    var activity = $(e.target).attr("id")[1];
    handle_activity(activity);
}

function text_click(e) {
    var activity = $(e.target).attr("id")[1];
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
    var lbltext = $("#t" + act).html();
    $("#lbl").html(lbltext);
}

function check_dialog(act) {
    if (model.state == "early") {
        var est = parseInt($("#est").val());
        var eft = parseInt($("#eft").val());
        if (model.prob[act].chechEarly(est, eft)) {
            $("#" + act + "1").attr("opacity", "1").html(model.prob[act].est);
            $("#" + act + "2").attr("opacity", "1").html(model.prob[act].eft);
            
            // deleteStringFrom(model.current, act);
            model.current = model.current.removeElement(act);
            
            model.prob[act].post.forEach(function(ele, idx, arr) {
                var available = true;
                model.prob[ele].pre.forEach(function(el, i, a) {
                    if ($("#" + el + "1").attr("opacity") == "0") {
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
            }
            
            $("rect").attr("fill", "white");
            model.current.forEach(function(ele, idx, arr) {
                $("#b" + ele).attr("fill", "#FAFAD2");
            });
            
            $("#dialog").dialog("close");
        } else {
            $("#feedback").html("Incorrect!");
        }
    } else if (model.stat == "late") {
        
    }
}