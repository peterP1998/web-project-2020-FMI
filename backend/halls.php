<?php

session_start();

spl_autoload_register(function($className) {
    require_once("./libs/$className.php");
});

$hallCtrl = new HallController();

switch ($_SERVER['REQUEST_METHOD']) {

    case 'POST': {

        
        $hallName = $_POST["hall_name"];
        $capacity = $_POST["capacity"];
        $buildingName = $_POST["building_name"];
        $hall = new Hall($hallName,$capacity,$buildingName);
        
        $added = $hallCtrl->addNewHall($hall);

        echo json_encode(['success' => $added]);

        break;
    }
}
