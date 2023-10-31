<?php $user = $this->session->userdata('userinfo');

$session_role_id = $user["session_role_id"];


?>


<div class="iq-sidebar  sidebar-default ">
    <div class="iq-sidebar-logo d-flex align-items-center justify-content-between">
        <a href="<?php echo base_url('home'); ?>" class="header-logo">
            <img src="<?php echo base_url(); ?>/assets/images/logo.png" class="img-fluid rounded-normal light-logo" alt="logo">
            <h5 class="logo-title light-logo ml-3">PROP<b>ALCHEMY</b></h5>
        </a>
        <div class="iq-menu-bt-sidebar ml-0">
            <i class="las la-bars wrapper-menu"></i>
        </div>
    </div>

    <div class="data-scrollbar" data-scroll="1">
        <nav class="iq-sidebar-menu">
            <ul id="iq-sidebar-toggle" class="iq-menu ">
                <li <?php if ($this->uri->segment(1) == "home") { ?> class="active" <?php } ?>>
                    <a href="<?php echo base_url('home'); ?>" class="svg-icon">
                        <svg class="svg-icon" id="p-dash1" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                        <span class="ml-4">Dashboards</span>
                    </a>
                </li>


                <?php



                if ($session_role_id == 2) {
                ?>


                    <li <?php if ($this->uri->segment(1) == "concept") { ?> class="active" <?php } ?>>
                        <a href="#concept" class="" data-toggle="collapse" <?php if ($this->uri->segment(1) == "concept") { ?> aria-expanded="true" <?php } else { ?> aria-expanded="false" <?php } ?>>
                            <svg class="svg-icon" id="p-dash3" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            <span class="ml-4">Concepts</span>
                            <svg class="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="10 15 15 20 20 15"></polyline>
                                <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                            </svg>
                        </a>
                        <ul id="concept" <?php if ($this->uri->segment(1) == "concept") { ?> class="iq-submenu collapse show" <?php } else { ?> class="iq-submenu collapse" <?php } ?> data-parent="#iq-sidebar-toggle">
                            <li <?php if (($this->uri->segment(1) . '/' . $this->uri->segment(2)) == "concept/list") { ?> class="active" <?php } ?>>
                                <a href="<?php echo base_url('concept/list'); ?>">

                                    <i class="las la-minus"></i><span>List Concepts</span>
                                </a>
                            </li>
                            <li <?php if (($this->uri->segment(1) . '/' . $this->uri->segment(2)) == "concept/new") { ?> class="active" <?php } ?>>
                                <a href="<?php echo base_url('concept/new'); ?>">
                                    <i class="las la-minus"></i><span>Add Concept</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                <?php
                }
                ?>

                <?php



                if ($session_role_id != 4) {
                ?>

                    <li <?php if ($this->uri->segment(1) == "developer") { ?> class="active" <?php } ?>>
                        <a href="#developer" class="" data-toggle="collapse" <?php if ($this->uri->segment(1) == "developer") { ?> aria-expanded="true" <?php } else { ?> aria-expanded="false" <?php } ?>>

                            <img src="<?php echo base_url(); ?>/assets/images/left-panel/developers.png" class="img-fluid rounded-normal light-logo img-left-panel" alt="logo">
                            <span class="ml-4">Users</span>
                            <svg class="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="10 15 15 20 20 15"></polyline>
                                <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                            </svg>
                        </a>
                        <ul id="developer" <?php if ($this->uri->segment(1) == "developer") { ?> class="iq-submenu collapse show" <?php } else { ?> class="iq-submenu collapse" <?php } ?> data-parent="#iq-sidebar-toggle">
                            <li <?php if (($this->uri->segment(1) . '/' . $this->uri->segment(2)) == "developer/list") { ?> class="active" <?php } ?>>
                                <a href="<?php echo base_url('developer/list'); ?>">

                                    <i class="las la-minus"></i><span>List Users</span>
                                </a>
                            </li>
                            <li <?php if (($this->uri->segment(1) . '/' . $this->uri->segment(2)) == "developer/new") { ?> class="active" <?php } ?>>
                                <a href="<?php echo base_url('developer/new'); ?>">
                                    <i class="las la-minus"></i><span>Add User</span>
                                </a>
                            </li>
                            <li <?php if (($this->uri->segment(1) . '/' . $this->uri->segment(2)) == "developer/upload") { ?> class="active" <?php } ?>>
                                <a href="<?php echo base_url('developer/upload'); ?>">
                                    <i class="las la-minus"></i><span>Upload User</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                <?php
                }
                ?>


                <?php



                if ($session_role_id != 3 && $session_role_id != 4) {
                ?>

                    <li <?php if ($this->uri->segment(1) == "property") { ?> class="active" <?php } ?>>
                        <a href="#property" class="" data-toggle="collapse" <?php if ($this->uri->segment(1) == "property") { ?> aria-expanded="true" <?php } else { ?> aria-expanded="false" <?php } ?>>
                        <img src="<?php echo base_url(); ?>/assets/images/left-panel/properties.png" class="img-fluid rounded-normal light-logo img-left-panel" alt="logo">
                            <span class="ml-4">Properties</span>
                            <svg class="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="10 15 15 20 20 15"></polyline>
                                <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                            </svg>
                        </a>
                        <ul id="property" <?php if ($this->uri->segment(1) == "property") { ?> class="iq-submenu collapse show" <?php } else { ?> class="iq-submenu collapse" <?php } ?> data-parent="#iq-sidebar-toggle">
                            <li <?php if (($this->uri->segment(1) . '/' . $this->uri->segment(2)) == "property/list") { ?> class="active" <?php } ?>>
                                <a href="<?php echo base_url('property/list'); ?>">

                                    <i class="las la-minus"></i><span>List Properties</span>
                                </a>
                            </li>
                            <li <?php if (($this->uri->segment(1) . '/' . $this->uri->segment(2)) == "property/new") { ?> class="active" <?php } ?>>
                                <a href="<?php echo base_url('property/new'); ?>">
                                    <i class="las la-minus"></i><span>Add Property</span>
                                </a>
                            </li>
                            <li <?php if (($this->uri->segment(1) . '/' . $this->uri->segment(2)) == "property/upload") { ?> class="active" <?php } ?>>
                                <a href="<?php echo base_url('property/upload'); ?>">
                                    <i class="las la-minus"></i><span>Upload Property</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                <?php
                }
                ?>

                <?php



                if ($session_role_id == 1) {
                ?>

                    <li <?php if ($this->uri->segment(1) == "group") { ?> class="active" <?php } ?>>
                        <a href="#group" class="" data-toggle="collapse" <?php if ($this->uri->segment(1) == "group") { ?> aria-expanded="true" <?php } else { ?> aria-expanded="false" <?php } ?>>
                        <img src="<?php echo base_url(); ?>/assets/images/left-panel/groups.png" class="img-fluid rounded-normal light-logo img-left-panel" alt="logo">
                            <span class="ml-4">Groups</span>
                            <svg class="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="10 15 15 20 20 15"></polyline>
                                <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                            </svg>
                        </a>
                        <ul id="group" <?php if ($this->uri->segment(1) == "group") { ?> class="iq-submenu collapse show" <?php } else { ?> class="iq-submenu collapse" <?php } ?> data-parent="#iq-sidebar-toggle">
                            <li <?php if (($this->uri->segment(1) . '/' . $this->uri->segment(2)) == "group/new") { ?> class="active" <?php } ?>>
                                <a href="<?php echo base_url('group/new'); ?>">

                                    <i class="las la-minus"></i><span>Add Group</span>
                                </a>
                            </li>
                            <li <?php if (($this->uri->segment(1) . '/' . $this->uri->segment(2)) == "group/list") { ?> class="active" <?php } ?>>
                                <a href="<?php echo base_url('group/list'); ?>">

                                    <i class="las la-minus"></i><span>List Groups</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                <?php
                }
                ?>


                <?php



                if ($session_role_id == 1) {
                ?>

                    <li <?php if ($this->uri->segment(1) == "heading") { ?> class="active" <?php } ?>>
                        <a href="#heading" class="" data-toggle="collapse" <?php if ($this->uri->segment(1) == "heading") { ?> aria-expanded="true" <?php } else { ?> aria-expanded="false" <?php } ?>>
                        <img src="<?php echo base_url(); ?>/assets/images/left-panel/headings.png" class="img-fluid rounded-normal light-logo img-left-panel" alt="logo">
                            <span class="ml-4">Headings</span>
                            <svg class="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="10 15 15 20 20 15"></polyline>
                                <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                            </svg>
                        </a>
                        <ul id="heading" <?php if ($this->uri->segment(1) == "heading") { ?> class="iq-submenu collapse show" <?php } else { ?> class="iq-submenu collapse" <?php } ?> data-parent="#iq-sidebar-toggle">
                            <li <?php if (($this->uri->segment(1) . '/' . $this->uri->segment(2)) == "heading/new") { ?> class="active" <?php } ?>>
                                <a href="<?php echo base_url('heading/new'); ?>">

                                    <i class="las la-minus"></i><span>Add Heading</span>
                                </a>
                            </li>
                            <li <?php if (($this->uri->segment(1) . '/' . $this->uri->segment(2)) == "heading/list") { ?> class="active" <?php } ?>>
                                <a href="<?php echo base_url('heading/list'); ?>">

                                    <i class="las la-minus"></i><span>List Headings</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                <?php
                }
                ?>


                <?php



                if ($session_role_id == 1) {
                ?>

                    <li <?php if ($this->uri->segment(1) == "groupheadings") { ?> class="active" <?php } ?>>
                        <a href="#groupheadings" class="" data-toggle="collapse" <?php if ($this->uri->segment(1) == "groupheadings") { ?> aria-expanded="true" <?php } else { ?> aria-expanded="false" <?php } ?>>
                        <img src="<?php echo base_url(); ?>/assets/images/left-panel/groupheadings.png" class="img-fluid rounded-normal light-logo img-left-panel" alt="logo">
                            <span class="ml-4">Relationship</span>
                            <svg class="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="10 15 15 20 20 15"></polyline>
                                <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                            </svg>
                        </a>
                        <ul id="groupheadings" <?php if ($this->uri->segment(1) == "groupheadings") { ?> class="iq-submenu collapse show" <?php } else { ?> class="iq-submenu collapse" <?php } ?> data-parent="#iq-sidebar-toggle">

                            <li <?php if (($this->uri->segment(1) . '/' . $this->uri->segment(2)) == "groupheadings/list") { ?> class="active" <?php } ?>>
                                <a href="<?php echo base_url('groupheadings/structure'); ?>">

                                    <i class="las la-minus"></i><span>Add/Update <br /> Group & Headings <br /> Structure</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                <?php
                }
                ?>



                <?php



                if ($session_role_id == 1) {
                ?>

                    <li <?php if ($this->uri->segment(1) == "setting") { ?> class="active" <?php } ?>>
                        <a href="#setting" class="" data-toggle="collapse" <?php if ($this->uri->segment(1) == "setting") { ?> aria-expanded="true" <?php } else { ?> aria-expanded="false" <?php } ?>>
                        <img src="<?php echo base_url(); ?>/assets/images/left-panel/settings.png" class="img-fluid rounded-normal light-logo img-left-panel" alt="logo">
                            <span class="ml-4">Settings</span>
                            <svg class="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="10 15 15 20 20 15"></polyline>
                                <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                            </svg>
                        </a>
                        <ul id="setting" <?php if ($this->uri->segment(1) == "setting") { ?> class="iq-submenu collapse show" <?php } else { ?> class="iq-submenu collapse" <?php } ?> data-parent="#iq-sidebar-toggle">

                            <li <?php if (($this->uri->segment(1) . '/' . $this->uri->segment(2)) == "settings/view") { ?> class="active" <?php } ?>>
                                <a href="<?php echo base_url('settings/view'); ?>">

                                    <i class="las la-minus"></i><span>Add/Update <br /> User Settings</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                <?php
                }
                ?>




            </ul>
        </nav>

        <div class="p-3"></div>
    </div>
