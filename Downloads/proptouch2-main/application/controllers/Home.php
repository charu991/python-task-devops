<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Home extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    function countAllUsersList()
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
                $this->load->model('DeveloperModel');

                // for clients role_id = 2
                $countActiveClient = $this->DeveloperModel->countActiveUsers(2);
                $countInactiveClients = $this->DeveloperModel->countInactiveUsers(2);
                $countTotalClients = $this->DeveloperModel->countTotalUsers(2);

                // for teams role_id = 3
                $countActiveTeams = $this->DeveloperModel->countActiveUsers(3);
                $countInactiveTeams = $this->DeveloperModel->countInactiveUsers(3);
                $countTotalTeams = $this->DeveloperModel->countTotalUsers(3);

                // for agents role_id = 4
                $countActiveAgents = $this->DeveloperModel->countActiveUsers(4);
                $countInactiveAgents = $this->DeveloperModel->countInactiveUsers(4);
                $countTotalAgents = $this->DeveloperModel->countTotalUsers(4);



                if ($ref == 1) {
                    $this->output
                        ->set_content_type('application/json')
                        ->set_output(json_encode(

                            array(

                                "ActiveClients" => $countActiveClient,
                                "InactiveClients" => $countInactiveClients,
                                "TotalClients" => $countTotalClients,

                                "ActiveTeams" => $countActiveTeams,
                                "InactiveTeams" => $countInactiveTeams,
                                "TotalTeams" => $countTotalTeams,

                                "ActiveAgents" => $countActiveAgents,
                                "InactiveAgents" => $countInactiveAgents,
                                "TotalAgents" => $countTotalAgents


                            ),
                            JSON_UNESCAPED_SLASHES
                        ));
                }
            }
        }
    }
}
