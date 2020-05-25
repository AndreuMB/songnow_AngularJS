<?php
class home_dao {
    static $_instance;

    private function __construct() {

    }

    public static function getInstance() {
        if(!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function select_data_list($db,$arrArgument) {
        $sql = "SELECT name,chip,breed,sex,stature,picture,date_birth FROM dogs WHERE breed LIKE '%$arrArgument%' ORDER BY chip";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_details($db,$arrArgument) {
        $sql = "SELECT name,chip,breed,sex,stature,picture,date_birth,tlp,country,province,city,cinfo,dinfo FROM dogs WHERE chip = '$arrArgument'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_best_breed($db,$arrArgument) {
        $sql = "SELECT breed FROM dogs GROUP BY breed ORDER BY count(*) DESC LIMIT $arrArgument,2";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_load_name($db) {
        $sql = "SELECT DISTINCT name FROM dogs WHERE state = 0";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_auto_name($db,$arrArgument) {
        $sql = "SELECT DISTINCT name,chip,breed,sex,stature,picture,date_birth FROM dogs WHERE name LIKE '%$arrArgument%' AND state = 0";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function update_active_user($db,$arrArgument) {
        $sql = "UPDATE users SET activate = 1 WHERE token = '$arrArgument'";
        return $db->ejecutar($sql);
    }
    public function select_data_carousel($db) {
        $sql = "SELECT img.*, songs.* FROM img, songs WHERE type='carousel' AND songs.id_img=img.id";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_data_categories($db,$arrArgument) {
        // $sql = "SELECT * FROM img WHERE type='categories' ORDER BY views DESC LIMIT $arrArgument OFFSET 0";
        $sql = "SELECT * FROM img WHERE type='categories' ORDER BY views";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function update_sum_view_song($db,$arrArgument) {
        $sql = "UPDATE songs set views=views+1 WHERE songs.id_song='$arrArgument'";
        return $db->ejecutar($sql);
    }
    public function update_sum_view_categ($db,$arrArgument) {
        $sql = "UPDATE img set views=views+1 WHERE img.id=$arrArgument";
        return $db->ejecutar($sql);
    }
}
