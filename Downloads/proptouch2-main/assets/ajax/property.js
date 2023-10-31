function nextGroup(getCurrent_fs_index) {


    $("fieldset").each(function (index) {

        if (getCurrent_fs_index == index) {

            var current_fs, next_fs, previous_fs; //fieldsets
            var left, opacity, scale; //fieldset properties which we will animate
            var animating; //flag to prevent quick multi-click glitches

            current_fs = $(this);
            next_fs = $(this).next();



            //Add Class Active
            $("#top-tabbar-vertical li").eq($("fieldset").index(next_fs)).addClass("active");
            $("#top-tabbar-vertical li").eq($("fieldset").index(current_fs)).removeClass("active");

            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative',

                    });

                    next_fs.css({
                        'opacity': opacity
                    });
                },
                duration: 500
            });
            //setProgressBar(++current);
        }
    });

}

function currentGroup(getCurrent_fs_index) {


    $("#top-tabbar-vertical li").each(function (index) {

        if (getCurrent_fs_index == index) {

            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }

    });




    $("fieldset").each(function (index) {

        var select = $(this);//fieldsets;

        if (getCurrent_fs_index == index) {


            //show the next fieldset
            select.show();

            //hide others fieldset with style
            select.animate({
                opacity: 1
            }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    select.css({
                        'opacity': opacity

                    });


                },
                duration: 500
            });


        } else {

            //hide others fieldset with style
            select.animate({
                opacity: 0
            }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    select.css({
                        'display': 'none',
                        'position': 'relative',

                    });


                },
                duration: 500
            });
        }
    });

}


function previousGroup(getCurrent_fs_index) {


    $("fieldset").each(function (index) {

        if (getCurrent_fs_index == index) {

            var current_fs, next_fs, previous_fs; //fieldsets
            var left, opacity, scale; //fieldset properties which we will animate
            var animating; //flag to prevent quick multi-click glitches

            current_fs = $(this);
            pre_fs = $(this).prev();



            //Add Class Active
            $("#top-tabbar-vertical li").eq($("fieldset").index(pre_fs)).addClass("active");
            $("#top-tabbar-vertical li").eq($("fieldset").index(current_fs)).removeClass("active");

            //show the previous fieldset
            pre_fs.show();
            //hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative',

                    });

                    pre_fs.css({
                        'opacity': opacity
                    });
                },
                duration: 500
            });
            //setProgressBar(++current);
        }
    });

}

function btnEditPropertyData(currentRowIndex) {


    resetUpdatePropertyForm();

    var actionUrl = $('#getPropertiesModalFieldsDataURL').attr('value');

    var table = $('#DataTables_Table_0').DataTable();
    var cols = table.row(currentRowIndex).data();
    var refID = 1;
    var property_unqique_id = cols.dt00_property_unqique_id;

    $.ajax({
        type: "POST",
        url: actionUrl,
        async: false,
        data: "property_id=" + property_unqique_id + "&ref=" + refID,
        beforeSend: function () {

        },
        error: function () {

        },
        success: function (resp) {

            $('#property_modal_fields').empty();
            $('#UpdatePropertyFormSubmit').empty();
            $('#property_modal_fields').append(resp.propertyModalHeadingGroups);
            $('#UpdatePropertyFormSubmit').append(resp.propertyModalFields);


            var totalFieldset = $("fieldset")
                .first() // Select the first active class
                .nextUntil(':not(fieldset)') // Select all field after untill you hit a field that doesn't have .percent class
                .addBack() // Add the first element
                .length; // Get the length



            $("fieldset").each(function (index) {

                if (index == 0) {

                    $(this).prepend("<button id='btn-next' onclick='nextGroup(" + index + ")' type='button'  name='next' class='btn btn-primary next action-button float-right' value='Next' >Next</button>");

                } else if (index == totalFieldset - 1) {
                    $(this).prepend("<button id='btn-previous' onclick='previousGroup(" + index + ")' type='button'  name='previous' class='btn btn-dark previous action-button-previous float-right mr-3'' value='Previous' >Previous</button>");
                } else {


                    $(this).prepend("<button id='btn-previous' onclick='previousGroup(" + index + ")' type='button'  name='previous' class='btn btn-dark previous action-button-previous float-right mr-3'' value='Previous' >Previous</button>");
                    $(this).prepend("<button id='btn-next' onclick='nextGroup(" + index + ")' type='button'  name='next' class='btn btn-primary next action-button float-right' value='Next' >Next</button>");
                }


            });



            $('#property_data_modal').modal('show');
        }
    });


    /*
    var property_project_name = cols.dt0_property_project_name;
    var property_status_type_id = cols.dt3_property_status;


    $('#modal_property_id').val(property_unqique_id);
    $('#modal_project_name').val(property_project_name);



    $("#modal_property_status_type option:contains(" + property_status_type_id + ")").prop("selected", true);


*/




}


