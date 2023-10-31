<!-- Wrapper Start -->
<div class="wrapper">
    <?php include "layouts/left-panel.php"; ?>



    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Heading List</h4>
                            <p class="mb-0">A dashboard provides you an overview of heading list with access to the most important data,<br>
                                functions and controls.</p>
                        </div>
                        <a href="<?php echo base_url('heading/new'); ?>" class="btn btn-primary add-list"><i class="las la-plus mr-3"></i>Add Heading</a>
                    </div>

                    <div class="card box-bold-border">


                        <div class="card-body">


                            <div id="DataTablesArea">
                                <table id="DataTables_Table_0" class="display" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>Heading ID</th>
                                            <th>Heading Name</th>
                                            <th>Heading Status</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Heading ID</th>
                                            <th>Heading Name</th>
                                            <th>Heading Status</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Page end  -->
        </div>
        <!-- Modal Edit -->
        <div class="modal fade" id="heading_data_modal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="popup text-left">
                            <div class="media align-items-top justify-content-between">
                                <h3 class="mb-3">Heading</h3>
                                <div class="btn-cancel p-0" data-dismiss="modal"><i class="las la-times"></i></div>
                            </div>
                            <div class="content edit-notes">
                                <div class="card card-transparent card-block card-stretch event-note mb-0">
                                    <div class="card-body px-0 bukmark">

                                        <form id="UpdateHeadingFormSubmit" action="<?php echo base_url('Heading/updateHeadingFormData'); ?>" data-toggle="validator" novalidate="true">
                                            <div class="row">



                                                <div class="form-group col-md-12">
                                                    <label>Heading ID *</label>
                                                    <input type="text" class="form-control" id="modal_heading_id" name="modal_heading_id" placeholder="Heading ID" required="" readonly>
                                                    <div class="help-block with-errors"></div>
                                                </div>

                                                <div class="form-group col-md-12">
                                                    <label>Heading Name *</label>
                                                    <input type="text" class="form-control" id="modal_heading_name" name="modal_heading_name" placeholder="Enter Heading Name" required="">
                                                    <div class="help-block with-errors"></div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Status *</label>
                                                        <select id="modal_heading_status_type" name="modal_heading_status_type" class="form-control" data-style="py-0" required="">
                                                            <option id="modal_heading_status_type_option" selected style="display:none" value="0">Select Heading Status</option>
                                                            <option value="1">Active</option>
                                                            <option value="2">Deactive</option>
                                                        </select>
                                                    </div>
                                                </div>


                                            </div>

                                        </form>

                                    </div>
                                    <div class="card-footer border-0">
                                        <div class="d-flex flex-wrap align-items-ceter justify-content-end">
                                            <div class="btn btn-primary mr-3" data-dismiss="modal">Cancel</div>
                                            <div id="btnSaveHeadingData" class="btn btn-outline-primary">Save</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Backend Bundle JavaScript -->
<script src="<?php echo base_url(); ?>/assets/ajax/heading.js"></script>