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
                                <h4 class="card-title">Add Property</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form id="AddPropertyFormSubmit"  action="<?php echo base_url('Property/setAddPropertyFormData'); ?>" data-toggle="validator" novalidate="true">
                                <div class="row">
                                    <div class="form-group col-md-12">
                                        <label>Property Name *</label>
                                        <input type="text" class="form-control" id="property_name" name="property_name" placeholder="Enter Property Name" required="">
                                        <div class="help-block with-errors"></div>
                                    </div>



                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Status *</label>
                                            <select id="user_status" name="user_status" class="form-control" data-style="py-0" required="">
                                            <option id="user_status_option" selected style="display:none" value="0">Select Property Status</option>
                                                <option value="1">Active</option>
                                                <option value="2">Deactive</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <button type="submit" class="btn btn-primary mr-2 enabled">Add Property</button>
                                <button type="reset" name="resetAddPropertyFormSubmit" id="resetAddPropertyFormSubmit" class="btn btn-danger">Reset</button>

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
<script src="<?php echo base_url(); ?>/assets/ajax/property.js"></script>