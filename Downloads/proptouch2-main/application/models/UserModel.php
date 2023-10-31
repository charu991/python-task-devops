<?php

class UserModel extends CI_Model
{

    public function __construct()
    {
        $this->load->database();
    }

    public function CheckCurrentPasswordValidation($getCurrentPassword)
    {

        $user = $this->session->userdata('userinfo');

        $session_user_id = $user['session_user_id'];

        $query = $this->db->query("SELECT d.id as user_id
        FROM users d
        WHERE d.id = '" . $session_user_id . "'
        AND d.password = '" . $getCurrentPassword . "'

        ");



        if ($query->num_rows() == 1) {
            return 1;
        } else {
            return 0;
        }
    }



    public function CheckUserNameValidation($getUserName)
    {


        $query = $this->db->query("SELECT d.id as user_id
        FROM users d
        WHERE d.username = '" . $getUserName . "'


        ");


        if ($query->num_rows() > 0) {
            return 0;
        } else {
            return 1;
        }
    }



    public function updateUserPassword($data){

        $user = $this->session->userdata('userinfo');

        $session_user_id = $user['session_user_id'];


        $this->db->update('users', $data, "id = " . $session_user_id);

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }




    }




    public function updateUser($data, $getUserId)
    {
        $this->db->trans_start();

        $this->db->update('users', $data, "id = " . $getUserId);

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }



    public function checkUserExists($user_id)
    {
        $query = $this->db->query("SELECT d.id as user_id
            FROM users d
            WHERE d.id ='" . $user_id . "'
            AND d.role_id = 3
            AND d.status_id = 1");


        if ($query->num_rows() > 0) {
            return 1;
        } else {
            return 0;
        }
    }


    public function getUserName($user_id)
    {
        $query = $this->db->query("SELECT d.name as user_name
            FROM users d
            WHERE d.id ='" . $user_id . "'");

        $result = $query->result_array();

        return $result[0]["user_name"];
    }



    public function getAllUserRolesList()
    {
        $user = $this->session->userdata('userinfo');
        $session_user_id = $user['session_user_id'];
        $session_role_id = $user['session_role_id'];


        if($session_role_id == 1){  //admin
            $query = $this->db->query("SELECT ur.id as role_id, ur.name as role_name
            FROM user_roles ur
            WHERE id IN(2,3,4)");
        }else if($session_role_id == 2){  //clients
            $query = $this->db->query("SELECT  ur.id as role_id, ur.name as role_name
            FROM user_roles ur
            WHERE id IN(4)");
        }else if($session_role_id == 3){ //teams
            $query = $this->db->query("SELECT  ur.id as role_id, ur.name as role_name
            FROM user_roles ur
            WHERE id IN(2,4)");
        }


        $result = $query->result_array();

        return $result;
    }

    public function getAllUserRolesListForModals()
    {
        $user = $this->session->userdata('userinfo');
        $session_user_id = $user['session_user_id'];
        $session_role_id = $user['session_role_id'];


        $query = $this->db->query("SELECT ur.id as role_id, ur.name as role_name
            FROM user_roles ur
            ");


        $result = $query->result_array();

        return $result;
    }



    public function login_user($username, $password)
    {
        // Validate
        $result = $this->db->query("SELECT d.id as user_id, d.name as current_username, d.role_id as role_id
                          FROM users d
                          WHERE d.username='" . $username . "' AND d.password='" . $password . "' AND d.status_id=1 AND ( d.role_id=1 || d.role_id=2  || d.role_id=3 || d.role_id=4)");


        if ($result->num_rows() == 1) {

            $data = $result->row();

            $get_role_id = $data->role_id;
            $get_user_id = $data->user_id;
            $get_current_username = $data->current_username;

            $array_data = array("session_role_id" => $get_role_id, "session_user_id" => $get_user_id, "session_current_username" => $get_current_username, "status" => 1);

            return $array_data;

        } else {

            $array_data = array("status" => 0);

            return $array_data;
        }
    }




    public function getLastLoginTime()
    {

        $current_date = date("Y-m-d h:i:s");

        $user = $this->session->userdata('userinfo');
        $session_user_id = $user['session_user_id'];

        $query = $this->db->query("SELECT l.created_at
            FROM logs l
            WHERE l.user_id = '" . $session_user_id . "'
            AND l.log_type_id = 2
            ORDER BY l.id DESC
            LIMIT 1,1

            ");

        $result = $query->result_array();

        if ($query->num_rows() > 0) {

            return $result[0]["created_at"];
        } else {

            return $current_date;
        }
    }

    public function getAllUserProfileById($getUserId)
    {

        $user = $this->session->userdata('userinfo');

        $session_role_id = $user['session_role_id'];

        $query = $this->db->query("SELECT d.id as user_id, d.name as username,  d.username  as user_login_username,  d.password as user_login_password , ur.id as user_access_role_id, ur.name as user_access_role,  d.created_at as user_created_at, s.id as user_status_id, s.name as user_status
        FROM users d
        LEFT JOIN user_roles ur ON ur.id = d.role_id
        LEFT JOIN status s ON s.id = d.status_id
                                    WHERE d.id ='" . $getUserId . "'


                                ");



        if ($query->num_rows() > 0) {
            $data = array("status" => 1, "result" => $query->result_array());
            return $data;
        } else {
            $data = array("status" => 0);
            return $data;
        }
    }
}
