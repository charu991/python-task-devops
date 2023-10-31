<?php

defined('BASEPATH') or exit('No direct script access allowed');

class User extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function _loadview($page, $data = 0)
    {

        $this->load->view('layouts/header.php');
        $this->load->view($page, $data);

        if ($page == 'home') {
            $this->load->view('layouts/footer.php');
        }
    }

    public function index($page = 'auth-sign-in')
    {

        if (!file_exists(APPPATH . 'views/' . $page . '.php')) {

            show_404();
        } else {

            $this->session_user();
        }
    }


    public function home($page = 'home')
    {


        if (!file_exists(APPPATH . 'views/' . $page . '.php')) {

            show_404();
        } else {


            $this->_loadview($page);
        }
    }

    public function profile_view($page = 'user-profile')
    {

        if (!file_exists(APPPATH . 'views/' . $page . '.php')) {

            show_404();
        } else {

            if (!$this->session->userdata('userinfo')) {
                redirect("/");
            } else {

                //load model
                $this->load->model('UserModel');


                $user = $this->session->userdata('userinfo');
                $session_user_id = $user['session_user_id'];
                $session_role_id = $user['session_role_id'];

                $user_login_access_info = $this->session->userdata('user_login_access_detail');
                $userLastLogin = $user_login_access_info['userLastLogin'];


                $result =  $this->UserModel->getAllUserProfileById($session_user_id);

                $data['username']  = ucwords(strtolower($result['result'][0]['username']));

                $data['user_last_login']  = "Since " . date("j M, Y, g:i a", strtotime($userLastLogin));
                $data['user_access_role']  = $result['result'][0]['user_access_role'];



                $this->_loadview($page, $data);
            }
        }
    }


    public function setUserNewPassword()
    {

        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {
            if (!$this->input->post('ref')) {
                redirect("/");
            } else {

                $current_date = date("Y-m-d h:i:s");
                $user = $this->session->userdata('userinfo');
                                $session_user_id = $user['session_user_id'];
                                $session_current_username = ucwords(strtolower($user['session_current_username']));

                //load model
                $this->load->model('UserModel');
                $this->load->model('LogModel');
                $user_new_password = $this->input->post('user_new_password');

                $data = array(
                    'password' => $user_new_password,
                    'updated_at' => $current_date
                );


                $dataLog = array(
                    'description' =>  $session_current_username . " Performed Password Update Activity!",
                    'log_type_id' => 3,
                    'user_id' => $session_user_id,
                    'created_at' => $current_date,
                    'updated_at' => $current_date
            );


                $result = $this->UserModel->updateUserPassword($data);

                if ($result == 1) {

                        $this->LogModel->addLog($dataLog);

                        $this->output
                                ->set_content_type('application/json')
                                ->set_output(json_encode(array('code' => 200)));
                } else {
                        $this->output
                                ->set_content_type('application/json')
                                ->set_output(json_encode(array('code' => 400)));
                }


            }
        }
    }

    public function CheckCurrentPasswordValidation()
    {

        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {
            if (!$this->input->post('ref')) {
                redirect("/");
            } else {

                //load model
                $this->load->model('UserModel');
                $user_current_password = $this->input->post('user_current_password');


                $result = $this->UserModel->CheckCurrentPasswordValidation($user_current_password);

                if ($result == 1) {
                    $this->output
                        ->set_content_type('application/json')
                        ->set_output(json_encode(array('code' => 200)));
                } else {

                    $this->output
                        ->set_content_type('application/json')
                        ->set_output(json_encode(array('code' => 400)));
                }
            }
        }
    }



    public function CheckUserNameValidation()
    {


        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {
            if (!$this->input->post('ref')) {
                redirect("/");
            } else {

                //load model
                $this->load->model('UserModel');
                $user_login_username = $this->input->post('user_login_username');


                $result = $this->UserModel->CheckUserNameValidation($user_login_username);

                if ($result == 1) {
                    $this->output
                        ->set_content_type('application/json')
                        ->set_output(json_encode(array('code' => 200)));
                } else {

                    $this->output
                        ->set_content_type('application/json')
                        ->set_output(json_encode(array('code' => 400)));
                }
            }
        }


    }




    public function login_user()
    {

        $username = $this->input->post('username');
        $password = $this->input->post('password');

        //load model
        $this->load->model('UserModel');

        $data = $this->UserModel->login_user($username, $password);

        // print_r( $data);


        if ($data['status'] == 0) {

            $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode(array('code' => 400)));
        } else if ($data['status'] == 1) {

            $this->session->set_userdata('userinfo', $data);

            $this->load->model('UserModel');
            $this->load->model('SettingsModel');


            $userLastLogin = $this->UserModel->getLastLoginTime();

            $this->session->set_userdata('user_login_access_detail', array("userLastLogin" => $userLastLogin));



            $current_date = date("Y-m-d h:i:s");
            $user = $this->session->userdata('userinfo');
            $session_user_id = $user['session_user_id'];
            $session_current_username = ucwords(strtolower($user['session_current_username']));


            $userAllowedPermissions = $this->SettingsModel->getAllowdPermissions();

            $this->session->set_userdata('user_allowed_permission_detail',  $userAllowedPermissions);


            $this->load->model('LogModel');


            $dataLog = array(
                'description' =>  $session_current_username . " Performed Login Activity!",
                'log_type_id' => 2,
                'user_id' => $session_user_id,
                'created_at' => $current_date,
                'updated_at' => $current_date
            );

            $this->LogModel->addLog($dataLog);

            $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode(array('code' => 200)));
        }
    }

    public function session_user()
    {
        if (!$this->session->userdata('userinfo')) {

            $this->_loadview('auth-sign-in');
        } else {

            redirect("home");
        }
    }

    public function logout()
    {

        $this->session->unset_userdata('userinfo');
        $this->session->unset_userdata('user_login_access_detail');

        redirect("/");
    }



    public function view($page = 'list-user')
    {

        if (!file_exists(APPPATH . 'views/' . $page . '.php')) {

            show_404();
        } else {

            if (!$this->session->userdata('userinfo')) {
                redirect("/");
            } else {

                $this->_loadview($page);
            }
        }
    }


    public function role_permissions($page = 'roles-user')
    {
        if (!file_exists(APPPATH . 'views/' . $page . '.php')) {

            show_404();
        } else {

            if (!$this->session->userdata('userinfo')) {
                redirect("/");
            } else {

                $this->_loadview($page);
            }
        }
    }



    public function getUserListTable()
    {

        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {


            if (!$this->input->post('ref')) {
                redirect("/");
            } else {

                $user = $this->session->userdata('userinfo');

                $session_role_id = $user['session_role_id'];


                $ref = $this->input->post('ref');

                if ($ref == 2) {


                    $list_branches = $this->input->post('list_branches');
                    $list_user_access_role = $this->input->post('list_user_access_role');
                }







                $branchSelectList = '';
                $userAccesRoleSelectList = '';


                //load model
                $this->load->model('UserModel');
                $this->load->model('BranchModel');
                $this->load->model('AccessRoleModel');

                if ($ref == 1) {
                    $getAllBranches = $this->BranchModel->getAllBranches();
                    $getAllAccessRoles = $this->AccessRoleModel->getAllAccessRoles();
                    $getAllListUsers = $this->UserModel->getAllListUsers();
                }

                if ($ref == 2) {

                    $getAllListUsers = $this->UserModel->getAllListUsers($list_user_access_role, $list_branches);
                }



                if ($ref == 1) {
                    foreach ($getAllBranches as $getBranchNames) {

                        if ($session_role_id == 2) {

                            $branchSelectList .= '<option selected value="' . $getBranchNames["branch_id"] . '">' . $getBranchNames["branch_name"] . '</option>';
                        } else {
                            $branchSelectList .= '<option value="' . $getBranchNames["branch_id"] . '">' . $getBranchNames["branch_name"] . '</option>';
                        }
                    }



                    foreach ($getAllAccessRoles as $getAllAccessRole) {



                        if ($session_role_id == 2) {

                            $userAccesRoleSelectList .= '<option selected value="' . $getAllAccessRole["access_role_id"] . '">' . $getAllAccessRole["access_role_name"] . '</option>';
                        } else {
                            $userAccesRoleSelectList .= '<option value="' . $getAllAccessRole["access_role_id"] . '">' . $getAllAccessRole["access_role_name"] . '</option>';
                        }
                    }
                }



                $userTableList = '<table class="data-table table " id="DataTables_Table_0">';

                $userTableList .= '<thead class="bg-white text-uppercase">';
                $userTableList .= '<tr class="ligth ligth-data" role="row">';
                $userTableList .= '<th>Id</th>';
                $userTableList .= '<th>Name</th>';
                $userTableList .= '<th>Username</th>';
                //  $userTableList .= '<th>Password</th>';
                $userTableList .= '<th>Branch Name</th>';
                //  $userTableList .= '<th>Address</th>';
                // $userTableList .= '<th>Country Name</th>';
                //  $userTableList .= '<th>City Name</th>';
                $userTableList .= '<th>Access Role</th>';
                $userTableList .= '<th>Created At</th>';
                $userTableList .= '<th>Status</th>';
                $userTableList .= '<th>Action</th>';
                $userTableList .= '</tr>';
                $userTableList .= '</thead>';

                $userTableList .= '<tbody  class="ligth-body">';

                $count = 1;


                foreach ($getAllListUsers as $getUser) {


                    $userTableList .= '<tr>';
                    $userTableList .= '<td>' . '<div class="d-flex align-items-center">' . $count . '</div> </td>';
                    $userTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getUser['username'] . '</div> </td>';
                    $userTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getUser['user_login_username'] . '</div> </td>';
                    //   $userTableList .= '<td>' . '<div class="d-flex align-items-center">' . sha1($getUser['user_login_password']) . '</div> </td>';
                    $userTableList .= '<td>' . '<div class="d-flex align-items-center"> <div>' . $getUser['user_branch_name'] . '<p class="mb-0"> <large>' . $getUser['user_arabic_branch_name'] .  '</large> </p> </div> </div> </td>';

                    // $userTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getUser['user_address'] . '</div> </td>';
                    // $userTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getUser['user_country_name'] . '</div> </td>';
                    // $userTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getUser['user_city_name'] . '</div> </td>';
                    $userTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getUser['user_access_role'] . '</div> </td>';
                    $userTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getUser['user_created_at'] . '</div> </td>';
                    $userTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getUser['user_status'] . '</div> </td>';
                    $userTableList .= '<td>' . '<div class="d-flex align-items-center list-action">' . '<a class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" href="#"><i class="ri-eye-line mr-0"></i></a>' . '<a class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="' . base_url('user/edit/' . $getUser['user_id'] . '') . '"><i class="ri-pencil-line mr-0"></i></a>' . '<a class="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="#"><i class="ri-delete-bin-line mr-0"></i></a>' . '</div>' . '</td>';
                    $userTableList .= '</tr>';

                    $count++;
                }

                $userTableList .= '</tbody>';
                $userTableList .= '</table>';


                if ($ref == 1) {
                    $this->output
                        ->set_content_type('application/json')
                        ->set_output(json_encode(array("branchSelectList" => $branchSelectList, "userAccesRoleSelectList" => $userAccesRoleSelectList, "userTableList" => $userTableList), JSON_UNESCAPED_SLASHES));
                } else {

                    $this->output
                        ->set_content_type('application/json')
                        ->set_output(json_encode(array("userTableList" => $userTableList), JSON_UNESCAPED_SLASHES));
                }
            }
        }
    }
}
