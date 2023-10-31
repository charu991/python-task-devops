<?php

class LogModel extends CI_Model
{

        public function __construct()
        {
                $this->load->database();
        }



        public function addLog($data)
        {
                $this->db->trans_start();

                $this->db->insert('logs', $data);

                $this->db->trans_complete();

                if ($this->db->trans_status() === FALSE) {
                        return 0; //Query Failed
                } else {
                        // do whatever you want to do on query success
                        return 1;
                }
        }
}
