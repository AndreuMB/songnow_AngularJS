<?php
	class controller_contact {
		
		function send_email(){
			// $data_mail = $_POST['p_data']; // p_data=same u have in promise
			
			//SEND CLIENT
			$arrArgument = array(
				'type' => 'contact',
				'inputName' => $_POST['p_data']['name'],
				'inputEmail' => $_POST['p_data']['email'],
				'inputMessage' => $_POST['p_data']['message']
			);
			try{
				email($arrArgument);
			}catch(exeption $e){
				echo "error";
				exit;
			}

			//SEND ADMIN
			$arrArgument = array(
				'type' => 'admin',
				'inputName' => $_POST['p_data']['name'],
				'inputEmail' => $_POST['p_data']['email'],
				'inputMessage' => $_POST['p_data']['message']
			);
			try{
				email($arrArgument);
			}catch(exeption $e){
				echo "error";
				exit;
			}
			echo json_encode(true);
		}

	}
