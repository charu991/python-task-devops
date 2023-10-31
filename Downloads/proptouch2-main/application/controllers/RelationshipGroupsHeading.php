<?php

defined('BASEPATH') or exit('No direct script access allowed');

class RelationshipGroupsHeading extends CI_Controller
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

    public function view($page = 'list-heading-group-relationship')
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

    public function getRelationshipGroupsHeading()
    {


        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {

            $user = $this->session->userdata('userinfo');

            $session_role_id = $user['session_role_id'];

            if ($session_role_id == 1) {

                //load model
                $this->load->model('GroupModel');

                $this->load->model('HeadingModel');

                $relationshipGroupsHeadingHTML = "";
                $groupsList = "";
                $count = 1;

                $getAllGroups = $this->GroupModel->getAllActiveGroups();


                foreach ($getAllGroups as $group) {

                    $relationshipGroupsHeadingHTML .= "<li>";

                    $relationshipGroupsHeadingHTML .= '
                                                        <input type="checkbox" checked="checked" id=c"' . $count  . '" />
                                                        <label for=c"' . $count  . '" class="tree_label">' . $group["group_name"] . '</label>
                                                        ';


                    $getAllHeadingsByGroup = $this->HeadingModel->getHeadingsByGroupId($group["group_unqique_id"]);

                    foreach ($getAllHeadingsByGroup as $heading) {
                        $relationshipGroupsHeadingHTML .= '
                                                        <ul>
                                                            <li><span class="tree_label">' . $heading["heading_name"] . ' <a href="javascript:btnDeleteRelationshipGroupsHeading(' . $heading["relationship_groups_heading_unqique_id"] . ');" > <i id="trash-icon" style="color:black; border: 1px solid black; border-radius:50%; font-size:22px; padding:5px;" class="las la-trash"></i> </a> </span></li>
                                                        </ul>';
                    }

                    $relationshipGroupsHeadingHTML .= '
                                                        <ul>
                                                            <li> <span class="tree_label"> <a href="javascript:btnOpenListHeadings(' . $group["group_unqique_id"] . ');" > <i id="trash-icon" style="color:black; border: 1px solid black; border-radius:50%; font-size:22px; padding:5px;" class="las la-plus"></i> </a> </span> </li>
                                                        </ul>';


                    $relationshipGroupsHeadingHTML .= "</li>";

                    $count++;
                }





                $this->output
                    ->set_content_type('application/json')
                    ->set_output(json_encode(array("relationshipGroupsHeadingHTML" => $relationshipGroupsHeadingHTML), JSON_UNESCAPED_SLASHES));
            } else {
                redirect("/");
            }
        }
    }


    public function getRelationshipHeadingByGroupID()
    {


        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {

            $user = $this->session->userdata('userinfo');

            $session_role_id = $user['session_role_id'];

            if ($session_role_id == 1) {

                if (!$this->input->post('group_unqique_id')) {
                    redirect("/");
                } else {
                    //load model
                    $this->load->model('HeadingModel');

                    $relationshipGroupsHeadingHTML = "";
                    $headingNamesArray = array();

                    $group_unqique_id = $this->input->post('group_unqique_id');

                    $getAllHeadingsByGroup = $this->HeadingModel->getHeadingsByGroupId( $group_unqique_id);



                    foreach ($getAllHeadingsByGroup as $heading) {

                        array_push($headingNamesArray,  $heading["heading_name"] );
                    }





                    $this->output
                        ->set_content_type('application/json')
                        ->set_output(json_encode(array("headingNamesArray" => $headingNamesArray), JSON_UNESCAPED_SLASHES));
                }
            } else {
                redirect("/");
            }
        }
    }



    public function deleteRelationshipGroupsHeading()
    {

        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {

            if (!$this->input->post('relationship_groups_heading_id')) {
                redirect("/");
            } else {

                //load model
                $this->load->model('RelationshipGroupsHeadingModel');

                $current_date = date("Y-m-d h:i:s");

                $user = $this->session->userdata('userinfo');
                $session_user_id = $user['session_user_id'];
                $session_current_username = ucwords(strtolower($user['session_current_username']));

                $relationship_groups_heading_id = $this->input->post('relationship_groups_heading_id');

                $result = $this->RelationshipGroupsHeadingModel->deleteRelationshipGroupsHeading($relationship_groups_heading_id);

                if ($result == 1) {

                    $this->load->model('LogModel');

                    $dataLog = array(
                        'description' =>  $session_current_username . " Performed Delete Groups Heading Relationship Id Activity!",
                        'log_type_id' => 20,
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

    public function setRelationshipGroupsHeading()
    {
        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {

            $user = $this->session->userdata('userinfo');
            $session_user_id = $user['session_user_id'];
            $session_role_id = $user['session_role_id'];
            $session_current_username = ucwords(strtolower($user['session_current_username']));

            if ($session_role_id == 1) {
                if (!$this->input->post('group_id') || !$this->input->post('headingIdList')) {
                    redirect("/");
                } else {


                    if ($this->input->post('group_id') == 0) {

                        $this->output
                            ->set_content_type('application/json')
                            ->set_output(json_encode(array('code' => 406)));
                    } else {
                        //load model
                        $this->load->model('RelationshipGroupsHeadingModel');

                        $current_date = date("Y-m-d h:i:s");


                        $headingIdListStr =  $this->input->post('headingIdList');
                        $group_id = $this->input->post('group_id');
                        $headingIdListArr = explode(",", $headingIdListStr);

                        foreach ($headingIdListArr as $headingIds) {

                            $dataArray[] = array(
                                'heading_id' =>  $headingIds,
                                'group_id' => $group_id
                            );
                        }



                        $result = $this->RelationshipGroupsHeadingModel->addBatcRelationshipGroupsHeading($dataArray, $group_id);


                        if ($result == 1) {

                            $this->load->model('LogModel');


                            $dataLog = array(
                                'description' =>  $session_current_username . " Performed Add Relationship Groups Heading Activity!",
                                'log_type_id' => 21,
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
    }
}
