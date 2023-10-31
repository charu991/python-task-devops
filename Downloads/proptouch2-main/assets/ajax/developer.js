var permissionsNamesArray = [];
var developerAllowedPermissions = "";

$('#list_permissions').on('change', function () {

    var optionsText = this.options[this.selectedIndex].text;

    if (permissionsNamesArray.indexOf(optionsText) == -1) {

        permissionsNamesArray.push(optionsText);

        developerAllowedPermissions = permissionsNamesArray.join(', ');



    }

    $("#developer_allowed_permissions").val(developerAllowedPermissions);

});


function btnDeleteDeveloperData(getDeveloperId) {

    refID = 1;

    swal({
        title: "Are you sure?",
        text: "Would you like to delete your developer details!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                // ajax call

                $.ajax({
                    type: "POST",
                    url: "deleteDeveloperFormData",
                    data: "user_id=" + getDeveloperId + "&ref=" + refID,
                    beforeSend: function () {

                    },
                    error: function () {

                    },
                    success: function (resp) {

                        if (resp.code == 200) {

                            toastr.success("Developer is deleted successfully!");


                            getDeveloperListTable();



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


}


function btnEditDeveloperData(currentRowIndex) {

    permissionsNamesArray = [];
    resetDeveloperConceptForm();



    $.when(getAllUserRolesListForModal()).done(function (resp) {


        $('#modal_user_role_type option:not(:first)').remove();

        $("#modal_user_role_type").append(resp.userRolesSelectList);

        var table = $('#DataTables_Table_0').DataTable();
        var cols = table.row(currentRowIndex).data();




        var user_unqique_id = cols.dt00_user_unqique_id;
        var full_name = cols.dt0_full_name;
        var user_name = cols.dt1_user_name;
        var user_password = cols.dt2_user_password;
        var user_role_id = cols.dt3_user_role;
        var user_status_id = cols.dt4_user_status;
        var created_at = cols.dt5_created_at;
        var developer_allowed_permissions = cols.dt6_user_allowed_permissions;



        $('#modal_user_id').val(user_unqique_id);
        $('#modal_full_name').val(full_name);
        $('#modal_user_name').val(user_name);
        $('#modal_user_password').val(user_password);
        $('#modal_created_at').val(created_at);
        $('#developer_allowed_permissions').val(developer_allowed_permissions);


        $("#modal_user_role_type option:contains(" + user_role_id + ")").prop("selected", true);
        $("#modal_user_status_type option:contains(" + user_status_id + ")").prop("selected", true);

        $('#user_data_modal').modal('show');

    });





}

function resetDeveloperConceptForm() {

    $('#UpdateDeveloperFormSubmit')[0].reset();
}

// btnDeletePermissionData
function btnDeletePermissionData(getPermissionName, getDeveloperId) {


    refID = 1;


    var actionUrl = $('#deleteDeveloperPermissionDataURL').attr('value');

    swal({
        title: "Are you sure?",
        text: "Would you like to delete this developer permission details!",
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
                    data: "developer_id=" + getDeveloperId + "&permission_name=" + getPermissionName + "&ref=" + refID,
                    beforeSend: function () {

                    },
                    error: function () {

                    },
                    success: function (resp) {

                        if (resp.code == 200) {

                            toastr.success("Permission is deleted successfully!");


                            setTimeout(function () {
                                window.location.reload();
                            }, 500);

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





}


function getAllPermissionsList() {

    refID = 1;

    // getAllPermissionsList
    $.ajax({
        type: "POST",
        url: "getAllPermissionsLists",
        data: "ref=" + refID,
        beforeSend: function () {

        },
        error: function () {

        },
        success: function (resp) {

            $('#list_permissions option:not(:first)').remove();

            $("#list_permissions").append(resp.permissionSelectList);

        }
    });

}


function getAllUserRolesList() {

    refID = 1;

    // getAllUserRolesList
    $.ajax({
        type: "POST",
        url: "getAllUserRolesList",
        data: "ref=" + refID,
        beforeSend: function () {

        },
        error: function () {

        },
        success: function (resp) {

            $('#user_access_role option:not(:first)').remove();

            $("#user_access_role").append(resp.userRolesSelectList);

        }
    });

}

function getAllUserRolesListForModal() {

    refID = 1;

    // getAllUserRolesList
    return $.ajax({
        type: "POST",
        url: "getAllUserRolesListForModals",
        data: "ref=" + refID,
        beforeSend: function () {

        },
        error: function () {

        },
        success: function (resp) {

            //  $('#modal_user_role_type option:not(:first)').remove();

            // $("#modal_user_role_type").append(resp.userRolesSelectList);

        }
    });

}



$(document).ready(function () {

    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

    var refID = 1;

    getDeveloperListTable();
    getAllPermissionsList();
    getAllUserRolesList();
    // AddDeveloperFormSubmit submit
    $("#AddDeveloperFormSubmit").submit(function (event) {

        event.preventDefault();

        var user_access_role = $('#user_access_role').find(":selected").val();
        var user_status = $('#user_status').find(":selected").val();

        if (user_access_role > 0) {

            if (user_status > 0) {
                if (checkDeveloperUserNameValidation() == 1) {


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

                                toastr.success("Developer is added successfully!");

                                resetAddDeveloperForm();


                            } else if (resp.code == 400) {

                                toastr.error("Something went wrong, please try again.");

                                resetAddDeveloperForm();


                            }
                        }
                    });

                } else {
                    toastr.error("Username is already found.");

                }
            }else{
                toastr.error("Please select user status from the status list.");
            }
        } else {
            toastr.error("Please select user type from the user roles list.");
        }


    });



    $("#btnSaveDeveloperData").click(function (event) {

        refID = 1;

        event.preventDefault();

        var form = $("#UpdateDeveloperFormSubmit");
        var actionUrl = form.attr('action');

        swal({
            title: "Are you sure?",
            text: "Would you like to update your developer details!",
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

                                toastr.success("Developer is updated successfully!");


                                getDeveloperListTable();

                                $('#user_data_modal').modal('toggle');

                            } else if (resp.code == 400) {

                                toastr.error("Something went wrong, please try again.");


                                $('#concept_data_modal').modal('toggle');


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


    // UploadDeveloperFormData submit
    $("#UploadDeveloperFormSubmit").submit(function (event) {



        event.preventDefault();



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

                    toastr.success("Developers are added successfully!");

                    resetUploadDeveloperForm();


                } else if (resp.code == 400) {

                    toastr.error("Something went wrong, please try again.");

                    resetUploadDeveloperForm();


                }
            }
        });



    });




    function checkDeveloperUserNameValidation() {

        refID = 1;

        var actionUrl = $('#CheckUserNameValidationURL').attr('value');

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



    // UpdateUserFormSubmit submit
    $("#UpdateDeveloperFormSubmit").submit(function (event) {

        refID = 1;

        event.preventDefault();

        var form = $(this);
        var actionUrl = form.attr('action');

        swal({
            title: "Are you sure?",
            text: "Would you like to update your developer details!",
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

                                toastr.success("Developer is updated successfully!");




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


    function resetAddDeveloperForm() {

        $('#AddDeveloperFormSubmit')[0].reset();
    }


    function resetUploadDeveloperForm() {

        $('#UploadDeveloperFormSubmit')[0].reset();
    }


    $("#resetAddDeveloperFormSubmit").click(function (event) {


        event.preventDefault();

        refID = 1;

        $('#AddDeveloperFormSubmit')[0].reset();

    });




    // UserFilterForm submit
    $("#DeveloperFilterForm").submit(function (event) {


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


    $("#resetDeveloperFilterForm").click(function (event) {


        event.preventDefault();

        refID = 1;

        $('#DeveloperFilterForm')[0].reset();

        getDeveloperListTable();

    });






});

function getDeveloperListTable() {



    $('#DataTables_Table_0').DataTable({
        processing: true,
        serverSide: true,
        destroy: true,
        "order": [],
        //"ordering": false, // if turn off the sorting feature



        // display the data on the web page getting from the PHP response
        columns: [

            { data: "dt00_user_unqique_id", orderable: false },
            { data: "dt0_full_name", orderable: false },
            { data: "dt1_user_name", orderable: false },
            // { data: "dt2_user_password", orderable: false },
            { data: "dt3_user_role", orderable: false },
            {
                "data": "dt6_user_allowed_permissions",
                orderable: false,
                "render": function (data, type, row, meta) {

                    var permission_names = "";




                    if (data != null) {

                        var array = data.split(',');
                        var permission_names = "";



                        for (let index = 0; index < array.length; ++index) {
                            const element = array[index];



                            var a = document.createElement('a');
                            var i = document.createElement('i');
                            var link = document.createTextNode(" " + element);
                            // Set the a tag href property.
                            a.setAttribute('href', "javascript:" + "btnDeletePermissionData('" + element + "', '" + row.dt00_user_unqique_id + "')");
                            // Set the a tag class property.
                            a.setAttribute('class', "badge bg-danger mr-2");
                            // Set the i tag class property.
                            i.setAttribute('class', "ri-delete-bin-2-line mr-0");
                            // Append the i tag element to the anchor tag.
                            a.appendChild(i);
                            // Append the text node element to the anchor tag.
                            a.appendChild(link);

                            // console.log(a);

                            permission_names = permission_names + a.outerHTML;
                        }


                        // return data;
                        return permission_names;

                    } else {

                        return permission_names;
                    }
                }
            },

            { data: "dt4_user_status", orderable: false },
            { data: "dt5_created_at", orderable: false },

        ],

        ajax: {
            url: "getDeveloperListTable",
            type: "GET",
            data: function (data) {

            }
        },

        // add a new (7th) column for add edit/delete buttons
        "columnDefs": [{
            "targets": 7,
            orderable: false,
            "data": "dt00_user_unqique_id",
            "render": function (data, type, row, meta) {
                return '<a class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="javascript:btnEditDeveloperData(' + meta.row + ');">Edit <i class="ri-pencil-line mr-0"></i></a>' +
                    '<a class="badge bg-danger mr-2"  title="" data-original-title="Delete" href="javascript:btnDeleteDeveloperData(' + data + ');">Delete <i style="font-size: 18px;" class="ri-delete-bin-2-line mr-0"></i></a>';
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

