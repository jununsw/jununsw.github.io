function init() {
    $("main").hide();
    $("#Home").show();
    
    $("nav ul a").each(function(idx, ele) {
        $(ele).on("click", function() {
            $("main").hide();
            var id = $(ele).html();
            console.log(id);
            $("#" + id).show();
            $("nav ul li").removeClass("active");
            $(ele).closest("li").addClass("active");
        });
    });
}