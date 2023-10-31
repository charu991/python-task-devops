<?php

class HeadingModel extends CI_Model
{

    public function __construct()
    {
        $this->load->database();
    }

    public function addHeading($data)
    {

        $user = $this->session->userdata('userinfo');
        $session_user_id = $user['session_user_id'];

        $this->db->trans_start();

        $this->db->insert('headings', $data);

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }


    public function updateHeading($data, $getHeadingId)

    {
        $this->db->trans_start();

        $this->db->update('headings', $data, "id = " . $getHeadingId);

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }


    public function deleteHeading($getHeadingId)

    {

        $data = array(
            'status_id' =>  2

        );

        $this->db->trans_start();

        $this->db->update('headings', $data, "id = " . $getHeadingId);

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }


    public function getAllActiveHeadings()
    {
        $user = $this->session->userdata('userinfo');

        $session_user_id = $user['session_user_id'];
        $session_role_id = $user['session_role_id'];

        $sqlstatment = "

        SELECT
        h.id as heading_unqique_id,
        h.name as heading_name,
        h.created_at as heading_created_at
        FROM headings h
        WHERE h.status_id = 1
        ORDER BY h.name ASC
        ";

        $query = $this->db->query($sqlstatment);

        return $query->result_array();
    }


    public function getHeadingsByGroupId($groupId)
    {
        $user = $this->session->userdata('userinfo');

        $session_user_id = $user['session_user_id'];
        $session_role_id = $user['session_role_id'];

        $sqlstatment = "

        SELECT
        hgr.id as relationship_groups_heading_unqique_id,
        h.id as heading_unqique_id,
        g.id as group_unqique_id,
        g.name as group_name,
        h.name as heading_name,
        g.id as status_id,
        g.created_at as group_created_at
        FROM headings_groups_relationship hgr
        LEFT JOIN groups g ON g.id = hgr.group_id
        LEFT JOIN headings h ON h.id = hgr.heading_id
        WHERE g.status_id = 1
        AND h.status_id = 1
        AND g.id = '" . $groupId . "'
        ORDER BY g.name ASC;
        ";

        $query = $this->db->query($sqlstatment);

        return $query->result_array();
    }



    public function getAllListHeadings()
    {

        $user = $this->session->userdata('userinfo');

        $session_user_id = $user['session_user_id'];
        $session_role_id = $user['session_role_id'];


        $start = intval($_POST['start']);
        $length = intval($_POST['length']);

        $sqlstatment_getTotalRecords = " SELECT * FROM headings h ";

        $sqlstatment_getFilteredRecords = "";
        $sqlstatment_getFilteredLimitRecords = "";


        $query = "

        SELECT
        h.id as heading_unqique_id,
        h.name as heading_name,
        s.name as heading_status,
        h.created_at as heading_created_at
        FROM headings h
        LEFT JOIN status s ON h.status_id = s.id
        ";

        $where = "";


        $order_by = " ORDER BY h.name ASC";

        if ($_POST['search']['value'] != "") {

            $search = $_POST['search']['value'];

            $sqlstatment_getFilteredRecords =  $query . $where . "

                                                        WHERE h.name LIKE '" . "%" . $search . "%" . "'
                                                        "
                .

                $order_by;

            if ($length != -1) {
                $sqlstatment_getFilteredLimitRecords = $sqlstatment_getFilteredRecords . " LIMIT $start, $length ";
            } else {
                $sqlstatment_getFilteredLimitRecords =  $sqlstatment_getFilteredRecords;
            }
        } else {


            $sqlstatment_getFilteredRecords =  $query . $where . $order_by;

            if ($length != -1) {
                $sqlstatment_getFilteredLimitRecords = $sqlstatment_getFilteredRecords . " LIMIT $start, $length ";
            } else {
                $sqlstatment_getFilteredLimitRecords =  $sqlstatment_getFilteredRecords;
            }
        }

        $recordsFiltered = $this->db->query($sqlstatment_getFilteredRecords)->num_rows();
        $recordsFilteredLimitRecords = $this->db->query($sqlstatment_getFilteredLimitRecords);
        $recordsTotal = $this->db->query($sqlstatment_getTotalRecords)->num_rows();


        if ($recordsFilteredLimitRecords->num_rows() > 0) {
            $result = $recordsFilteredLimitRecords->result_array();


            foreach ($result as $data) {

                $dataArray[] = array(

                    "dt00_heading_unqique_id" =>  $data['heading_unqique_id'],
                    "dt0_heading_name" => $data['heading_name'],
                    "dt2_heading_status_name" => $data['heading_status'],
                    "dt3_heading_created_at" => $data['heading_created_at']
                );
            }



            $array = array("draw" => intval($_POST['draw']), "recordsTotal" => $recordsTotal, "recordsFiltered" => $recordsFiltered, "data" => $dataArray);
        } else {
            $array = array("draw" => intval($_POST['draw']), "recordsTotal" => 0, "recordsFiltered" => 0, "data" => []);
        }





        return $array;
    }
}
