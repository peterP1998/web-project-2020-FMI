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

$exportCtrl = new ExportController();

switch ($_SERVER['REQUEST_METHOD']) {

    case 'GET': {
        $results = $exportCtrl->exportDatabase();
        echo json_encode($results);
    }
}
?>