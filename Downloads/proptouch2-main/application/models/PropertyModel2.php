<?php

class PropertyModel extends CI_Model
{

    public function __construct()
    {
        $this->load->database();
    }

    public function uploadProperty($data)
    {



        // Printing all the keys and values one by one
        $keys = array_keys($data);
        for ($i = 0; $i < count($data); $i++) {

            foreach ($data[$keys[$i]] as $key => $properties) {
                $sql = 'INSERT INTO properties(

                    project_name,
                    unit_name,
                    display_name,
                    unit_description,
                    address,
                    building_name,
                    blg_latitude,
                    blg_longitude,
                    blg_altitude,
                    blg_rotation,
                    blg_scale,
                    blg_mirror_x,
                    blg_mirror_y,
                    building_section,
                    building_section_html_color,
                    unique_unit_id,
                    floor,
                    orientation,
                    total_number_of_bedrooms,
                    total_number_of_bathrooms,
                    area_m2,
                    area_sqft,
                    price,
                    availability,
                    availability_html_color,
                    for_sale_boolean,
                    for_rent_boolean,
                    private_garden_boolean,
                    full_vastu_boolean,
                    combinable_boolean,
                    service_room_boolean,
                    enclosed_kitchen_boolean,
                    open_kitchen_boolean,
                    home_office_boolean,
                    duplex_boolean,
                    modern_boolean,
                    classic_boolean,
                    url,
                    base_price,
                    adjusted_price,
                    same_units,
                    lowres_floorplans,
                    highres_floorplans,
                    img_building_plan,
                    img_building_plan2,
                    img_interiors,
                    img_360,
                    media,
                    na,
                    indoor_carpet_area_m2_marketing,
                    outdoor_carpet_area_m2_marketing,
                    indoor_carpet_area_sqft_marketing,
                    outdoor_carpet_area_sqft_marketing,
                    entrance_hall_meters_dimensions,
                    living_meters_dimensions,
                    dining_meters_dimensions,
                    kitchen_meters_dimensions,
                    office_library_meters_dimensions,
                    bedroom_no_1_meters_dimensions,
                    master_bedroom_meters_dimensions,
                    bedroom_no_2_meters_dimensions,
                    bedroom_no_3_meters_dimensions,
                    bedroom_no_4_meters_dimensions,
                    bedroom_no_5_meters_dimensions,
                    bedroom_no_6_meters_dimensions,
                    bathroom_no_1_meters_dimensions,
                    master_bathroom_meters_dimensions,
                    bathroom_no_2_meters_dimensions,
                    bathroom_no_3_meters_dimensions,
                    bathroom_no_4_meters_dimensions,
                    bathroom_no_5_meters_dimensions,
                    misc_no_1_meters_dimensions,
                    misc_no_2_meters_dimensions,
                    balcony_no_1_meters_dimensions,
                    balcony_no_2_meters_dimensions,
                    balcony_no_3_meters_dimensions,
                    balcony_no_4_meters_dimensions,
                    balcony_no_5_meters_dimensions,
                    balcony_no_6_meters_dimensions,
                    entrance_hall_feet_dimensions,
                    living_feet_dimensions,
                    dining_feet_dimensions,
                    kitchen_feet_dimensions,
                    office_library_feet_dimensions,
                    bedroom_no_1_feet_dimensions,
                    master_bedroom_feet_dimensions,
                    bedroom_no_2_feet_dimensions,
                    bedroom_no_3_feet_dimensions,
                    bedroom_no_4_feet_dimensions,
                    bedroom_no_5_feet_dimensions,
                    bedroom_no_6_feet_dimensions,
                    bathroom_no_1_feet_dimensions,
                    master_bathroom_feet_dimensions,
                    bathroom_no_2_feet_dimensions,
                    bathroom_no_3_feet_dimensions,
                    bathroom_no_4_feet_dimensions,
                    bathroom_no_5_feet_dimensions,
                    misc_no_1_feet_dimensions,
                    misc_no_2_feet_dimensions,
                    balcony_no_1_feet_dimensions,
                    balcony_no_2_feet_dimensions,
                    balcony_no_3_feet_dimensions,
                    balcony_no_4_feet_dimensions,
                    balcony_no_5_feet_dimensions,
                    balcony_no_6_feet_dimensions,
                    created_at,
                    updated_at
                )


                VALUES(

                    ' . '"' . $properties . '"' . ',
                    ' . '"' . $properties . '"' . ',

                    ' . '"' . $properties['created_at'] . '"' . ',
                    ' . '"' . $properties['updated_at'] . '"' . '

                );';

                $this->db->trans_start();

                $this->db->query($sql);

                $this->db->trans_complete();

                if ($this->db->trans_status() === FALSE) {
                    return 0; //Query Failed
                } else {
                    // do whatever you want to do on query success
                    return 1;
                }
            }
        }




    }
}
