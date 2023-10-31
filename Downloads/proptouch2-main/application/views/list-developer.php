<!-- Wrapper Start -->
<div class="wrapper">
    <?php include "layouts/left-panel.php"; ?>




    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">User List</h4>
                            <p class="mb-0">A dashboard provides you an overview of developer list with access to the most important data,<br>
                                functions and controls.</p>
                        </div>
                        <a href="<?php echo base_url('developer/new'); ?>" class="btn btn-primary add-list"><i class="las la-plus mr-3"></i>Add User</a>
                    </div>


                    <div class="card box-bold-border">
                        <div class="card-header d-flex justify-content-between ">
                            <div class="header-title">
                                <h4 class="card-title">Filter Data</h4>
                            </div>
                        </div>

                        <div class="card-body">
                            <form id="DeveloperFilterForm" action="<?php echo base_url('Developer/getDeveloperListTable'); ?>">
                                <div class="row">

                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>User List</label>

                                            <select id="list_developers" name="list_developers" class=" form-control" data-style="py-0">
                                                <option id="list_developers_option" selected style="display:none" value="0">Select User</option>
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
                                <button type="reset" id="resetDeveloperFilterForm" name="resetDeveloperFilterForm" class="btn btn-danger">Reset</button>

                            </form>
                        </div>

                    </div>



                    <div class="card ">


                        <div class="card-body box-bold-border">

                            <input type="hidden" value="<?php echo base_url('Developer/deleteDeveloperPermissionData'); ?>" id="deleteDeveloperPermissionDataURL" />

                            <div id="DataTablesArea">

                                <table id="DataTables_Table_0" class="display " style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>User ID</th>
                                            <th>Full Name</th>
                                            <th>Username</th>
                                            <!--  <th>Password</th> -->
                                            <th>User Role</th>
                                            <th>Allowed Permissions</th>
                                            <th>User Status</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>User ID</th>
                                            <th>Full Name</th>
                                            <th>Username</th>
                                            <!--  <th>Password</th> -->
                                            <th>User Role</th>
                                            <th>Allowed Permissions</th>
                                            <th>User Status</th>
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
        <div class="modal fade" id="user_data_modal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="popup text-left">
                            <div class="media align-items-top justify-content-between">
                                <h3 class="mb-3">Update User</h3>
                                <div class="btn-cancel p-0" data-dismiss="modal"><i class="las la-times"></i></div>
                            </div>
                            <div class="content edit-notes">
                                <div class="card card-transparent card-block card-stretch event-note mb-0">
                                    <div class="card-body px-0 bukmark">
                                        <form id="UpdateDeveloperFormSubmit" action="<?php echo base_url('Developer/updateDeveloperFormData'); ?>" data-toggle="validator" novalidate="true">


                                                <div class="row">
                                                    <div class="form-group col-md-3">
                                                        <label>User ID *</label>
                                                        <input type="text" class="form-control" id="modal_user_id" name="modal_user_id" placeholder="User ID" required="" readonly>
                                                        <div class="help-block with-errors"></div>
                                                    </div>

                                                    <div class="form-group col-md-4">
                                                        <label>User Created *</label>
                                                        <input type="date" class="form-control" id="modal_created_at" name="modal_created_at" placeholder="User Created" required="" readonly>
                                                        <div class="help-block with-errors"></div>
                                                    </div>

                                                    <div class="col-md-5">
                                                    <div class="form-group">
                                                        <label>User Role Type *</label>
                                                        <select id="modal_user_role_type" name="modal_user_role_type" class="form-control" data-style="py-0" required="" readonly disabled>
                                                            <option id="modal_user_role_type_option" selected style="display:none" value="0">Select User Role Type</option>


                                                        </select>
                                                    </div>
                                                </div>

                                                </div>

                                                <div class="row">
                                                <div class="form-group col-md-12">
                                                    <label>Full Name *</label>
                                                    <input type="text" class="form-control" id="modal_full_name" name="modal_full_name" placeholder="Enter Full Name" required="">
                                                    <div class="help-block with-errors"></div>
                                                </div>

                                                <div class="form-group col-md-12">
                                                    <label>User Name *</label>
                                                    <input type="text" class="form-control" id="modal_user_name" name="modal_user_name" placeholder="Enter User Name" required="" readonly>
                                                    <div class="help-block with-errors"></div>
                                                </div>

                                                <div class="form-group col-md-12">
                                                    <label>Enter Password *</label>
                                                    <input type="text" class="form-control" id="modal_user_password" name="modal_user_password" placeholder="Enter Password" required="">
                                                    <div class="help-block with-errors"></div>
                                                </div>


                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Permissions *</label>
                                                        <select id="list_permissions" name="list_permissions" class="form-control" data-style="py-0">
                                                            <option id="modal_list_permissions_option" selected style="display:none" value="0">Select Permission</option>

                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="form-group col-md-12">
                                                    <label>User Permissions *</label>
                                                    <input type="text" class="form-control" id="developer_allowed_permissions" name="developer_allowed_permissions" required="" readonly>
                                                    <div class="help-block with-errors"></div>
                                                </div>





                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Status *</label>
                                                        <select id="modal_user_status_type" name="modal_user_status_type" class="form-control" data-style="py-0" required="">
                                                            <option id="modal_user_status_type_option" selected style="display:none" value="0">Select User Status</option>
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
                                            <div id="btnSaveDeveloperData" class="btn btn-outline-primary">Save</div>
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
<script src="<?php echo base_url(); ?>/assets/ajax/developer.js"></script>