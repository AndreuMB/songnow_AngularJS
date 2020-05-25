<?php
    class controller_home{

        function carousel(){
            $json = loadModel(MODEL_HOME, "home_model", "carousel");
            echo json_encode($json);
        }

        function categories(){
            $page					=	intval($_POST['p_data']);
            $current_page			=	$page;
            $records_per_page		=	3; // records to show per page
            $start					=	$current_page * $records_per_page;
            $json = loadModel(MODEL_HOME, "home_model", "categories", $start);
            echo json_encode($json);
        }
        function sum_view_song(){
            $json = loadModel(MODEL_HOME, "home_model", "sum_view_song", $_POST['p_data']);
            echo json_encode($json);
        }
        function sum_view_categ(){
            $json = loadModel(MODEL_HOME, "home_model", "sum_view_categ", $_POST['p_data']);
            echo json_encode($json);
        }

    }
?>