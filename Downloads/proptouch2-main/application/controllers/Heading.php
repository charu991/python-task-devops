<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Heading extends CI_Controller
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

    public function view($page = 'list-heading')
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

    public function add($page = 'add-heading')
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

    public function getHeadingListTable()
    {


        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {

            $user = $this->session->userdata('userinfo');

            $session_role_id = $user['session_role_id'];

            if ($session_role_id == 1) {

                //load model
                $this->load->model('HeadingModel');

                $getAllListHeadings = $this->HeadingModel->getAllListHeadings();

                echo json_encode(
                    $getAllListHeadings
                );
            } else {
                redirect("/");
            }
        }
    }

    public function deleteHeadingFormData()
    {

        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {

            if (!$this->input->post('heading_id')) {
                redirect("/");
            } else {

                //load model
                $this->load->model('HeadingModel');

                $current_date = date("Y-m-d h:i:s");

                $user = $this->session->userdata('userinfo');
                $session_user_id = $user['session_user_id'];
                $session_current_username = ucwords(strtolower($user['session_current_username']));

                $heading_id = $this->input->post('heading_id');

                $result = $this->HeadingModel->deleteHeading($heading_id);

                if ($result == 1) {

                    $this->load->model('LogModel');

                    $dataLog = array(
                        'description' =>  $session_current_username . " Performed Delete Heading Activity!",
                        'log_type_id' => 19,
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

    public function updateHeadingFormData()
    {

        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {

            if (!$this->input->post('modal_heading_id') || !$this->input->post('modal_heading_name') || !$this->input->post('modal_heading_status_type')) {
                redirect("/");
            } else {

                //load model
                $this->load->model('HeadingModel');

                $current_date = date("Y-m-d h:i:s");

                $user = $this->session->userdata('userinfo');
                $session_user_id = $user['session_user_id'];
                $session_current_username = ucwords(strtolower($user['session_current_username']));

                $heading_id = $this->input->post('modal_heading_id');

                $heading_name = $this->input->post('modal_heading_name');
                $heading_status_type_id = $this->input->post('modal_heading_status_type');

                $data = array(
                    'name' => $heading_name,
                    'status_id' => $heading_status_type_id,
                    'updated_at' => $current_date
                );

                $result = $this->HeadingModel->updateHeading($data, $heading_id);

                if ($result == 1) {

                    $this->load->model('LogModel');

                    $dataLog = array(
                        'description' =>  $session_current_username . " Performed Update Heading Activity!",
                        'log_type_id' => 18,
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


    public function setAddHeadingFormData()
    {


        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {

            if (!$this->input->post('heading_name') || !$this->input->post('user_status')) {
                redirect("/");
            } else {

                //load model
                $this->load->model('HeadingModel');

                $current_date = date("Y-m-d h:i:s");

                $user = $this->session->userdata('userinfo');
                $session_user_id = $user['session_user_id'];
                $session_current_username = ucwords(strtolower($user['session_current_username']));

                $heading_name = $this->input->post('heading_name');
                $user_status = $this->input->post('user_status');


                $data = array(
                    'name' =>  $heading_name,
                    'status_id' =>  intval($user_status),
                    'created_at' => $current_date,
                    'updated_at' => $current_date
                );


                $result = $this->HeadingModel->addHeading($data);

                if ($result == 1) {

                    $this->load->model('LogModel');

                    $dataLog = array(
                        'description' =>  $session_current_username . " Performed Add Heaidng Activity!",
                        'log_type_id' => 17,
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
