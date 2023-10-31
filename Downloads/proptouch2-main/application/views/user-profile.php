<!-- Wrapper Start -->
<div class="wrapper">
    <?php include "layouts/left-panel.php"; ?>

    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card car-transparent">
                        <div class="card-body p-0">
                            <div class="profile-image position-relative">
                                <img src="<?php echo base_url(); ?>/assets/images/page-img/profile.png" class="img-fluid rounded w-100" alt="profile-image">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row m-sm-0 px-3">
                <div class="col-lg-4 card-profile">
                    <div class="card card-block card-stretch card-height">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <div class="profile-img position-relative">
                                    <img src="../assets/images/user/1.png" class="img-fluid rounded avatar-110" alt="profile-image">
                                </div>
                                <div class="ml-3">
                                    <h4 class="mb-1"><?php echo ucwords(strtolower($username)); ?></h4>
                                    <p class="mb-2"><?php echo $user_access_role; ?></p>
                                    <!-- <a href="#" class="btn btn-primary font-size-14">Contact</a> -->
                                </div>
                            </div>
                            <p>
                                I’m a <b><?php echo $user_access_role; ?></b> of this system. I spend my whole day,
                                practically every day, experimenting with maintaing profit/loss for our business.
                            </p>
                            <ul class="list-inline p-0 m-0">




                                <li class="mb-2">
                                    <div class="d-flex align-items-center">
                                        <i class="las la-clock " style="font-size:22px;"></i>
                                        <span class="ml-2"><?php echo $user_last_login; ?></span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 card-profile">
                    <div class="card card-block card-stretch card-height">
                        <div class="card-body">
                            <ul class="d-flex nav nav-pills mb-3 text-center profile-tab" id="profile-pills-tab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active show" data-toggle="pill" href="#profile1" role="tab" aria-selected="false">Change Your Password</a>
                                </li>

                            </ul>
                            <div class="profile-content tab-content">

                                <div id="profile1" class="tab-pane fade active show">
                                    <p>You can change your password for security reasons or reset it if you forget it.</p>
                                    <form id="ChangeUserPasswordFormSubmit" action="<?php echo base_url('user/setUserNewPassword'); ?>" data-toggle="validator" novalidate="true">
                                        <div class="row">

                                        <div class="col-md-6">

                                            <div class="form-group ">
                                                <label>Current Password *</label>
                                                <input type="password" class="form-control" id="user_current_password" name="user_current_password" placeholder="Current Password" required="">
                                                <div class="help-block with-errors"></div>
                                            </div>

                                            <div class="form-group">
                                                <label>New Password *</label>
                                                <input type="password" class="form-control" id="user_new_password" name="user_new_password" placeholder="Current Password" required="">
                                                <div class="help-block with-errors"></div>
                                            </div>

                                            <div class="form-group ">
                                                <label>Confirm Password *</label>
                                                <input type="password" class="form-control" id="user_confirm_password" name="user_confirm_password" placeholder="Confirm Password" required="">
                                                <div class="help-block with-errors"></div>
                                            </div>


                                        </div>

                                        </div>
                                        <button type="submit" class="btn btn-primary mr-2 enabled">Change Password</button>
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

<!-- Backend Bundle JavaScript -->
<script src="<?php echo base_url(); ?>assets/ajax/user.js"></script>