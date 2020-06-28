$("nav button").click(function() {
    $("nav").toggleClass("shownCollapsedNav");
    if ($("nav button i").css("transform") == "none") {
        $("nav button i").css("transform", "rotate(180deg)");
    } else {
        $("nav button i").css("transform", "none");
    }
});

$(function() {

    $("form[name='newDrinkForm']").validate({
        // Specify validation rules
        rules: {
            newDrinkName: {
                required: true,
                maxlength: 20
            },
            newDrinkDescription: "required",
            newDrinkMethod1: "required",
            newDrinkImg: {
                required: true,
                url: true
            },
            newDrinkIngredients: "required"
        },
        // Specify validation error messages
        messages: {
            newDrinkName: {
                required: "Drink name is required",
                maxlength: "Name can be no longer than 20 characters sorry!"
            },
            newDrinkDescription: "Description is required",
            newDrinkMethod1: "At least one method is required",
            newDrinkImg: {
                required: "Image URL is required",
                url: "This needs to be a valid URL"
            },
            newDrinkCatagories: "A catagory is required",
            newDrinkIngredients: "An ingredient is required"
        },
        errorClass: "invalid",
        errorElement: "em",
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
            form.submit();
        }
    });

});