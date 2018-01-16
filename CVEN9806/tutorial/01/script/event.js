function changeColor(e) {
    var color = $(e.target).val();
    $("body").css("background-color", color.toString());
}

$(document).ready(function() {
    var handle = $("#custom-handle");
    $("#slider").slider({
        value: 150,
        min: 50,
        max: 150,
        step: 5,
        create: function() {
            handle.text($(this).slider("value"));
            $("#d").text($(this).slider("value"));
            model.assumeDepth(Number($(this).slider("value")));
            $("#mt").text(model.mt());
            $("#zbmin").text(model.zbmin().toExponential(3));
            $("#dmin").text((Math.sqrt(model.zbmin() * 6 / model.width)).toFixed(2));
            $("#elimit").text(model.elimit().toFixed(2));
            $("#emax").text(model.emax().toFixed(2));
            $("#pi").text(model.pi().toFixed(0));
            $("#e").text(model.e()).toFixed(2);
        },
        slide: function(event, ui) {
            handle.text(ui.value);
            $("#d").text(ui.value);
            model.assumeDepth(Number(ui.value));
            $("#mt").text(model.mt());
            $("#zbmin").text(model.zbmin().toExponential(3));
            $("#dmin").text(model.z().toExponential(3));
            $("#dmin").text((Math.sqrt(model.zbmin() * 6 / model.width)).toFixed(2));
            $("#elimit").text(model.elimit().toFixed(2));
            $("#emax").text(model.emax().toFixed(2));
            $("#pi").text(model.pi().toFixed(0));
            $("#e").text(model.e().toFixed(2));
        }
    });
});

function toSelectD(e) {
    var d = $(e.target).find(":selected").text();
    d = Number(d);
    submission.assumeDepth(d);
}