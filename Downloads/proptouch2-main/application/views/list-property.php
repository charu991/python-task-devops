<!-- Wrapper Start -->
<div class="wrapper">
    <?php include "layouts/left-panel.php"; ?>


    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">

                    <?php


                    if ($session_role_id == 2) {

                        $user_allowed_permission_detail = $this->session->userdata('user_allowed_permission_detail');

                        $user_allowed_permission_detail = array_filter($user_allowed_permission_detail, function ($ar) {
                            return ($ar['setting_id'] == 2);
                        });

                        if (!empty($user_allowed_permission_detail)) {
                        } else {

                    ?>
                            <div class="alert alert-warning" role="alert">
                                <div class="iq-alert-text">Please contact your administrator to access edit feature.</div>
                            </div>

                    <?php
                        }
                    }


                    ?>

                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Property List</h4>
                            <p class="mb-0">A dashboard provides you an overview of property list with access to the most important data,<br>
                                functions and controls.</p>
                        </div>
                        <a href="<?php echo base_url('property/new'); ?>" class="btn btn-primary add-list"><i class="las la-plus mr-3"></i>Add Property</a>
                    </div>


                    <div class="card box-bold-border">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Filter Data</h4>
                            </div>
                        </div>

                        <div class="card-body">
                            <form id="PropertyFilterForm" action="<?php echo base_url('Property/getDeveloperListTable'); ?>">
                                <div class="row">

                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Property List</label>

                                            <select id="list_properties" name="list_properties" class=" form-control" data-style="py-0">
                                                <option id="list_properties_option" selected style="display:none" value="0">Select Property</option>
                                            </select>


                                        </div>
                                    </div>


                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Access Role</label>

                                            <select id="list_user_access_role" name="list_user_access_role" class="form-control" data-style="py-0">
                                                <option id="list_users_access_role_option" selected style="display:none" value="0">Select Access Role</option>
                                            </select>

                                        </div>
                                    </div>




                                </div>

                                <button type="submit" class="btn btn-primary mr-2 enabled">Filter</button>
                                <button type="reset" id="resetPropertyFilterForm" name="resetPropertyFilterForm" class="btn btn-danger">Reset</button>

                            </form>
                        </div>

                    </div>



                    <div class="card box-bold-border">


                        <div class="card-body">


                            <div id="DataTablesArea">
                                <table id="DataTables_Table_0" class="display" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>Property ID</th>
                                            <th>Project Name</th>
                                            <th>Develper Name</th>
                                            <th>Unit Name</th>
                                            <th>Property Status</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Property ID</th>
                                            <th>Project Name</th>
                                            <th>Develper Name</th>
                                            <th>Unit Name</th>
                                            <th>Property Status</th>
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
        <div class="modal fade" id="property_data_modal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="popup text-left">
                            <div class="media align-items-top justify-content-between">
                                <h3 class="mb-3">Property</h3>
                                <div class="btn-cancel p-0" data-dismiss="modal"><i class="las la-times"></i></div>
                            </div>
                            <div class="card-footer border-0">
                                <div class="d-flex flex-wrap align-items-ceter justify-content-start">
                                    <div class="btn btn-primary mr-3" data-dismiss="modal">Cancel</div>
                                    <div id="btnSavePropertyData" class="btn btn-outline-primary">Save</div>
                                </div>
                            </div>
                            <div class="content edit-notes">
                                <div class="card card-transparent card-block card-stretch event-note mb-0">
                                    <div class="card-body px-0 bukmark">

                                        <input type="hidden" value="<?php echo base_url('Property/getPropertiesModalFieldsData'); ?>" id="getPropertiesModalFieldsDataURL" />



                                        <div class="row">

                                            <div class="col-md-4" id="property_modal_fields">


                                            </div>

                                            <div class="col-md-8">
                                                <form id="UpdatePropertyFormSubmit" action="<?php echo base_url('Property/updatePropertyFormData'); ?>">
                                                    <!-- <div class="form-group col-md-12">
                                                    <label>Property ID *</label>
                                                    <input type="text" class="form-control" id="modal_property_id" name="modal_property_id" placeholder="Property ID" required="" readonly>
                                                    <div class="help-block with-errors"></div>
                                                </div>

                                                <div class="form-group col-md-12">
                                                    <label>Project Name *</label>
                                                    <input type="text" class="form-control" id="modal_project_name" name="modal_project_name" placeholder="Enter Project Name" required="" readonly>
                                                    <div class="help-block with-errors"></div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Status *</label>
                                                        <select id="modal_property_status_type" name="modal_property_status_type" class="form-control" data-style="py-0" required="">
                                                            <option id="modal_property_status_type_option" selected style="display:none" value="0">Select Property Status</option>
                                                            <option value="1">Active</option>
                                                            <option value="2">Deactive</option>
                                                        </select>
                                                    </div>
                                                </div>

-->
                                                </form>
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
</div>

<!-- Backend Bundle JavaScript -->
<script src="<?php echo base_url(); ?>/assets/ajax/property.js"></script>