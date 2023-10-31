<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Concept extends CI_Controller
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

    public function view($page = 'list-concept')
    {


        if (!file_exists(APPPATH . 'views/' . $page . '.php')) {

            show_404();
        } else {

            if (!$this->session->userdata('userinfo')) {
                redirect("/");
            } else {


                $userinfo =  $this->session->userdata('userinfo');
                $session_role_id = $userinfo["session_role_id"];

                if ($session_role_id == 2) {

                    $this->_loadview($page);
                } else {
                    redirect("/");
                }
            }
        }
    }

    public function add($page = 'add-concept')
    {


        if (!file_exists(APPPATH . 'views/' . $page . '.php')) {

            show_404();
        } else {


            if (!$this->session->userdata('userinfo')) {
                redirect("/");
            } else {

                $userinfo =  $this->session->userdata('userinfo');
                $session_role_id = $userinfo["session_role_id"];

                if ($session_role_id == 2) {

                    $this->_loadview($page);
                } else {
                    redirect("/");
                }
            }
        }
    }

    public function getAllAttributeList()
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

                $getAllDevelopers = $this->DeveloperModel->getAllDevelopers();

                $developerSelectList = '';

                foreach ($getAllDevelopers as $getDeveloperNames) {

                    $developerSelectList .= '<option value="' . $getDeveloperNames["user_id"] . '">' . $getDeveloperNames["full_name"] . ' (' . $getDeveloperNames["user_name"] .  ') ' . '</option>';
                }


                if ($ref == 1) {
                    $this->output
                        ->set_content_type('application/json')
                        ->set_output(json_encode(array("developerSelectList" => $developerSelectList), JSON_UNESCAPED_SLASHES));
                }
            }
        }
    }

    /*public function getConceptListTable()
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
                $this->load->model('ConceptModel');

                $getAllListConcepts = $this->ConceptModel->getAllListConcepts();



                $conceptTableList = '<table class="data-table table " id="DataTables_Table_0">';

                $conceptTableList .= '<thead class="bg-white text-uppercase">';
                $conceptTableList .= '<tr class="ligth ligth-data" role="row">';
                $conceptTableList .= '<th>Id</th>';
                $conceptTableList .= '<th>Field Name</th>';
                $conceptTableList .= '<th>Field Value</th>';
                $conceptTableList .= '<th>Attribute Type</th>';
                $conceptTableList .= '<th>Order Number</th>';
                $conceptTableList .= '<th>Created At</th>';
                $conceptTableList .= '<th>Action</th>';
                $conceptTableList .= '</tr>';
                $conceptTableList .= '</thead>';

                $conceptTableList .= '<tbody  class="ligth-body">';



                foreach ($getAllListConcepts as $getConcept) {


                    $conceptTableList .= '<tr>';
                    $conceptTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getConcept['concept_id'] . '</div> </td>';
                    $conceptTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getConcept['field_name'] . '</div> </td>';
                    $conceptTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getConcept['field_value'] . '</div> </td>';
                    $conceptTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getConcept['attribute_type_id'] . '</div> </td>';
                    $conceptTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getConcept['order_number'] . '</div> </td>';
                    $conceptTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getConcept['created_at'] . '</div> </td>';
                    $conceptTableList .= '<td>' . '<a class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" href="#"><i class="ri-eye-line mr-0"></i></a>' . '<a class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="' . base_url('concept/edit/' . $getConcept['concept_id'] . '') . '"><i class="ri-pencil-line mr-0"></i></a>' . '<a class="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="javascript:deleteConcept(' . $getConcept['concept_id'] . ');"><i class="ri-delete-bin-line mr-0"></i></a>' . '</td>';
                    $conceptTableList .= '</tr>';
                }

                $conceptTableList .= '</tbody>';
                $conceptTableList .= '</table>';




                $this->output
                    ->set_content_type('application/json')
                    ->set_output(json_encode(array("conceptTableList" => $conceptTableList), JSON_UNESCAPED_SLASHES));
            }
        }
    }*/

    public function getConceptListTable()
    {



        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {

            $user = $this->session->userdata('userinfo');

            $session_role_id = $user['session_role_id'];

            //load model
            $this->load->model('ConceptModel');
            $this->load->library('SSP');

            $getAllListConcepts = json_decode($this->ConceptModel->getAllListConcepts(), true);



            echo json_encode(
                SSP::complex($_GET, $getAllListConcepts["sql_details"], $getAllListConcepts["table"], $getAllListConcepts["primaryKey"], $getAllListConcepts["columns"], $getAllListConcepts["whereAll"])
            );
        }
    }


    public function setAddConceptFormData()
    {
        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {

            if (!$this->input->post('field_name') || !$this->input->post('field_value') || !$this->input->post('attribute_type')) {
                redirect("/");
            } else {

                //load model
                $this->load->model('ConceptModel');

                $current_date = date("Y-m-d h:i:s");

                $user = $this->session->userdata('userinfo');
                $session_user_id = $user['session_user_id'];
                $session_current_username = ucwords(strtolower($user['session_current_username']));

                $field_name = $this->input->post('field_name');
                $field_value = $this->input->post('field_value');
                $attribute_type_id = $this->input->post('attribute_type');



                $data = array(
                    'field_name' =>  $field_name,
                    'field_value' => $field_value,
                    'attribute_type_id' => $attribute_type_id,
                    'order_number' => 1,
                    'status_id' => 1,
                    'created_at' => $current_date,
                    'updated_at' => $current_date
                );


                $result = $this->ConceptModel->addConcept($data);

                if ($result == 1) {

                    $this->load->model('LogModel');

                    $dataLog = array(
                        'description' =>  $session_current_username . " Performed Add Concept Activity!",
                        'log_type_id' => 6,
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


    public function deleteConceptFormData()
    {

        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {

            if (!$this->input->post('concept_id')) {
                redirect("/");
            } else {

                //load model
                $this->load->model('ConceptModel');

                $current_date = date("Y-m-d h:i:s");

                $user = $this->session->userdata('userinfo');
                $session_user_id = $user['session_user_id'];
                $session_current_username = ucwords(strtolower($user['session_current_username']));

                $concept_id = $this->input->post('concept_id');

                $result = $this->ConceptModel->deleteConcept($concept_id);

                if ($result == 1) {

                    $this->load->model('LogModel');

                    $dataLog = array(
                        'description' =>  $session_current_username . " Performed Delete Concept Activity!",
                        'log_type_id' => 10,
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


    public function updateConceptFormData()
    {

        if (!$this->session->userdata('userinfo')) {
            redirect("/");
        } else {

            if (!$this->input->post('modal_concept_id') || !$this->input->post('modal_field_name') || !$this->input->post('modal_field_value') || !$this->input->post('modal_sequence_number') || !$this->input->post('modal_attribute_type')) {
                redirect("/");
            } else {

                //load model
                $this->load->model('ConceptModel');

                $current_date = date("Y-m-d h:i:s");

                $user = $this->session->userdata('userinfo');
                $session_user_id = $user['session_user_id'];
                $session_current_username = ucwords(strtolower($user['session_current_username']));

                $concept_id = $this->input->post('modal_concept_id');
                $field_name = $this->input->post('modal_field_name');
                $field_value = $this->input->post('modal_field_value');
                $sequence_number = $this->input->post('modal_sequence_number');
                $concept_status_id = $this->input->post('modal_concept_status_type');
                $attribute_type_id = $this->input->post('modal_attribute_type');



                $data = array(
                    'field_name' =>  $field_name,
                    'field_value' => $field_value,
                    'attribute_type_id' => $attribute_type_id,
                    'order_number' => $sequence_number,
                    'status_id' => $concept_status_id,
                    'created_at' => $current_date,
                    'updated_at' => $current_date
                );


                $result = $this->ConceptModel->updateConcept($data, $concept_id);

                if ($result == 1) {

                    $this->load->model('LogModel');

                    $dataLog = array(
                        'description' =>  $session_current_username . " Performed Update Concept Activity!",
                        'log_type_id' => 8,
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
