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

spl_autoload_register(function($className) {
    require_once("./libs/$className.php");
});

$buildingCtrl = new BuildingController();

switch ($_SERVER['REQUEST_METHOD']) {

    case 'POST': {
        $json = file_get_contents('php://input');
        $obj = json_decode($json,true);
        if($buildingCtrl->checkForBuildingsWithThisName($obj['name'])){
            http_response_code(400);
        }
        else{
            $building = new Building($obj['name'],$obj['capacity']);
            $added = $buildingCtrl->addNewBuilding($building);
            echo json_encode(['success' => $added]);
            http_response_code(200);
        }
        break;
    }
    case 'GET':{
        $result=$buildingCtrl->getAllBuildings();
        echo json_encode($result);
    }
}
?>