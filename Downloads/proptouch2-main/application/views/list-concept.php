<!-- Wrapper Start -->
<div class="wrapper">
    <?php include "layouts/left-panel.php"; ?>



    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Concept List</h4>
                            <p class="mb-0">A dashboard provides you an overview of concept list with access to the most important data,<br>
                                functions and controls.</p>
                        </div>
                        <a href="<?php echo base_url('concept/new'); ?>" class="btn btn-primary add-list"><i class="las la-plus mr-3"></i>Add Concept</a>
                    </div>

                    <div class="card box-bold-border">


                        <div class="card-body">


                            <div id="DataTablesArea">

                                <table id="DataTables_Table_0" class="display" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>Concept ID</th>
                                            <th>Field Name</th>
                                            <th>Field Value</th>
                                            <th>Attribute Type</th>
                                            <th>Sequence Number</th>
                                            <th>Status</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Concept ID</th>
                                            <th>Field Name</th>
                                            <th>Field Value</th>
                                            <th>Attribute Type</th>
                                            <th>Sequence Number</th>
                                            <th>Status</th>
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
        <div class="modal fade" id="concept_data_modal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="popup text-left">
                            <div class="media align-items-top justify-content-between">
                                <h3 class="mb-3">Edit Concept</h3>
                                <div class="btn-cancel p-0" data-dismiss="modal"><i class="las la-times"></i></div>
                            </div>
                            <div class="content edit-notes">
                                <div class="card card-transparent card-block card-stretch event-note mb-0">
                                    <div class="card-body px-0 bukmark">

                                        <form id="UpdateConceptFormSubmit" action="<?php echo base_url('Concept/updateConceptFormData'); ?>" data-toggle="validator" novalidate="true">
                                            <div class="row">



                                                <div class="form-group col-md-12">
                                                    <label>Concept ID *</label>
                                                    <input type="text" class="form-control" id="modal_concept_id" name="modal_concept_id" placeholder="Concept ID" required="" readonly>
                                                    <div class="help-block with-errors"></div>
                                                </div>

                                                <div class="form-group col-md-12">
                                                    <label>Field Name *</label>
                                                    <input type="text" class="form-control" id="modal_field_name" name="modal_field_name" placeholder="Enter Field Name" required="">
                                                    <div class="help-block with-errors"></div>
                                                </div>

                                                <div class="form-group col-md-12">
                                                    <label>Field Value *</label>
                                                    <input type="text" class="form-control" id="modal_field_value" name="modal_field_value" placeholder="Enter Field Value" required="">
                                                    <div class="help-block with-errors"></div>
                                                </div>

                                                <div class="form-group col-md-12">
                                                    <label>Sequence Number *</label>
                                                    <input type="text" class="form-control" id="modal_sequence_number" name="modal_sequence_number" placeholder="Enter Field Value" required="">
                                                    <div class="help-block with-errors"></div>
                                                </div>


                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Attribute Type *</label>
                                                        <select id="modal_attribute_type" name="modal_attribute_type" class="form-control" data-style="py-0" required="">
                                                            <option id="modal_attribute_type_option" selected style="display:none" value="0">Select Attribute Type</option>
                                                            <option value="1">Text</option>
                                                            <option value="2">Email</option>
                                                            <option value="3">Checkbox</option>
                                                            <option value="4">Radio</option>
                                                            <option value="5">Phone</option>
                                                            <option value="6">Date</option>

                                                        </select>
                                                    </div>
                                                </div>


                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Status *</label>
                                                        <select id="modal_concept_status_type" name="modal_concept_status_type" class="form-control" data-style="py-0" required="">
                                                            <option id="modal_concept_status_type_option" selected style="display:none" value="0">Select Property Status</option>
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
                                            <div id="btnSaveConceptData" class="btn btn-outline-primary">Save</div>
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
<script src="<?php echo base_url(); ?>/assets/ajax/concept.js"></script>