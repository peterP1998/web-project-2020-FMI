<?php
declare(strict_types=1);

include_once('BuildingController.php');
include_once('HallController.php');
include_once('BookingController.php');

class ImportController{

    private $buildingController;
    private $hallController;
    private $bookingController;

    public function __construct() {
        $this->buildingController = new BuildingController();
        $this->hallController = new HallController();
        $this->bookingController = new BookingController();
    }

    public function importConfiguration(string $json) {

        $decoded = json_decode($json, true);

        foreach($decoded as $elem){

            $buildingName = $elem['building_name'];
            $buildingCapacity = $elem['building_capacity'];
            $latitude=$elem['latitude'];
            $longitude=$elem['longitude'];
            $building = new Building($buildingName, (int)$buildingCapacity,(float)$latitude,(float)$longitude);
            $this->buildingController->addIfNotExists($building);

            $hallName = $elem['hall_name'];
            $hallCapacity = $elem['hall_capacity'];
            $hallFloor=$elem['floor'];
            $hall = new Hall($hallName, (int)$hallCapacity, $buildingName,(int)$hallFloor);
            $hallId = $this->hallController->addIfNotExists($hall);

            $startTime = $elem['start_time'];
            $duration = $elem['duration'];
            $booking = new Booking($startTime,(int)$duration,(int)$hallId);
            $this->bookingController->addIfNotExists($booking);            
           
        }       
    }
    
}
?>
