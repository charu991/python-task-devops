<!-- Wrapper Start -->
<div class="wrapper">
    <?php include "layouts/left-panel.php"; ?>

    <style>
        body {

            font-family: sans-serif;
        }

        #fontSizeWrapper {
            font-size: 16px;
        }

        #fontSize {
            width: 100px;
            font-size: 1em;
        }

        /* ————————————————————–
  Tree core styles
*/
        .tree {
            margin: 1em;
        }

        .tree input {
            position: absolute;
            clip: rect(0, 0, 0, 0);
        }

        .tree input~ul {
            display: none;
        }

        .tree input:checked~ul {
            display: block;
        }

        /* ————————————————————–
  Tree rows
*/
        .tree li {
            line-height: 1.2;
            position: relative;
            padding: 0 0 1em 1em;
        }

        .tree ul li {
            padding: 1em 0 0 1em;
        }

        .tree>li:last-child {
            padding-bottom: 0;
        }

        /* ————————————————————–
  Tree labels
*/
        .tree_label {
            position: relative;
            display: inline-block;
            background: #fff;
        }

        label.tree_label {
            cursor: pointer;
        }

        label.tree_label:hover {
            color: #666;
        }

        /* ————————————————————–
  Tree expanded icon
*/
        label.tree_label:before {
            background: #000;
            color: #fff;
            position: relative;
            z-index: 1;
            float: left;
            margin: 0 1em 0 -2em;
            width: 1em;
            height: 1em;
            border-radius: 1em;
            content: '+';
            text-align: center;
            line-height: .9em;
        }

        :checked~label.tree_label:before {
            content: '–';
        }

        /* ————————————————————–
  Tree branches
*/
        .tree li:before {
            position: absolute;
            top: 0;
            bottom: 0;
            left: -.5em;
            display: block;
            width: 0;
            border-left: 1px solid #777;
            content: "";
        }

        .tree_label:after {
            position: absolute;
            top: 0;
            left: -1.5em;
            display: block;
            height: 0.5em;
            width: 1em;
            border-bottom: 1px solid #777;
            border-left: 1px solid #777;
            border-radius: 0 0 0 .3em;
            content: '';
        }

        label.tree_label:after {
            border-bottom: 0;
        }

        :checked~label.tree_label:after {
            border-radius: 0 .3em 0 0;
            border-top: 1px solid #777;
            border-right: 1px solid #777;
            border-bottom: 0;
            border-left: 0;
            bottom: 0;
            top: 0.5em;
            height: auto;
        }

        .tree li:last-child:before {
            height: 1em;
            bottom: auto;
        }

        .tree>li:last-child:before {
            display: none;
        }

        .tree_custom {
            display: block;
            background: #eee;
            padding: 1em;
            border-radius: 0.3em;
        }

        #trash-icon:hover {


            color: white;
        }
    </style>


    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Group & Headings Relationship</h4>
                            <p class="mb-0">A dashboard provides you an overview of group list with access to the most important data,<br>
                                functions and controls.</p>
                        </div>

                    </div>

                    <div class="card ">


                        <div class="card-body">

                            <input type="hidden" value="<?php echo base_url('RelationshipGroupsHeading/getRelationshipGroupsHeading'); ?>" id="getRelationshipGroupsHeadingURL" />
                            <input type="hidden" value="<?php echo base_url('RelationshipGroupsHeading/deleteRelationshipGroupsHeading'); ?>" id="getDeleteRelationshipGroupsHeadingURL" />
                            <input type="hidden" value="<?php echo base_url('RelationshipGroupsHeading/getHeadingListTable'); ?>" id="getHeadingListTableURL" />
                            <input type="hidden" value="<?php echo base_url('RelationshipGroupsHeading/setRelationshipGroupsHeading'); ?>" id="setRelationshipGroupsHeadingURL" />
                            <input type="hidden" value="<?php echo base_url('RelationshipGroupsHeading/getRelationshipHeadingByGroupID'); ?>" id="getRelationshipHeadingByGroupIDURL" />

                            <div id="fontSizeWrapper">
                                <label for="fontSize">Font size</label>
                                <input type="range" value="1" id="fontSize" step="0.5" min="0.5" max="5" />
                            </div>
                            <ul class="tree" id="relationship_groups_heading">
                                <!-- <li>
                                    <input type="checkbox" checked="checked" id="c1" />
                                    <label for="c1" class="tree_label">Level 1</label>
                                    <ul>
                                        <li><span class="tree_label">Level 2</span></li>
                                        <li><span class="tree_label">Level 2</span></li>
                                    </ul>
                                </li>
    -->
                            </ul>



                        </div>
                    </div>
                </div>
            </div>
            <!-- Page end  -->
        </div>

        <!-- Modal Edit -->
        <div class="modal fade" id="heading_data_modal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="popup text-left">
                            <div class="media align-items-top justify-content-between">
                                <h3 class="mb-3">List Headings</h3>
                                <div class="btn-cancel p-0" data-dismiss="modal"><i class="las la-times"></i></div>
                            </div>
                            <div class="content edit-notes">
                                <div class="card card-transparent card-block card-stretch event-note mb-0">
                                    <div class="card-body px-0 bukmark">

                                        <div id="DataTablesArea">

                                            <table class="data-table table " id="DataTables_Table_0" style="width:100%;">
                                                <thead>
                                                    <tr>
                                                        <th>Heading Id</th>
                                                        <th>Heading Name</th>
                                                    </tr>
                                                </thead>
                                            </table>

                                        </div>

                                    </div>
                                    <div class="card-footer border-0">
                                        <div class="d-flex flex-wrap align-items-ceter justify-content-end">
                                            <div class="btn btn-primary mr-3" data-dismiss="modal">Cancel</div>
                                            <div id="btnSaveGroupHeadingRelation" class="btn btn-outline-primary">Save</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</div>

<!-- Backend Bundle JavaScript -->
<script src="<?php echo base_url(); ?>/assets/ajax/relationship_group_headings.js"></script>