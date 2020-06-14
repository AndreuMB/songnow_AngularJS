<?php
    class controller_shop{

        function products(){
            $json = loadModel(MODEL_SHOP, "shop_model", "products");
            echo json_encode($json);
        }
        function read(){
            $json = loadModel(MODEL_SHOP, "shop_model", "read", $_POST['p_data']);
            echo json_encode($json);
        }
    }
?>