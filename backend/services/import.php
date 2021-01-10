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


include('../controllers/ImportController.php');

$importController = new ImportController();

switch ($_SERVER['REQUEST_METHOD']) {

    case 'POST': {
        $json = file_get_contents('php://input');
        $importController->importConfiguration($json);
    }

    case 'GET': {
        $json = file_get_contents('../export.json');
        $importController->importConfiguration($json);
    }
}
