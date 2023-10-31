<?php

class SettingsModel extends CI_Model
{

    public function __construct()
    {
        $this->load->database();
    }

    public function getPermissionID($getPermissionsName)
    {
        $query = $this->db->query("SELECT s.id as setting_id
        FROM settings s
        WHERE s.name LIKE '" . "%" . $getPermissionsName . "%" . "'
        ");


        if ($query->num_rows() > 0) {

            $result = $query->result_array();

            return $result[0]["setting_id"];
        } else {
            return 0;
        }
    }


    public function getAllowdPermissions()
    {

        $user = $this->session->userdata('userinfo');
        $session_user_id = $user['session_user_id'];
        $session_role_id = $user['session_role_id'];

        if ($session_role_id == 1) {
            return 1;
        } else {

            $query = $this->db->query("

            SELECT st.id as setting_id,
            st.name as setting_name
            FROM users u
            LEFT JOIN user_settings us ON u.id = us.user_id
            LEFT JOIN settings st ON us.setting_id = st.id
            WHERE u.id ='" . $session_user_id . "'


            ");


            if ($query->num_rows() > 0) {

                $result = $query->result_array();

                return $result;
            } else {
                return 0;
            }
        }
    }

    public function getAllPermissions()
    {
        $query = $this->db->query("SELECT s.id as permission_id, s.name as permission_name FROM settings s");

        return $query->result_array();
    }
}
