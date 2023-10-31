<?php

class PropertyModel extends CI_Model
{

    public function __construct()
    {
        $instance =  $this->load->database();
    }

    public function uploadProperty($data, $user_id)
    {


        $result = json_decode($data);


        // print_r($property_data);


        foreach ($result as $properties) {

            /*   $sqlstatment = 'INSERT INTO properties (

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


               VALUES (

                ' . '"' . $properties->project_name . '"' . ',
                ' . '"' . $properties->unit_name . '"' . ',
                ' . '"' . $properties->display_name . '"' . ',
                ' . '"' . $properties->unit_description . '"' . ',
                ' . '"' . $properties->address . '"' . ',
                ' . '"' . $properties->building_name . '"' . ',
                ' . '"' . $properties->blg_latitude . '"' . ',
                ' . '"' . $properties->blg_longitude . '"' . ',
                ' . '"' . $properties->blg_altitude . '"' . ',
                ' . '"' . $properties->blg_rotation . '"' . ',
                ' . '"' . $properties->blg_scale . '"' . ',
                ' . '"' . $properties->blg_mirror_x . '"' . ',
                ' . '"' . $properties->blg_mirror_y . '"' . ',
                ' . '"' . $properties->building_section . '"' . ',
                ' . '"' . $properties->building_section_html_color . '"' . ',
                ' . '"' . $properties->unique_unit_id . '"' . ',
                ' . '"' . $properties->floor . '"' . ',
                ' . '"' . $properties->orientation . '"' . ',
                ' . '"' . $properties->total_number_of_bedrooms . '"' . ',
                ' . '"' . $properties->total_number_of_bathrooms . '"' . ',
                ' . '"' . $properties->area_m2 . '"' . ',
                ' . '"' . $properties->area_sqft . '"' . ',
                ' . '"' . $properties->price . '"' . ',
                ' . '"' . $properties->availability . '"' . ',
                ' . '"' . $properties->availability_html_color . '"' . ',
                ' . '"' . $properties->for_sale_boolean . '"' . ',
                ' . '"' . $properties->for_rent_boolean . '"' . ',
                ' . '"' . $properties->private_garden_boolean . '"' . ',
                ' . '"' . $properties->full_vastu_boolean . '"' . ',
                ' . '"' . $properties->combinable_boolean . '"' . ',
                ' . '"' . $properties->service_room_boolean . '"' . ',
                ' . '"' . $properties->enclosed_kitchen_boolean . '"' . ',
                ' . '"' . $properties->open_kitchen_boolean . '"' . ',
                ' . '"' . $properties->home_office_boolean . '"' . ',
                ' . '"' . $properties->duplex_boolean . '"' . ',
                ' . '"' . $properties->modern_boolean . '"' . ',
                ' . '"' . $properties->classic_boolean . '"' . ',
                ' . '"' . $properties->url . '"' . ',
                ' . '"' . $properties->base_price . '"' . ',
                ' . '"' . $properties->adjusted_price . '"' . ',
                ' . '"' . $properties->same_units . '"' . ',
                ' . '"' . $properties->lowres_floorplans . '"' . ',
                ' . '"' . $properties->highres_floorplans . '"' . ',
                ' . '"' . $properties->img_building_plan . '"' . ',
                ' . '"' . $properties->img_building_plan2 . '"' . ',
                ' . '"' . $properties->img_interiors . '"' . ',
                ' . '"' . $properties->img_360 . '"' . ',
                ' . '"' . $properties->media . '"' . ',
                ' . '"' . $properties->na . '"' . ',
                ' . '"' . $properties->indoor_carpet_area_m2_marketing . '"' . ',
                ' . '"' . $properties->outdoor_carpet_area_m2_marketing . '"' . ',
                ' . '"' . $properties->indoor_carpet_area_sqft_marketing . '"' . ',
                ' . '"' . $properties->outdoor_carpet_area_sqft_marketing . '"' . ',
                ' . '"' . $properties->entrance_hall_meters_dimensions . '"' . ',
                ' . '"' . $properties->living_meters_dimensions . '"' . ',
                ' . '"' . $properties->dining_meters_dimensions . '"' . ',
                ' . '"' . $properties->kitchen_meters_dimensions . '"' . ',
                ' . '"' . $properties->office_library_meters_dimensions . '"' . ',
                ' . '"' . $properties->bedroom_no_1_meters_dimensions . '"' . ',
                ' . '"' . $properties->master_bedroom_meters_dimensions . '"' . ',
                ' . '"' . $properties->bedroom_no_2_meters_dimensions . '"' . ',
                ' . '"' . $properties->bedroom_no_3_meters_dimensions . '"' . ',
                ' . '"' . $properties->bedroom_no_4_meters_dimensions . '"' . ',
                ' . '"' . $properties->bedroom_no_5_meters_dimensions . '"' . ',
                ' . '"' . $properties->bedroom_no_6_meters_dimensions . '"' . ',
                ' . '"' . $properties->bathroom_no_1_meters_dimensions . '"' . ',
                ' . '"' . $properties->master_bathroom_meters_dimensions . '"' . ',
                ' . '"' . $properties->bathroom_no_2_meters_dimensions . '"' . ',
                ' . '"' . $properties->bathroom_no_3_meters_dimensions . '"' . ',
                ' . '"' . $properties->bathroom_no_4_meters_dimensions . '"' . ',
                ' . '"' . $properties->bathroom_no_5_meters_dimensions . '"' . ',
                ' . '"' . $properties->misc_no_1_meters_dimensions . '"' . ',
                ' . '"' . $properties->misc_no_2_meters_dimensions . '"' . ',
                ' . '"' . $properties->balcony_no_1_meters_dimensions . '"' . ',
                ' . '"' . $properties->balcony_no_2_meters_dimensions . '"' . ',
                ' . '"' . $properties->balcony_no_3_meters_dimensions . '"' . ',
                ' . '"' . $properties->balcony_no_4_meters_dimensions . '"' . ',
                ' . '"' . $properties->balcony_no_5_meters_dimensions . '"' . ',
                ' . '"' . $properties->balcony_no_6_meters_dimensions . '"' . ',
                ' . '"' . $properties->entrance_hall_feet_dimensions . '"' . ',
                ' . '"' . $properties->living_feet_dimensions . '"' . ',
                ' . '"' . $properties->dining_feet_dimensions . '"' . ',
                ' . '"' . $properties->kitchen_feet_dimensions . '"' . ',
                ' . '"' . $properties->office_library_feet_dimensions . '"' . ',
                ' . '"' . $properties->bedroom_no_1_feet_dimensions . '"' . ',
                ' . '"' . $properties->master_bedroom_feet_dimensions . '"' . ',
                ' . '"' . $properties->bedroom_no_2_feet_dimensions . '"' . ',
                ' . '"' . $properties->bedroom_no_3_feet_dimensions . '"' . ',
                ' . '"' . $properties->bedroom_no_4_feet_dimensions . '"' . ',
                ' . '"' . $properties->bedroom_no_5_feet_dimensions . '"' . ',
                ' . '"' . $properties->bedroom_no_6_feet_dimensions . '"' . ',
                ' . '"' . $properties->bathroom_no_1_feet_dimensions . '"' . ',
                ' . '"' . $properties->master_bathroom_feet_dimensions . '"' . ',
                ' . '"' . $properties->bathroom_no_2_feet_dimensions . '"' . ',
                ' . '"' . $properties->bathroom_no_3_feet_dimensions . '"' . ',
                ' . '"' . $properties->bathroom_no_4_feet_dimensions . '"' . ',
                ' . '"' . $properties->bathroom_no_5_feet_dimensions . '"' . ',
                ' . '"' . $properties->misc_no_1_feet_dimensions . '"' . ',
                ' . '"' . $properties->misc_no_2_feet_dimensions . '"' . ',
                ' . '"' . $properties->balcony_no_1_feet_dimensions . '"' . ',
                ' . '"' . $properties->balcony_no_2_feet_dimensions . '"' . ',
                ' . '"' . $properties->balcony_no_3_feet_dimensions . '"' . ',
                ' . '"' . $properties->balcony_no_4_feet_dimensions . '"' . ',
                ' . '"' . $properties->balcony_no_5_feet_dimensions . '"' . ',
                ' . '"' . $properties->balcony_no_6_feet_dimensions . '"' . ',
                ' . '"' . $properties->created_at . '"' . ',
                ' . '"' . $properties->updated_at . '"' . '

               );';


            // echo $sqlstatment;


*/

            // for insert
            $property_data_array = array(


                "project_name" => $properties->project_name,
                "filter_by_unit" => $properties->filter_by_unit,
                "unit_name" => $properties->unit_name,
                "display_name" => $properties->display_name,
                "unit_description" => $properties->unit_description,
                "unique_unit_id" => $properties->unique_unit_id,
                "space_usage" => $properties->space_usage,
                "address" => $properties->address,
                "building_name" => $properties->building_name,
                "building_use" => $properties->building_use,
                "blg_latitude" => $properties->blg_latitude,
                "blg_longitude" => $properties->blg_longitude,
                "blg_altitude" => $properties->blg_altitude,
                "blg_rotation" => $properties->blg_rotation,
                "blg_scale" => $properties->blg_scale,
                "blg_mirror_x" => $properties->blg_mirror_x,
                "blg_mirror_y" => $properties->blg_mirror_y,
                "plot_area" => $properties->plot_area,
                "plot_fsi" => $properties->plot_fsi,
                "plot_coverage_ratio" => $properties->plot_coverage_ratio,
                "plot_maximum_height" => $properties->plot_maximum_height,
                "front_setback" => $properties->front_setback,
                "lateral_setbacks" => $properties->lateral_setbacks,
                "building_height_stories" => $properties->building_height_stories,
                "year_built_renovated" => $properties->year_built_renovated,
                "building_size_m2" => $properties->building_size_m2,
                "building_size_sqft" => $properties->building_size_sqft,
                "typical_floor_size_m2" => $properties->typical_floor_size_m2,
                "typical_floor_size_sqft" => $properties->typical_floor_size_sqft,
                "green_certification" => $properties->green_certification,
                "well_certification" => $properties->well_certification,
                "energy_certification" => $properties->energy_certification,
                "building_grade" => $properties->building_grade,
                "building_section" => $properties->building_section,
                "building_section_html_color" => $properties->building_section_html_color,
                "floor" => $properties->floor,
                "floor_efficiency" => $properties->floor_efficiency,
                "orientation" => $properties->orientation,
                "total_number_of_bedrooms" => $properties->total_number_of_bedrooms,
                "total_number_of_bathrooms" => $properties->total_number_of_bathrooms,
                "area_m2" => $properties->area_m2,
                "area_sqft" => $properties->area_sqft,
                "price" => $properties->price,
                "price_per_area" => $properties->price_per_area,
                "base_price" => $properties->base_price,
                "adjusted_price" => $properties->adjusted_price,
                "availability" => $properties->availability,
                "availability_html_color" => $properties->availability_html_color,
                "availability_date" => $properties->availability_date,
                "condition" => $properties->condition,
                "term_length" => $properties->term_length,
                "term_structure" => $properties->term_structure,
                "minimum_capacity" => $properties->minimum_capacity,
                "maximum_capacity" => $properties->maximum_capacity,
                "for_sale_boolean" => $properties->for_sale_boolean,
                "for_rent_boolean" => $properties->for_rent_boolean,
                "private_garden_boolean" => $properties->private_garden_boolean,
                "full_vastu_boolean" => $properties->full_vastu_boolean,
                "combinable_boolean" => $properties->combinable_boolean,
                "divisible_boolean" => $properties->divisible_boolean,
                "service_room_boolean" => $properties->service_room_boolean,
                "enclosed_kitchen_boolean" => $properties->enclosed_kitchen_boolean,
                "open_kitchen_boolean" => $properties->open_kitchen_boolean,
                "home_office_boolean" => $properties->home_office_boolean,
                "duplex_boolean" => $properties->duplex_boolean,
                "furnished_boolean" => $properties->furnished_boolean,
                "corner_frontage_boolean" => $properties->corner_frontage_boolean,
                "exterior_boolean" => $properties->exterior_boolean,
                "raised_flooring_boolean" => $properties->raised_flooring_boolean,
                "n_or_e_entrance_boolean" => $properties->n_or_e_entrance_boolean,
                "modern_boolean" => $properties->modern_boolean,
                "classic_boolean" => $properties->classic_boolean,
                "url" => $properties->url,
                "same_units" => $properties->same_units,
                "lowres_floorplans" => $properties->lowres_floorplans,
                "highres_floorplans" => $properties->highres_floorplans,
                "img_building_plan" => $properties->img_building_plan,
                "img_building_plan2" => $properties->img_building_plan2,
                "img_interiors" => $properties->img_interiors,
                "img_360" => $properties->img_360,
                "img_outside_views" => $properties->img_outside_views,
                "media" => $properties->media,
                "na" => $properties->na,
                "indoor_carpet_area_m2_marketing" => $properties->indoor_carpet_area_m2_marketing,
                "outdoor_carpet_area_m2_marketing" => $properties->outdoor_carpet_area_m2_marketing,
                "indoor_carpet_area_sqft_marketing" => $properties->indoor_carpet_area_sqft_marketing,
                "outdoor_carpet_area_sqft_marketing" => $properties->outdoor_carpet_area_sqft_marketing,
                "clear_height_meters" => $properties->clear_height_meters,
                "clear_height_feet" => $properties->clear_height_feet,
                "floor_to_slab_height_meters" => $properties->floor_to_slab_height_meters,
                "floor_to_slab_height_feet" => $properties->floor_to_slab_height_feet,
                "street_frontage_meters" => $properties->street_frontage_meters,
                "street_frontage_feet" => $properties->street_frontage_feet,
                "indoor_storefront_meters" => $properties->indoor_storefront_meters,
                "indoor_storefront_feet" => $properties->indoor_storefront_feet,
                "average_depth_meters" => $properties->average_depth_meters,
                "average_depth_feet" => $properties->average_depth_feet,
                "column_grid_meters_dimensions" => $properties->column_grid_meters_dimensions,
                "column_grid_feet_dimensions" => $properties->column_grid_feet_dimensions,
                "core_to_facade_meters_dimensions" => $properties->core_to_facade_meters_dimensions,
                "core_to_facade_feet_dimensions" => $properties->core_to_facade_feet_dimensions,
                "window_to_midpoint_meters_dimensions" => $properties->window_to_midpoint_meters_dimensions,
                "window_to_midpoint_feet_dimensions" => $properties->window_to_midpoint_feet_dimensions,
                "entrance_hall_meters_dimensions" => $properties->entrance_hall_meters_dimensions,
                "living_meters_dimensions" => $properties->living_meters_dimensions,
                "dining_meters_dimensions" => $properties->dining_meters_dimensions,
                "kitchen_meters_dimensions" => $properties->kitchen_meters_dimensions,
                "office_library_meters_dimensions" => $properties->office_library_meters_dimensions,
                "bedroom_total_number_of_1_meters_dimensions" => $properties->bedroom_total_number_of_1_meters_dimensions,
                "master_bedroom_meters_dimensions" => $properties->master_bedroom_meters_dimensions,
                "bedroom_total_number_of_2_meters_dimensions" => $properties->bedroom_total_number_of_2_meters_dimensions,
                "bedroom_total_number_of_3_meters_dimensions" => $properties->bedroom_total_number_of_3_meters_dimensions,
                "bedroom_total_number_of_4_meters_dimensions" => $properties->bedroom_total_number_of_4_meters_dimensions,
                "bedroom_total_number_of_5_meters_dimensions" => $properties->bedroom_total_number_of_5_meters_dimensions,
                "bedroom_total_number_of_6_meters_dimensions" => $properties->bedroom_total_number_of_6_meters_dimensions,
                "bathroom_total_number_of_1_meters_dimensions" => $properties->bathroom_total_number_of_1_meters_dimensions,
                "master_bathroom_meters_dimensions" => $properties->master_bathroom_meters_dimensions,
                "bathroom_total_number_of_2_meters_dimensions" => $properties->bathroom_total_number_of_2_meters_dimensions,
                "bathroom_total_number_of_3_meters_dimensions" => $properties->bathroom_total_number_of_3_meters_dimensions,
                "bathroom_total_number_of_4_meters_dimensions" => $properties->bathroom_total_number_of_4_meters_dimensions,
                "bathroom_total_number_of_5_meters_dimensions" => $properties->bathroom_total_number_of_5_meters_dimensions,
                "misc_total_number_of_1_meters_dimensions" => $properties->misc_total_number_of_1_meters_dimensions,
                "misc_total_number_of_2_meters_dimensions" => $properties->misc_total_number_of_2_meters_dimensions,
                "balcony_total_number_of_1_meters_dimensions" => $properties->balcony_total_number_of_1_meters_dimensions,
                "balcony_total_number_of_2_meters_dimensions" => $properties->balcony_total_number_of_2_meters_dimensions,
                "balcony_total_number_of_3_meters_dimensions" => $properties->balcony_total_number_of_3_meters_dimensions,
                "balcony_total_number_of_4_meters_dimensions" => $properties->balcony_total_number_of_4_meters_dimensions,
                "balcony_total_number_of_5_meters_dimensions" => $properties->balcony_total_number_of_5_meters_dimensions,
                "balcony_total_number_of_6_meters_dimensions" => $properties->balcony_total_number_of_6_meters_dimensions,
                "entrance_hall_feet_dimensions" => $properties->entrance_hall_feet_dimensions,
                "living_feet_dimensions" => $properties->living_feet_dimensions,
                "dining_feet_dimensions" => $properties->dining_feet_dimensions,
                "kitchen_feet_dimensions" => $properties->kitchen_feet_dimensions,
                "office_library_feet_dimensions" => $properties->office_library_feet_dimensions,
                "bedroom_total_number_of_1_feet_dimensions" => $properties->bedroom_total_number_of_1_feet_dimensions,
                "master_bedroom_feet_dimensions" => $properties->master_bedroom_feet_dimensions,
                "bedroom_total_number_of_2_feet_dimensions" => $properties->bedroom_total_number_of_2_feet_dimensions,
                "bedroom_total_number_of_3_feet_dimensions" => $properties->bedroom_total_number_of_3_feet_dimensions,
                "bedroom_total_number_of_4_feet_dimensions" => $properties->bedroom_total_number_of_4_feet_dimensions,
                "bedroom_total_number_of_5_feet_dimensions" => $properties->bedroom_total_number_of_5_feet_dimensions,
                "bedroom_total_number_of_6_feet_dimensions" => $properties->bedroom_total_number_of_6_feet_dimensions,
                "bathroom_total_number_of_1_feet_dimensions" => $properties->bathroom_total_number_of_1_feet_dimensions,
                "master_bathroom_feet_dimensions" => $properties->master_bathroom_feet_dimensions,
                "bathroom_total_number_of_2_feet_dimensions" => $properties->bathroom_total_number_of_2_feet_dimensions,
                "bathroom_total_number_of_3_feet_dimensions" => $properties->bathroom_total_number_of_3_feet_dimensions,
                "bathroom_total_number_of_4_feet_dimensions" => $properties->bathroom_total_number_of_4_feet_dimensions,
                "bathroom_total_number_of_5_feet_dimensions" => $properties->bathroom_total_number_of_5_feet_dimensions,
                "misc_total_number_of_1_feet_dimensions" => $properties->misc_total_number_of_1_feet_dimensions,
                "misc_total_number_of_2_feet_dimensions" => $properties->misc_total_number_of_2_feet_dimensions,
                "balcony_total_number_of_1_feet_dimensions" => $properties->balcony_total_number_of_1_feet_dimensions,
                "balcony_total_number_of_2_feet_dimensions" => $properties->balcony_total_number_of_2_feet_dimensions,
                "balcony_total_number_of_3_feet_dimensions" => $properties->balcony_total_number_of_3_feet_dimensions,
                "balcony_total_number_of_4_feet_dimensions" => $properties->balcony_total_number_of_4_feet_dimensions,
                "balcony_total_number_of_5_feet_dimensions" => $properties->balcony_total_number_of_5_feet_dimensions,
                "balcony_total_number_of_6_feet_dimensions" => $properties->balcony_total_number_of_6_feet_dimensions,
                "on_site_covered_car_parks" => $properties->on_site_covered_car_parks,
                "on_site_covered_2_wheelers" => $properties->on_site_covered_2_wheelers,
                "on_site_uncovered_car_parks" => $properties->on_site_uncovered_car_parks,
                "on_site_uncovered_2_wheelers" => $properties->on_site_uncovered_2_wheelers,
                "neighbor_unit_horizontal" => $properties->neighbor_unit_horizontal,
                "neighbor_unit_vertical" => $properties->neighbor_unit_vertical,
                "average_daytime_vehicular_traffic" => $properties->average_daytime_vehicular_traffic,
                "average_daytime_pedestrian_traffic" => $properties->average_daytime_pedestrian_traffic,
                "occupant_information" => $properties->occupant_information,




                'status_id' => $properties->status_id,
                'created_at' => $properties->created_at,
                'updated_at' => $properties->updated_at
            );


            // for update
            $property_data_array_for_update = array(

                "filter_by_unit" => $properties->filter_by_unit,
                "display_name" => $properties->display_name,
                "unit_description" => $properties->unit_description,
                "unique_unit_id" => $properties->unique_unit_id,
                "space_usage" => $properties->space_usage,
                "address" => $properties->address,
                "building_name" => $properties->building_name,
                "building_use" => $properties->building_use,
                "blg_latitude" => $properties->blg_latitude,
                "blg_longitude" => $properties->blg_longitude,
                "blg_altitude" => $properties->blg_altitude,
                "blg_rotation" => $properties->blg_rotation,
                "blg_scale" => $properties->blg_scale,
                "blg_mirror_x" => $properties->blg_mirror_x,
                "blg_mirror_y" => $properties->blg_mirror_y,
                "plot_area" => $properties->plot_area,
                "plot_fsi" => $properties->plot_fsi,
                "plot_coverage_ratio" => $properties->plot_coverage_ratio,
                "plot_maximum_height" => $properties->plot_maximum_height,
                "front_setback" => $properties->front_setback,
                "lateral_setbacks" => $properties->lateral_setbacks,
                "building_height_stories" => $properties->building_height_stories,
                "year_built_renovated" => $properties->year_built_renovated,
                "building_size_m2" => $properties->building_size_m2,
                "building_size_sqft" => $properties->building_size_sqft,
                "typical_floor_size_m2" => $properties->typical_floor_size_m2,
                "typical_floor_size_sqft" => $properties->typical_floor_size_sqft,
                "green_certification" => $properties->green_certification,
                "well_certification" => $properties->well_certification,
                "energy_certification" => $properties->energy_certification,
                "building_grade" => $properties->building_grade,
                "building_section" => $properties->building_section,
                "building_section_html_color" => $properties->building_section_html_color,
                "floor" => $properties->floor,
                "floor_efficiency" => $properties->floor_efficiency,
                "orientation" => $properties->orientation,
                "total_number_of_bedrooms" => $properties->total_number_of_bedrooms,
                "total_number_of_bathrooms" => $properties->total_number_of_bathrooms,
                "area_m2" => $properties->area_m2,
                "area_sqft" => $properties->area_sqft,
                "price" => $properties->price,
                "price_per_area" => $properties->price_per_area,
                "base_price" => $properties->base_price,
                "adjusted_price" => $properties->adjusted_price,
                "availability" => $properties->availability,
                "availability_html_color" => $properties->availability_html_color,
                "availability_date" => $properties->availability_date,
                "condition" => $properties->condition,
                "term_length" => $properties->term_length,
                "term_structure" => $properties->term_structure,
                "minimum_capacity" => $properties->minimum_capacity,
                "maximum_capacity" => $properties->maximum_capacity,
                "for_sale_boolean" => $properties->for_sale_boolean,
                "for_rent_boolean" => $properties->for_rent_boolean,
                "private_garden_boolean" => $properties->private_garden_boolean,
                "full_vastu_boolean" => $properties->full_vastu_boolean,
                "combinable_boolean" => $properties->combinable_boolean,
                "divisible_boolean" => $properties->divisible_boolean,
                "service_room_boolean" => $properties->service_room_boolean,
                "enclosed_kitchen_boolean" => $properties->enclosed_kitchen_boolean,
                "open_kitchen_boolean" => $properties->open_kitchen_boolean,
                "home_office_boolean" => $properties->home_office_boolean,
                "duplex_boolean" => $properties->duplex_boolean,
                "furnished_boolean" => $properties->furnished_boolean,
                "corner_frontage_boolean" => $properties->corner_frontage_boolean,
                "exterior_boolean" => $properties->exterior_boolean,
                "raised_flooring_boolean" => $properties->raised_flooring_boolean,
                "n_or_e_entrance_boolean" => $properties->n_or_e_entrance_boolean,
                "modern_boolean" => $properties->modern_boolean,
                "classic_boolean" => $properties->classic_boolean,
                "url" => $properties->url,
                "same_units" => $properties->same_units,
                "lowres_floorplans" => $properties->lowres_floorplans,
                "highres_floorplans" => $properties->highres_floorplans,
                "img_building_plan" => $properties->img_building_plan,
                "img_building_plan2" => $properties->img_building_plan2,
                "img_interiors" => $properties->img_interiors,
                "img_360" => $properties->img_360,
                "img_outside_views" => $properties->img_outside_views,
                "media" => $properties->media,
                "na" => $properties->na,
                "indoor_carpet_area_m2_marketing" => $properties->indoor_carpet_area_m2_marketing,
                "outdoor_carpet_area_m2_marketing" => $properties->outdoor_carpet_area_m2_marketing,
                "indoor_carpet_area_sqft_marketing" => $properties->indoor_carpet_area_sqft_marketing,
                "outdoor_carpet_area_sqft_marketing" => $properties->outdoor_carpet_area_sqft_marketing,
                "clear_height_meters" => $properties->clear_height_meters,
                "clear_height_feet" => $properties->clear_height_feet,
                "floor_to_slab_height_meters" => $properties->floor_to_slab_height_meters,
                "floor_to_slab_height_feet" => $properties->floor_to_slab_height_feet,
                "street_frontage_meters" => $properties->street_frontage_meters,
                "street_frontage_feet" => $properties->street_frontage_feet,
                "indoor_storefront_meters" => $properties->indoor_storefront_meters,
                "indoor_storefront_feet" => $properties->indoor_storefront_feet,
                "average_depth_meters" => $properties->average_depth_meters,
                "average_depth_feet" => $properties->average_depth_feet,
                "column_grid_meters_dimensions" => $properties->column_grid_meters_dimensions,
                "column_grid_feet_dimensions" => $properties->column_grid_feet_dimensions,
                "core_to_facade_meters_dimensions" => $properties->core_to_facade_meters_dimensions,
                "core_to_facade_feet_dimensions" => $properties->core_to_facade_feet_dimensions,
                "window_to_midpoint_meters_dimensions" => $properties->window_to_midpoint_meters_dimensions,
                "window_to_midpoint_feet_dimensions" => $properties->window_to_midpoint_feet_dimensions,
                "entrance_hall_meters_dimensions" => $properties->entrance_hall_meters_dimensions,
                "living_meters_dimensions" => $properties->living_meters_dimensions,
                "dining_meters_dimensions" => $properties->dining_meters_dimensions,
                "kitchen_meters_dimensions" => $properties->kitchen_meters_dimensions,
                "office_library_meters_dimensions" => $properties->office_library_meters_dimensions,
                "bedroom_total_number_of_1_meters_dimensions" => $properties->bedroom_total_number_of_1_meters_dimensions,
                "master_bedroom_meters_dimensions" => $properties->master_bedroom_meters_dimensions,
                "bedroom_total_number_of_2_meters_dimensions" => $properties->bedroom_total_number_of_2_meters_dimensions,
                "bedroom_total_number_of_3_meters_dimensions" => $properties->bedroom_total_number_of_3_meters_dimensions,
                "bedroom_total_number_of_4_meters_dimensions" => $properties->bedroom_total_number_of_4_meters_dimensions,
                "bedroom_total_number_of_5_meters_dimensions" => $properties->bedroom_total_number_of_5_meters_dimensions,
                "bedroom_total_number_of_6_meters_dimensions" => $properties->bedroom_total_number_of_6_meters_dimensions,
                "bathroom_total_number_of_1_meters_dimensions" => $properties->bathroom_total_number_of_1_meters_dimensions,
                "master_bathroom_meters_dimensions" => $properties->master_bathroom_meters_dimensions,
                "bathroom_total_number_of_2_meters_dimensions" => $properties->bathroom_total_number_of_2_meters_dimensions,
                "bathroom_total_number_of_3_meters_dimensions" => $properties->bathroom_total_number_of_3_meters_dimensions,
                "bathroom_total_number_of_4_meters_dimensions" => $properties->bathroom_total_number_of_4_meters_dimensions,
                "bathroom_total_number_of_5_meters_dimensions" => $properties->bathroom_total_number_of_5_meters_dimensions,
                "misc_total_number_of_1_meters_dimensions" => $properties->misc_total_number_of_1_meters_dimensions,
                "misc_total_number_of_2_meters_dimensions" => $properties->misc_total_number_of_2_meters_dimensions,
                "balcony_total_number_of_1_meters_dimensions" => $properties->balcony_total_number_of_1_meters_dimensions,
                "balcony_total_number_of_2_meters_dimensions" => $properties->balcony_total_number_of_2_meters_dimensions,
                "balcony_total_number_of_3_meters_dimensions" => $properties->balcony_total_number_of_3_meters_dimensions,
                "balcony_total_number_of_4_meters_dimensions" => $properties->balcony_total_number_of_4_meters_dimensions,
                "balcony_total_number_of_5_meters_dimensions" => $properties->balcony_total_number_of_5_meters_dimensions,
                "balcony_total_number_of_6_meters_dimensions" => $properties->balcony_total_number_of_6_meters_dimensions,
                "entrance_hall_feet_dimensions" => $properties->entrance_hall_feet_dimensions,
                "living_feet_dimensions" => $properties->living_feet_dimensions,
                "dining_feet_dimensions" => $properties->dining_feet_dimensions,
                "kitchen_feet_dimensions" => $properties->kitchen_feet_dimensions,
                "office_library_feet_dimensions" => $properties->office_library_feet_dimensions,
                "bedroom_total_number_of_1_feet_dimensions" => $properties->bedroom_total_number_of_1_feet_dimensions,
                "master_bedroom_feet_dimensions" => $properties->master_bedroom_feet_dimensions,
                "bedroom_total_number_of_2_feet_dimensions" => $properties->bedroom_total_number_of_2_feet_dimensions,
                "bedroom_total_number_of_3_feet_dimensions" => $properties->bedroom_total_number_of_3_feet_dimensions,
                "bedroom_total_number_of_4_feet_dimensions" => $properties->bedroom_total_number_of_4_feet_dimensions,
                "bedroom_total_number_of_5_feet_dimensions" => $properties->bedroom_total_number_of_5_feet_dimensions,
                "bedroom_total_number_of_6_feet_dimensions" => $properties->bedroom_total_number_of_6_feet_dimensions,
                "bathroom_total_number_of_1_feet_dimensions" => $properties->bathroom_total_number_of_1_feet_dimensions,
                "master_bathroom_feet_dimensions" => $properties->master_bathroom_feet_dimensions,
                "bathroom_total_number_of_2_feet_dimensions" => $properties->bathroom_total_number_of_2_feet_dimensions,
                "bathroom_total_number_of_3_feet_dimensions" => $properties->bathroom_total_number_of_3_feet_dimensions,
                "bathroom_total_number_of_4_feet_dimensions" => $properties->bathroom_total_number_of_4_feet_dimensions,
                "bathroom_total_number_of_5_feet_dimensions" => $properties->bathroom_total_number_of_5_feet_dimensions,
                "misc_total_number_of_1_feet_dimensions" => $properties->misc_total_number_of_1_feet_dimensions,
                "misc_total_number_of_2_feet_dimensions" => $properties->misc_total_number_of_2_feet_dimensions,
                "balcony_total_number_of_1_feet_dimensions" => $properties->balcony_total_number_of_1_feet_dimensions,
                "balcony_total_number_of_2_feet_dimensions" => $properties->balcony_total_number_of_2_feet_dimensions,
                "balcony_total_number_of_3_feet_dimensions" => $properties->balcony_total_number_of_3_feet_dimensions,
                "balcony_total_number_of_4_feet_dimensions" => $properties->balcony_total_number_of_4_feet_dimensions,
                "balcony_total_number_of_5_feet_dimensions" => $properties->balcony_total_number_of_5_feet_dimensions,
                "balcony_total_number_of_6_feet_dimensions" => $properties->balcony_total_number_of_6_feet_dimensions,
                "on_site_covered_car_parks" => $properties->on_site_covered_car_parks,
                "on_site_covered_2_wheelers" => $properties->on_site_covered_2_wheelers,
                "on_site_uncovered_car_parks" => $properties->on_site_uncovered_car_parks,
                "on_site_uncovered_2_wheelers" => $properties->on_site_uncovered_2_wheelers,
                "neighbor_unit_horizontal" => $properties->neighbor_unit_horizontal,
                "neighbor_unit_vertical" => $properties->neighbor_unit_vertical,
                "average_daytime_vehicular_traffic" => $properties->average_daytime_vehicular_traffic,
                "average_daytime_pedestrian_traffic" => $properties->average_daytime_pedestrian_traffic,
                "occupant_information" => $properties->occupant_information,

                'updated_at' => $properties->updated_at
            );

            $result = $this->db->query("SELECT p.id as property_unqique_id
                          FROM properties p
                          LEFT JOIN properties_developers_relationship pdr ON p.id = pdr.property_id
                          WHERE (p.project_name ='" . $property_data_array["project_name"] . "' )
                          AND (p.unit_name ='" . $property_data_array["unit_name"] . "' )
                          AND (pdr.user_id ='$user_id' )

                          ");



            if ($result->num_rows() > 0) {

                $rows = $result->row();

                $property_unqique_id = $rows->property_unqique_id;

                $this->db->trans_start();

                $this->db->update('properties', $property_data_array_for_update, "id = " . $property_unqique_id);

                $this->db->trans_complete();
            } else {


                $this->db->trans_start();

                //  $result = $this->db->query($sqlstatment);

                $this->db->insert("properties", $property_data_array);

                $lastRowId = $this->db->insert_id();

                $properties_developers_relationship = array(
                    'property_id' => $lastRowId,
                    'user_id' => $user_id
                );


                $this->db->insert("properties_developers_relationship", $properties_developers_relationship);

                $this->db->trans_complete();
            }
        }


        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }

    public function getAllListProperties()
    {
        $user = $this->session->userdata('userinfo');

        $session_user_id = $user['session_user_id'];
        $session_role_id = $user['session_role_id'];


        $start = intval($_POST['start']);
        $length = intval($_POST['length']);

        $sqlstatment_getTotalRecords = " SELECT * FROM properties p ";

        $sqlstatment_getFilteredRecords = "";
        $sqlstatment_getFilteredLimitRecords = "";


        $query = "

        SELECT
        p.id as property_unqique_id,
        u.name as property_developer_name,
        p.project_name as property_project_name,
        p.filter_by_unit as property_filter_by_unit,
        p.unit_name as property_unit_name,
        p.display_name as property_display_name,
        p.unit_description as property_unit_description,
        p.unique_unit_id as property_unique_unit_id,
        p.space_usage as property_space_usage,
        p.address as property_address,
        p.building_name as property_building_name,
        p.building_use as property_building_use,
        p.blg_latitude as property_blg_latitude,
        p.blg_longitude as property_blg_longitude,
        p.blg_altitude as property_blg_altitude,
        p.blg_rotation as property_blg_rotation,
        p.blg_scale as property_blg_scale,
        p.blg_mirror_x as property_blg_mirror_x,
        p.blg_mirror_y as property_blg_mirror_y,
        p.plot_area as property_plot_area,
        p.plot_fsi as property_plot_fsi,
        p.plot_coverage_ratio as property_plot_coverage_ratio,
        p.plot_maximum_height as property_plot_maximum_height,
        p.front_setback as property_front_setback,
        p.lateral_setbacks as property_lateral_setbacks,
        p.building_height_stories as property_building_height_stories,
        p.year_built_renovated as property_year_built_renovated,
        p.building_size_m2 as property_building_size_m2,
        p.building_size_sqft as property_building_size_sqft,
        p.typical_floor_size_m2 as property_typical_floor_size_m2,
        p.typical_floor_size_sqft as property_typical_floor_size_sqft,
        p.green_certification as property_green_certification,
        p.well_certification as property_well_certification,
        p.energy_certification as property_energy_certification,
        p.building_grade as property_building_grade,
        p.building_section as property_building_section,
        p.building_section_html_color as property_building_section_html_color,
        p.floor as property_floor,
        p.floor_efficiency as property_floor_efficiency,
        p.orientation as property_orientation,
        p.total_number_of_bedrooms as property_total_number_of_bedrooms,
        p.total_number_of_bathrooms as property_total_number_of_bathrooms,
        p.area_m2 as property_area_m2,
        p.area_sqft as property_area_sqft,
        p.price as property_price,
        p.price_per_area as property_price_per_area,
        p.base_price as property_base_price,
        p.adjusted_price as property_adjusted_price,
        p.availability as property_availability,
        p.availability_html_color as property_availability_html_color,
        p.availability_date as property_availability_date,
        p.condition as property_condition,
        p.term_length as property_term_length,
        p.term_structure as property_term_structure,
        p.minimum_capacity as property_minimum_capacity,
        p.maximum_capacity as property_maximum_capacity,
        p.for_sale_boolean as property_for_sale_boolean,
        p.for_rent_boolean as property_for_rent_boolean,
        p.private_garden_boolean as property_private_garden_boolean,
        p.full_vastu_boolean as property_full_vastu_boolean,
        p.combinable_boolean as property_combinable_boolean,
        p.divisible_boolean as property_divisible_boolean,
        p.service_room_boolean as property_service_room_boolean,
        p.enclosed_kitchen_boolean as property_enclosed_kitchen_boolean,
        p.open_kitchen_boolean as property_open_kitchen_boolean,
        p.home_office_boolean as property_home_office_boolean,
        p.duplex_boolean as property_duplex_boolean,
        p.furnished_boolean as property_furnished_boolean,
        p.corner_frontage_boolean as property_corner_frontage_boolean,
        p.exterior_boolean as property_exterior_boolean,
        p.raised_flooring_boolean as property_raised_flooring_boolean,
        p.n_or_e_entrance_boolean as property_n_or_e_entrance_boolean,
        p.modern_boolean as property_modern_boolean,
        p.classic_boolean as property_classic_boolean,
        p.url as property_url,
        p.same_units as property_same_units,
        p.lowres_floorplans as property_lowres_floorplans,
        p.highres_floorplans as property_highres_floorplans,
        p.img_building_plan as property_img_building_plan,
        p.img_building_plan2 as property_img_building_plan2,
        p.img_interiors as property_img_interiors,
        p.img_360 as property_img_360,
        p.img_outside_views as property_img_outside_views,
        p.media as property_media,
        p.na as property_na,
        p.indoor_carpet_area_m2_marketing as property_indoor_carpet_area_m2_marketing,
        p.outdoor_carpet_area_m2_marketing as property_outdoor_carpet_area_m2_marketing,
        p.indoor_carpet_area_sqft_marketing as property_indoor_carpet_area_sqft_marketing,
        p.outdoor_carpet_area_sqft_marketing as property_outdoor_carpet_area_sqft_marketing,
        p.clear_height_meters as property_clear_height_meters,
        p.clear_height_feet as property_clear_height_feet,
        p.floor_to_slab_height_meters as property_floor_to_slab_height_meters,
        p.floor_to_slab_height_feet as property_floor_to_slab_height_feet,
        p.street_frontage_meters as property_street_frontage_meters,
        p.street_frontage_feet as property_street_frontage_feet,
        p.indoor_storefront_meters as property_indoor_storefront_meters,
        p.indoor_storefront_feet as property_indoor_storefront_feet,
        p.average_depth_meters as property_average_depth_meters,
        p.average_depth_feet as property_average_depth_feet,
        p.column_grid_meters_dimensions as property_column_grid_meters_dimensions,
        p.column_grid_feet_dimensions as property_column_grid_feet_dimensions,
        p.core_to_facade_meters_dimensions as property_core_to_facade_meters_dimensions,
        p.core_to_facade_feet_dimensions as property_core_to_facade_feet_dimensions,
        p.window_to_midpoint_meters_dimensions as property_window_to_midpoint_meters_dimensions,
        p.window_to_midpoint_feet_dimensions as property_window_to_midpoint_feet_dimensions,
        p.entrance_hall_meters_dimensions as property_entrance_hall_meters_dimensions,
        p.living_meters_dimensions as property_living_meters_dimensions,
        p.dining_meters_dimensions as property_dining_meters_dimensions,
        p.kitchen_meters_dimensions as property_kitchen_meters_dimensions,
        p.office_library_meters_dimensions as property_office_library_meters_dimensions,
        p.bedroom_total_number_of_1_meters_dimensions as property_bedroom_total_number_of_1_meters_dimensions,
        p.master_bedroom_meters_dimensions as property_master_bedroom_meters_dimensions,
        p.bedroom_total_number_of_2_meters_dimensions as property_bedroom_total_number_of_2_meters_dimensions,
        p.bedroom_total_number_of_3_meters_dimensions as property_bedroom_total_number_of_3_meters_dimensions,
        p.bedroom_total_number_of_4_meters_dimensions as property_bedroom_total_number_of_4_meters_dimensions,
        p.bedroom_total_number_of_5_meters_dimensions as property_bedroom_total_number_of_5_meters_dimensions,
        p.bedroom_total_number_of_6_meters_dimensions as property_bedroom_total_number_of_6_meters_dimensions,
        p.bathroom_total_number_of_1_meters_dimensions as property_bathroom_total_number_of_1_meters_dimensions,
        p.master_bathroom_meters_dimensions as property_master_bathroom_meters_dimensions,
        p.bathroom_total_number_of_2_meters_dimensions as property_bathroom_total_number_of_2_meters_dimensions,
        p.bathroom_total_number_of_3_meters_dimensions as property_bathroom_total_number_of_3_meters_dimensions,
        p.bathroom_total_number_of_4_meters_dimensions as property_bathroom_total_number_of_4_meters_dimensions,
        p.bathroom_total_number_of_5_meters_dimensions as property_bathroom_total_number_of_5_meters_dimensions,
        p.misc_total_number_of_1_meters_dimensions as property_misc_total_number_of_1_meters_dimensions,
        p.misc_total_number_of_2_meters_dimensions as property_misc_total_number_of_2_meters_dimensions,
        p.balcony_total_number_of_1_meters_dimensions as property_balcony_total_number_of_1_meters_dimensions,
        p.balcony_total_number_of_2_meters_dimensions as property_balcony_total_number_of_2_meters_dimensions,
        p.balcony_total_number_of_3_meters_dimensions as property_balcony_total_number_of_3_meters_dimensions,
        p.balcony_total_number_of_4_meters_dimensions as property_balcony_total_number_of_4_meters_dimensions,
        p.balcony_total_number_of_5_meters_dimensions as property_balcony_total_number_of_5_meters_dimensions,
        p.balcony_total_number_of_6_meters_dimensions as property_balcony_total_number_of_6_meters_dimensions,
        p.entrance_hall_feet_dimensions as property_entrance_hall_feet_dimensions,
        p.living_feet_dimensions as property_living_feet_dimensions,
        p.dining_feet_dimensions as property_dining_feet_dimensions,
        p.kitchen_feet_dimensions as property_kitchen_feet_dimensions,
        p.office_library_feet_dimensions as property_office_library_feet_dimensions,
        p.bedroom_total_number_of_1_feet_dimensions as property_bedroom_total_number_of_1_feet_dimensions,
        p.master_bedroom_feet_dimensions as property_master_bedroom_feet_dimensions,
        p.bedroom_total_number_of_2_feet_dimensions as property_bedroom_total_number_of_2_feet_dimensions,
        p.bedroom_total_number_of_3_feet_dimensions as property_bedroom_total_number_of_3_feet_dimensions,
        p.bedroom_total_number_of_4_feet_dimensions as property_bedroom_total_number_of_4_feet_dimensions,
        p.bedroom_total_number_of_5_feet_dimensions as property_bedroom_total_number_of_5_feet_dimensions,
        p.bedroom_total_number_of_6_feet_dimensions as property_bedroom_total_number_of_6_feet_dimensions,
        p.bathroom_total_number_of_1_feet_dimensions as property_bathroom_total_number_of_1_feet_dimensions,
        p.master_bathroom_feet_dimensions as property_master_bathroom_feet_dimensions,
        p.bathroom_total_number_of_2_feet_dimensions as property_bathroom_total_number_of_2_feet_dimensions,
        p.bathroom_total_number_of_3_feet_dimensions as property_bathroom_total_number_of_3_feet_dimensions,
        p.bathroom_total_number_of_4_feet_dimensions as property_bathroom_total_number_of_4_feet_dimensions,
        p.bathroom_total_number_of_5_feet_dimensions as property_bathroom_total_number_of_5_feet_dimensions,
        p.misc_total_number_of_1_feet_dimensions as property_misc_total_number_of_1_feet_dimensions,
        p.misc_total_number_of_2_feet_dimensions as property_misc_total_number_of_2_feet_dimensions,
        p.balcony_total_number_of_1_feet_dimensions as property_balcony_total_number_of_1_feet_dimensions,
        p.balcony_total_number_of_2_feet_dimensions as property_balcony_total_number_of_2_feet_dimensions,
        p.balcony_total_number_of_3_feet_dimensions as property_balcony_total_number_of_3_feet_dimensions,
        p.balcony_total_number_of_4_feet_dimensions as property_balcony_total_number_of_4_feet_dimensions,
        p.balcony_total_number_of_5_feet_dimensions as property_balcony_total_number_of_5_feet_dimensions,
        p.balcony_total_number_of_6_feet_dimensions as property_balcony_total_number_of_6_feet_dimensions,
        p.on_site_covered_car_parks as property_on_site_covered_car_parks,
        p.on_site_covered_2_wheelers as property_on_site_covered_2_wheelers,
        p.on_site_uncovered_car_parks as property_on_site_uncovered_car_parks,
        p.on_site_uncovered_2_wheelers as property_on_site_uncovered_2_wheelers,
        p.neighbor_unit_horizontal as property_neighbor_unit_horizontal,
        p.neighbor_unit_vertical as property_neighbor_unit_vertical,
        p.average_daytime_vehicular_traffic as property_average_daytime_vehicular_traffic,
        p.average_daytime_pedestrian_traffic as property_average_daytime_pedestrian_traffic,
        p.occupant_information as property_occupant_information,

        s.name as property_status,
        p.created_at as property_created_at,
        p.updated_at as property_updated_at


        FROM properties p
        LEFT JOIN status s ON p.status_id = s.id
        LEFT JOIN properties_developers_relationship pdr ON p.id = pdr.property_id
        LEFT JOIN users u ON pdr.user_id = u.id
        ";

        if ($session_role_id == 1) {

            $where = " WHERE (p.status_id = 1)

            ";
        } else {
            $where = " WHERE (p.status_id = 1)
                    AND  (pdr.user_id = '" . $session_user_id . "' )
                    ";
        }


        $order_by = " ORDER BY p.id ASC";
        $group_by = " GROUP BY p.id";

        if ($session_role_id == 1) {

            if ($_POST['search']['value'] != "") {

                $search = $_POST['search']['value'];

                $sqlstatment_getFilteredRecords =  $query . $where . "
                                                            AND  ((p.project_name LIKE '" . "%" . $search . "%" . "' )
                                                            OR  (u.name LIKE '" . "%" . $search . "%" . "' ))
                                                            "
                    .
                    $group_by
                    .
                    $order_by;

                if ($length != -1) {
                    $sqlstatment_getFilteredLimitRecords = $sqlstatment_getFilteredRecords . " LIMIT $start, $length ";
                } else {
                    $sqlstatment_getFilteredLimitRecords =  $sqlstatment_getFilteredRecords;
                }
            } else {


                $sqlstatment_getFilteredRecords =  $query . $where . $group_by . $order_by;

                if ($length != -1) {
                    $sqlstatment_getFilteredLimitRecords = $sqlstatment_getFilteredRecords . " LIMIT $start, $length ";
                } else {
                    $sqlstatment_getFilteredLimitRecords =  $sqlstatment_getFilteredRecords;
                }
            }
        } else if ($session_role_id == 2) {


            if ($_POST['search']['value'] != "") {

                $search = $_POST['search']['value'];

                $sqlstatment_getFilteredRecords =  $query . $where . "

                                                            AND  ((p.project_name LIKE '" . "%" . $search . "%" . "' )
                                                            OR  (u.name LIKE '" . "%" . $search . "%" . "' ))
                                                            "
                    .
                    $group_by
                    .
                    $order_by;

                if ($length != -1) {
                    $sqlstatment_getFilteredLimitRecords = $sqlstatment_getFilteredRecords . " LIMIT $start, $length ";
                } else {
                    $sqlstatment_getFilteredLimitRecords =  $sqlstatment_getFilteredRecords;
                }
            } else {


                $sqlstatment_getFilteredRecords =  $query . $where . $group_by . $order_by;

                if ($length != -1) {
                    $sqlstatment_getFilteredLimitRecords = $sqlstatment_getFilteredRecords . " LIMIT $start, $length ";
                } else {
                    $sqlstatment_getFilteredLimitRecords =  $sqlstatment_getFilteredRecords;
                }
            }
        }

        $recordsFiltered = $this->db->query($sqlstatment_getFilteredRecords)->num_rows();
        $recordsFilteredLimitRecords = $this->db->query($sqlstatment_getFilteredLimitRecords);
        $recordsTotal = $this->db->query($sqlstatment_getTotalRecords)->num_rows();

        if ($recordsFilteredLimitRecords->num_rows() > 0) {
            $result = $recordsFilteredLimitRecords->result_array();



            //print_r( $result);

            foreach ($result as $data) {

                $dataArray[] = array(

                    "dt00_property_unqique_id" =>  $data['property_unqique_id'],
                    "dt0_property_project_name" => $data['property_project_name'],
                    "dt1_property_developer_name" => $data['property_developer_name'],
                    "dt2_property_unit_name" => $data['property_unit_name'],
                    "dt3_property_status" => $data['property_status'],
                    "dt4_property_created_at" => $data['property_created_at']
                );
            }



            $array = array("draw" => intval($_POST['draw']), "recordsTotal" => $recordsTotal, "recordsFiltered" => $recordsFiltered, "data" => $dataArray);
        } else {
            $array = array("draw" => intval($_POST['draw']), "recordsTotal" => 0, "recordsFiltered" => 0, "data" => []);
        }





        return $array;
    }

    public function updateProperty($data, $getPropertyId)

    {
        $this->db->trans_start();

        $this->db->update('properties', $data, "id = " . $getPropertyId);

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }

    public function deleteProperty($getPropertyId)

    {

        $this->db->trans_start();

        $this->db->where('property_id', $getPropertyId);

        $this->db->delete('properties_developers_relationship');

        $this->db->where('id', $getPropertyId);

        $this->db->delete('properties');

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            return 0; //Query Failed
        } else {
            // do whatever you want to do on query success
            return 1;
        }
    }

