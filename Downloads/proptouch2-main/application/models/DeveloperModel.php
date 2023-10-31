<?php

class DeveloperModel extends CI_Model
{

    public function __construct()
    {
        $this->load->database();
    }

    public function addDeveloper($data, $getPermissions)
    {

        $user = $this->session->userdata('userinfo');
        $session_user_id = $user['session_user_id'];
        $current_date = date("Y-m-d h:i:s");


        $user_settings_relationship = array();


        $this->db->trans_start();

        $this->db->insert('users', $data);

        $lastRowId = $this->db->insert_id();

        $data2 = array(
            'user_id' =>  $lastRowId,
            'user_created_by_id' => $session_user_id,
            'created_at' => $current_date,
            'updated_at' => $current_date
        );

        $this->db->insert('users_created_by', $data2);


        if ($getPermissions != "") {


            foreach ($getPermissions as  $value) {
                $arr = array(
                    'setting_id' => $value,
                    'user_id' => $lastRowId
                );


                array_push($user_settings_relationship, $arr);
            }


            $this->db->insert_batch("user_settings", $user_settings_relationship);
        }





        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }


    public function deleteDeveloperPermission($data, $getDeveloperId)

    {


        $this->db->trans_start();

        $this->db->where('user_id', $getDeveloperId);

        $this->db->delete('user_settings', $data);

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }

    public function uploadDeveloper($data)
    {

        $this->db->trans_start();

        $this->db->insert_batch('users', $data);

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }


    public function deleteDeveloper($getDeveloperId)

    {

        $data = array(
            'status_id' =>  2

        );

        $this->db->trans_start();

        $this->db->update('users', $data, "id = " . $getDeveloperId);

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }


    public function updateDeveloper($data, $getUserId, $getPermissions)

    {

        $user_settings_relationship = array();

        $this->db->trans_start();

        $this->db->update('users', $data, "id = " . $getUserId);

        if ($getPermissions != "") {
            $this->db->where('user_id', $getUserId);

            $this->db->delete('user_settings');


            foreach ($getPermissions as  $value) {
                $arr = array(
                    'setting_id' => $value,
                    'user_id' => $getUserId
                );


                array_push($user_settings_relationship, $arr);
            }


            $this->db->insert_batch("user_settings", $user_settings_relationship);
        }

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }


    public function getAllDevelopers($role_id)
    {
        $query = $this->db->query("SELECT u.id as user_id, u.name as full_name, u.username as user_name FROM users u WHERE u.role_id = $role_id AND u.status_id = 1");

        return $query->result_array();
    }


    public function countActiveUsers($role_id)
    {
        $query = $this->db->query("SELECT COUNT(u.id) as activeUsers FROM users u WHERE u.role_id = $role_id AND u.status_id = 1");

        $result =  $query->result_array();

        return $result[0]["activeUsers"];
    }

    public function countInactiveUsers($role_id)
    {
        $query = $this->db->query("SELECT COUNT(u.id) as inactiveUsers FROM users u WHERE u.role_id = $role_id AND u.status_id = 2");

        $result =  $query->result_array();

        return $result[0]["inactiveUsers"];
    }

    public function countTotalUsers($role_id)
    {
        $query = $this->db->query("SELECT COUNT(u.id) as totalUsers FROM users u WHERE u.role_id = $role_id");

        $result =  $query->result_array();

        return $result[0]["totalUsers"];
    }

    /*  public function getAllListDevelopers()
        {
            $query = $this->db->query("SELECT u.id as user_id, u.name as full_name, u.username as user_name, u.password as user_password, ur.name as user_role, s.name as user_status, u.created_at as created_at FROM users u, user_roles ur, status s WHERE u.role_id = ur.id AND u.status_id = s.id AND  u.role_id = 2");

                return $query->result_array();
        }
*/

    public function getAllListDevelopers()
    {
        $user = $this->session->userdata('userinfo');
        $session_user_id = $user['session_user_id'];
        $session_role_id = $user['session_role_id'];


        // SQL query

        $primaryKey = 'user_unqique_id';


        $query = "

                    SELECT
                    u.id as user_unqique_id,
                    u.name as full_name,
                    u.username as user_name,
                    u.password as user_password,
                    u.role_id as user_role_id,
                    ur.name as user_role,
                    s.name as user_status,
                    GROUP_CONCAT(st.name) as user_allowed_permissions,
                    DATE(u.created_at) as created_at

                    FROM users u
                    LEFT JOIN user_roles ur ON u.role_id = ur.id
                    LEFT JOIN status s ON u.status_id = s.id
                    LEFT JOIN user_settings us ON u.id = us.user_id
                    LEFT JOIN settings st ON us.setting_id = st.id

                    GROUP BY u.id
                ";

        if ($session_role_id == 1) {

            $where = "

            user_role_id IN(2,3,4)


            ";
        } else if ($session_role_id == 2) {

            $where = "

                    user_role_id IN(4)

                        ";
        } else if ($session_role_id == 3) {

            $where = "

                    user_role_id IN(2,4)

                        ";
        }


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

            $orderby = "ORDER BY user_unqique_id ASC";
        }


        // Concatenate of where and order clause
        $whereAll = $where . $orderby;

        $table = <<<EOT
            (
                $query

            ) temp
            EOT;

        $columns = array(
            array('db' => 'user_unqique_id', 'dt' => "dt00_user_unqique_id"),
            array('db' => 'full_name', 'dt' => "dt0_full_name"),
            array('db' => 'user_name',   'dt' => "dt1_user_name"),
            array('db' => 'user_password',     'dt' => "dt2_user_password"),
            array('db' => 'user_role',     'dt' => "dt3_user_role"),
            array('db' => 'user_allowed_permissions',     'dt' => "dt6_user_allowed_permissions"),
            array('db' => 'user_status',     'dt' => "dt4_user_status"),
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
