<?php

class ConceptModel extends CI_Model
{

    public function __construct()
    {
        $this->load->database();
    }

    public function addConcept($data)
    {

        $user = $this->session->userdata('userinfo');
        $session_user_id = $user['session_user_id'];

        $this->db->trans_start();

        $this->db->insert('concepts', $data);




        $lastRowId = $this->db->insert_id();

        $concepts_developers_relationship = array(
            'concept_id' => $lastRowId,
            'user_id' => $session_user_id
        );


        $this->db->insert("concepts_developers_relationship", $concepts_developers_relationship);

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }


    public function updateConcept($data, $getConceptId)

    {
        $this->db->trans_start();

        $this->db->update('concepts', $data, "id = " . $getConceptId);

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }


    public function deleteConcept($getConceptId)

    {

        $data = array(
            'status_id' =>  2

        );

        $this->db->trans_start();

        $this->db->update('concepts', $data, "id = " . $getConceptId);

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }


    public function getAllListConcepts()
    {
        $user = $this->session->userdata('userinfo');
        $session_user_id = $user['session_user_id'];

        // SQL query

        $primaryKey = 'concept_unqique_id';


        $query = "

                    SELECT
                    c.id as concept_unqique_id,
                    cdr.user_id as user_id,
                    c.field_name as field_name,
                    c.field_value as field_value,
                    a.attribute_type as attribute_type,
                    c.order_number as order_number,
                    s.name as concept_status,
                    c.created_at as created_at
                    FROM concepts c
                    LEFT JOIN concepts_developers_relationship cdr ON c.id = cdr.concept_id
                    LEFT JOIN attributes_list a ON c.attribute_type_id  = a.id
                    LEFT JOIN status s ON c.status_id  = s.id
                ";

        $where = "

                user_id LIKE'" . $session_user_id . "'

            ";

        if (isset($_POST['getColumnIndex'])) {

            $getColumnIndex = $_POST['getColumnIndex'];

            $getColumnIndexSort = $_POST['getColumnIndexSort'];

            // If condition for order_number
            if ($getColumnIndex == 4 && $getColumnIndexSort = "ASC") {
                $orderby = " ORDER BY order_number ASC";
            } else if ($getColumnIndex == 4 && $getColumnIndexSort = "DESC") {
                $orderby = " ORDER BY order_number DESC";
            }
        } else {

            $orderby = "ORDER BY order_number ASC";
        }


        // Concatenate of where and order clause
        $whereAll = $where . $orderby;

        $table = <<<EOT
            (
                $query

            ) temp
            EOT;

        $columns = array(
            array('db' => 'concept_unqique_id', 'dt' => "dt00_concept_unqique_id"),
            array('db' => 'field_name', 'dt' => "dt0_field_name"),
            array('db' => 'field_value',   'dt' => "dt1_field_value"),
            array('db' => 'attribute_type',     'dt' => "dt2_attribute_type_id"),
            array('db' => 'order_number',     'dt' => "dt3_order_number"),
            array('db' => 'concept_status',     'dt' => "dt4_concept_status"),
            array('db' => 'created_at',     'dt' => "dt5_created_at")

        );

        $instance = &get_instance();
        $instance->load->database();

        // SQL server connection information
        $sql_details = array(
            'user' => $instance->db->username,
            'pass' => $instance->db->password,
            'db'   => $instance->db->database,
            'host' => $instance->db->hostname,
        );

        return json_encode(array(


            "sql_details" => $sql_details,
            "table" => $table,
            "primaryKey" => $primaryKey,
            "columns" => $columns,
            "whereAll" => $whereAll

        ));
    }
}
