$(document).ready(function () {



    var refID = 1;

    // AddUserFormSubmit submit
    $("#ChangeUserPasswordFormSubmit").submit(function (event) {


        event.preventDefault();

        if ((checkPasswordValidation() == 1) && (checkConfirmPassword() == 1) && (checkCurrentPassword() == 1)) {

            refID = 1;

            var form = $(this);
            var actionUrl = form.attr('action');

            $.ajax({
                type: "POST",
                url: actionUrl,
                data: form.serialize() + "&ref=" + refID,
                beforeSend: function () {

                },
                error: function () {

                },
                success: function (resp) {

                    if (resp.code == 200) {

                        toastr.success("Your password is changed successfully!");



                        setTimeout(function () {
                            window.location.href = baseUrl + "/User/logout";
                        }, 1000);




                    } else if (resp.code == 400) {

                        toastr.error("Something went wrong, please try again.");



                    }
                }
            });

        } else {
            toastr.error("Something went wrong, please try again.");

        }

    });


    function checkPasswordValidation() {

        var user_current_password = document.getElementById("user_current_password");
        var user_new_password = document.getElementById("user_new_password");



        if (user_current_password.value != user_new_password.value) {
            return 1;
        } else {
            return 0;
        }

    }


    function checkUserNameValidation() {


        var actionUrl = $('#CheckUserNameValidationURL').attr('value');


        refID= 1;

        var user_login_username = document.getElementById("user_login_username").value;
        var result = 0;

        $.ajax({
            type: "POST",
            url: actionUrl,
            data: "user_login_username=" + user_login_username + "&ref=" + refID,
            async: false,
            beforeSend: function () {

            },
            error: function () {

            },
            success: function (resp) {

                if (resp.code == 200) {


                    result = 1;



                } else if (resp.code == 400) {

                    result = 0;



                }
            }
        });

        return result;

    }


    function checkConfirmPassword() {


        var user_new_password = document.getElementById("user_new_password");
        var user_confirm_password = document.getElementById("user_confirm_password");

        if (user_new_password.value == user_confirm_password.value) {
            return 1;
        } else {
            return 0;
        }

    }



    function checkCurrentPassword() {

        refID= 1;
        var user_current_password = document.getElementById("user_current_password").value;
        var result = 0;

        $.ajax({
            type: "POST",
            url: "CheckCurrentPasswordValidation",
            data: "user_current_password=" + user_current_password + "&ref=" + refID,
            async: false,
            beforeSend: function () {

            },
            error: function () {

            },
            success: function (resp) {

                if (resp.code == 200) {


                    result = 1;



                } else if (resp.code == 400) {

                    result = 0;



                }
            }
        });

        return result;



    }



    // AddUserFormSubmit submit
    $("#AddUserFormSubmit").submit(function (event) {

        event.preventDefault();

        if (checkUserNameValidation() == 1) {

            refID = 1;

            var form = $(this);
            var actionUrl = form.attr('action');

            $.ajax({
                type: "POST",
                url: actionUrl,
                data: form.serialize() + "&ref=" + refID,
                beforeSend: function () {

                },
                error: function () {

                },
                success: function (resp) {

                    if (resp.code == 200) {

                        toastr.success("User is added successfully!");

                        resetAddUserForm();


                    } else if (resp.code == 400) {

                        toastr.error("Something went wrong, please try again.");

                        resetAddUserForm();


                    }
                }
            });

        } else {
            toastr.error("Username is already found.");

        }


    });


    // UpdateUserFormSubmit submit
    $("#UpdateUserFormSubmit").submit(function (event) {

        refID = 1;

        event.preventDefault();

        var form = $(this);
        var actionUrl = form.attr('action');

        swal({
            title: "Are you sure?",
            text: "Would you like to update your user details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    // ajax call

                    $.ajax({
                        type: "POST",
                        url: actionUrl,
                        data: form.serialize() + "&ref=" + refID,
                        beforeSend: function () {

                        },
                        error: function () {

                        },
                        success: function (resp) {

                            if (resp.code == 200) {

                                toastr.success("User is updated successfully!");




                            } else if (resp.code == 400) {

                                toastr.error("Something went wrong, please try again.");




                            }
                        }
                    });




                } else {

                    swal("The change has not been saved.", {
                        icon: "error",
                    });


                }
            });





    });


    function resetAddUserForm() {

        $('#AddUserFormSubmit')[0].reset();
    }


    $("#resetAddUserFormSubmit").click(function (event) {


        event.preventDefault();

        refID = 1;

        $('#AddUserFormSubmit')[0].reset();

    });




    // UserFilterForm submit
    $("#UserFilterForm").submit(function (event) {


        event.preventDefault();

        refID = 2;

        var form = $(this);
        var actionUrl = form.attr('action');



        $.ajax({
            type: "POST",
            url: actionUrl,
            data: form.serialize() + "&ref=" + refID,
            beforeSend: function () {

            },
            error: function () {

            },
            success: function (resp) {

                $("#DataTables_Table_0_wrapper").remove();

                $("#DataTablesArea").append(resp.userTableList);

                $('#DataTables_Table_0').DataTable().ajax.reload();

                $('#DataTables_Table_0').DataTable().draw();
            }
        });

    });


    $("#resetUserFilterForm").click(function (event) {


        event.preventDefault();

        refID = 1;

        $('#UserFilterForm')[0].reset();

        getUserListTable();

    });



});