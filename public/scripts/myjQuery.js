$("nav button").click(function() {
    $("nav").toggleClass("shownCollapsedNav");
    if ($("nav button i").css("transform") == "none") {
        $("nav button i").css("transform", "rotate(180deg)");
    } else {
        $("nav button i").css("transform", "none");
    }
});