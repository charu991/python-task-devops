<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Developer extends CI_Controller
{

        public function __construct()
        {
                parent::__construct();
        }

        public function index()
        {
                redirect("home");
        }


        public function _loadview($page, $data = 0)
        {

                $this->load->view('layouts/header.php');
                $this->load->view($page, $data);
                $this->load->view('layouts/footer.php');
        }

        public function view($page = 'list-developer')
        {


                if (!file_exists(APPPATH . 'views/' . $page . '.php')) {

                        show_404();
                } else {

                        if (!$this->session->userdata('userinfo')) {
                                redirect("/");
                        } else {


                                if (!$this->session->userdata('userinfo')) {
                                        redirect("/");
                                } else {

                                        $userinfo =  $this->session->userdata('userinfo');
                                        $session_role_id = $userinfo["session_role_id"];

                                        if ($session_role_id != 4) {

                                                $this->_loadview($page);
                                        } else {
                                                redirect("/");
                                        }
                                }
                        }
                }
        }

        public function add($page = 'add-developer')
        {


                if (!file_exists(APPPATH . 'views/' . $page . '.php')) {

                        show_404();
                } else {


                        if (!$this->session->userdata('userinfo')) {
                                redirect("/");
                        } else {

                                $userinfo =  $this->session->userdata('userinfo');
                                $session_role_id = $userinfo["session_role_id"];

                                if ($session_role_id != 4) {

                                        $this->_loadview($page);
                                } else {
                                        redirect("/");
                                }
                        }
                }
        }

        public function upload($page = 'upload-developer')
        {


                if (!file_exists(APPPATH . 'views/' . $page . '.php')) {

                        show_404();
                } else {


                        if (!$this->session->userdata('userinfo')) {
                                redirect("/");
                        } else {

                                $userinfo =  $this->session->userdata('userinfo');
                                $session_role_id = $userinfo["session_role_id"];

                                if ($session_role_id != 4) {

                                        $this->_loadview($page);
                                } else {
                                        redirect("/");
                                }
                        }
                }
        }


        public function deleteDeveloperPermissionData()
        {

                if (!$this->session->userdata('userinfo')) {
                        redirect("/");
                } else {

                        if (!$this->input->post('developer_id') || !$this->input->post('permission_name')) {
                                redirect("/");
                        } else {

                                //load model
                                $this->load->model('DeveloperModel');
                                $this->load->model('SettingsModel');

                                $user = $this->session->userdata('userinfo');
                                $session_user_id = $user['session_user_id'];
                                $session_current_username = ucwords(strtolower($user['session_current_username']));

                                $current_date = date("Y-m-d h:i:s");

                                $developer_id = $this->input->post('developer_id');
                                $permission_name = $this->input->post('permission_name');


                                $get_permission_id = $this->SettingsModel->getPermissionID($permission_name);


                                $data = array(
                                        'setting_id' => $get_permission_id
                                );


                                $result = $this->DeveloperModel->deleteDeveloperPermission($data,  $developer_id);

                                if ($result == 1) {

                                        $this->load->model('LogModel');

                                        $dataLog = array(
                                                'description' =>  $session_current_username . " Performed Delete Developer (" . $permission_name . ") Permission Activity!",
                                                'log_type_id' => 22,
                                                'user_id' => $session_user_id,
                                                'created_at' => $current_date,
                                                'updated_at' => $current_date
                                        );

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

        public function setAddDeveloperFormData()
        {


                if (!$this->session->userdata('userinfo')) {
                        redirect("/");
                } else {

                        if (!$this->input->post('developer_name') || !$this->input->post('user_login_username') || !$this->input->post('developer_password') || !$this->input->post('user_access_role') || !$this->input->post('user_status')) {
                                redirect("/");
                        } else {

                                //load model
                                $this->load->model('DeveloperModel');
                                $this->load->model('SettingsModel');

                                $current_date = date("Y-m-d h:i:s");

                                $user = $this->session->userdata('userinfo');
                                $session_user_id = $user['session_user_id'];
                                $session_current_username = ucwords(strtolower($user['session_current_username']));

                                $developer_name = $this->input->post('developer_name');
                                $developer_username = $this->input->post('user_login_username');
                                $developer_password = $this->input->post('developer_password');
                                $user_access_role = $this->input->post('user_access_role');
                                $user_status = $this->input->post('user_status');
                                $developer_allowed_permissions_names = trim($this->input->post('developer_allowed_permissions'));

                                if ($developer_allowed_permissions_names != "") {
                                        $developer_allowed_permissions_names_array = explode(",", $developer_allowed_permissions_names);

                                        $developer_allowed_permissions_names_values = array();


                                        foreach ($developer_allowed_permissions_names_array as $key => $value) {
                                                // do something with $key and $value
                                                $result = $this->SettingsModel->getPermissionID(trim($value));


                                                if ($result != 0) {
                                                        array_push($developer_allowed_permissions_names_values, $result);
                                                }
                                        }
                                }


                                $data = array(
                                        'name' =>  $developer_name,
                                        'username' => $developer_username,
                                        'password' => $developer_password,
                                        'role_id' => intval($user_access_role),
                                        'status_id' =>  intval($user_status),
                                        'created_at' => $current_date,
                                        'updated_at' => $current_date
                                );





                                if ($developer_allowed_permissions_names != "") {
                                        $result = $this->DeveloperModel->addDeveloper($data, $developer_allowed_permissions_names_values);
                                } else {
                                        $result = $this->DeveloperModel->addDeveloper($data, $developer_allowed_permissions_names);
                                }

                                if ($result == 1) {

                                        $this->load->model('LogModel');

                                        $dataLog = array(
                                                'description' =>  $session_current_username . " Performed Add Developer Activity!",
                                                'log_type_id' => 7,
                                                'user_id' => $session_user_id,
                                                'created_at' => $current_date,
                                                'updated_at' => $current_date
                                        );

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


        public function setUploadDeveloperFormData()
        {

                if (!$this->session->userdata('userinfo')) {
                        redirect("/");
                } else {

                        $user = $this->session->userdata('userinfo');
                        $session_role_id = $user['session_role_id'];
                        $status_id = 1;
                        $session_user_id = $user['session_user_id'];
                        $session_current_username = ucwords(strtolower($user['session_current_username']));

                        //load model
                        $this->load->model('DeveloperModel');

                        $current_date = date("Y-m-d h:i:s");
                        $update_date = date("Y-m-d h:i:s");


                        // If file uploaded
                        if (is_uploaded_file($_FILES['developer_file_list']['tmp_name'])) {
                                // Load CSV reader library
                                $this->load->library('CSVReader');

                                // Parse data from CSV file
                                $csvData = $this->csvreader->parse_csv($_FILES['developer_file_list']['tmp_name']);

                                $rowCount = 0;
                                // Insert/update CSV data into database
                                if (!empty($csvData)) {
                                        foreach ($csvData as $row) {


                                                $current_date = date("Y-m-d h:i:s");
                                                $update_date = date("Y-m-d h:i:s");

                                                // Prepare data for DB insertion
                                                $data[] = array(
                                                        'name' =>  ucfirst(strtolower($row["Developer Name"])),
                                                        'username' => strtolower($row["Developer User Name"]),
                                                        'password' =>  $row["Developer Password"],
                                                        'role_id' =>  $session_role_id,
                                                        'status_id' =>  $status_id,
                                                        'created_at' => $current_date,
                                                        'updated_at' => $update_date
                                                );
                                        }

                                        $result = $this->DeveloperModel->uploadDeveloper($data);

                                        if ($result == 1) {
                                                $this->load->model('LogModel');


                                                $dataLog = array(
                                                        'description' =>  $session_current_username . " Performed Upload Developers File Activity!",
                                                        'log_type_id' => 3,
                                                        'user_id' => $session_user_id,
                                                        'created_at' => $current_date,
                                                        'updated_at' => $current_date
                                                );

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
        }

        /*  public function getDeveloperListTable()
        {
            if (!$this->session->userdata('userinfo')) {
                redirect("/");
            } else {

                $user = $this->session->userdata('userinfo');

                $session_role_id = $user['session_role_id'];

                if (!$this->input->post('ref')) {
                    redirect("/");
                } else {
                    $ref = $this->input->post('ref');


                    //load model
                    $this->load->model('DeveloperModel');

                    $getAllListDeveloper = $this->DeveloperModel->getAllListDevelopers();



                    $developerTableList = '<table class="data-table table " id="DataTables_Table_0">';

                    $developerTableList .= '<thead class="bg-white text-uppercase">';
                    $developerTableList .= '<tr class="ligth ligth-data" role="row">';
                    $developerTableList .= '<th>UserID</th>';
                    $developerTableList .= '<th>Full Name</th>';
                    $developerTableList .= '<th>User Name</th>';
                    $developerTableList .= '<th>Password</th>';
                    $developerTableList .= '<th>User Role</th>';
                    $developerTableList .= '<th>User Status</th>';
                    $developerTableList .= '<th>Created At</th>';
                    $developerTableList .= '<th>Action</th>';
                    $developerTableList .= '</tr>';
                    $developerTableList .= '</thead>';

                    $developerTableList .= '<tbody  class="ligth-body">';



                    foreach ($getAllListDeveloper as $getConcept) {


                        $developerTableList .= '<tr>';
                        $developerTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getConcept['user_id'] . '</div> </td>';
                        $developerTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getConcept['full_name'] . '</div> </td>';
                        $developerTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getConcept['user_name'] . '</div> </td>';
                        $developerTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getConcept['user_password'] . '</div> </td>';
                        $developerTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getConcept['user_role'] . '</div> </td>';
                        $developerTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getConcept['user_status'] . '</div> </td>';
                        $developerTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getConcept['created_at'] . '</div> </td>';
                        $developerTableList .= '<td>' . '<a class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" href="#"><i class="ri-eye-line mr-0"></i></a>' . '<a class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="' . base_url('developer/edit/' . $getConcept['user_id'] . '') . '"><i class="ri-pencil-line mr-0"></i></a>' . '<a class="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="javascript:deleteDeveloper(' . $getConcept['user_id'] . ');"><i class="ri-delete-bin-line mr-0"></i></a>' . '</td>';
                        $developerTableList .= '</tr>';
                    }

                    $developerTableList .= '</tbody>';
                    $developerTableList .= '</table>';




                    $this->output
                        ->set_content_type('application/json')
                        ->set_output(json_encode(array("developerTableList" => $developerTableList), JSON_UNESCAPED_SLASHES));
                }
            }
        }
*/


        public function getDeveloperListTable()
        {
                if (!$this->session->userdata('userinfo')) {
                        redirect("/");
                } else {

                        $user = $this->session->userdata('userinfo');

                        $session_role_id = $user['session_role_id'];

                        //load model
                        $this->load->model('DeveloperModel');
                        $this->load->library('SSP');

                        $getAllListDevelopers = json_decode($this->DeveloperModel->getAllListDevelopers(), true);



                        echo json_encode(
                                SSP::complex($_GET, $getAllListDevelopers["sql_details"], $getAllListDevelopers["table"], $getAllListDevelopers["primaryKey"], $getAllListDevelopers["columns"], $getAllListDevelopers["whereAll"])
                        );
                }
        }

        public function updateDeveloperFormData()
        {

                if (!$this->session->userdata('userinfo')) {
                        redirect("/");
                } else {

                        if (!$this->input->post('modal_user_id') || !$this->input->post('modal_full_name') || !$this->input->post('modal_user_name') || !$this->input->post('modal_user_password')  || !$this->input->post('modal_user_status_type')) {
                                redirect("/");
                        } else {

                                //load model
                                $this->load->model('DeveloperModel');
                                $this->load->model('SettingsModel');
                                $current_date = date("Y-m-d h:i:s");

                                $user = $this->session->userdata('userinfo');
                                $session_user_id = $user['session_user_id'];
                                $session_current_username = ucwords(strtolower($user['session_current_username']));

                                $user_id = $this->input->post('modal_user_id');
                                $developer_name = $this->input->post('modal_full_name');
                                //$developer_username = $this->input->post('modal_user_name');
                                $developer_password = $this->input->post('modal_user_password');
                                //$user_access_role = $this->input->post('modal_user_role_type');
                                $user_status = $this->input->post('modal_user_status_type');


                                $developer_allowed_permissions_names = trim($this->input->post('developer_allowed_permissions'));

                                if ($developer_allowed_permissions_names != "") {
                                        $developer_allowed_permissions_names_array = explode(",", $developer_allowed_permissions_names);

                                        $developer_allowed_permissions_names_values = array();


                                        foreach ($developer_allowed_permissions_names_array as $key => $value) {
                                                // do something with $key and $value
                                                $result = $this->SettingsModel->getPermissionID(trim($value));


                                                if ($result != 0) {
                                                        array_push($developer_allowed_permissions_names_values, $result);
                                                }
                                        }
                                }


                                $data = array(
                                        'name' =>  $developer_name,
                                        'password' => $developer_password,
                                        'status_id' =>  intval($user_status),
                                        'updated_at' => $current_date
                                );


                                if ($developer_allowed_permissions_names != "") {
                                        $result = $this->DeveloperModel->updateDeveloper($data, $user_id, $developer_allowed_permissions_names_values);
                                } else {
                                        $result = $this->DeveloperModel->updateDeveloper($data, $user_id, $developer_allowed_permissions_names);
                                }

                                if ($result == 1) {

                                        $this->load->model('LogModel');

                                        $dataLog = array(
                                                'description' =>  $session_current_username . " Performed Update Developer Activity!",
                                                'log_type_id' => 9,
                                                'user_id' => $session_user_id,
                                                'created_at' => $current_date,
                                                'updated_at' => $current_date
                                        );

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

        public function getAllPermissionsLists()
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


                                //load model
                                $this->load->model('SettingsModel');

                                $getAllPermissions = $this->SettingsModel->getAllPermissions();

                                $permissionSelectList = '';

                                foreach ($getAllPermissions as $getPermissionNames) {

                                        $permissionSelectList .= '<option value="' . $getPermissionNames["permission_id"] . '">' . $getPermissionNames["permission_name"] . '</option>';
                                }


                                if ($ref == 1) {
                                        $this->output
                                                ->set_content_type('application/json')
                                                ->set_output(json_encode(array("permissionSelectList" => $permissionSelectList), JSON_UNESCAPED_SLASHES));
                                }
                        }
                }
        }


        public function getAllUserRolesList()
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


                                //load model
                                $this->load->model('UserModel');

                                $getAllUserRolesList = $this->UserModel->getAllUserRolesList();

                                $userRolesSelectList = '';

                                foreach ($getAllUserRolesList as $getUserRoleNames) {

                                        $userRolesSelectList .= '<option value="' . $getUserRoleNames["role_id"] . '">' . $getUserRoleNames["role_name"] . '</option>';
                                }


                                if ($ref == 1) {
                                        $this->output
                                                ->set_content_type('application/json')
                                                ->set_output(json_encode(array("userRolesSelectList" => $userRolesSelectList), JSON_UNESCAPED_SLASHES));
                                }
                        }
                }
        }

        public function getAllUserRolesListForModals()
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


                                //load model
                                $this->load->model('UserModel');

                                $getAllUserRolesListForModals = $this->UserModel->getAllUserRolesListForModals();

                                $userRolesSelectList = '';

                                foreach ($getAllUserRolesListForModals as $getUserRoleNames) {

                                        $userRolesSelectList .= '<option value="' . $getUserRoleNames["role_id"] . '">' . $getUserRoleNames["role_name"] . '</option>';
                                }


                                if ($ref == 1) {
                                        $this->output
                                                ->set_content_type('application/json')
                                                ->set_output(json_encode(array("userRolesSelectList" => $userRolesSelectList), JSON_UNESCAPED_SLASHES));
                                }
                        }
                }
        }

        public function deleteDeveloperFormData()
        {

                if (!$this->session->userdata('userinfo')) {
                        redirect("/");
                } else {

                        if (!$this->input->post('user_id')) {
                                redirect("/");
                        } else {

                                //load model
                                $this->load->model('DeveloperModel');

                                $current_date = date("Y-m-d h:i:s");

                                $user = $this->session->userdata('userinfo');
                                $session_user_id = $user['session_user_id'];
                                $session_current_username = ucwords(strtolower($user['session_current_username']));

                                $user_id = $this->input->post('user_id');

                                $result = $this->DeveloperModel->deleteDeveloper($user_id);

                                if ($result == 1) {

                                        $this->load->model('LogModel');

                                        $dataLog = array(
                                                'description' =>  $session_current_username . " Performed Delete Developer Activity!",
                                                'log_type_id' => 11,
                                                'user_id' => $session_user_id,
                                                'created_at' => $current_date,
                                                'updated_at' => $current_date
                                        );

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
}