    public function getPropertiesModalFieldsData($getPropertyId)
    {

        $user = $this->session->userdata('userinfo');

        $session_user_id = $user['session_user_id'];
        $session_role_id = $user['session_role_id'];



        $query = "

        SELECT
        p.id as property_unqique_id,
        u.name as property_developer_name,
        p.project_name as property_project_name,
        p.filter_by_unit as property_filter_by_unit,
        p.unit_name as property_unit_name,
        p.display_name as property_display_name,
        p.unit_description as property_unit_description,
        p.unique_unit_id as property_unique_unit_id,
        p.space_usage as property_space_usage,
        p.address as property_address,
        p.building_name as property_building_name,
        p.building_use as property_building_use,
        p.blg_latitude as property_blg_latitude,
        p.blg_longitude as property_blg_longitude,
        p.blg_altitude as property_blg_altitude,
        p.blg_rotation as property_blg_rotation,
        p.blg_scale as property_blg_scale,
        p.blg_mirror_x as property_blg_mirror_x,
        p.blg_mirror_y as property_blg_mirror_y,
        p.plot_area as property_plot_area,
        p.plot_fsi as property_plot_fsi,
        p.plot_coverage_ratio as property_plot_coverage_ratio,
        p.plot_maximum_height as property_plot_maximum_height,
        p.front_setback as property_front_setback,
        p.lateral_setbacks as property_lateral_setbacks,
        p.building_height_stories as property_building_height_stories,
        p.year_built_renovated as property_year_built_renovated,
        p.building_size_m2 as property_building_size_m2,
        p.building_size_sqft as property_building_size_sqft,
        p.typical_floor_size_m2 as property_typical_floor_size_m2,
        p.typical_floor_size_sqft as property_typical_floor_size_sqft,
        p.green_certification as property_green_certification,
        p.well_certification as property_well_certification,
        p.energy_certification as property_energy_certification,
        p.building_grade as property_building_grade,
        p.building_section as property_building_section,
        p.building_section_html_color as property_building_section_html_color,
        p.floor as property_floor,
        p.floor_efficiency as property_floor_efficiency,
        p.orientation as property_orientation,
        p.total_number_of_bedrooms as property_total_number_of_bedrooms,
        p.total_number_of_bathrooms as property_total_number_of_bathrooms,
        p.area_m2 as property_area_m2,
        p.area_sqft as property_area_sqft,
        p.price as property_price,
        p.price_per_area as property_price_per_area,
        p.base_price as property_base_price,
        p.adjusted_price as property_adjusted_price,
        p.availability as property_availability,
        p.availability_html_color as property_availability_html_color,
        p.availability_date as property_availability_date,
        p.condition as property_condition,
        p.term_length as property_term_length,
        p.term_structure as property_term_structure,
        p.minimum_capacity as property_minimum_capacity,
        p.maximum_capacity as property_maximum_capacity,
        p.for_sale_boolean as property_for_sale_boolean,
        p.for_rent_boolean as property_for_rent_boolean,
        p.private_garden_boolean as property_private_garden_boolean,
        p.full_vastu_boolean as property_full_vastu_boolean,
        p.combinable_boolean as property_combinable_boolean,
        p.divisible_boolean as property_divisible_boolean,
        p.service_room_boolean as property_service_room_boolean,
        p.enclosed_kitchen_boolean as property_enclosed_kitchen_boolean,
        p.open_kitchen_boolean as property_open_kitchen_boolean,
        p.home_office_boolean as property_home_office_boolean,
        p.duplex_boolean as property_duplex_boolean,
        p.furnished_boolean as property_furnished_boolean,
        p.corner_frontage_boolean as property_corner_frontage_boolean,
        p.exterior_boolean as property_exterior_boolean,
        p.raised_flooring_boolean as property_raised_flooring_boolean,
        p.n_or_e_entrance_boolean as property_n_or_e_entrance_boolean,
        p.modern_boolean as property_modern_boolean,
        p.classic_boolean as property_classic_boolean,
        p.url as property_url,
        p.same_units as property_same_units,
        p.lowres_floorplans as property_lowres_floorplans,
        p.highres_floorplans as property_highres_floorplans,
        p.img_building_plan as property_img_building_plan,
        p.img_building_plan2 as property_img_building_plan2,
        p.img_interiors as property_img_interiors,
        p.img_360 as property_img_360,
        p.img_outside_views as property_img_outside_views,
        p.media as property_media,
        p.na as property_na,
        p.indoor_carpet_area_m2_marketing as property_indoor_carpet_area_m2_marketing,
        p.outdoor_carpet_area_m2_marketing as property_outdoor_carpet_area_m2_marketing,
        p.indoor_carpet_area_sqft_marketing as property_indoor_carpet_area_sqft_marketing,
        p.outdoor_carpet_area_sqft_marketing as property_outdoor_carpet_area_sqft_marketing,
        p.clear_height_meters as property_clear_height_meters,
        p.clear_height_feet as property_clear_height_feet,
        p.floor_to_slab_height_meters as property_floor_to_slab_height_meters,
        p.floor_to_slab_height_feet as property_floor_to_slab_height_feet,
        p.street_frontage_meters as property_street_frontage_meters,
        p.street_frontage_feet as property_street_frontage_feet,
        p.indoor_storefront_meters as property_indoor_storefront_meters,
        p.indoor_storefront_feet as property_indoor_storefront_feet,
        p.average_depth_meters as property_average_depth_meters,
        p.average_depth_feet as property_average_depth_feet,
        p.column_grid_meters_dimensions as property_column_grid_meters_dimensions,
        p.column_grid_feet_dimensions as property_column_grid_feet_dimensions,
        p.core_to_facade_meters_dimensions as property_core_to_facade_meters_dimensions,
        p.core_to_facade_feet_dimensions as property_core_to_facade_feet_dimensions,
        p.window_to_midpoint_meters_dimensions as property_window_to_midpoint_meters_dimensions,
        p.window_to_midpoint_feet_dimensions as property_window_to_midpoint_feet_dimensions,
        p.entrance_hall_meters_dimensions as property_entrance_hall_meters_dimensions,
        p.living_meters_dimensions as property_living_meters_dimensions,
        p.dining_meters_dimensions as property_dining_meters_dimensions,
        p.kitchen_meters_dimensions as property_kitchen_meters_dimensions,
        p.office_library_meters_dimensions as property_office_library_meters_dimensions,
        p.bedroom_total_number_of_1_meters_dimensions as property_bedroom_total_number_of_1_meters_dimensions,
        p.master_bedroom_meters_dimensions as property_master_bedroom_meters_dimensions,
        p.bedroom_total_number_of_2_meters_dimensions as property_bedroom_total_number_of_2_meters_dimensions,
        p.bedroom_total_number_of_3_meters_dimensions as property_bedroom_total_number_of_3_meters_dimensions,
        p.bedroom_total_number_of_4_meters_dimensions as property_bedroom_total_number_of_4_meters_dimensions,
        p.bedroom_total_number_of_5_meters_dimensions as property_bedroom_total_number_of_5_meters_dimensions,
        p.bedroom_total_number_of_6_meters_dimensions as property_bedroom_total_number_of_6_meters_dimensions,
        p.bathroom_total_number_of_1_meters_dimensions as property_bathroom_total_number_of_1_meters_dimensions,
        p.master_bathroom_meters_dimensions as property_master_bathroom_meters_dimensions,
        p.bathroom_total_number_of_2_meters_dimensions as property_bathroom_total_number_of_2_meters_dimensions,
        p.bathroom_total_number_of_3_meters_dimensions as property_bathroom_total_number_of_3_meters_dimensions,
        p.bathroom_total_number_of_4_meters_dimensions as property_bathroom_total_number_of_4_meters_dimensions,
        p.bathroom_total_number_of_5_meters_dimensions as property_bathroom_total_number_of_5_meters_dimensions,
        p.misc_total_number_of_1_meters_dimensions as property_misc_total_number_of_1_meters_dimensions,
        p.misc_total_number_of_2_meters_dimensions as property_misc_total_number_of_2_meters_dimensions,
        p.balcony_total_number_of_1_meters_dimensions as property_balcony_total_number_of_1_meters_dimensions,
        p.balcony_total_number_of_2_meters_dimensions as property_balcony_total_number_of_2_meters_dimensions,
        p.balcony_total_number_of_3_meters_dimensions as property_balcony_total_number_of_3_meters_dimensions,
        p.balcony_total_number_of_4_meters_dimensions as property_balcony_total_number_of_4_meters_dimensions,
        p.balcony_total_number_of_5_meters_dimensions as property_balcony_total_number_of_5_meters_dimensions,
        p.balcony_total_number_of_6_meters_dimensions as property_balcony_total_number_of_6_meters_dimensions,
        p.entrance_hall_feet_dimensions as property_entrance_hall_feet_dimensions,
        p.living_feet_dimensions as property_living_feet_dimensions,
        p.dining_feet_dimensions as property_dining_feet_dimensions,
        p.kitchen_feet_dimensions as property_kitchen_feet_dimensions,
        p.office_library_feet_dimensions as property_office_library_feet_dimensions,
        p.bedroom_total_number_of_1_feet_dimensions as property_bedroom_total_number_of_1_feet_dimensions,
        p.master_bedroom_feet_dimensions as property_master_bedroom_feet_dimensions,
        p.bedroom_total_number_of_2_feet_dimensions as property_bedroom_total_number_of_2_feet_dimensions,
        p.bedroom_total_number_of_3_feet_dimensions as property_bedroom_total_number_of_3_feet_dimensions,
        p.bedroom_total_number_of_4_feet_dimensions as property_bedroom_total_number_of_4_feet_dimensions,
        p.bedroom_total_number_of_5_feet_dimensions as property_bedroom_total_number_of_5_feet_dimensions,
        p.bedroom_total_number_of_6_feet_dimensions as property_bedroom_total_number_of_6_feet_dimensions,
        p.bathroom_total_number_of_1_feet_dimensions as property_bathroom_total_number_of_1_feet_dimensions,
        p.master_bathroom_feet_dimensions as property_master_bathroom_feet_dimensions,
        p.bathroom_total_number_of_2_feet_dimensions as property_bathroom_total_number_of_2_feet_dimensions,
        p.bathroom_total_number_of_3_feet_dimensions as property_bathroom_total_number_of_3_feet_dimensions,
        p.bathroom_total_number_of_4_feet_dimensions as property_bathroom_total_number_of_4_feet_dimensions,
        p.bathroom_total_number_of_5_feet_dimensions as property_bathroom_total_number_of_5_feet_dimensions,
        p.misc_total_number_of_1_feet_dimensions as property_misc_total_number_of_1_feet_dimensions,
        p.misc_total_number_of_2_feet_dimensions as property_misc_total_number_of_2_feet_dimensions,
        p.balcony_total_number_of_1_feet_dimensions as property_balcony_total_number_of_1_feet_dimensions,
        p.balcony_total_number_of_2_feet_dimensions as property_balcony_total_number_of_2_feet_dimensions,
        p.balcony_total_number_of_3_feet_dimensions as property_balcony_total_number_of_3_feet_dimensions,
        p.balcony_total_number_of_4_feet_dimensions as property_balcony_total_number_of_4_feet_dimensions,
        p.balcony_total_number_of_5_feet_dimensions as property_balcony_total_number_of_5_feet_dimensions,
        p.balcony_total_number_of_6_feet_dimensions as property_balcony_total_number_of_6_feet_dimensions,
        p.on_site_covered_car_parks as property_on_site_covered_car_parks,
        p.on_site_covered_2_wheelers as property_on_site_covered_2_wheelers,
        p.on_site_uncovered_car_parks as property_on_site_uncovered_car_parks,
        p.on_site_uncovered_2_wheelers as property_on_site_uncovered_2_wheelers,
        p.neighbor_unit_horizontal as property_neighbor_unit_horizontal,
        p.neighbor_unit_vertical as property_neighbor_unit_vertical,
        p.average_daytime_vehicular_traffic as property_average_daytime_vehicular_traffic,
        p.average_daytime_pedestrian_traffic as property_average_daytime_pedestrian_traffic,
        p.occupant_information as property_occupant_information,
        p.status_id as property_status_id,

        s.name as property_status,
        p.created_at as property_created_at,
        p.updated_at as property_updated_at


        FROM properties p
        LEFT JOIN status s ON p.status_id = s.id
        LEFT JOIN properties_developers_relationship pdr ON p.id = pdr.property_id
        LEFT JOIN users u ON pdr.user_id = u.id
        ";

        $where = "WHERE p.status_id = 1";

        $and = "
        AND  p.id = '" . $getPropertyId . "'
        ";


        if ($session_role_id == 1) {

            $and2 = "";


        } else {
            $and2 = "
                    AND  pdr.user_id = '" . $session_user_id . "'
                    ";
        }


        $order_by = " ORDER BY p.id ASC";
        $group_by = " GROUP BY p.id";


        $sqlstatment_combine =  $query . $where . $and . $and2. $group_by . $order_by;

        $sqlstatment = $this->db->query($sqlstatment_combine);


        return $sqlstatment->result_array();
    }
}



