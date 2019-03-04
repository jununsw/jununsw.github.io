var question2 = [  // contain list of coefficient ['html-form', 'tag-form', 'selection-options']
    ["j<sub>2</sub>", "j2", "the duration of loading factor for serviceability calculation"],
    ["k<sub>1</sub>", "k1", "the duration of load factor"],
    ["k<sub>4</sub>", "k4", "the partial seasoning factor"],
    ["k<sub>6</sub>", "k6", "the temperature factor"],
    ["k<sub>9</sub>", "k9", "the strength sharing factor"],
    ["k<sub>12</sub>", "k12", "the stability factor"],
    ["&rho;<sub>b</sub>", "rhob", "the material constant"],
    ["S<sub>1</sub>", "s1", "the beam slenderness factor"],
    ["k<sub>7</sub>", "k7", "the bearing factor"],
    ["&phi;", "phi", "the capacity factor"]
];

function randomize(original_arr) {  // return a new array with randomized order !! original array should not change!
    var arr = original_arr.slice();  // ! keep original array!
    var currentIndex = arr.length;
    var temporaryValue;
    var randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }

    return arr;
}

function check_1(event) {
    var in1 = $('#q1-1').find(":selected").text();
    var in2 = $('#q1-2').find(":selected").text();
    
    var isCorrect = true;
    $("#q1 select").css("background", "white").prop("disabled", true);
    
    if (in1 !== "appearance and vibration serviceability calculations") {
        $("#q1-1").css("background-color", "red").prop("disabled", false);
        isCorrect = false;
    }
    
    if (in2 !== "structural and functional serviceability calculations") {
        $("#q1-2").css("background-color", "red").prop("disabled", false);
        isCorrect = false;
    }
    
    if (isCorrect) {
        $(event).after("<span style='font-weight: bold;'><br/>Correct</span>").prop("disabled", true).hide();
        $("#a1-1").css("display", "block");
    }
}

function check_3(event) {
    var in1 = $('#q3-1').find(":selected").text();
    var in2 = $('#q3-2').find(":selected").text();
    var in3 = $('#q3-3').find(":selected").text();
    
    var isCorrect = true;
    $("#q3 select").css("background", "white").prop("disabled", true);
    
    if (in1 !== "Capacity limited by a flexural fracture") {
        $("#q3-1").css("background-color", "red").prop("disabled", false);
        isCorrect = false;
    }
    
    if (in2 !== "Capacity limited by shear fracture") {
        $("#q3-2").css("background-color", "red").prop("disabled", false);
        isCorrect = false;
    }
    
    if (in3 !== "Crushing of the timber over a bearing point or under a point load") {
        $("#q3-3").css("background-color", "red").prop("disabled", false);
        isCorrect = false;
    }
    
    if (isCorrect) {
        $(event).after("<span style='font-weight: bold;'><br/>Correct</span>").prop("disabled", true).hide();
    }
}

function check_4(event) {
    var in1 = $('#q4-1').find(":selected").text();
    var in2 = $('#q4-2').find(":selected").text();
    
    var isCorrect = true;
    $("#q4 select").css("background", "white").prop("disabled", true);
    
    if (in1 !== "function in isolation, if they were to failure collapse would occur") {
        $("#q4-1").css("background-color", "red").prop("disabled", false);
        isCorrect = false;
    }
    
    if (in2 !== "have the capacity to share the load between each other in the event of a failure and no collapse would occur") {
        $("#q4-2").css("background-color", "red").prop("disabled", false);
        isCorrect = false;
    }
    
    if (isCorrect) {
        $(event).after("<span style='font-weight: bold;'><br/>Correct</span>").prop("disabled", true).hide();
    }
}

function toSubmit(event) {
    var postData = {
        zid: id,
        week: "week03"
    };
    
    var isDone = true;
    
    $(".accordion").each(function(i, e) {
        $(e).find("button").each(function(idx, ele) {
            if ($(ele).prop("disabled") === false) {
                isDone = false;
            }
        });
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

function create_q2() {
    var qlist = randomize(question2);
    
    $.each(qlist, function(k, v) {
        var newlist = $("<li></li>");
        var newtag = $("<strong></strong>").appendTo(newlist).html("What is " + v[0] + " factor? &nbsp;&nbsp;&nbsp;");
        
        var newselect = $("<select></select>").prop("name", v[1]).appendTo(newlist);
        newselect.change(check_2);
        
        $("<option disabled selected value> -- select an option -- </option>").appendTo(newselect);
        
        randomize(question2).forEach(function(e) {
            $("<option></option>").html(e[2]).appendTo(newselect);
        });
        
        $("#q2 ul").append(newlist);
    });
}

function check_2(event) {
    var tag = $(event.target).prop("name");
    var correct_item = question2.filter(function(e) {
        return e[1] === tag;
    });
    var correct_selection = correct_item[0][2];
    var selected = $(event.target).find(":selected").html();
    
    // console.log(correct_selection);
    // console.log(selected);
    
    if (correct_selection === selected) {
        // console.log("yes");
        $(event.target).prop("disabled", true).css("background", "#d3d3d3");
        $(event.target).after("<span>&nbsp;&nbsp;</span><span class='glyphicon glyphicon-ok' style='color: blue;'></span>");
    } else {
        // console.log("no");
        $(event.target).css("background-color", "red");
    }
}

function choice_check(e, co) {
    // e is the current event
    // co is the correct answer in string type
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
    // e is the current event
    // co is the correct answer in number type
    if (e.keyCode == 13) {
        var in1 = $(e.target).val();
        in1 = Number(Number(in1).toFixed(3));
        var isTure = isEqual(in1, co, 2);
        // if (in1 === co) {
        if (isTure) {
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