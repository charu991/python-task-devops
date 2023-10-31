


function btnEditGroupData(currentRowIndex) {


    resetUpdateGroupForm();


    var table = $('#DataTables_Table_0').DataTable();
    var cols = table.row(currentRowIndex).data();




    var group_unqique_id = cols.dt00_group_unqique_id;
    var group_name = cols.dt0_group_name;
    var group_icon_shortcode = cols.dt1_group_icon_shortcode;
    var group_status_type_id = cols.dt2_group_status_name;


    $('#modal_group_id').val(group_unqique_id);
    $('#modal_group_name').val(group_name);
    $('#modal_group_icon_shortcode').val(group_icon_shortcode);


    $("#modal_group_status_type option:contains(" + group_status_type_id + ")").prop("selected", true);




    $('#group_data_modal').modal('show');


}


function btnDeleteGroupData(getGroupId) {

    refID = 1;

    swal({
        title: "Are you sure?",
        text: "Would you like to delete your group details!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                // ajax call

                $.ajax({
                    type: "POST",
                    url: "deleteGroupFormData",
                    data: "group_id=" + getGroupId + "&ref=" + refID,
                    beforeSend: function () {

                    },
                    error: function () {

                    },
                    success: function (resp) {

                        if (resp.code == 200) {

                            toastr.success("Group is deleted successfully!");


                            getGroupListTable();



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

function resetUpdateGroupForm() {

    $('#UpdateGroupFormSubmit')[0].reset();
}


$(document).ready(function () {



    var refID = 1;

    getGroupListTable();

});

// AddGroupFormSubmit submit
$("#AddGroupFormSubmit").submit(function (event) {

    event.preventDefault();



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

                toastr.success("Group is added successfully!");

                resetAddGroupForm();


            } else if (resp.code == 400) {

                toastr.error("Something went wrong, please try again.");

                resetAddGroupForm();


            }
        }
    });




});





// UpdateGroupFormSubmit submit
$("#UpdateGroupFormSubmit").submit(function (event) {

    refID = 1;

    event.preventDefault();

    var form = $(this);
    var actionUrl = form.attr('action');

    swal({
        title: "Are you sure?",
        text: "Would you like to update your group details!",
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

                            toastr.success("Group is updated successfully!");




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


function resetAddGroupForm() {

    $('#AddGroupFormSubmit')[0].reset();
}



$("#resetAddGroupFormSubmit").click(function (event) {


    event.preventDefault();

    refID = 1;

    resetAddGroupForm();

});



function getGroupListTable() {

    $('#DataTables_Table_0').DataTable({
        processing: true,
        serverSide: true,
        destroy: true,
        "order": [],
        //"ordering": false, // if turn off the sorting feature



        // display the data on the web page getting from the PHP response
        columns: [

            { data: "dt00_group_unqique_id", orderable: false },
            {
                "data": "dt1_group_icon_shortcode",
                "render": function (data, type, row, meta) {
                    return '<i style="font-size: 18px;" class="las ' + data + '"></i>';
                }
            },
            { data: "dt0_group_name", orderable: false },
            { data: "dt2_group_status_name", orderable: false },
            { data: "dt3_group_created_at", orderable: false },


        ],

        // add a new (5th) column for add edit/delete buttons
        "columnDefs": [{
            "targets": 5,
            orderable: false,
            "data": "dt00_group_unqique_id",
            "render": function (data, type, row, meta) {
                return '<a class="badge bg-success mr-2"  title="" data-original-title="Edit" href="javascript:btnEditGroupData(' + meta.row + ');">Edit <i style="font-size: 18px;" class="ri-pencil-line mr-0"></i></a>' +
                    '<a class="badge bg-danger mr-2"  title="" data-original-title="Delete" href="javascript:btnDeleteGroupData(' + data + ');">Delete <i style="font-size: 18px;" class="ri-delete-bin-2-line mr-0"></i></a>';

            }
        }],


        ajax: {
            url: "getGroupListTable",
            type: "POST",
            async: false,
            data: function (data) {

                return $.extend({}, data, {




                });


            }
        },


        "pageLength": 10, //  by default

        // diplay the length of lists on the table for selection
        lengthMenu: [
            [5, 10, 25, 50, 100, 250, 500, -1], // function working values, -1 = ALL
            [5, 10, 25, 50, 100, 250, 500, 'All'], // display on web page as a alias
        ],


    });

}


$("#btnSaveGroupData").click(function (event) {

    refID = 1;

    event.preventDefault();

    var form = $("#UpdateGroupFormSubmit");
    var actionUrl = form.attr('action');

    swal({
        title: "Are you sure?",
        text: "Would you like to update your group details!",
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

                            toastr.success("Group is updated successfully!");


                            getGroupListTable();

                            $('#group_data_modal').modal('toggle');

                        } else if (resp.code == 400) {

                            toastr.error("Something went wrong, please try again.");


                            $('#group_data_modal').modal('toggle');


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

