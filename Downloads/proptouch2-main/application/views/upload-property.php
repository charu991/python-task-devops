<!-- Wrapper Start -->
<div class="wrapper">
    <?php include "layouts/left-panel.php"; ?>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">

                    <?php


                    if ($session_role_id == 2) {

                        $user_allowed_permission_detail = $this->session->userdata('user_allowed_permission_detail');

                        $user_allowed_permission_detail = array_filter($user_allowed_permission_detail, function ($ar) {
                            return ($ar['setting_id'] == 1);
                        });

                        if (!empty($user_allowed_permission_detail)) {
                        } else {

                    ?>
                            <div class="alert alert-warning" role="alert">
                                <div class="iq-alert-text">Please contact your administrator to access upload feature.</div>
                            </div>

                    <?php
                        }
                    }


                    ?>
                    <div class="card box-bold-border">

                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Upload Property</h4>
                            </div>
                        </div>
                        <div class="card-body">



                            <form id="UploadPropertyFormSubmit" action="<?php echo base_url('Property/setUploadPropertyFormData'); ?>" data-toggle="validator" novalidate="true">
                                <div class="row">

                                    <input type="hidden" class="form-control" id="session_role_id" name="session_role_id" value="<?php echo $session_role_id; ?>">

                                    <?php




                                    if ($session_role_id == 1) {
                                    ?>


                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Select Developer *</label>
                                                <select id="developer_list" name="developer_list" class="form-control" data-style="py-0" required="">
                                                    <option id="developer_list_option" selected style="display:none" value="0">Select Developer</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div class="form-group col-md-3">
                                            <label>Choose (.CSV) *</label>
                                            <input type="file" class="form-control" id="property_file_list" name="property_file_list" placeholder="Browser" required="" accept=".csv">
                                            <div class="help-block with-errors"></div>
                                        </div>

                                        <div class="form-group col-md-12">
                                            <button id="btnUploadPropertyFormSubmit" type="submit" class="btn btn-primary mr-2 enabled">Upload Property</button>
                                            <button type="reset" name="resetUploadPropertyFormSubmit" id="resetUploadPropertyFormSubmit" class="btn btn-danger">Reset</button>
                                        </div>

                                    <?php

                                    }


                                    ?>


                                    <?php


                                    if ($session_role_id == 2) {

                                        $user_allowed_permission_detail = $this->session->userdata('user_allowed_permission_detail');

                                        $user_allowed_permission_detail = array_filter($user_allowed_permission_detail, function ($ar) {
                                            return ($ar['setting_id'] == 1);
                                        });

                                        if (!empty($user_allowed_permission_detail)) {

                                    ?>

                                            <div class="form-group col-md-3">
                                                <label>Choose (.CSV) *</label>
                                                <input type="file" class="form-control" id="property_file_list" name="property_file_list" placeholder="Browser" required="" accept=".csv">
                                                <div class="help-block with-errors"></div>
                                            </div>

                                            <div class="form-group col-md-12">
                                                <button id="btnUploadPropertyFormSubmit" type="submit" class="btn btn-primary mr-2 enabled">Upload Property</button>
                                                <button type="reset" name="resetUploadPropertyFormSubmit" id="resetUploadPropertyFormSubmit" class="btn btn-danger">Reset</button>
                                            </div>
                                        <?php
                                        } else {

                                        ?>
                                            <div class="form-group col-md-3">
                                                <label>Choose (.CSV) *</label>
                                                <input type="file" class="form-control" id="property_file_list" name="property_file_list" placeholder="Browser" required="" accept=".csv">
                                                <div class="help-block with-errors"></div>


                                            </div>

                                            <div class="form-group col-md-12">
                                                <button id="btnUploadPropertyFormSubmit" type="submit" disabled class="btn btn-primary mr-2 enabled">Upload Property</button>
                                                <button type="reset" name="resetUploadPropertyFormSubmit" disabled id="resetUploadPropertyFormSubmit" class="btn btn-danger">Reset</button>
                                            </div>

                                    <?php
                                        }
                                    }


                                    ?>


                                </div>



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