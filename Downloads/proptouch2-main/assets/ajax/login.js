$(document).ready(function () {

    $("#UserLoginForm").submit(function (event) {

        event.preventDefault();

        var form = $(this);
        var actionUrl = form.attr('action');

        $.ajax({
            type: "POST",
            url: actionUrl,
            data: form.serialize(), // serializes the form's elements.
            beforeSend: function () {

            },
            error: function () {

            },
            success: function (resp) {

                if (resp.code == 200) {

                    toastr.success("Logged In Successfully!");

                    setTimeout(function () {

                        window.location.href = "home";

                    }, 250);

                } else if (resp.code == 400) {

                    toastr.error("Invalid Username or Password!");


                }
            }
        });

    });

});