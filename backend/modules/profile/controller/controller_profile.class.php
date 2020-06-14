<?php
    class controller_profile{

        function c_user(){
            $json=loadModel(MODEL_PROFILE, "profile_model", "c_user", $_POST['p_data']);
            echo json_encode($json);
        }

    }
?>