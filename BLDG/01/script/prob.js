function toStart(e) {
    $(e.target).css("display", "none");
    $("#answer").css("display", "block");
    $("#question-img").hide();
    $(".svg-text").attr("opacity", "0");
}

function toText(e) {
    $(e.target).prop("disabled", true).html("duration showed");
    $(".svg-text").attr("opacity", "1");
}

function check_input(e, ans, cls1, cls2) {
    if (e.which !== 13) {
        return
    }
    
    if (Number($(e.target).attr("data-trial")) == 0) {
        $(e.target).val(ans.toString()).css("background", "#e0ffff").prop("disabled", true);
    } else {
        var in1 = $(e.target).val();
        if (in1 == "") {
            in1 = -1;
        }
        if (Number(in1) == ans) {
            $(e.target).css("background", "#e0ffff").prop("disabled", true);
        } else {
            var trial = Number($(e.target).attr("data-trial"));
            $(e.target).css("background", "red").attr("data-trial", (trial - 1).toString());
        }
    }
    
    var notAnswered = $(cls1).filter(function(i, e) {
        return !($(e).prop("disabled"));
    });
    
    if (notAnswered.length == 0) {
        $(cls2).show().prop("disabled", false);
    }
}