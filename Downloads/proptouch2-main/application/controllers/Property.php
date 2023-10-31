<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Property extends CI_Controller
{

        public function __construct()
        {
                parent::__construct();
        }

        public function index()
        {
                redirect("home");
        }


        public function _loadview($page, $data = 0)
        {

                $this->load->view('layouts/header.php');
                $this->load->view($page, $data);
                $this->load->view('layouts/footer.php');
        }

        public function view($page = 'list-property')
        {


                if (!file_exists(APPPATH . 'views/' . $page . '.php')) {

                        show_404();
                } else {

                        if (!$this->session->userdata('userinfo')) {
                                redirect("/");
                        } else {


                                $userinfo =  $this->session->userdata('userinfo');
                                $session_role_id = $userinfo["session_role_id"];

                                if ($session_role_id != 3 && $session_role_id != 4) {

                                        $this->_loadview($page);
                                } else {
                                        redirect("/");
                                }
                        }
                }
        }

        public function add($page = 'add-property')
        {


                if (!file_exists(APPPATH . 'views/' . $page . '.php')) {

                        show_404();
                } else {


                        if (!$this->session->userdata('userinfo')) {
                                redirect("/");
                        } else {

                                $userinfo =  $this->session->userdata('userinfo');
                                $session_role_id = $userinfo["session_role_id"];

                                if ($session_role_id != 3 && $session_role_id != 4) {

                                        $this->_loadview($page);
                                } else {
                                        redirect("/");
                                }
                        }
                }
        }

        public function upload($page = 'upload-property')
        {


                if (!file_exists(APPPATH . 'views/' . $page . '.php')) {

                        show_404();
                } else {


                        $userinfo =  $this->session->userdata('userinfo');
                        $session_role_id = $userinfo["session_role_id"];

                        if ($session_role_id != 3 && $session_role_id != 4) {

                                $this->_loadview($page);
                        } else {
                                redirect("/");
                        }
                }
        }

        public function setUploadPropertyFormData()
        {

                if (!$this->session->userdata('userinfo')) {
                        redirect("/");
                } else {

                        $user = $this->session->userdata('userinfo');
                        $session_role_id = $user['session_role_id'];
                        $status_id = 1;
                        $session_user_id = $user['session_user_id'];
                        $session_current_username = ucwords(strtolower($user['session_current_username']));

                        //load model
                        $this->load->model('PropertyModel');


                        $current_date = date("Y-m-d h:i:s");
                        $update_date = date("Y-m-d h:i:s");



                        // If file uploaded
                        if (is_uploaded_file($_FILES['property_file_list']['tmp_name'])) {
                                // Load CSV reader library
                                $this->load->library('CSVReader');

                                $filepath = $_FILES['property_file_list']['tmp_name'];
                                // If file doesn't exist, return false
                                if (!file_exists($filepath)) {
                                        $this->output
                                                ->set_content_type('application/json')
                                                ->set_output(json_encode(array('code' => 400)));
                                }


                                if ($session_role_id == 1) {
                                        $get_developer_id = $this->input->post("developer_list");
                                }

                                // Open uploaded CSV file with read-only mode
                                $csvFile = fopen($filepath, 'r');
                                $csvrow = 1;
                                while (($row = fgetcsv($csvFile, 10000, ",")) !== FALSE) {

                                        if ($csvrow == 1) {
                                                $csvrow++;
                                                continue;
                                        }   // continue is used for skip row 1

                                        $current_date = date("Y-m-d h:i:s");
                                        $update_date = date("Y-m-d h:i:s");

                                        $data[] = array(


                                                'project_name' => $row[0],
                                                'filter_by_unit' => $row[1],
                                                'unit_name' => $row[2],
                                                'display_name' => $row[3],
                                                'unit_description' => $row[4],
                                                'unique_unit_id' => $row[5],
                                                'space_usage' => $row[6],
                                                'address' => $row[7],
                                                'building_name' => $row[8],
                                                'building_use' => $row[9],
                                                'blg_latitude' => $row[10],
                                                'blg_longitude' => $row[11],
                                                'blg_altitude' => $row[12],
                                                'blg_rotation' => $row[13],
                                                'blg_scale' => $row[14],
                                                'blg_mirror_x' => $row[15],
                                                'blg_mirror_y' => $row[16],
                                                'plot_area' => $row[17],
                                                'plot_fsi' => $row[18],
                                                'plot_coverage_ratio' => $row[19],
                                                'plot_maximum_height' => $row[20],
                                                'front_setback' => $row[21],
                                                'lateral_setbacks' => $row[22],
                                                'building_height_stories' => $row[23],
                                                'year_built_renovated' => $row[24],
                                                'building_size_m2' => $row[25],
                                                'building_size_sqft' => $row[26],
                                                'typical_floor_size_m2' => $row[27],
                                                'typical_floor_size_sqft' => $row[28],
                                                'green_certification' => $row[29],
                                                'well_certification' => $row[30],
                                                'energy_certification' => $row[31],
                                                'building_grade' => $row[32],
                                                'building_section' => $row[33],
                                                'building_section_html_color' => $row[34],
                                                'floor' => $row[35],
                                                'floor_efficiency' => $row[36],
                                                'orientation' => $row[37],
                                                'total_number_of_bedrooms' => $row[38],
                                                'total_number_of_bathrooms' => $row[39],
                                                'area_m2' => $row[40],
                                                'area_sqft' => $row[41],
                                                'price' => $row[42],
                                                'price_per_area' => $row[43],
                                                'base_price' => $row[44],
                                                'adjusted_price' => $row[45],
                                                'availability' => $row[46],
                                                'availability_html_color' => $row[47],
                                                'availability_date' => $row[48],
                                                'condition' => $row[49],
                                                'term_length' => $row[50],
                                                'term_structure' => $row[51],
                                                'minimum_capacity' => $row[52],
                                                'maximum_capacity' => $row[53],
                                                'for_sale_boolean' => $row[54],
                                                'for_rent_boolean' => $row[55],
                                                'private_garden_boolean' => $row[56],
                                                'full_vastu_boolean' => $row[57],
                                                'combinable_boolean' => $row[58],
                                                'divisible_boolean' => $row[59],
                                                'service_room_boolean' => $row[60],
                                                'enclosed_kitchen_boolean' => $row[61],
                                                'open_kitchen_boolean' => $row[62],
                                                'home_office_boolean' => $row[63],
                                                'duplex_boolean' => $row[64],
                                                'furnished_boolean' => $row[65],
                                                'corner_frontage_boolean' => $row[66],
                                                'exterior_boolean' => $row[67],
                                                'raised_flooring_boolean' => $row[68],
                                                'n_or_e_entrance_boolean' => $row[69],
                                                'modern_boolean' => $row[70],
                                                'classic_boolean' => $row[71],
                                                'url' => $row[72],
                                                'same_units' => $row[73],
                                                'lowres_floorplans' => $row[74],
                                                'highres_floorplans' => $row[75],
                                                'img_building_plan' => $row[76],
                                                'img_building_plan2' => $row[77],
                                                'img_interiors' => $row[78],
                                                'img_360' => $row[79],
                                                'img_outside_views' => $row[80],
                                                'media' => $row[81],
                                                'na' => $row[82],
                                                'indoor_carpet_area_m2_marketing' => $row[83],
                                                'outdoor_carpet_area_m2_marketing' => $row[84],
                                                'indoor_carpet_area_sqft_marketing' => $row[85],
                                                'outdoor_carpet_area_sqft_marketing' => $row[86],
                                                'clear_height_meters' => $row[87],
                                                'clear_height_feet' => $row[88],
                                                'floor_to_slab_height_meters' => $row[89],
                                                'floor_to_slab_height_feet' => $row[90],
                                                'street_frontage_meters' => $row[91],
                                                'street_frontage_feet' => $row[92],
                                                'indoor_storefront_meters' => $row[93],
                                                'indoor_storefront_feet' => $row[94],
                                                'average_depth_meters' => $row[95],
                                                'average_depth_feet' => $row[96],
                                                'column_grid_meters_dimensions' => $row[97],
                                                'column_grid_feet_dimensions' => $row[98],
                                                'core_to_facade_meters_dimensions' => $row[99],
                                                'core_to_facade_feet_dimensions' => $row[100],
                                                'window_to_midpoint_meters_dimensions' => $row[101],
                                                'window_to_midpoint_feet_dimensions' => $row[102],
                                                'entrance_hall_meters_dimensions' => $row[103],
                                                'living_meters_dimensions' => $row[104],
                                                'dining_meters_dimensions' => $row[105],
                                                'kitchen_meters_dimensions' => $row[106],
                                                'office_library_meters_dimensions' => $row[107],
                                                'bedroom_total_number_of_1_meters_dimensions' => $row[108],
                                                'master_bedroom_meters_dimensions' => $row[109],
                                                'bedroom_total_number_of_2_meters_dimensions' => $row[110],
                                                'bedroom_total_number_of_3_meters_dimensions' => $row[111],
                                                'bedroom_total_number_of_4_meters_dimensions' => $row[112],
                                                'bedroom_total_number_of_5_meters_dimensions' => $row[113],
                                                'bedroom_total_number_of_6_meters_dimensions' => $row[114],
                                                'bathroom_total_number_of_1_meters_dimensions' => $row[115],
                                                'master_bathroom_meters_dimensions' => $row[116],
                                                'bathroom_total_number_of_2_meters_dimensions' => $row[117],
                                                'bathroom_total_number_of_3_meters_dimensions' => $row[118],
                                                'bathroom_total_number_of_4_meters_dimensions' => $row[119],
                                                'bathroom_total_number_of_5_meters_dimensions' => $row[120],
                                                'misc_total_number_of_1_meters_dimensions' => $row[121],
                                                'misc_total_number_of_2_meters_dimensions' => $row[122],
                                                'balcony_total_number_of_1_meters_dimensions' => $row[123],
                                                'balcony_total_number_of_2_meters_dimensions' => $row[124],
                                                'balcony_total_number_of_3_meters_dimensions' => $row[125],
                                                'balcony_total_number_of_4_meters_dimensions' => $row[126],
                                                'balcony_total_number_of_5_meters_dimensions' => $row[127],
                                                'balcony_total_number_of_6_meters_dimensions' => $row[128],
                                                'entrance_hall_feet_dimensions' => $row[129],
                                                'living_feet_dimensions' => $row[130],
                                                'dining_feet_dimensions' => $row[131],
                                                'kitchen_feet_dimensions' => $row[132],
                                                'office_library_feet_dimensions' => $row[133],
                                                'bedroom_total_number_of_1_feet_dimensions' => $row[134],
                                                'master_bedroom_feet_dimensions' => $row[135],
                                                'bedroom_total_number_of_2_feet_dimensions' => $row[136],
                                                'bedroom_total_number_of_3_feet_dimensions' => $row[137],
                                                'bedroom_total_number_of_4_feet_dimensions' => $row[138],
                                                'bedroom_total_number_of_5_feet_dimensions' => $row[139],
                                                'bedroom_total_number_of_6_feet_dimensions' => $row[140],
                                                'bathroom_total_number_of_1_feet_dimensions' => $row[141],
                                                'master_bathroom_feet_dimensions' => $row[142],
                                                'bathroom_total_number_of_2_feet_dimensions' => $row[143],
                                                'bathroom_total_number_of_3_feet_dimensions' => $row[144],
                                                'bathroom_total_number_of_4_feet_dimensions' => $row[145],
                                                'bathroom_total_number_of_5_feet_dimensions' => $row[146],
                                                'misc_total_number_of_1_feet_dimensions' => $row[147],
                                                'misc_total_number_of_2_feet_dimensions' => $row[148],
                                                'balcony_total_number_of_1_feet_dimensions' => $row[149],
                                                'balcony_total_number_of_2_feet_dimensions' => $row[150],
                                                'balcony_total_number_of_3_feet_dimensions' => $row[151],
                                                'balcony_total_number_of_4_feet_dimensions' => $row[152],
                                                'balcony_total_number_of_5_feet_dimensions' => $row[153],
                                                'balcony_total_number_of_6_feet_dimensions' => $row[154],
                                                'on_site_covered_car_parks' => $row[155],
                                                'on_site_covered_2_wheelers' => $row[156],
                                                'on_site_uncovered_car_parks' => $row[157],
                                                'on_site_uncovered_2_wheelers' => $row[158],
                                                'neighbor_unit_horizontal' => $row[159],
                                                'neighbor_unit_vertical' => $row[160],
                                                'average_daytime_vehicular_traffic' => $row[161],
                                                'average_daytime_pedestrian_traffic' => $row[162],
                                                'occupant_information' => $row[163],

                                                'status_id' => 1,
                                                'created_at' => $current_date,
                                                'updated_at' => $update_date
                                        );
                                }



                                if ($session_role_id == 1) {

                                        $result = $this->PropertyModel->uploadProperty(json_encode($data), $get_developer_id);


                                        if ($result == 1) {
                                                $this->load->model('LogModel');


                                                $dataLog = array(
                                                        'description' =>  $session_current_username . " Performed Upload Properties File Activity!",
                                                        'log_type_id' => 5,
                                                        'user_id' => $session_user_id,
                                                        'created_at' => $current_date,
                                                        'updated_at' => $current_date
                                                );

                                                $this->LogModel->addLog($dataLog);

                                                $this->output
                                                        ->set_content_type('application/json')
                                                        ->set_output(json_encode(array('code' => 200)));
                                        } else {
                                                $this->output
                                                        ->set_content_type('application/json')
                                                        ->set_output(json_encode(array('code' => 400)));
                                        }
                                } else {

                                        //load model
                                        $this->load->model('SettingsModel');

                                        $user_allowed_permission_detail_arr = $this->SettingsModel->getAllowdPermissions();


                                        $user_allowed_permission_detail = array_filter($user_allowed_permission_detail_arr, function ($ar) {
                                                return ($ar['setting_id'] == 1);
                                        });



                                        if (!empty($user_allowed_permission_detail)) {


                                                $result = $this->PropertyModel->uploadProperty(json_encode($data), $session_user_id);


                                                if ($result == 1) {
                                                        $this->load->model('LogModel');


                                                        $dataLog = array(
                                                                'description' =>  $session_current_username . " Performed Upload Properties File Activity!",
                                                                'log_type_id' => 5,
                                                                'user_id' => $session_user_id,
                                                                'created_at' => $current_date,
                                                                'updated_at' => $current_date
                                                        );

                                                        $this->LogModel->addLog($dataLog);

                                                        $this->session->set_userdata('user_allowed_permission_detail',  $user_allowed_permission_detail_arr);

                                                        $this->output
                                                                ->set_content_type('application/json')
                                                                ->set_output(json_encode(array('code' => 200)));
                                                } else {
                                                        $this->output
                                                                ->set_content_type('application/json')
                                                                ->set_output(json_encode(array('code' => 400)));
                                                }
                                        } else {

                                                $this->session->set_userdata('user_allowed_permission_detail',  $user_allowed_permission_detail_arr);

                                                $this->output
                                                        ->set_content_type('application/json')
                                                        ->set_output(json_encode(array('code' => 403)));
                                        }
                                }
                        }
                }
        }



        public function getAllDevelopersList()
        {
                if (!$this->session->userdata('userinfo')) {
                        redirect("/");
                } else {


                        if (!$this->input->post('ref')) {
                                redirect("/");
                        } else {
                                $user = $this->session->userdata('userinfo');

                                $session_role_id = $user['session_role_id'];

                                $ref = $this->input->post('ref');


                                //load model
                                $this->load->model('DeveloperModel');

                                $getAllDevelopers = $this->DeveloperModel->getAllDevelopers(2);

                                $developerSelectList = '';

                                foreach ($getAllDevelopers as $getDeveloperNames) {

                                        $developerSelectList .= '<option value="' . $getDeveloperNames["user_id"] . '">' . $getDeveloperNames["full_name"] . ' (' . $getDeveloperNames["user_name"] .  ') ' . '</option>';
                                }


                                if ($ref == 1) {
                                        $this->output
                                                ->set_content_type('application/json')
                                                ->set_output(json_encode(array("developerSelectList" => $developerSelectList), JSON_UNESCAPED_SLASHES));
                                }
                        }
                }
        }

        /*public function getPropertyListTable()
        {
            if (!$this->session->userdata('userinfo')) {
                redirect("/");
            } else {

                $user = $this->session->userdata('userinfo');

                $session_role_id = $user['session_role_id'];

                if (!$this->input->post('ref')) {
                    redirect("/");
                } else {
                    $ref = $this->input->post('ref');


                    //load model
                    $this->load->model('PropertyModel');

                    $getAllListProperties = $this->PropertyModel->getAllListProperties();



                    $propertyTableList = '<table class="data-table table " id="DataTables_Table_0">';

                    $propertyTableList .= '<thead class="bg-white text-uppercase">';
                    $propertyTableList .= '<tr class="ligth ligth-data" role="row">';
                    $propertyTableList .= '<th>PropertyID</th>';
                    $propertyTableList .= '<th>Project Name</th>';
                    $propertyTableList .= '<th>Unit Name</th>';
                    $propertyTableList .= '<th>Property Status</th>';
                    $propertyTableList .= '<th>Created At</th>';
                    $propertyTableList .= '<th>Action</th>';
                    $propertyTableList .= '</tr>';
                    $propertyTableList .= '</thead>';

                    $propertyTableList .= '<tbody  class="ligth-body">';



                    foreach ($getAllListProperties as $getProperty) {


                        $propertyTableList .= '<tr>';
                        $propertyTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getProperty['property_id'] . '</div> </td>';
                        $propertyTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getProperty['property_project_name'] . '</div> </td>';
                        $propertyTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getProperty['property_unit_name'] . '</div> </td>';
                        $propertyTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getProperty['property_status'] . '</div> </td>';
                        $propertyTableList .= '<td>' . '<div class="d-flex align-items-center">' . $getProperty['property_created_at'] . '</div> </td>';
                        $propertyTableList .= '<td>' . '<a class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" href="#"><i class="ri-eye-line mr-0"></i></a>' . '<a class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="' . base_url('property/edit/' . $getProperty['property_id'] . '') . '"><i class="ri-pencil-line mr-0"></i></a>' . '<a class="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="javascript:deleteProperty(' . $getProperty['property_id'] . ');"><i class="ri-delete-bin-line mr-0"></i></a>' . '</td>';
                        $propertyTableList .= '</tr>';
                    }

                    $propertyTableList .= '</tbody>';
                    $propertyTableList .= '</table>';




                    $this->output
                        ->set_content_type('application/json')
                        ->set_output(json_encode(array("propertyTableList" => $propertyTableList), JSON_UNESCAPED_SLASHES));
                }
            }
        }*/


        public function getPropertyListTable()
        {


                if (!$this->session->userdata('userinfo')) {
                        redirect("/");
                } else {

                        $user = $this->session->userdata('userinfo');

                        $session_role_id = $user['session_role_id'];

                        //load model
                        $this->load->model('PropertyModel');

                        $getAllListProperties = $this->PropertyModel->getAllListProperties();

                        echo json_encode(
                                $getAllListProperties
                        );
                }
        }


        public function deletePropertyFormData()
        {

                if (!$this->session->userdata('userinfo')) {
                        redirect("/");
                } else {

                        if (!$this->input->post('property_id')) {
                                redirect("/");
                        } else {

                                //load model
                                $this->load->model('PropertyModel');

                                $current_date = date("Y-m-d h:i:s");

                                $user = $this->session->userdata('userinfo');
                                $session_user_id = $user['session_user_id'];
                                $session_current_username = ucwords(strtolower($user['session_current_username']));

                                $property_id = $this->input->post('property_id');

                                $result = $this->PropertyModel->deleteProperty($property_id);

                                if ($result == 1) {

                                        $this->load->model('LogModel');

                                        $dataLog = array(
                                                'description' =>  $session_current_username . " Performed Delete Property Activity!",
                                                'log_type_id' => 12,
                                                'user_id' => $session_user_id,
                                                'created_at' => $current_date,
                                                'updated_at' => $current_date
                                        );

                                        $this->LogModel->addLog($dataLog);


                                        $this->output
                                                ->set_content_type('application/json')
                                                ->set_output(json_encode(array('code' => 200)));
                                } else {
                                        $this->output
                                                ->set_content_type('application/json')
                                                ->set_output(json_encode(array('code' => 400)));
                                }
                        }
                }
        }


        public function updatePropertyFormData()
        {

                if (!$this->session->userdata('userinfo')) {
                        redirect("/");
                } else {

                        if (!$this->input->post('modal_property_id') || !$this->input->post('modal_property_project_name') || !$this->input->post('modal_property_status_id')) {
                                redirect("/");
                        } else {

                                //load model
                                $this->load->model('PropertyModel');

                                $current_date = date("Y-m-d h:i:s");

                                $user = $this->session->userdata('userinfo');
                                $session_user_id = $user['session_user_id'];
                                $session_role_id = $user['session_role_id'];
                                $session_current_username = ucwords(strtolower($user['session_current_username']));

                                $property_id = $this->input->post('modal_property_id');

                                $project_name = $this->input->post('modal_property_project_name');

                                $filter_by_unit = $this->input->post('modal_property_filter_by_unit');
                                $unit_name = $this->input->post('modal_property_unit_name');
                                $display_name = $this->input->post('modal_property_display_name');
                                $unit_description = $this->input->post('modal_property_unit_description');
                                $unique_unit_id = $this->input->post('modal_property_unique_unit_id');
                                $space_usage = $this->input->post('modal_property_space_usage');
                                $address = $this->input->post('modal_property_address');
                                $building_name = $this->input->post('modal_property_building_name');
                                $building_use = $this->input->post('modal_property_building_use');
                                $blg_latitude = $this->input->post('modal_property_blg_latitude');
                                $blg_longitude = $this->input->post('modal_property_blg_longitude');
                                $blg_altitude = $this->input->post('modal_property_blg_altitude');
                                $blg_rotation = $this->input->post('modal_property_blg_rotation');
                                $blg_scale = $this->input->post('modal_property_blg_scale');
                                $blg_mirror_x = $this->input->post('modal_property_blg_mirror_x');
                                $blg_mirror_y = $this->input->post('modal_property_blg_mirror_y');
                                $plot_area = $this->input->post('modal_property_plot_area');
                                $plot_fsi = $this->input->post('modal_property_plot_fsi');
                                $plot_coverage_ratio = $this->input->post('modal_property_plot_coverage_ratio');
                                $plot_maximum_height = $this->input->post('modal_property_plot_maximum_height');
                                $front_setback = $this->input->post('modal_property_front_setback');
                                $lateral_setbacks = $this->input->post('modal_property_lateral_setbacks');
                                $building_height_stories = $this->input->post('modal_property_building_height_stories');
                                $year_built_renovated = $this->input->post('modal_property_year_built_renovated');
                                $building_size_m2 = $this->input->post('modal_property_building_size_m2');
                                $building_size_sqft = $this->input->post('modal_property_building_size_sqft');
                                $typical_floor_size_m2 = $this->input->post('modal_property_typical_floor_size_m2');
                                $typical_floor_size_sqft = $this->input->post('modal_property_typical_floor_size_sqft');
                                $green_certification = $this->input->post('modal_property_green_certification');
                                $well_certification = $this->input->post('modal_property_well_certification');
                                $energy_certification = $this->input->post('modal_property_energy_certification');
                                $building_grade = $this->input->post('modal_property_building_grade');
                                $building_section = $this->input->post('modal_property_building_section');
                                $building_section_html_color = $this->input->post('modal_property_building_section_html_color');
                                $floor = $this->input->post('modal_property_floor');
                                $floor_efficiency = $this->input->post('modal_property_floor_efficiency');
                                $orientation = $this->input->post('modal_property_orientation');
                                $total_number_of_bedrooms = $this->input->post('modal_property_total_number_of_bedrooms');
                                $total_number_of_bathrooms = $this->input->post('modal_property_total_number_of_bathrooms');
                                $area_m2 = $this->input->post('modal_property_area_m2');
                                $area_sqft = $this->input->post('modal_property_area_sqft');
                                $price = $this->input->post('modal_property_price');
                                $price_per_area = $this->input->post('modal_property_price_per_area');
                                $base_price = $this->input->post('modal_property_base_price');
                                $adjusted_price = $this->input->post('modal_property_adjusted_price');
                                $availability = $this->input->post('modal_property_availability');
                                $availability_html_color = $this->input->post('modal_property_availability_html_color');
                                $availability_date = $this->input->post('modal_property_availability_date');
                                $condition = $this->input->post('modal_property_condition');
                                $term_length = $this->input->post('modal_property_term_length');
                                $term_structure = $this->input->post('modal_property_term_structure');
                                $minimum_capacity = $this->input->post('modal_property_minimum_capacity');
                                $maximum_capacity = $this->input->post('modal_property_maximum_capacity');
                                $for_sale_boolean = $this->input->post('modal_property_for_sale_boolean');
                                $for_rent_boolean = $this->input->post('modal_property_for_rent_boolean');
                                $private_garden_boolean = $this->input->post('modal_property_private_garden_boolean');
                                $full_vastu_boolean = $this->input->post('modal_property_full_vastu_boolean');
                                $combinable_boolean = $this->input->post('modal_property_combinable_boolean');
                                $divisible_boolean = $this->input->post('modal_property_divisible_boolean');
                                $service_room_boolean = $this->input->post('modal_property_service_room_boolean');
                                $enclosed_kitchen_boolean = $this->input->post('modal_property_enclosed_kitchen_boolean');
                                $open_kitchen_boolean = $this->input->post('modal_property_open_kitchen_boolean');
                                $home_office_boolean = $this->input->post('modal_property_home_office_boolean');
                                $duplex_boolean = $this->input->post('modal_property_duplex_boolean');
                                $furnished_boolean = $this->input->post('modal_property_furnished_boolean');
                                $corner_frontage_boolean = $this->input->post('modal_property_corner_frontage_boolean');
                                $exterior_boolean = $this->input->post('modal_property_exterior_boolean');
                                $raised_flooring_boolean = $this->input->post('modal_property_raised_flooring_boolean');
                                $n_or_e_entrance_boolean = $this->input->post('modal_property_n_or_e_entrance_boolean');
                                $modern_boolean = $this->input->post('modal_property_modern_boolean');
                                $classic_boolean = $this->input->post('modal_property_classic_boolean');
                                $url = $this->input->post('modal_property_url');
                                $same_units = $this->input->post('modal_property_same_units');
                                $lowres_floorplans = $this->input->post('modal_property_lowres_floorplans');
                                $highres_floorplans = $this->input->post('modal_property_highres_floorplans');
                                $img_building_plan = $this->input->post('modal_property_img_building_plan');
                                $img_building_plan2 = $this->input->post('modal_property_img_building_plan2');
                                $img_interiors = $this->input->post('modal_property_img_interiors');
                                $img_360 = $this->input->post('modal_property_img_360');
                                $img_outside_views = $this->input->post('modal_property_img_outside_views');
                                $media = $this->input->post('modal_property_media');
                                $na = $this->input->post('modal_property_na');
                                $indoor_carpet_area_m2_marketing = $this->input->post('modal_property_indoor_carpet_area_m2_marketing');
                                $outdoor_carpet_area_m2_marketing = $this->input->post('modal_property_outdoor_carpet_area_m2_marketing');
                                $indoor_carpet_area_sqft_marketing = $this->input->post('modal_property_indoor_carpet_area_sqft_marketing');
                                $outdoor_carpet_area_sqft_marketing = $this->input->post('modal_property_outdoor_carpet_area_sqft_marketing');
                                $clear_height_meters = $this->input->post('modal_property_clear_height_meters');
                                $clear_height_feet = $this->input->post('modal_property_clear_height_feet');
                                $floor_to_slab_height_meters = $this->input->post('modal_property_floor_to_slab_height_meters');
                                $floor_to_slab_height_feet = $this->input->post('modal_property_floor_to_slab_height_feet');
                                $street_frontage_meters = $this->input->post('modal_property_street_frontage_meters');
                                $street_frontage_feet = $this->input->post('modal_property_street_frontage_feet');
                                $indoor_storefront_meters = $this->input->post('modal_property_indoor_storefront_meters');
                                $indoor_storefront_feet = $this->input->post('modal_property_indoor_storefront_feet');
                                $average_depth_meters = $this->input->post('modal_property_average_depth_meters');
                                $average_depth_feet = $this->input->post('modal_property_average_depth_feet');
                                $column_grid_meters_dimensions = $this->input->post('modal_property_column_grid_meters_dimensions');
                                $column_grid_feet_dimensions = $this->input->post('modal_property_column_grid_feet_dimensions');
                                $core_to_facade_meters_dimensions = $this->input->post('modal_property_core_to_facade_meters_dimensions');
                                $core_to_facade_feet_dimensions = $this->input->post('modal_property_core_to_facade_feet_dimensions');
                                $window_to_midpoint_meters_dimensions = $this->input->post('modal_property_window_to_midpoint_meters_dimensions');
                                $window_to_midpoint_feet_dimensions = $this->input->post('modal_property_window_to_midpoint_feet_dimensions');
                                $entrance_hall_meters_dimensions = $this->input->post('modal_property_entrance_hall_meters_dimensions');
                                $living_meters_dimensions = $this->input->post('modal_property_living_meters_dimensions');
                                $dining_meters_dimensions = $this->input->post('modal_property_dining_meters_dimensions');
                                $kitchen_meters_dimensions = $this->input->post('modal_property_kitchen_meters_dimensions');
                                $office_library_meters_dimensions = $this->input->post('modal_property_office_library_meters_dimensions');
                                $bedroom_total_number_of_1_meters_dimensions = $this->input->post('modal_property_bedroom_total_number_of_1_meters_dimensions');
                                $master_bedroom_meters_dimensions = $this->input->post('modal_property_master_bedroom_meters_dimensions');
                                $bedroom_total_number_of_2_meters_dimensions = $this->input->post('modal_property_bedroom_total_number_of_2_meters_dimensions');
                                $bedroom_total_number_of_3_meters_dimensions = $this->input->post('modal_property_bedroom_total_number_of_3_meters_dimensions');
                                $bedroom_total_number_of_4_meters_dimensions = $this->input->post('modal_property_bedroom_total_number_of_4_meters_dimensions');
                                $bedroom_total_number_of_5_meters_dimensions = $this->input->post('modal_property_bedroom_total_number_of_5_meters_dimensions');
                                $bedroom_total_number_of_6_meters_dimensions = $this->input->post('modal_property_bedroom_total_number_of_6_meters_dimensions');
                                $bathroom_total_number_of_1_meters_dimensions = $this->input->post('modal_property_bathroom_total_number_of_1_meters_dimensions');
                                $master_bathroom_meters_dimensions = $this->input->post('modal_property_master_bathroom_meters_dimensions');
                                $bathroom_total_number_of_2_meters_dimensions = $this->input->post('modal_property_bathroom_total_number_of_2_meters_dimensions');
                                $bathroom_total_number_of_3_meters_dimensions = $this->input->post('modal_property_bathroom_total_number_of_3_meters_dimensions');
                                $bathroom_total_number_of_4_meters_dimensions = $this->input->post('modal_property_bathroom_total_number_of_4_meters_dimensions');
                                $bathroom_total_number_of_5_meters_dimensions = $this->input->post('modal_property_bathroom_total_number_of_5_meters_dimensions');
                                $misc_total_number_of_1_meters_dimensions = $this->input->post('modal_property_misc_total_number_of_1_meters_dimensions');
                                $misc_total_number_of_2_meters_dimensions = $this->input->post('modal_property_misc_total_number_of_2_meters_dimensions');
                                $balcony_total_number_of_1_meters_dimensions = $this->input->post('modal_property_balcony_total_number_of_1_meters_dimensions');
                                $balcony_total_number_of_2_meters_dimensions = $this->input->post('modal_property_balcony_total_number_of_2_meters_dimensions');
                                $balcony_total_number_of_3_meters_dimensions = $this->input->post('modal_property_balcony_total_number_of_3_meters_dimensions');
                                $balcony_total_number_of_4_meters_dimensions = $this->input->post('modal_property_balcony_total_number_of_4_meters_dimensions');
                                $balcony_total_number_of_5_meters_dimensions = $this->input->post('modal_property_balcony_total_number_of_5_meters_dimensions');
                                $balcony_total_number_of_6_meters_dimensions = $this->input->post('modal_property_balcony_total_number_of_6_meters_dimensions');
                                $entrance_hall_feet_dimensions = $this->input->post('modal_property_entrance_hall_feet_dimensions');
                                $living_feet_dimensions = $this->input->post('modal_property_living_feet_dimensions');
                                $dining_feet_dimensions = $this->input->post('modal_property_dining_feet_dimensions');
                                $kitchen_feet_dimensions = $this->input->post('modal_property_kitchen_feet_dimensions');
                                $office_library_feet_dimensions = $this->input->post('modal_property_office_library_feet_dimensions');
                                $bedroom_total_number_of_1_feet_dimensions = $this->input->post('modal_property_bedroom_total_number_of_1_feet_dimensions');
                                $master_bedroom_feet_dimensions = $this->input->post('modal_property_master_bedroom_feet_dimensions');
                                $bedroom_total_number_of_2_feet_dimensions = $this->input->post('modal_property_bedroom_total_number_of_2_feet_dimensions');
                                $bedroom_total_number_of_3_feet_dimensions = $this->input->post('modal_property_bedroom_total_number_of_3_feet_dimensions');
                                $bedroom_total_number_of_4_feet_dimensions = $this->input->post('modal_property_bedroom_total_number_of_4_feet_dimensions');
                                $bedroom_total_number_of_5_feet_dimensions = $this->input->post('modal_property_bedroom_total_number_of_5_feet_dimensions');
                                $bedroom_total_number_of_6_feet_dimensions = $this->input->post('modal_property_bedroom_total_number_of_6_feet_dimensions');
                                $bathroom_total_number_of_1_feet_dimensions = $this->input->post('modal_property_bathroom_total_number_of_1_feet_dimensions');
                                $master_bathroom_feet_dimensions = $this->input->post('modal_property_master_bathroom_feet_dimensions');
                                $bathroom_total_number_of_2_feet_dimensions = $this->input->post('modal_property_bathroom_total_number_of_2_feet_dimensions');
                                $bathroom_total_number_of_3_feet_dimensions = $this->input->post('modal_property_bathroom_total_number_of_3_feet_dimensions');
                                $bathroom_total_number_of_4_feet_dimensions = $this->input->post('modal_property_bathroom_total_number_of_4_feet_dimensions');
                                $bathroom_total_number_of_5_feet_dimensions = $this->input->post('modal_property_bathroom_total_number_of_5_feet_dimensions');
                                $misc_total_number_of_1_feet_dimensions = $this->input->post('modal_property_misc_total_number_of_1_feet_dimensions');
                                $misc_total_number_of_2_feet_dimensions = $this->input->post('modal_property_misc_total_number_of_2_feet_dimensions');
                                $balcony_total_number_of_1_feet_dimensions = $this->input->post('modal_property_balcony_total_number_of_1_feet_dimensions');
                                $balcony_total_number_of_2_feet_dimensions = $this->input->post('modal_property_balcony_total_number_of_2_feet_dimensions');
                                $balcony_total_number_of_3_feet_dimensions = $this->input->post('modal_property_balcony_total_number_of_3_feet_dimensions');
                                $balcony_total_number_of_4_feet_dimensions = $this->input->post('modal_property_balcony_total_number_of_4_feet_dimensions');
                                $balcony_total_number_of_5_feet_dimensions = $this->input->post('modal_property_balcony_total_number_of_5_feet_dimensions');
                                $balcony_total_number_of_6_feet_dimensions = $this->input->post('modal_property_balcony_total_number_of_6_feet_dimensions');
                                $on_site_covered_car_parks = $this->input->post('modal_property_on_site_covered_car_parks');
                                $on_site_covered_2_wheelers = $this->input->post('modal_property_on_site_covered_2_wheelers');
                                $on_site_uncovered_car_parks = $this->input->post('modal_property_on_site_uncovered_car_parks');
                                $on_site_uncovered_2_wheelers = $this->input->post('modal_property_on_site_uncovered_2_wheelers');
                                $neighbor_unit_horizontal = $this->input->post('modal_property_neighbor_unit_horizontal');
                                $neighbor_unit_vertical = $this->input->post('modal_property_neighbor_unit_vertical');
                                $average_daytime_vehicular_traffic = $this->input->post('modal_property_average_daytime_vehicular_traffic');
                                $average_daytime_pedestrian_traffic = $this->input->post('modal_property_average_daytime_pedestrian_traffic');
                                $occupant_information = $this->input->post('modal_property_occupant_information');





                                $property_status_type_id = $this->input->post('modal_property_status_id');



                                $data = array(
                                        'project_name' => $project_name,


                                        "filter_by_unit" => $filter_by_unit,
                                        "unit_name" => $unit_name,
                                        "display_name" => $display_name,
                                        "unit_description" => $unit_description,
                                        "unique_unit_id" => $unique_unit_id,
                                        "space_usage" => $space_usage,
                                        "address" => $address,
                                        "building_name" => $building_name,
                                        "building_use" => $building_use,
                                        "blg_latitude" => $blg_latitude,
                                        "blg_longitude" => $blg_longitude,
                                        "blg_altitude" => $blg_altitude,
                                        "blg_rotation" => $blg_rotation,
                                        "blg_scale" => $blg_scale,
                                        "blg_mirror_x" => $blg_mirror_x,
                                        "blg_mirror_y" => $blg_mirror_y,
                                        "plot_area" => $plot_area,
                                        "plot_fsi" => $plot_fsi,
                                        "plot_coverage_ratio" => $plot_coverage_ratio,
                                        "plot_maximum_height" => $plot_maximum_height,
                                        "front_setback" => $front_setback,
                                        "lateral_setbacks" => $lateral_setbacks,
                                        "building_height_stories" => $building_height_stories,
                                        "year_built_renovated" => $year_built_renovated,
                                        "building_size_m2" => $building_size_m2,
                                        "building_size_sqft" => $building_size_sqft,
                                        "typical_floor_size_m2" => $typical_floor_size_m2,
                                        "typical_floor_size_sqft" => $typical_floor_size_sqft,
                                        "green_certification" => $green_certification,
                                        "well_certification" => $well_certification,
                                        "energy_certification" => $energy_certification,
                                        "building_grade" => $building_grade,
                                        "building_section" => $building_section,
                                        "building_section_html_color" => $building_section_html_color,
                                        "floor" => $floor,
                                        "floor_efficiency" => $floor_efficiency,
                                        "orientation" => $orientation,
                                        "total_number_of_bedrooms" => $total_number_of_bedrooms,
                                        "total_number_of_bathrooms" => $total_number_of_bathrooms,
                                        "area_m2" => $area_m2,
                                        "area_sqft" => $area_sqft,
                                        "price" => $price,
                                        "price_per_area" => $price_per_area,
                                        "base_price" => $base_price,
                                        "adjusted_price" => $adjusted_price,
                                        "availability" => $availability,
                                        "availability_html_color" => $availability_html_color,
                                        "availability_date" => $availability_date,
                                        "condition" => $condition,
                                        "term_length" => $term_length,
                                        "term_structure" => $term_structure,
                                        "minimum_capacity" => $minimum_capacity,
                                        "maximum_capacity" => $maximum_capacity,
                                        "for_sale_boolean" => $for_sale_boolean,
                                        "for_rent_boolean" => $for_rent_boolean,
                                        "private_garden_boolean" => $private_garden_boolean,
                                        "full_vastu_boolean" => $full_vastu_boolean,
                                        "combinable_boolean" => $combinable_boolean,
                                        "divisible_boolean" => $divisible_boolean,
                                        "service_room_boolean" => $service_room_boolean,
                                        "enclosed_kitchen_boolean" => $enclosed_kitchen_boolean,
                                        "open_kitchen_boolean" => $open_kitchen_boolean,
                                        "home_office_boolean" => $home_office_boolean,
                                        "duplex_boolean" => $duplex_boolean,
                                        "furnished_boolean" => $furnished_boolean,
                                        "corner_frontage_boolean" => $corner_frontage_boolean,
                                        "exterior_boolean" => $exterior_boolean,
                                        "raised_flooring_boolean" => $raised_flooring_boolean,
                                        "n_or_e_entrance_boolean" => $n_or_e_entrance_boolean,
                                        "modern_boolean" => $modern_boolean,
                                        "classic_boolean" => $classic_boolean,
                                        "url" => $url,
                                        "same_units" => $same_units,
                                        "lowres_floorplans" => $lowres_floorplans,
                                        "highres_floorplans" => $highres_floorplans,
                                        "img_building_plan" => $img_building_plan,
                                        "img_building_plan2" => $img_building_plan2,
                                        "img_interiors" => $img_interiors,
                                        "img_360" => $img_360,
                                        "img_outside_views" => $img_outside_views,
                                        "media" => $media,
                                        "na" => $na,
                                        "indoor_carpet_area_m2_marketing" => $indoor_carpet_area_m2_marketing,
                                        "outdoor_carpet_area_m2_marketing" => $outdoor_carpet_area_m2_marketing,
                                        "indoor_carpet_area_sqft_marketing" => $indoor_carpet_area_sqft_marketing,
                                        "outdoor_carpet_area_sqft_marketing" => $outdoor_carpet_area_sqft_marketing,
                                        "clear_height_meters" => $clear_height_meters,
                                        "clear_height_feet" => $clear_height_feet,
                                        "floor_to_slab_height_meters" => $floor_to_slab_height_meters,
                                        "floor_to_slab_height_feet" => $floor_to_slab_height_feet,
                                        "street_frontage_meters" => $street_frontage_meters,
                                        "street_frontage_feet" => $street_frontage_feet,
                                        "indoor_storefront_meters" => $indoor_storefront_meters,
                                        "indoor_storefront_feet" => $indoor_storefront_feet,
                                        "average_depth_meters" => $average_depth_meters,
                                        "average_depth_feet" => $average_depth_feet,
                                        "column_grid_meters_dimensions" => $column_grid_meters_dimensions,
                                        "column_grid_feet_dimensions" => $column_grid_feet_dimensions,
                                        "core_to_facade_meters_dimensions" => $core_to_facade_meters_dimensions,
                                        "core_to_facade_feet_dimensions" => $core_to_facade_feet_dimensions,
                                        "window_to_midpoint_meters_dimensions" => $window_to_midpoint_meters_dimensions,
                                        "window_to_midpoint_feet_dimensions" => $window_to_midpoint_feet_dimensions,
                                        "entrance_hall_meters_dimensions" => $entrance_hall_meters_dimensions,
                                        "living_meters_dimensions" => $living_meters_dimensions,
                                        "dining_meters_dimensions" => $dining_meters_dimensions,
                                        "kitchen_meters_dimensions" => $kitchen_meters_dimensions,
                                        "office_library_meters_dimensions" => $office_library_meters_dimensions,
                                        "bedroom_total_number_of_1_meters_dimensions" => $bedroom_total_number_of_1_meters_dimensions,
                                        "master_bedroom_meters_dimensions" => $master_bedroom_meters_dimensions,
                                        "bedroom_total_number_of_2_meters_dimensions" => $bedroom_total_number_of_2_meters_dimensions,
                                        "bedroom_total_number_of_3_meters_dimensions" => $bedroom_total_number_of_3_meters_dimensions,
                                        "bedroom_total_number_of_4_meters_dimensions" => $bedroom_total_number_of_4_meters_dimensions,
                                        "bedroom_total_number_of_5_meters_dimensions" => $bedroom_total_number_of_5_meters_dimensions,
                                        "bedroom_total_number_of_6_meters_dimensions" => $bedroom_total_number_of_6_meters_dimensions,
                                        "bathroom_total_number_of_1_meters_dimensions" => $bathroom_total_number_of_1_meters_dimensions,
                                        "master_bathroom_meters_dimensions" => $master_bathroom_meters_dimensions,
                                        "bathroom_total_number_of_2_meters_dimensions" => $bathroom_total_number_of_2_meters_dimensions,
                                        "bathroom_total_number_of_3_meters_dimensions" => $bathroom_total_number_of_3_meters_dimensions,
                                        "bathroom_total_number_of_4_meters_dimensions" => $bathroom_total_number_of_4_meters_dimensions,
                                        "bathroom_total_number_of_5_meters_dimensions" => $bathroom_total_number_of_5_meters_dimensions,
                                        "misc_total_number_of_1_meters_dimensions" => $misc_total_number_of_1_meters_dimensions,
                                        "misc_total_number_of_2_meters_dimensions" => $misc_total_number_of_2_meters_dimensions,
                                        "balcony_total_number_of_1_meters_dimensions" => $balcony_total_number_of_1_meters_dimensions,
                                        "balcony_total_number_of_2_meters_dimensions" => $balcony_total_number_of_2_meters_dimensions,
                                        "balcony_total_number_of_3_meters_dimensions" => $balcony_total_number_of_3_meters_dimensions,
                                        "balcony_total_number_of_4_meters_dimensions" => $balcony_total_number_of_4_meters_dimensions,
                                        "balcony_total_number_of_5_meters_dimensions" => $balcony_total_number_of_5_meters_dimensions,
                                        "balcony_total_number_of_6_meters_dimensions" => $balcony_total_number_of_6_meters_dimensions,
                                        "entrance_hall_feet_dimensions" => $entrance_hall_feet_dimensions,
                                        "living_feet_dimensions" => $living_feet_dimensions,
                                        "dining_feet_dimensions" => $dining_feet_dimensions,
                                        "kitchen_feet_dimensions" => $kitchen_feet_dimensions,
                                        "office_library_feet_dimensions" => $office_library_feet_dimensions,
                                        "bedroom_total_number_of_1_feet_dimensions" => $bedroom_total_number_of_1_feet_dimensions,
                                        "master_bedroom_feet_dimensions" => $master_bedroom_feet_dimensions,
                                        "bedroom_total_number_of_2_feet_dimensions" => $bedroom_total_number_of_2_feet_dimensions,
                                        "bedroom_total_number_of_3_feet_dimensions" => $bedroom_total_number_of_3_feet_dimensions,
                                        "bedroom_total_number_of_4_feet_dimensions" => $bedroom_total_number_of_4_feet_dimensions,
                                        "bedroom_total_number_of_5_feet_dimensions" => $bedroom_total_number_of_5_feet_dimensions,
                                        "bedroom_total_number_of_6_feet_dimensions" => $bedroom_total_number_of_6_feet_dimensions,
                                        "bathroom_total_number_of_1_feet_dimensions" => $bathroom_total_number_of_1_feet_dimensions,
                                        "master_bathroom_feet_dimensions" => $master_bathroom_feet_dimensions,
                                        "bathroom_total_number_of_2_feet_dimensions" => $bathroom_total_number_of_2_feet_dimensions,
                                        "bathroom_total_number_of_3_feet_dimensions" => $bathroom_total_number_of_3_feet_dimensions,
                                        "bathroom_total_number_of_4_feet_dimensions" => $bathroom_total_number_of_4_feet_dimensions,
                                        "bathroom_total_number_of_5_feet_dimensions" => $bathroom_total_number_of_5_feet_dimensions,
                                        "misc_total_number_of_1_feet_dimensions" => $misc_total_number_of_1_feet_dimensions,
                                        "misc_total_number_of_2_feet_dimensions" => $misc_total_number_of_2_feet_dimensions,
                                        "balcony_total_number_of_1_feet_dimensions" => $balcony_total_number_of_1_feet_dimensions,
                                        "balcony_total_number_of_2_feet_dimensions" => $balcony_total_number_of_2_feet_dimensions,
                                        "balcony_total_number_of_3_feet_dimensions" => $balcony_total_number_of_3_feet_dimensions,
                                        "balcony_total_number_of_4_feet_dimensions" => $balcony_total_number_of_4_feet_dimensions,
                                        "balcony_total_number_of_5_feet_dimensions" => $balcony_total_number_of_5_feet_dimensions,
                                        "balcony_total_number_of_6_feet_dimensions" => $balcony_total_number_of_6_feet_dimensions,
                                        "on_site_covered_car_parks" => $on_site_covered_car_parks,
                                        "on_site_covered_2_wheelers" => $on_site_covered_2_wheelers,
                                        "on_site_uncovered_car_parks" => $on_site_uncovered_car_parks,
                                        "on_site_uncovered_2_wheelers" => $on_site_uncovered_2_wheelers,
                                        "neighbor_unit_horizontal" => $neighbor_unit_horizontal,
                                        "neighbor_unit_vertical" => $neighbor_unit_vertical,
                                        "average_daytime_vehicular_traffic" => $average_daytime_vehicular_traffic,
                                        "average_daytime_pedestrian_traffic" => $average_daytime_pedestrian_traffic,
                                        "occupant_information" => $occupant_information,


                                        'status_id' => $property_status_type_id,
                                        'updated_at' => $current_date
                                );


                                if ($session_role_id == 1) {

                                        $result = $this->PropertyModel->updateProperty($data, $property_id);



                                        if ($result == 1) {

                                                $this->load->model('LogModel');

                                                $dataLog = array(
                                                        'description' =>  $session_current_username . " Performed Update Property Activity!",
                                                        'log_type_id' => 13,
                                                        'user_id' => $session_user_id,
                                                        'created_at' => $current_date,
                                                        'updated_at' => $current_date
                                                );

                                                $this->LogModel->addLog($dataLog);


                                                $this->output
                                                        ->set_content_type('application/json')
                                                        ->set_output(json_encode(array('code' => 200)));
                                        } else {
                                                $this->output
                                                        ->set_content_type('application/json')
                                                        ->set_output(json_encode(array('code' => 400)));
                                        }
                                } else {
                                        //load model
                                        $this->load->model('SettingsModel');

                                        $user_allowed_permission_detail_arr = $this->SettingsModel->getAllowdPermissions();



                                        $user_allowed_permission_detail = array_filter($user_allowed_permission_detail_arr, function ($ar) {
                                                return ($ar['setting_id'] == 2);
                                        });



                                        if (!empty($user_allowed_permission_detail)) {

                                                $result = $this->PropertyModel->updateProperty($data, $property_id);


                                                if ($result == 1) {

                                                        $this->load->model('LogModel');

                                                        $dataLog = array(
                                                                'description' =>  $session_current_username . " Performed Update Property Activity!",
                                                                'log_type_id' => 13,
                                                                'user_id' => $session_user_id,
                                                                'created_at' => $current_date,
                                                                'updated_at' => $current_date
                                                        );

                                                        $this->LogModel->addLog($dataLog);

                                                        $this->session->set_userdata('user_allowed_permission_detail',  $user_allowed_permission_detail_arr);

                                                        $this->output
                                                                ->set_content_type('application/json')
                                                                ->set_output(json_encode(array('code' => 200)));
                                                } else {
                                                        $this->output
                                                                ->set_content_type('application/json')
                                                                ->set_output(json_encode(array('code' => 400)));
                                                }
                                        } else {
                                                $this->session->set_userdata('user_allowed_permission_detail',  $user_allowed_permission_detail_arr);

                                                $this->output
                                                        ->set_content_type('application/json')
                                                        ->set_output(json_encode(array('code' => 403)));
                                        }
                                }
                        }
                }
        }

        public function getPropertiesModalFieldsData()
        {

                if (!$this->session->userdata('userinfo')) {
                        redirect("/");
                } else {

                        if (!$this->input->post('property_id')) {
                                redirect("/");
                        } else {
                                $user = $this->session->userdata('userinfo');

                                $session_role_id = $user['session_role_id'];

                                //load model
                                $this->load->model('PropertyModel');
                                $this->load->model('GroupModel');
                                $this->load->model('HeadingModel');


                                $property_id = $this->input->post('property_id');
                                $getPropertiesModalFieldsData = $this->PropertyModel->getPropertiesModalFieldsData($property_id);
                                $getAllListGroups = $this->GroupModel->getAllActiveGroups();

                                $propertyModalFieldset = "";
                                $propertyModalGroupTitle = "";
                                $propertyModalHeadingFields = "";
                                $propertyModalHeadingFieldsForEachGroup = "";
                                $count = 0;

                                foreach ($getAllListGroups as $groups) {

                                        $groupId = ucwords(strtolower($groups["group_unqique_id"]));
                                        $groupTitle = ucwords(strtolower($groups["group_name"]));
                                        $groupIconShortcode = $groups["group_icon_shortcode"];

                                        $propertyModalHeadingFields = "";
                                        if ($groupId == 19) {
                                                $propertyModalGroupTitle .= '
                                                                                <li class="active">

                                                                                <a href="javascript:currentGroup(' . $count . ');" >
                                                                                <i style="font-size: 24px;" class="las ' . $groupIconShortcode . '"></i>
                                                                                <span>' . $groupTitle . '</span>
                                                                                        </a>
                                                                                </li>
                                                                        ';


                                                $propertyModalFieldset .= '<fieldset style="position: relative; opacity: 1;">

                                                                                <div class="form-card ">

                                                                                        <div class="row">
                                                                                                <div class="col-12">
                                                                                                <h3 >  <i class="las ' . $groupIconShortcode . '"></i> ' . $groupTitle . ' Information:</h3>
                                                                                        </div>
                                                                                 </div>
                                                                                 <br/>
                                                                        ';
                                        } else {
                                                $propertyModalGroupTitle .= '
                                                                                <li class="">
                                                                                <a href="javascript:currentGroup(' . $count . ');">
                                                                                <i style="font-size: 24px;" class="las ' . $groupIconShortcode . '"></i>
                                                                                        <span>' . $groupTitle . '</span>
                                                                                        </a>
                                                                                </li>
                                                                        ';



                                                $propertyModalFieldset .= '<fieldset style="opacity: 0; position: relative; display: none;">

                                                                                <div class="form-card ">

                                                                                <div class="row">
                                                                                        <div class="col-12">

                                                                                                <h3 >  <i class="las ' . $groupIconShortcode . '"></i> ' . $groupTitle . ' Information:</h3>
                                                                                        </div>
                                                                                </div>
                                                <br/>
                                                                        ';
                                        }

                                        $getAllListHeadings = $this->HeadingModel->getHeadingsByGroupId($groupId);




                                        foreach ($getAllListHeadings as $headings) {

                                                $document_id = "property_" . str_replace('#', 'total_number_of_', str_replace(' ', '_', strtolower($headings["heading_name"])));
                                                $document_name = "property_" . str_replace('#', 'total_number_of_', str_replace(' ', '_', strtolower($headings["heading_name"])));
                                                $place_holder = ucwords(strtolower($headings["heading_name"]));
                                                $label = ucwords(strtolower($headings["heading_name"]));
                                                $value = "property_" . str_replace('#', 'total_number_of_', str_replace(' ', '_', strtolower($headings["heading_name"])));

                                                $readonly = "";
                                                $selected = "";

                                                if ($headings["heading_name"] == "ID") {

                                                        $value = "property_unqique_id";

                                                        $readonly = "readonly";
                                                }

                                                if ($headings["heading_name"] == "STATUS ID") {



                                                        if ($getPropertiesModalFieldsData[0][$value] == 1 || $getPropertiesModalFieldsData[0][$value] == 2) {
                                                                $selected = "selected";
                                                        }

                                                        $propertyModalHeadingFields .= '



                                                        <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>' . $label  . ': </label>

                                                            <select id="modal_' .  $document_id . '" name="modal_' . $document_name . '" class="form-control" data-style="py-0">
                                                                <option id="modal_' .  $document_id . '_option" selected style="display:none" value="0">Select Property Status</option>
                                                                <option ' . $selected . ' value="1">Active</option>
                                                                <option value="2">Deactive</option>
                                                            </select>

                                                        </div>
                                                    </div>

                                                        ';
                                                } else {
                                                        $propertyModalHeadingFields .= '


                                                <div class="col-md-12">
                                                        <div class="form-group">
                                                                <label>' . $label  . ': </label>
                                                                <input type="text" class="form-control" id="modal_' .  $document_id . '" name="modal_' . $document_name . '" placeholder="' . $place_holder . '" required="" value="' . $getPropertiesModalFieldsData[0][$value] . '" ' . $readonly  . '>
                                                                <div class="help-block with-errors"></div>
                                                        </div>
                                                </div>

                                                ';
                                                }
                                        }

                                        $propertyModalFieldset .=   '<div class="row">' . $propertyModalHeadingFields . '</div>' .  ' </div>'  . '</fieldset>';

                                        $count++;
                                }

                                $ul_groups = ' <ul id="top-tabbar-vertical" class="p-0">' . $propertyModalGroupTitle . '</ul>';


                                $this->output
                                        ->set_content_type('application/json')
                                        ->set_output(json_encode(array("propertyModalHeadingGroups" => $ul_groups, "propertyModalFields" => $propertyModalFieldset), JSON_UNESCAPED_SLASHES));
                        }
                }
        }
}
