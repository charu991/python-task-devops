


function btnEditHeadingData(currentRowIndex) {


    resetUpdateHeadingForm();


    var table = $('#DataTables_Table_0').DataTable();
    var cols = table.row(currentRowIndex).data();




    var heading_unqique_id = cols.dt00_heading_unqique_id;
    var heading_name = cols.dt0_heading_name;
    var heading_status_type_id = cols.dt2_heading_status_name;


    $('#modal_heading_id').val(heading_unqique_id);
    $('#modal_heading_name').val(heading_name);



    $("#modal_heading_status_type option:contains(" + heading_status_type_id + ")").prop("selected", true);




    $('#heading_data_modal').modal('show');


}

function btnDeleteHeadingData(getHeadingId) {

    refID = 1;

    swal({
        title: "Are you sure?",
        text: "Would you like to delete your heading details!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                // ajax call

                $.ajax({
                    type: "POST",
                    url: "deleteHeadingFormData",
                    data: "heading_id=" + getHeadingId + "&ref=" + refID,
                    beforeSend: function () {

                    },
                    error: function () {

                    },
                    success: function (resp) {

                        if (resp.code == 200) {

                            toastr.success("Heading is deleted successfully!");


                            getHeadingListTable();



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

function resetUpdateHeadingForm() {

    $('#UpdateHeadingFormSubmit')[0].reset();
}


$(document).ready(function () {



    var refID = 1;

    getHeadingListTable();

});

// AddHeadingFormSubmit submit
$("#AddHeadingFormSubmit").submit(function (event) {

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

                toastr.success("Heading is added successfully!");

                resetAddUserForm();


            } else if (resp.code == 400) {

                toastr.error("Something went wrong, please try again.");

                resetAddUserForm();


            }
        }
    });




});





// UpdateHeadingFormSubmit submit
$("#UpdateHeadingFormSubmit").submit(function (event) {

    refID = 1;

    event.preventDefault();

    var form = $(this);
    var actionUrl = form.attr('action');

    swal({
        title: "Are you sure?",
        text: "Would you like to update your heading details!",
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

                            toastr.success("Heading is updated successfully!");




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


function resetAddHeadingForm() {

    $('#AddHeadingFormSubmit')[0].reset();
}



$("#resetAddHeadingFormSubmit").click(function (event) {


    event.preventDefault();

    refID = 1;

    resetAddHeadingForm();

});



function getHeadingListTable() {

    $('#DataTables_Table_0').DataTable({
        processing: true,
        serverSide: true,
        destroy: true,
        "order": [],
        //"ordering": false, // if turn off the sorting feature



        // display the data on the web page getting from the PHP response
        columns: [

            { data: "dt00_heading_unqique_id", orderable: false },
            { data: "dt0_heading_name", orderable: false },
            { data: "dt2_heading_status_name", orderable: false },
            { data: "dt3_heading_created_at", orderable: false },

        ],

        ajax: {
            url: "getHeadingListTable",
            type: "POST",
            async: false,
            data: function (data) {

                return $.extend({}, data, {




                });


            }
        },

        // add a new (7th) column for add edit/delete buttons
        "columnDefs": [{
            "targets": 4,
            orderable: false,
            "data": "dt00_heading_unqique_id",
            "render": function (data, type, row, meta) {
                return '<a class="badge bg-success mr-2"  title="" data-original-title="Edit" href="javascript:btnEditHeadingData(' + meta.row + ');">Edit <i style="font-size: 18px;" class="ri-pencil-line mr-0"></i></a>' +
                    '<a class="badge bg-danger mr-2"  title="" data-original-title="Delete" href="javascript:btnDeleteHeadingData(' + data + ');">Delete <i style="font-size: 18px;" class="ri-delete-bin-2-line mr-0"></i></a>';

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


$("#btnSaveHeadingData").click(function (event) {

    refID = 1;

    event.preventDefault();

    var form = $("#UpdateHeadingFormSubmit");
    var actionUrl = form.attr('action');

    swal({
        title: "Are you sure?",
        text: "Would you like to update your heading details!",
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

                            toastr.success("Heading is updated successfully!");


                            getHeadingListTable();

                            $('#heading_data_modal').modal('toggle');

                        } else if (resp.code == 400) {

                            toastr.error("Something went wrong, please try again.");


                            $('#heading_data_modal').modal('toggle');


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

