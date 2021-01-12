<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');



include_once('../controllers/HallController.php');

$hallCtrl = new HallController();

switch ($_SERVER['REQUEST_METHOD']) {

    case 'POST': {
        $json = file_get_contents('php://input');
        $obj = json_decode($json,true);
        if(!$hallCtrl->checkBuildingCapacity($obj["building_name"],$obj["capacity"])||$hallCtrl->checkForHallWithThisName($obj["hall_name"],$obj["building_name"])){
            http_response_code(400);
        }
        else{
            $hall = new Hall($obj["hall_name"],$obj["capacity"],$obj["building_name"],$obj["floor"]);
            $added = $hallCtrl->addNewHall($hall);
            http_response_code(200);
        }
        break;
    }
    case 'GET':{
      $results = $hallCtrl->getAllHallsForBuilding($_GET['name']);
      echo json_encode($results);
    }
}