</div>
<div class="iq-top-navbar">
    <div class="iq-navbar-custom">
        <nav class="navbar navbar-expand-lg navbar-light p-0">
            <div class="iq-navbar-logo d-flex align-items-center justify-content-between">
                <i class="ri-menu-line wrapper-menu"></i>
                <a href="<?php echo base_url('home'); ?>" class="header-logo">
                    <img src="<?php echo base_url(); ?>/assets/images/logo.png" class="img-fluid rounded-normal" alt="logo">
                    <h5 class="logo-title ml-3">PropAlchemy</h5>

                </a>
            </div>
            <div class="iq-search-bar device-search">
                <form action="#" class="searchbox">
                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                    <input type="text" class="text search-input" placeholder="Search here...">
                </form>
            </div>
            <div class="d-flex align-items-center">
                <!--<div class="change-mode">
                            <div class="custom-control custom-switch custom-switch-icon custom-control-inline">
                                <div class="custom-switch-inner">
                                    <p class="mb-0"> </p>
                                    <input type="checkbox" class="custom-control-input" id="dark-mode" data-active="true">
                                    <label class="custom-control-label" for="dark-mode" data-mode="toggle">
                                        <span class="switch-icon-left"><i class="a-left ri-moon-clear-line"></i></span>
                                        <span class="switch-icon-right"><i class="a-right ri-sun-line"></i></span>
                                    </label>
                                </div>
                            </div>
                        </div>-->
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
                    <i class="ri-menu-3-line"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto navbar-list align-items-center">
                        <li class="nav-item nav-icon dropdown">
                            <a href="#" class="search-toggle dropdown-toggle btn border add-btn" id="dropdownMenuButton02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="<?php echo base_url(); ?>/assets/images/small/flag-01.png" alt="img-flag" class="img-fluid image-flag mr-2">En
                            </a>
                            <div class="iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                <div class="card shadow-none m-0">
                                    <div class="card-body p-3">
                                        <a class="iq-sub-card" href="#"><img src="<?php echo base_url(); ?>/assets/images/small/flag-02.png" alt="img-flag" class="img-fluid mr-2">Arabic</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="nav-item nav-icon search-content">
                            <a href="#" class="search-toggle rounded" id="dropdownSearch" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="ri-search-line"></i>
                            </a>
                            <div class="iq-search-bar iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownSearch">
                                <form action="#" class="searchbox p-2">
                                    <div class="form-group mb-0 position-relative">
                                        <input type="text" class="text search-input font-size-12" placeholder="type here to search...">
                                        <a href="#" class="search-link"><i class="las la-search"></i></a>
                                    </div>
                                </form>
                            </div>
                        </li>
                        <li class="nav-item nav-icon dropdown">
                            <a href="#" class="search-toggle dropdown-toggle" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                                    </path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                <span class="bg-primary"></span>
                            </a>
                            <div class="iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                <div class="card shadow-none m-0">
                                    <div class="card-body p-0 ">
                                        <div class="cust-title p-3">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <h5 class="mb-0">All Messages</h5>
                                                <a class="badge badge-primary badge-card" href="#">3</a>
                                            </div>
                                        </div>
                                        <div class="px-3 pt-0 pb-0 sub-card">
                                            <a href="#" class="iq-sub-card">
                                                <div class="media align-items-center cust-card py-3 border-bottom">
                                                    <div class="">
                                                        <img class="avatar-50 rounded-small" src="<?php echo base_url(); ?>/assets/images/user/01.jpg" alt="01">
                                                    </div>
                                                    <div class="media-body ml-3">
                                                        <div class="d-flex align-items-center justify-content-between">
                                                            <h6 class="mb-0">Emma Watson</h6>
                                                            <small class="text-dark"><b>12 : 47 pm</b></small>
                                                        </div>
                                                        <small class="mb-0">Lorem ipsum dolor sit amet</small>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" class="iq-sub-card">
                                                <div class="media align-items-center cust-card py-3 border-bottom">
                                                    <div class="">
                                                        <img class="avatar-50 rounded-small" src="<?php echo base_url(); ?>/assets/images/user/02.jpg" alt="02">
                                                    </div>
                                                    <div class="media-body ml-3">
                                                        <div class="d-flex align-items-center justify-content-between">
                                                            <h6 class="mb-0">Ashlynn Franci</h6>
                                                            <small class="text-dark"><b>11 : 30 pm</b></small>
                                                        </div>
                                                        <small class="mb-0">Lorem ipsum dolor sit amet</small>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" class="iq-sub-card">
                                                <div class="media align-items-center cust-card py-3">
                                                    <div class="">
                                                        <img class="avatar-50 rounded-small" src="<?php echo base_url(); ?>/assets/images/user/03.jpg" alt="03">
                                                    </div>
                                                    <div class="media-body ml-3">
                                                        <div class="d-flex align-items-center justify-content-between">
                                                            <h6 class="mb-0">Kianna Carder</h6>
                                                            <small class="text-dark"><b>11 : 21 pm</b></small>
                                                        </div>
                                                        <small class="mb-0">Lorem ipsum dolor sit amet</small>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <a class="right-ic btn btn-primary btn-block position-relative p-2" href="#" role="button">
                                            View All
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="nav-item nav-icon dropdown">
                            <a href="#" class="search-toggle dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                </svg>
                                <span class="bg-primary "></span>
                            </a>
                            <div class="iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <div class="card shadow-none m-0">
                                    <div class="card-body p-0 ">
                                        <div class="cust-title p-3">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <h5 class="mb-0">Notifications</h5>
                                                <a class="badge badge-primary badge-card" href="#">3</a>
                                            </div>
                                        </div>
                                        <div class="px-3 pt-0 pb-0 sub-card">
                                            <a href="#" class="iq-sub-card">
                                                <div class="media align-items-center cust-card py-3 border-bottom">
                                                    <div class="">
                                                        <img class="avatar-50 rounded-small" src="<?php echo base_url(); ?>/assets/images/user/01.jpg" alt="01">
                                                    </div>
                                                    <div class="media-body ml-3">
                                                        <div class="d-flex align-items-center justify-content-between">
                                                            <h6 class="mb-0">Emma Watson</h6>
                                                            <small class="text-dark"><b>12 : 47 pm</b></small>
                                                        </div>
                                                        <small class="mb-0">Lorem ipsum dolor sit amet</small>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" class="iq-sub-card">
                                                <div class="media align-items-center cust-card py-3 border-bottom">
                                                    <div class="">
                                                        <img class="avatar-50 rounded-small" src="<?php echo base_url(); ?>/assets/images/user/02.jpg" alt="02">
                                                    </div>
                                                    <div class="media-body ml-3">
                                                        <div class="d-flex align-items-center justify-content-between">
                                                            <h6 class="mb-0">Ashlynn Franci</h6>
                                                            <small class="text-dark"><b>11 : 30 pm</b></small>
                                                        </div>
                                                        <small class="mb-0">Lorem ipsum dolor sit amet</small>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" class="iq-sub-card">
                                                <div class="media align-items-center cust-card py-3">
                                                    <div class="">
                                                        <img class="avatar-50 rounded-small" src="<?php echo base_url(); ?>/assets/images/user/03.jpg" alt="03">
                                                    </div>
                                                    <div class="media-body ml-3">
                                                        <div class="d-flex align-items-center justify-content-between">
                                                            <h6 class="mb-0">Kianna Carder</h6>
                                                            <small class="text-dark"><b>11 : 21 pm</b></small>
                                                        </div>
                                                        <small class="mb-0">Lorem ipsum dolor sit amet</small>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <a class="right-ic btn btn-primary btn-block position-relative p-2" href="#" role="button">
                                            View All
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="nav-item nav-icon dropdown caption-content">
                            <a href="#" class="search-toggle dropdown-toggle" id="dropdownMenuButton4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="<?php echo base_url(); ?>/assets/images/user/1.png" class="img-fluid rounded" alt="user">
                            </a>
                            <div class="iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <div class="card shadow-none m-0">
                                    <div class="card-body p-0 text-center">
                                        <div class="media-body profile-detail text-center">
                                            <img src="<?php echo base_url(); ?>/assets/images/page-img/profile-bg.jpg" alt="profile-bg" class="rounded-top img-fluid mb-4">
                                            <img src="<?php echo base_url(); ?>/assets/images/user/1.png" alt="profile-img" class="rounded profile-img img-fluid avatar-70">
                                        </div>
                                        <div class="p-3">
                                            <h5 class="mb-1"><?php
                                                                $user = $this->session->userdata('userinfo');


                                                                $session_current_username = $user['session_current_username'];
                                                                echo ucfirst($session_current_username); ?>
                                            </h5>
                                            <p class="mb-0">



                                                <?php

                                                $user_login_access_info = $this->session->userdata('user_login_access_detail');
                                                $userLastLogin = $user_login_access_info['userLastLogin'];

                                                echo "Since " . date("j M, Y, g:i a", strtotime($userLastLogin)); ?>



                                            </p>




                                            <div class="d-flex align-items-center justify-content-center mt-3">
                                                <a href="<?php echo base_url('user/profile') ?>" class="btn border mr-2">Profile</a>
                                                <a href="<?php echo site_url('user/logout') ?>" class="btn border">Sign Out</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</div>