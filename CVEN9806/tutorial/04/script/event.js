function init() {
    
}

function changeColor(e) {
    var color = $(e.target).val();
    $("body").css("background-color", color.toString());
}