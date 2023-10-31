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
                                <h4 class="card-title">Upload User</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form id="UploadDeveloperFormSubmit" enctype="multipart/form-data" action="<?php echo base_url('Developer/setUploadDeveloperFormData'); ?>" data-toggle="validator" novalidate="true">
                                <div class="row">
                                    <div class="form-group col-md-3">
                                        <label>Choose (.CSV) *</label>
                                        <input type="file" class="form-control" id="developer_file_list" name="developer_file_list" placeholder="Browser" required="" accept=".csv">
                                        <div class="help-block with-errors"></div>
                                    </div>


                                </div>

                                <button type="submit" name="btnUploadDeveloperFile" id="btnUploadDeveloperFile" class="btn btn-primary mr-2 enabled">Upload User</button>
                                <button type="reset" name="resetUploadDeveloperFormSubmit" id="resetUploadDeveloperFormSubmit" class="btn btn-danger">Reset</button>

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
<script src="<?php echo base_url(); ?>/assets/ajax/developer.js"></script>