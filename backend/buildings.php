<?php

session_start();

spl_autoload_register(function($className) {
    require_once("./libs/$className.php");
});

$buildingCtrl = new BuildingController();

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

switch ($_SERVER['REQUEST_METHOD']) {

    case 'POST': {
       $json = file_get_contents('php://input');
       $obj = json_decode($json,true);


        $building = new Building($obj['name'],$obj['capacity']);


        $added = $buildingCtrl->addNewBuilding($building);

        echo json_encode(['success' => $added]);

        break;
    }
}