function resetUpdatePropertyForm() {

    $('#UpdatePropertyFormSubmit')[0].reset();
}


$(document).ready(function () {



    var refID = 1;

    getAllDevelopers();
    getPropertyListTable();



    // AddPropertyFormSubmit submit
    $("#AddPropertyFormSubmit").submit(function (event) {

        event.preventDefault();

        if (checkPropertyUserNameValidation() == 1) {

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

                        toastr.success("Property is added successfully!");

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


    function getAllDevelopers() {

        refID = 1;

        // getCustomerBranchNameList
        $.ajax({
            type: "POST",
            url: "getAllDevelopersList",
            data: "ref=" + refID,
            beforeSend: function () {

            },
            error: function () {

            },
            success: function (resp) {

                $('#developer_list option:not(:first)').remove();

                $("#developer_list").append(resp.developerSelectList);

            }
        });

    }


    // UploadPropertyFormData submit
    $("#UploadPropertyFormSubmit").submit(function (event) {

        event.preventDefault();

        var session_role_id = $("#session_role_id").val();

        if (session_role_id == 2) {

            refID = 1;

            var form = $(this);

            var formData = new FormData(this);

            var actionUrl = form.attr('action');

            $.ajax({
                type: "POST",
                url: actionUrl,
                data: formData,
                dataType: 'json',
                processData: false, // important
                contentType: false, // important
                beforeSend: function () {

                },
                error: function () {

                },
                success: function (resp) {

                    if (resp.code == 200) {

                        toastr.success("Property are added successfully!");

                        resetUploadPropertyForm();


                    } else if (resp.code == 400) {

                        toastr.error("Something went wrong, please try again.");

                        resetUploadPropertyForm();


                    }else if (resp.code == 403) {

                        toastr.error("Please contact your administrator to access upload feature.");

                        resetUploadPropertyForm();


                    }
                }
            });

        } else {

            if ($('select[name=developer_list]')[0].selectedIndex === 0) {
                //This is where your code goes
                alert('Select Developer');
            } else {






                refID = 1;

                var form = $(this);

                var formData = new FormData(this);

                var actionUrl = form.attr('action');

                $.ajax({
                    type: "POST",
                    url: actionUrl,
                    data: formData,
                    dataType: 'json',
                    processData: false, // important
                    contentType: false, // important
                    beforeSend: function () {

                    },
                    error: function () {

                    },
                    success: function (resp) {

                        if (resp.code == 200) {

                            toastr.success("Property are added successfully!");

                            resetUploadPropertyForm();


                        } else if (resp.code == 400) {

                            toastr.error("Something went wrong, please try again.");

                            resetUploadPropertyForm();


                        }
                    }
                });

            }
        }



    });




    function checkPropertyUserNameValidation() {

        refID = 1;

        var user_login_username = document.getElementById("user_login_username").value;
        var result = 0;

        $.ajax({
            type: "POST",
            url: baseUrl + "/User/CheckUserNameValidation",
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

    // UpdateUserFormSubmit submit
    $("#UpdatePropertyFormSubmit").submit(function (event) {

        refID = 1;

        event.preventDefault();

        var form = $(this);
        var actionUrl = form.attr('action');

        swal({
            title: "Are you sure?",
            text: "Would you like to update your property details!",
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

                                toastr.success("Property is updated successfully!");




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


    function resetAddPropertyForm() {

        $('#AddPropertyFormSubmit')[0].reset();
    }




    function resetUploadPropertyForm() {

        $('#UploadPropertyFormSubmit')[0].reset();
    }


    $("#resetAddPropertyFormSubmit").click(function (event) {


        event.preventDefault();

        refID = 1;

        resetAddPropertyForm();

    });


    $("#resetAddPropertyFormSubmit").click(function (event) {


        event.preventDefault();

        refID = 1;

        resetUploadPropertyForm();

    });


    // UserFilterForm submit
    $("#PropertyFilterForm").submit(function (event) {


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

                $("#DataTablesArea").append(resp.propertyTableList);

                $('#DataTables_Table_0').DataTable().ajax.reload();

                $('#DataTables_Table_0').DataTable().draw();
            }
        });

    });


    $("#resetPropertyFilterForm").click(function (event) {


        event.preventDefault();

        refID = 1;

        $('#PropertyFilterForm')[0].reset();

        getPropertyListTable();

    });


    function getPropertyListTable() {

        $('#DataTables_Table_0').DataTable({
            processing: true,
            serverSide: true,
            destroy: true,
            "order": [],
            //"ordering": false, // if turn off the sorting feature



            // display the data on the web page getting from the PHP response
            columns: [

                { data: "dt00_property_unqique_id", orderable: false },
                { data: "dt0_property_project_name", orderable: false },
                { data: "dt1_property_developer_name", orderable: false },
                { data: "dt2_property_unit_name", orderable: false },
                { data: "dt3_property_status", orderable: false },
                { data: "dt4_property_created_at", orderable: false },

            ],

            ajax: {
                url: "getPropertyListTable",
                type: "POST",
                async: false,
                data: function (data) {

                    return $.extend({}, data, {




                    });


                }
            },

            // add a new (7th) column for add edit/delete buttons
            "columnDefs": [{
                "targets": 6,
                orderable: false,
                "data": "dt00_property_unqique_id",
                "render": function (data, type, row, meta) {
                    return '<a class="badge bg-success mr-2"  title="" data-original-title="Edit" href="javascript:btnEditPropertyData(' + meta.row + ');">Edit <i style="font-size: 18px;" class="ri-pencil-line mr-0"></i></a>' +
                        '<a class="badge bg-danger mr-2"  title="" data-original-title="Delete" href="javascript:btnDeletePropertyData(' + data + ');">Delete <i style="font-size: 18px;" class="ri-delete-bin-2-line mr-0"></i></a>';

                }
            }],

            "pageLength": 10, //  by default

            // diplay the length of lists on the table for selection
            lengthMenu: [
                [5, 10, 25, 50, 100, 250, 500, -1], // function working values, -1 = ALL
                [5, 10, 25, 50, 100, 250, 500, 'All'], // display on web page as a alias
            ],


        });

    }


    $("#btnSavePropertyData").click(function (event) {

        refID = 1;

        event.preventDefault();

        var form = $("#UpdatePropertyFormSubmit");
        var actionUrl = form.attr('action');

        swal({
            title: "Are you sure?",
            text: "Would you like to update your property details!",
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

                                toastr.success("Property is updated successfully!");


                                getPropertyListTable();

                                $('#property_data_modal').modal('toggle');

                            } else if (resp.code == 400) {

                                toastr.error("Something went wrong, please try again.");


                                $('#property_data_modal').modal('toggle');


                            }else if (resp.code == 403) {

                                toastr.error("Please contact your administrator to access edit feature.");

                                $('#property_data_modal').modal('toggle')


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




});


//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches



