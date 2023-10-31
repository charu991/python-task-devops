<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Group extends CI_Controller
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

    public function view($page = 'list-group')
    {


        if (!file_exists(APPPATH . 'views/' . $page . '.php')) {

            show_404();
        } else {

            if (!$this->session->userdata('userinfo')) {
                redirect("/");
            } else {


                $userinfo =  $this->session->userdata('userinfo');
                $session_role_id = $userinfo["session_role_id"];

                if ($session_role_id == 1) {

                    $this->_loadview($page);
                } else {
                    redirect("/");
                }
            }
        }
    }

    public function add($page = 'add-group')
    {


        if (!file_exists(APPPATH . 'views/' . $page . '.php')) {

            show_404();
        } else {


            if (!$this->session->userdata('userinfo')) {
                redirect("/");
            } else {

                $userinfo =  $this->session->userdata('userinfo');
                $session_role_id = $userinfo["session_role_id"];

                if ($session_role_id == 1) {

                    $this->_loadview($page);
                } else {
                    redirect("/");
                }
            }
        }
    }

    public function getGroupListTable()
    {


        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {

            $user = $this->session->userdata('userinfo');

            $session_role_id = $user['session_role_id'];

            if ($session_role_id == 1) {

                //load model
                $this->load->model('GroupModel');

                $getAllListGroups = $this->GroupModel->getAllListGroups();

                echo json_encode(
                    $getAllListGroups
                );
            } else {
                redirect("/");
            }
        }
    }


    public function deleteGroupFormData()
    {

        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {

            if (!$this->input->post('group_id')) {
                redirect("/");
            } else {

                //load model
                $this->load->model('GroupModel');

                $current_date = date("Y-m-d h:i:s");

                $user = $this->session->userdata('userinfo');
                $session_user_id = $user['session_user_id'];
                $session_current_username = ucwords(strtolower($user['session_current_username']));

                $group_id = $this->input->post('group_id');

                $result = $this->GroupModel->deleteGroup($group_id);

                if ($result == 1) {

                    $this->load->model('LogModel');

                    $dataLog = array(
                        'description' =>  $session_current_username . " Performed Delete Group Activity!",
                        'log_type_id' => 16,
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

    public function updateGroupFormData()
    {

        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {

            if (!$this->input->post('modal_group_id') || !$this->input->post('modal_group_name') || !$this->input->post('modal_group_status_type')) {
                redirect("/");
            } else {

                //load model
                $this->load->model('GroupModel');

                $current_date = date("Y-m-d h:i:s");

                $user = $this->session->userdata('userinfo');
                $session_user_id = $user['session_user_id'];
                $session_current_username = ucwords(strtolower($user['session_current_username']));

                $group_id = $this->input->post('modal_group_id');

                $group_name = $this->input->post('modal_group_name');
                $group_status_type_id = $this->input->post('modal_group_status_type');
                $group_icon_shortcode = $this->input->post('modal_group_icon_shortcode');

                $data = array(
                    'name' => $group_name,
                    'icon_shortcode' => $group_icon_shortcode,
                    'status_id' => $group_status_type_id,
                    'updated_at' => $current_date
                );

                $result = $this->GroupModel->updateGroup($data, $group_id);

                if ($result == 1) {

                    $this->load->model('LogModel');

                    $dataLog = array(
                        'description' =>  $session_current_username . " Performed Update Group Activity!",
                        'log_type_id' => 15,
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


    public function setAddGroupFormData()
    {


        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {

            if (!$this->input->post('group_name') || !$this->input->post('user_status')) {
                redirect("/");
            } else {

                //load model
                $this->load->model('GroupModel');

                $current_date = date("Y-m-d h:i:s");

                $user = $this->session->userdata('userinfo');
                $session_user_id = $user['session_user_id'];
                $session_current_username = ucwords(strtolower($user['session_current_username']));

                $group_name = $this->input->post('group_name');
                $user_status = $this->input->post('user_status');


                $data = array(
                    'name' =>  $group_name,
                    'status_id' =>  intval($user_status),
                    'created_at' => $current_date,
                    'updated_at' => $current_date
                );


                $result = $this->GroupModel->addGroup($data);

                if ($result == 1) {

                    $this->load->model('LogModel');

                    $dataLog = array(
                        'description' =>  $session_current_username . " Performed Add Group Activity!",
                        'log_type_id' => 14,
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
