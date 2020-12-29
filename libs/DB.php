<?php
declare(strict_types=1);

class Db {

    private static $_pdo = null;

    public static function getDatabase() {
        if (self::$_pdo === null) {
            self::$_pdo = new PDO("mysql:host=localhost;dbname=web-project", 'root', '');
        }

        return self::$_pdo;
    }
}
?>
