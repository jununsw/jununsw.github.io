function toSubmit(event) {  // not used currently
    var postData = {
        zid: id,
        week: "week06"
    };
    
    var isDone = true;
    
    $(".accordion").each(function(i, e) {
        $(e).find("select").each(function(idx, ele) {
            if ($(ele).prop("disabled") === false) {
                isDone = false;
            }
        });
        $(e).find("input").each(function(idx, ele) {
            if ($(ele).prop("disabled") === false) {
                isDone = false;
            }
        });
    });
    
    if (isDone !== true) {
        $("#result").html("You have not completed all questions");
    } else {
        $(event).prop("disabled", true).html("Submitting...");
        $.post("../query.php", postData, function(data, status) {
            if (data.toString() == "1") {
                $(event).html("Submitted");
                $("#result").html("You have completed this tutorial. You can close now.");
            } else {
                $("#result").html("We have confronted a problem when sending the mark. Please send a screenshot of this page with your zID to xiaojun.chen@unsw.edu.au");
                $(event).html("Submit").prop("disabled", false);
            }
        });
    }
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

function question_check(e, co) {
    if (e.keyCode == 13) {
        var in1 = $(e.target).val();
        in1 = Number(Number(in1).toFixed(3));
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
}