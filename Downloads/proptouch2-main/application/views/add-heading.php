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
                                <h4 class="card-title">Add Heading</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form id="AddHeadingFormSubmit"  action="<?php echo base_url('Heading/setAddHeadingFormData'); ?>" data-toggle="validator" novalidate="true">
                                <div class="row">
                                    <div class="form-group col-md-6">
                                        <label>Heading Name *</label>
                                        <input type="text" class="form-control" id="heading_name" name="heading_name" placeholder="Enter Heading Name" required="">
                                        <div class="help-block with-errors"></div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Heading Status *</label>
                                            <select id="user_status" name="user_status" class="form-control" data-style="py-0" required="">
                                            <option id="user_status_option" selected style="display:none" value="0">Select Heading Status</option>
                                                <option value="1">Active</option>
                                                <option value="2">Deactive</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <button type="submit" class="btn btn-primary mr-2 enabled">Add Heading</button>
                                <button type="reset" name="resetAddHeadingFormSubmit" id="resetAddHeadingFormSubmit" class="btn btn-danger">Reset</button>

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
<script src="<?php echo base_url(); ?>/assets/ajax/heading.js"></script>