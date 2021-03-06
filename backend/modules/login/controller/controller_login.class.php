<?php
    require_once "JWT_token.php";
    class controller_login{
        function register(){
            
            $data = array(
                "username" => $_POST['p_data']['username'],
                "email" => $_POST['p_data']['email'],
                "psswd" => $_POST['p_data']['psswd']
            );

            $return = loadModel(MODEL_LOGIN, "login_model", "register", $data);
            $data = array(
                "username" => $_POST['p_data']['username'],
                "email" => $_POST['p_data']['email'],
                "psswd" => $_POST['p_data']['psswd'],
                "type" => "register",
                "token" => $return['token']
            );
            if ($return['work']){
                email($data);
            }else{
                echo "error";
            }
            
            echo json_encode(true);
        }
        function activate(){
            loadModel(MODEL_LOGIN, "login_model", "activate", $_POST['p_data']);
            echo json_encode(true);
        }
        function login(){
            $user=loadModel(MODEL_LOGIN, "login_model", "login", $_POST['p_data']['username']);
            // echo json_encode($user);

            // if (!$user){
            //     echo json_encode("the username not exists");
            // }else{
                if (password_verify($_POST['p_data']['psswd'],$user[0]['psswd'])) {
                    if ($user[0]['active']=="1"){
                        $token=encode_token($user[0]['idusers']);
                        $data = array(
                            "work" => "true",
                            "token" => $token
                        );
                        echo json_encode($data);
                    }else{
                        echo json_encode("first activate your account");
                    }
                }else{
                    echo json_encode("username or password incorrects");
                }
            // }
        }

        function login_a(){
            $result=loadModel(MODEL_LOGIN, "login_model", "login_a", $_POST['p_data']);
            $token=encode_token($_POST['p_data']['id']);
            echo json_encode($token);
        }

        function menu(){
            $token=decode_token($_POST['p_data']);
            $name=json_decode($token)->name;
            $data=loadModel(MODEL_LOGIN, "login_model", "id_user", $name);
            echo json_encode($data);
        }

        function logout(){
            session_destroy();
            header('Location: ' . amigable('module=login', true));
        }

        function token_login(){
            $username=$_POST['p_data'];
            $token=encode_token($username);
            $_SESSION['token'] = $token;
            $data = array (
                "username" => $username,
                "token" => $token
            );
            loadModel(MODEL_LOGIN, "login_model", "save_token", $data);
            echo json_encode($token);
        }

        function check_token(){
            // echo json_encode($_POST['p_data']);
            $token=loadModel(MODEL_LOGIN, "login_model", "token", $_POST['p_data']);
            if ($token){
                 echo json_encode("true");
            }else{
                echo json_encode("false");
            }
        }
        function fpsswd(){
            $exist=loadModel(MODEL_LOGIN, "login_model", "fpsswd", $_POST['username']);

            if($exist){
                echo json_encode($exist);
            }else{
                echo "error";
            }
        }
        function epsswd(){
            // echo json_encode($_POST['p_data']);
            $data = array(
                "username" => $_POST['p_data']['idusers'],
                "email" => $_POST['p_data']['email'],
                "type" => "psswd",
                "token" => $_POST['p_data']['token']
            );
            email($data);

            echo json_encode("done");
        }
        function cpsswd(){
            if (isset($_GET['token'])){
                $_SESSION['tokenp']=$_GET['token'];
                require(VIEW_PATH_TOP . "top_rpsswd.html");
                require(VIEW_PATH_INC . "menu.html");
                loadView(HTML_LOGIN,  $_GET['module'] . '.html');
                require(VIEW_PATH_INC . "footer.html");
            }else{
                $_SESSION['idusers']=$_GET['idusers'];
                require(VIEW_PATH_TOP . "top_rpsswd.html");
                require(VIEW_PATH_INC . "menu.html");
                loadView(HTML_LOGIN,  $_GET['module'] . '.html');
                require(VIEW_PATH_INC . "footer.html");
            }

        }
        function rpsswd(){
            loadModel(MODEL_LOGIN, "login_model", "rpsswd", $_POST['p_data']);
            echo json_encode(true);
        }
        function data_user(){
            $data=loadModel(MODEL_LOGIN, "login_model", "data_user");
            echo json_encode($data);
        }
    }
?>