/*
    public function getAllListProperties()
    {

        $user = $this->session->userdata('userinfo');

        $session_role_id = $user['session_role_id'];

        $session_user_id = $user['session_user_id'];

        if ($session_role_id == 2) {

            $query = $this->db->query("SELECT
                                        p.id as property_id,
                                        p.project_name as property_project_name,
                                        p.unit_name as property_unit_name,
                                        p.display_name as property_display_name,
                                        p.unit_description as property_unit_description,
                                        p.address as property_address,
                                        p.building_name as property_building_name,
                                        p.blg_latitude as property_blg_latitude,
                                        p.blg_longitude as property_blg_longitude,
                                        p.blg_altitude as property_blg_altitude,
                                        p.blg_rotation as property_blg_rotation,
                                        p.blg_scale as property_blg_scale,
                                        p.blg_mirror_x as property_blg_mirror_x,
                                        p.blg_mirror_y as property_blg_mirror_y,
                                        p.building_section as property_building_section,
                                        p.building_section_html_color as property_building_section_html_color,
                                        p.unique_unit_id as property_unique_unit_id,
                                        p.floor as property_floor,
                                        p.orientation as property_orientation,
                                        p.total_number_of_bedrooms as property_total_number_of_bedrooms,
                                        p.total_number_of_bathrooms as property_total_number_of_bathrooms,
                                        p.area_m2 as property_area_m2,
                                        p.area_sqft as property_area_sqft,
                                        p.price as property_price,
                                        p.availability as property_availability,
                                        p.availability_html_color as property_availability_html_color,
                                        p.for_sale_boolean as property_for_sale_boolean,
                                        p.for_rent_boolean as property_for_rent_boolean,
                                        p.private_garden_boolean as property_private_garden_boolean,
                                        p.full_vastu_boolean as property_full_vastu_boolean,
                                        p.combinable_boolean as property_combinable_boolean,
                                        p.service_room_boolean as property_service_room_boolean,
                                        p.enclosed_kitchen_boolean as property_enclosed_kitchen_boolean,
                                        p.open_kitchen_boolean as property_open_kitchen_boolean,
                                        p.home_office_boolean as property_home_office_boolean,
                                        p.duplex_boolean as property_duplex_boolean,
                                        p.modern_boolean as property_modern_boolean,
                                        p.classic_boolean as property_classic_boolean,
                                        p.url as property_url,
                                        p.base_price as property_base_price,
                                        p.adjusted_price as property_adjusted_price,
                                        p.same_units as property_same_units,
                                        p.lowres_floorplans as property_lowres_floorplans,
                                        p.highres_floorplans as property_highres_floorplans,
                                        p.img_building_plan as property_img_building_plan,
                                        p.img_building_plan2 as property_img_building_plan2,
                                        p.img_interiors as property_img_interiors,
                                        p.img_360 as property_img_360,
                                        p.media as property_media,
                                        p.na as property_na,
                                        p.indoor_carpet_area_m2_marketing as property_indoor_carpet_area_m2_marketing,
                                        p.outdoor_carpet_area_m2_marketing as property_outdoor_carpet_area_m2_marketing,
                                        p.indoor_carpet_area_sqft_marketing as property_indoor_carpet_area_sqft_marketing,
                                        p.outdoor_carpet_area_sqft_marketing as property_outdoor_carpet_area_sqft_marketing,
                                        p.entrance_hall_meters_dimensions as property_entrance_hall_meters_dimensions,
                                        p.living_meters_dimensions as property_living_meters_dimensions,
                                        p.dining_meters_dimensions as property_dining_meters_dimensions,
                                        p.kitchen_meters_dimensions as property_kitchen_meters_dimensions,
                                        p.office_library_meters_dimensions as property_office_library_meters_dimensions,
                                        p.bedroom_no_1_meters_dimensions as property_bedroom_no_1_meters_dimensions,
                                        p.master_bedroom_meters_dimensions as property_master_bedroom_meters_dimensions,
                                        p.bedroom_no_2_meters_dimensions as property_bedroom_no_2_meters_dimensions,
                                        p.bedroom_no_3_meters_dimensions as property_bedroom_no_3_meters_dimensions,
                                        p.bedroom_no_4_meters_dimensions as property_bedroom_no_4_meters_dimensions,
                                        p.bedroom_no_5_meters_dimensions as property_bedroom_no_5_meters_dimensions,
                                        p.bedroom_no_6_meters_dimensions as property_bedroom_no_6_meters_dimensions,
                                        p.bathroom_no_1_meters_dimensions as property_bathroom_no_1_meters_dimensions,
                                        p.master_bathroom_meters_dimensions as property_master_bathroom_meters_dimensions,
                                        p.bathroom_no_2_meters_dimensions as property_bathroom_no_2_meters_dimensions,
                                        p.bathroom_no_3_meters_dimensions as property_bathroom_no_3_meters_dimensions,
                                        p.bathroom_no_4_meters_dimensions as property_bathroom_no_4_meters_dimensions,
                                        p.bathroom_no_5_meters_dimensions as property_bathroom_no_5_meters_dimensions,
                                        p.misc_no_1_meters_dimensions as property_misc_no_1_meters_dimensions,
                                        p.misc_no_2_meters_dimensions as property_misc_no_2_meters_dimensions,
                                        p.balcony_no_1_meters_dimensions as property_balcony_no_1_meters_dimensions,
                                        p.balcony_no_2_meters_dimensions as property_balcony_no_2_meters_dimensions,
                                        p.balcony_no_3_meters_dimensions as property_balcony_no_3_meters_dimensions,
                                        p.balcony_no_4_meters_dimensions as property_balcony_no_4_meters_dimensions,
                                        p.balcony_no_5_meters_dimensions as property_balcony_no_5_meters_dimensions,
                                        p.balcony_no_6_meters_dimensions as property_balcony_no_6_meters_dimensions,
                                        p.entrance_hall_feet_dimensions as property_entrance_hall_feet_dimensions,
                                        p.living_feet_dimensions as property_living_feet_dimensions,
                                        p.dining_feet_dimensions as property_dining_feet_dimensions,
                                        p.kitchen_feet_dimensions as property_kitchen_feet_dimensions,
                                        p.office_library_feet_dimensions as property_office_library_feet_dimensions,
                                        p.bedroom_no_1_feet_dimensions as property_bedroom_no_1_feet_dimensions,
                                        p.master_bedroom_feet_dimensions as property_master_bedroom_feet_dimensions,
                                        p.bedroom_no_2_feet_dimensions as property_bedroom_no_2_feet_dimensions,
                                        p.bedroom_no_3_feet_dimensions as property_bedroom_no_3_feet_dimensions,
                                        p.bedroom_no_4_feet_dimensions as property_bedroom_no_4_feet_dimensions,
                                        p.bedroom_no_5_feet_dimensions as property_bedroom_no_5_feet_dimensions,
                                        p.bedroom_no_6_feet_dimensions as property_bedroom_no_6_feet_dimensions,
                                        p.bathroom_no_1_feet_dimensions as property_bathroom_no_1_feet_dimensions,
                                        p.master_bathroom_feet_dimensions as property_master_bathroom_feet_dimensions,
                                        p.bathroom_no_2_feet_dimensions as property_bathroom_no_2_feet_dimensions,
                                        p.bathroom_no_3_feet_dimensions as property_bathroom_no_3_feet_dimensions,
                                        p.bathroom_no_4_feet_dimensions as property_bathroom_no_4_feet_dimensions,
                                        p.bathroom_no_5_feet_dimensions as property_bathroom_no_5_feet_dimensions,
                                        p.misc_no_1_feet_dimensions as property_misc_no_1_feet_dimensions,
                                        p.misc_no_2_feet_dimensions as property_misc_no_2_feet_dimensions,
                                        p.balcony_no_1_feet_dimensions as property_balcony_no_1_feet_dimensions,
                                        p.balcony_no_2_feet_dimensions as property_balcony_no_2_feet_dimensions,
                                        p.balcony_no_3_feet_dimensions as property_balcony_no_3_feet_dimensions,
                                        p.balcony_no_4_feet_dimensions as property_balcony_no_4_feet_dimensions,
                                        p.balcony_no_5_feet_dimensions as property_balcony_no_5_feet_dimensions,
                                        p.balcony_no_6_feet_dimensions as property_balcony_no_6_feet_dimensions,
                                        s.name as property_status,
                                        p.created_at as property_created_at,
                                        p.updated_at as property_updated_at

                                        FROM properties p, properties_developers_relationship pdr, status s
                                        WHERE pdr.property_id = p.id
                                        AND p.status_id = s.id
                                        AND  pdr.user_id = '$session_user_id'"

                                        );

        } else {

            $developer_id = 1;
            $query = $this->db->query("SELECT
                                        p.id as property_id,
                                        p.project_name as property_project_name,
                                        p.unit_name as property_unit_name,
                                        p.display_name as property_display_name,
                                        p.unit_description as property_unit_description,
                                        p.address as property_address,
                                        p.building_name as property_building_name,
                                        p.blg_latitude as property_blg_latitude,
                                        p.blg_longitude as property_blg_longitude,
                                        p.blg_altitude as property_blg_altitude,
                                        p.blg_rotation as property_blg_rotation,
                                        p.blg_scale as property_blg_scale,
                                        p.blg_mirror_x as property_blg_mirror_x,
                                        p.blg_mirror_y as property_blg_mirror_y,
                                        p.building_section as property_building_section,
                                        p.building_section_html_color as property_building_section_html_color,
                                        p.unique_unit_id as property_unique_unit_id,
                                        p.floor as property_floor,
                                        p.orientation as property_orientation,
                                        p.total_number_of_bedrooms as property_total_number_of_bedrooms,
                                        p.total_number_of_bathrooms as property_total_number_of_bathrooms,
                                        p.area_m2 as property_area_m2,
                                        p.area_sqft as property_area_sqft,
                                        p.price as property_price,
                                        p.availability as property_availability,
                                        p.availability_html_color as property_availability_html_color,
                                        p.for_sale_boolean as property_for_sale_boolean,
                                        p.for_rent_boolean as property_for_rent_boolean,
                                        p.private_garden_boolean as property_private_garden_boolean,
                                        p.full_vastu_boolean as property_full_vastu_boolean,
                                        p.combinable_boolean as property_combinable_boolean,
                                        p.service_room_boolean as property_service_room_boolean,
                                        p.enclosed_kitchen_boolean as property_enclosed_kitchen_boolean,
                                        p.open_kitchen_boolean as property_open_kitchen_boolean,
                                        p.home_office_boolean as property_home_office_boolean,
                                        p.duplex_boolean as property_duplex_boolean,
                                        p.modern_boolean as property_modern_boolean,
                                        p.classic_boolean as property_classic_boolean,
                                        p.url as property_url,
                                        p.base_price as property_base_price,
                                        p.adjusted_price as property_adjusted_price,
                                        p.same_units as property_same_units,
                                        p.lowres_floorplans as property_lowres_floorplans,
                                        p.highres_floorplans as property_highres_floorplans,
                                        p.img_building_plan as property_img_building_plan,
                                        p.img_building_plan2 as property_img_building_plan2,
                                        p.img_interiors as property_img_interiors,
                                        p.img_360 as property_img_360,
                                        p.media as property_media,
                                        p.na as property_na,
                                        p.indoor_carpet_area_m2_marketing as property_indoor_carpet_area_m2_marketing,
                                        p.outdoor_carpet_area_m2_marketing as property_outdoor_carpet_area_m2_marketing,
                                        p.indoor_carpet_area_sqft_marketing as property_indoor_carpet_area_sqft_marketing,
                                        p.outdoor_carpet_area_sqft_marketing as property_outdoor_carpet_area_sqft_marketing,
                                        p.entrance_hall_meters_dimensions as property_entrance_hall_meters_dimensions,
                                        p.living_meters_dimensions as property_living_meters_dimensions,
                                        p.dining_meters_dimensions as property_dining_meters_dimensions,
                                        p.kitchen_meters_dimensions as property_kitchen_meters_dimensions,
                                        p.office_library_meters_dimensions as property_office_library_meters_dimensions,
                                        p.bedroom_no_1_meters_dimensions as property_bedroom_no_1_meters_dimensions,
                                        p.master_bedroom_meters_dimensions as property_master_bedroom_meters_dimensions,
                                        p.bedroom_no_2_meters_dimensions as property_bedroom_no_2_meters_dimensions,
                                        p.bedroom_no_3_meters_dimensions as property_bedroom_no_3_meters_dimensions,
                                        p.bedroom_no_4_meters_dimensions as property_bedroom_no_4_meters_dimensions,
                                        p.bedroom_no_5_meters_dimensions as property_bedroom_no_5_meters_dimensions,
                                        p.bedroom_no_6_meters_dimensions as property_bedroom_no_6_meters_dimensions,
                                        p.bathroom_no_1_meters_dimensions as property_bathroom_no_1_meters_dimensions,
                                        p.master_bathroom_meters_dimensions as property_master_bathroom_meters_dimensions,
                                        p.bathroom_no_2_meters_dimensions as property_bathroom_no_2_meters_dimensions,
                                        p.bathroom_no_3_meters_dimensions as property_bathroom_no_3_meters_dimensions,
                                        p.bathroom_no_4_meters_dimensions as property_bathroom_no_4_meters_dimensions,
                                        p.bathroom_no_5_meters_dimensions as property_bathroom_no_5_meters_dimensions,
                                        p.misc_no_1_meters_dimensions as property_misc_no_1_meters_dimensions,
                                        p.misc_no_2_meters_dimensions as property_misc_no_2_meters_dimensions,
                                        p.balcony_no_1_meters_dimensions as property_balcony_no_1_meters_dimensions,
                                        p.balcony_no_2_meters_dimensions as property_balcony_no_2_meters_dimensions,
                                        p.balcony_no_3_meters_dimensions as property_balcony_no_3_meters_dimensions,
                                        p.balcony_no_4_meters_dimensions as property_balcony_no_4_meters_dimensions,
                                        p.balcony_no_5_meters_dimensions as property_balcony_no_5_meters_dimensions,
                                        p.balcony_no_6_meters_dimensions as property_balcony_no_6_meters_dimensions,
                                        p.entrance_hall_feet_dimensions as property_entrance_hall_feet_dimensions,
                                        p.living_feet_dimensions as property_living_feet_dimensions,
                                        p.dining_feet_dimensions as property_dining_feet_dimensions,
                                        p.kitchen_feet_dimensions as property_kitchen_feet_dimensions,
                                        p.office_library_feet_dimensions as property_office_library_feet_dimensions,
                                        p.bedroom_no_1_feet_dimensions as property_bedroom_no_1_feet_dimensions,
                                        p.master_bedroom_feet_dimensions as property_master_bedroom_feet_dimensions,
                                        p.bedroom_no_2_feet_dimensions as property_bedroom_no_2_feet_dimensions,
                                        p.bedroom_no_3_feet_dimensions as property_bedroom_no_3_feet_dimensions,
                                        p.bedroom_no_4_feet_dimensions as property_bedroom_no_4_feet_dimensions,
                                        p.bedroom_no_5_feet_dimensions as property_bedroom_no_5_feet_dimensions,
                                        p.bedroom_no_6_feet_dimensions as property_bedroom_no_6_feet_dimensions,
                                        p.bathroom_no_1_feet_dimensions as property_bathroom_no_1_feet_dimensions,
                                        p.master_bathroom_feet_dimensions as property_master_bathroom_feet_dimensions,
                                        p.bathroom_no_2_feet_dimensions as property_bathroom_no_2_feet_dimensions,
                                        p.bathroom_no_3_feet_dimensions as property_bathroom_no_3_feet_dimensions,
                                        p.bathroom_no_4_feet_dimensions as property_bathroom_no_4_feet_dimensions,
                                        p.bathroom_no_5_feet_dimensions as property_bathroom_no_5_feet_dimensions,
                                        p.misc_no_1_feet_dimensions as property_misc_no_1_feet_dimensions,
                                        p.misc_no_2_feet_dimensions as property_misc_no_2_feet_dimensions,
                                        p.balcony_no_1_feet_dimensions as property_balcony_no_1_feet_dimensions,
                                        p.balcony_no_2_feet_dimensions as property_balcony_no_2_feet_dimensions,
                                        p.balcony_no_3_feet_dimensions as property_balcony_no_3_feet_dimensions,
                                        p.balcony_no_4_feet_dimensions as property_balcony_no_4_feet_dimensions,
                                        p.balcony_no_5_feet_dimensions as property_balcony_no_5_feet_dimensions,
                                        p.balcony_no_6_feet_dimensions as property_balcony_no_6_feet_dimensions,
                                        s.name as property_status,
                                        p.created_at as property_created_at,
                                        p.updated_at as property_updated_at

                                        FROM properties p, properties_developers_relationship pdr, status s
                                        WHERE pdr.property_id = p.id
                                        AND p.status_id = s.id
                                        AND  pdr.user_id = '$developer_id'"

                                        );

                                    }


        return $query->result_array();
    }

    */
