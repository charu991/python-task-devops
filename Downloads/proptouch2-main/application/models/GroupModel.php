<?php

class GroupModel extends CI_Model
{

    public function __construct()
    {
        $this->load->database();
    }

    public function addGroup($data)
    {

        $user = $this->session->userdata('userinfo');
        $session_user_id = $user['session_user_id'];

        $this->db->trans_start();

        $this->db->insert('groups', $data);

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }


    public function updateGroup($data, $getHeadingId)

    {
        $this->db->trans_start();

        $this->db->update('groups', $data, "id = " . $getHeadingId);

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }


    public function deleteGroup($getHeadingId)

    {

        $data = array(
            'status_id' =>  2

        );

        $this->db->trans_start();

        $this->db->update('groups', $data, "id = " . $getHeadingId);

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }


    public function getAllActiveGroups()
    {
        $user = $this->session->userdata('userinfo');

        $session_user_id = $user['session_user_id'];
        $session_role_id = $user['session_role_id'];

        $sqlstatment = "

        SELECT
        g.id as group_unqique_id,
        g.name as group_name,
        g.icon_shortcode as group_icon_shortcode,
        g.created_at as group_created_at
        FROM groups g
        WHERE g.status_id = 1
        ORDER BY g.order_number ASC
        ";

        $query = $this->db->query($sqlstatment);

        return $query->result_array();

    }


    public function getAllListGroups()
    {

        $user = $this->session->userdata('userinfo');

        $session_user_id = $user['session_user_id'];
        $session_role_id = $user['session_role_id'];


        $start = intval($_POST['start']);
        $length = intval($_POST['length']);

        $sqlstatment_getTotalRecords = " SELECT * FROM groups g ";

        $sqlstatment_getFilteredRecords = "";
        $sqlstatment_getFilteredLimitRecords = "";


        $query = "

        SELECT
        g.id as group_unqique_id,
        g.name as group_name,
        g.icon_shortcode as group_icon_shortcode,
        s.name as group_status,
        g.created_at as group_created_at
        FROM groups g
        LEFT JOIN status s ON g.status_id = s.id
        ";

        $where = "";


        $order_by = " ORDER BY g.order_number ASC";

        if ($_POST['search']['value'] != "") {

            $search = $_POST['search']['value'];

            $sqlstatment_getFilteredRecords =  $query . $where . "

                                                        WHERE g.name LIKE '" . "%" . $search . "%" . "'
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

                    "dt00_group_unqique_id" =>  $data['group_unqique_id'],
                    "dt1_group_icon_shortcode" => $data['group_icon_shortcode'],
                    "dt0_group_name" => $data['group_name'],
                    "dt2_group_status_name" => $data['group_status'],
                    "dt3_group_created_at" => $data['group_created_at']

                );
            }



            $array = array("draw" => intval($_POST['draw']), "recordsTotal" => $recordsTotal, "recordsFiltered" => $recordsFiltered, "data" => $dataArray);
        } else {
            $array = array("draw" => intval($_POST['draw']), "recordsTotal" => 0, "recordsFiltered" => 0, "data" => []);
        }





        return $array;
    }
}
