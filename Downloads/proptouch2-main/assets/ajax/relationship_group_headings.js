var getGroupId = 0;

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function setFontSize(el) {
    var fontSize = el.val();

    if (isNumber(fontSize) && fontSize >= 0.5) {
        $('#relationship_groups_heading').css({ fontSize: fontSize + 'em' });
    } else if (fontSize) {
        el.val('1');
        $('#relationship_groups_heading').css({ fontSize: '1em' });
    }
}

$(function () {

    $('#fontSize')
        .bind('change', function () { setFontSize($(this)); })
        .bind('keyup', function (e) {
            if (e.keyCode == 27) {
                $(this).val('1');
                $('#relationship_groups_heading').css({ fontSize: '1em' });
            } else {
                setFontSize($(this));
            }
        });

    $(window)
        .bind('keyup', function (e) {
            if (e.keyCode == 27) {
                $('#fontSize').val('1');
                $('#relationship_groups_heading').css({ fontSize: '1em' });
            }
        });

});


$(document).ready(function () {



    var refID = 1;

    getRelationshipGroupsHeading();


});


function getRelationshipGroupsHeading() {

    $("#relationship_groups_heading").empty();

    var actionUrl = $('#getRelationshipGroupsHeadingURL').attr('value');


    refID = 1;

    $.ajax({
        type: "POST",
        url: actionUrl,
        data: "ref=" + refID,
        async: true,
        beforeSend: function () {

        },
        error: function () {

        },
        success: function (resp) {



            $("#relationship_groups_heading").append(resp.relationshipGroupsHeadingHTML);


        }
    });
}


function getHeadingListTable() {

    var actionUrl = $('#getHeadingListTableURL').attr('value');

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

        ],

        ajax: {
            url: actionUrl,
            type: "POST",
            async: false,
            cache: false,
            data: function (data) {

                return $.extend({}, data, {




                });


            },

        },


        // add a new (0th) column for add edit/delete buttons
        "columnDefs": [{
            "targets": 0,
            orderable: false,
            "data": "dt00_heading_unqique_id",
            "render": function (data, type, row, meta) {
                return '<div class="col-md-12"> <div class="checkbox d-inline-block mr-3 rtl-mr-0"> <input type="checkbox" class="checkbox-input" id="heading_id" name="heading_id" value="' + data + '"> </div></div>';

            }
        }],


        "pageLength": -1, //  by default

        // diplay the length of lists on the table for selection
        lengthMenu: [
            [5, 10, 25, 50, 100, 250, 500, -1], // function working values, -1 = ALL
            [5, 10, 25, 50, 100, 250, 500, 'All'], // display on web page as a alias
        ],


    });

}



function btnOpenListHeadings(getNewGroupId) {

    getGroupId = getNewGroupId;

    getHeadingListTable();

    getRelationshipHeadingByGroupID(function (output) {
        // here you use the output

        var headingNamesArray = output;

        $('#DataTables_Table_0 td').each(function () {


            var datatable_heading_value = $(this).closest('tr').children('td:nth-child(2)').html();

            if (headingNamesArray.indexOf(datatable_heading_value) !== -1) {


                  $(this).closest('tr').children('td:first').find('input[type=checkbox').attr({ checked: "true" });


            } else {

                $(this).closest('tr').children('td:first').find('input[type=checkbox').removeAttr("checked enabled");
                $(this).css("color", "black");
            }



            $('#heading_data_modal').modal('show');

        });



    });






}

function getRelationshipHeadingByGroupID(handleData) {


    var actionUrl = $('#getRelationshipHeadingByGroupIDURL').attr('value');


    refID = 1;

    $.ajax({
        type: "POST",
        url: actionUrl,
        data: "group_unqique_id=" + getGroupId + "&ref=" + refID,
        async: false,
        cache: false,
        beforeSend: function () {

        },
        error: function () {

        },
        success: function (resp) {

            handleData(resp.headingNamesArray);
            //  return resp.headingNamesArray;


        }
    });
}

function btnDeleteRelationshipGroupsHeading(getRelationshipGroupsHeadingId) {

    var actionUrl = $('#getDeleteRelationshipGroupsHeadingURL').attr('value');


    refID = 1;

    swal({
        title: "Are you sure?",
        text: "Would you like to delete your groups and heading relationship details!",
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
                    data: "relationship_groups_heading_id=" + getRelationshipGroupsHeadingId + "&ref=" + refID,
                    async: true,
                    beforeSend: function () {

                    },
                    error: function () {

                    },
                    success: function (resp) {



                        if (resp.code == 200) {

                            toastr.success("Operation was completed successfully!");


                            getRelationshipGroupsHeading();

                        } else if (resp.code == 400) {

                            toastr.error("Something went wrong, please try again.");


                            getRelationshipGroupsHeading();


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


// btnSaveGroupHeadingRelation submit
$("#btnSaveGroupHeadingRelation").click(function (event) {

    var actionUrl = $('#setRelationshipGroupsHeadingURL').attr('value');
    event.preventDefault();

    const headingIdList = [];

    $("input:checkbox[name=heading_id]:checked").each(function () {


        if ($(this).is('[disabled]') == false) {
            headingIdList.push($(this).val());
        }





    });

    refID = 1;

    if (headingIdList.length == 0) {
        toastr.info("Please select headings from the list");
    } else {


        swal({
            title: "Are you sure?",
            text: "Would you like to continue!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {


                    $.ajax({
                        type: "POST",
                        url: actionUrl,
                        data: "group_id=" + getGroupId + "&headingIdList=" + headingIdList + "&ref=" + refID,
                        beforeSend: function () {

                        },
                        error: function () {

                        },
                        success: function (resp) {

                            if (resp.code == 200) {

                                toastr.success("Operation was completed successfully!");

                                //  resetTransferProduct();


                                getRelationshipGroupsHeading();

                                $('#heading_data_modal').modal('toggle');


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

});