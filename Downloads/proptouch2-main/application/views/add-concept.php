<!-- Wrapper Start -->
<div class="wrapper">
    <?php include "layouts/left-panel.php"; ?>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card box-bold-border">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Add Concept</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form id="AddConceptFormSubmit"  action="<?php echo base_url('Concept/setAddConceptFormData'); ?>" data-toggle="validator" novalidate="true">
                                <div class="row">
                                    <div class="form-group col-md-12">
                                        <label>Field Name *</label>
                                        <input type="text" class="form-control" id="field_name" name="field_name" placeholder="Enter Field Name" required="">
                                        <div class="help-block with-errors"></div>
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label>Field Value *</label>
                                        <input type="text" class="form-control" id="field_value" name="field_value" placeholder="Enter Field Value" required="">
                                        <div class="help-block with-errors"></div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Attribute Type *</label>
                                            <select id="attribute_type" name="attribute_type" class="form-control" data-style="py-0" required="">
                                            <option id="attribute_type_option" selected style="display:none" value="0">Select Attribute Type</option>
                                            <option value="1">Text</option>
                                            <option value="2">Email</option>
                                            <option value="3">Checkbox</option>
                                            <option value="4">Radio</option>
                                            <option value="5">Phone</option>
                                            <option value="6">Date</option>

                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <button type="submit" class="btn btn-primary mr-2 enabled">Add Concept</button>
                                <button type="reset" name="resetAddConceptFormSubmit" id="resetAddConceptFormSubmit" class="btn btn-danger">Reset</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Page end  -->
        </div>
    </div>
</div>

<!-- Backend Bundle JavaScript -->
<script src="<?php echo base_url(); ?>/assets/ajax/concept.js"></script>