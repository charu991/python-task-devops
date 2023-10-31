


function resetUpdateConceptForm() {

    $('#UpdateConceptFormSubmit')[0].reset();
}

function btnDeleteConceptData(getConceptId){

    refID = 1;

    swal({
        title: "Are you sure?",
        text: "Would you like to delete your concept details!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                // ajax call

                $.ajax({
                    type: "POST",
                    url: "deleteConceptFormData",
                    data: "concept_id=" + getConceptId + "&ref=" + refID,
                    beforeSend: function () {

                    },
                    error: function () {

                    },
                    success: function (resp) {

                        if (resp.code == 200) {

                            toastr.success("Concept is deleted successfully!");


                            getConceptListTable();



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


function btnEditConceptData(currentRowIndex) {


    resetUpdateConceptForm();


    var table = $('#DataTables_Table_0').DataTable();
    var cols = table.row(currentRowIndex).data();




    var concept_unqique_id = cols.dt00_concept_unqique_id;
    var field_name = cols.dt0_field_name;
    var field_value = cols.dt1_field_value;
    var attribute_type_id = cols.dt2_attribute_type_id;
    var concept_status_id = cols.dt4_concept_status;
    var order_number = cols.dt3_order_number;


    $('#modal_concept_id').val(concept_unqique_id);
    $('#modal_field_name').val(field_name);
    $('#modal_field_value').val(field_value);


    $("#modal_attribute_type option:contains(" + attribute_type_id + ")").prop("selected", true);
    $("#modal_concept_status_type option:contains(" + concept_status_id + ")").prop("selected", true);

    $('#modal_sequence_number').val(order_number);

    $('#concept_data_modal').modal('show');


}


function deleteCategory(getConceptID) {

    alert(getConceptID);

}


function updateConcept(getCategoryID) {

    alert(getConceptID);

}

function getConceptListTable() {

    $('#DataTables_Table_0').DataTable({
        processing: true,
        serverSide: true,
        destroy: true,
        "order": [],
        //"ordering": false, // if turn off the sorting feature



        // display the data on the web page getting from the PHP response
        columns: [

            { data: "dt00_concept_unqique_id", orderable: false },
            { data: "dt0_field_name", orderable: false },
            { data: "dt1_field_value", orderable: false },
            { data: "dt2_attribute_type_id", orderable: false },
            { data: "dt3_order_number", orderable: false },
            { data: "dt4_concept_status", orderable: false },
            { data: "dt5_created_at", orderable: false },

        ],

        ajax: {
            url: "getConceptListTable",
            type: "GET",
            data: function (data) {

            }
        },

        // add a new (7th) column for add edit/delete buttons
        "columnDefs": [{
            "targets": 7,
            orderable: false,
            "data": "dt00_concept_unqique_id",
            "render": function (data, type, row, meta) {



                return '<a class="badge bg-success mr-2"  title="" data-original-title="Edit" href="javascript:btnEditConceptData(' + meta.row + ');">Edit <i style="font-size: 18px;" class="ri-pencil-line mr-0"></i></a>' +
                       '<a class="badge bg-danger mr-2"  title="" data-original-title="Delete" href="javascript:btnDeleteConceptData(' + data + ');">Delete <i style="font-size: 18px;" class="ri-delete-bin-2-line mr-0"></i></a>';
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

$(document).ready(function () {


    var refID = 1;


    getConceptListTable();

    function resetAddConceptForm() {

        $('#AddConceptFormSubmit')[0].reset();
    }





    $("#resetAddConceptFormSubmit").click(function (event) {


        event.preventDefault();

        refID = 1;

        resetAddConceptForm();

    });


    // AddConceptFormSubmit submit
    $("#AddConceptFormSubmit").submit(function (event) {

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

                    toastr.success("Concept is added successfully!");

                    resetAddConceptForm();


                } else if (resp.code == 400) {

                    toastr.error("Something went wrong, please try again.");

                    resetAddConceptForm();


                }
            }
        });




    });


    $("#btnSaveConceptData").click(function (event) {

        refID = 1;

        event.preventDefault();

        var form = $("#UpdateConceptFormSubmit");
        var actionUrl = form.attr('action');

        swal({
            title: "Are you sure?",
            text: "Would you like to update your concept details!",
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

                                toastr.success("Concept is updated successfully!");


                                getConceptListTable();

                                $('#concept_data_modal').modal('toggle');

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

    /*function getConceptListTable() {

        refID = 1;

        // getCustomerListTable
        $.ajax({
            type: "POST",
            url: "getConceptListTable",
            data: "ref=" + refID,
            beforeSend: function () {

            },
            error: function () {

            },
            success: function (resp) {


                $("#DataTables_Table_0_wrapper").remove();

                $("#DataTablesArea").append(resp.conceptTableList);

                $('#DataTables_Table_0').DataTable().ajax.reload();

                $('#DataTables_Table_0').DataTable().draw();


            }
        });

    }*/







});