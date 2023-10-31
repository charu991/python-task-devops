<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Settings extends CI_Controller
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

    public function add($page = 'add-settings')
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

    public function view($page = 'view-settings')
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


}
