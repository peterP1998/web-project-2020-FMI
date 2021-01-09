<?php
declare(strict_types=1);

include 'Config.php';

class DBConnector {

    private static $_pdo = null;
    private static $instance = null;


    public static function getInstance() {
        if (self::$instance == null) {
          self::$instance = new DBConnector();
        }
        return self::$instance;
    }

    private function __construct() {
        self::$_pdo = new PDO(DB_ENGINE.":host=".DB_HOST.";dbname=".DB_NAME.";charset=".DB_CHARSET, DB_USER, DB_PASSWORD);
    }
 
    public static function getConnection() {
        return self::$_pdo;
    }
}
?>
