<?php

class RelationshipGroupsHeadingModel extends CI_Model
{

    public function __construct()
    {
        $this->load->database();
    }


    public function deleteRelationshipGroupsHeading($getRelationshipGroupsHeadingId)

    {
        $this->db->trans_start();

        $this->db->where('id', $getRelationshipGroupsHeadingId);

        $this->db->delete('headings_groups_relationship');

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }


    public function addBatcRelationshipGroupsHeading($dataArray, $getGroupId)
    {


        $this->db->trans_start();

        $this->db->where('group_id', $getGroupId);

        $this->db->delete('headings_groups_relationship');

        $this->db->insert_batch('headings_groups_relationship', $dataArray);

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }
}
