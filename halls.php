<?php

session_start();

spl_autoload_register(function($className) {
    require_once("./libs/$className.php");
});

$hallCtrl = new HallController();

switch ($_SERVER['REQUEST_METHOD']) {

    case 'POST': {

    
        $added = $hallCtrl->addNewHall($_POST);

        echo json_encode(['success' => $added]);

        break;
    }
}
