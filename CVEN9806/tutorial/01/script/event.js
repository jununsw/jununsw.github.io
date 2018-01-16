function changeColor(e) {
    var color = $(e.target).val();
    $("body").css("background-color", color.toString());
}

$(document).ready(function() {
    var handle = $("#custom-handle");
    $("#slider").slider({
        value: 100,
        min: 50,
        max: 150,
        step: 5,
        create: function() {
            handle.text($(this).slider("value"));
            $("#d").text($(this).slider("value"));
            model.assumeDepth(Number($(this).slider("value")));
            $("#mt").text(model.mt());
            $("#zbmin").text(model.zbmin().toExponential(3));
        },
        slide: function(event, ui) {
            handle.text(ui.value);
            $("#d").text(ui.value);
            model.assumeDepth(Number(ui.value));
            $("#mt").text(model.mt());
            $("#zbmin").text(model.zbmin().toExponential(3));
        }
    });
    
    $selectD = $("#select-D");
    var i;
    for (i = 50; i <= 150; i += 10) {
        $("<option>" + i.toString() + "</option>").appendTo($selectD);
    }
});

function toSelectD(e) {
    var d = $(e.target).find(":selected").text();
    d = Number(d);
    submission.assumeDepth(d);
}