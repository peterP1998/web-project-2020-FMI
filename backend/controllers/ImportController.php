<?php
declare(strict_types=1);

include('BuildingController.php');
include('HallController.php');
include('BookingController.php');

class ImportController{

    private $buildingController;
    private $hallController;
    private $bookingController;

    public function __construct() {
        $this->buildingController = new BuildingController();
        $this->hallController = new HallController();
        $this->bookingController = new BookingController();
    }

    public function importConfiguration($strJsonFileContents) {

        $decoded = json_decode($strJsonFileContents, true);

        foreach($decoded as $elem){

            $buildingName = $elem['building_name'];
            $buildingCapacity = $elem['building_capacity'];
            $building = new Building($buildingName, (int)$buildingCapacity);
            $this->buildingController->addIfNotExists($building);

            $hallName = $elem['hall_name'];
            $hallCapacity = $elem['hall_capacity'];
            $hall = new Hall($hallName, (int)$hallCapacity, $buildingName);
            $hallId = $this->hallController->addIfNotExists($hall);

            $startTime = $elem['start_time'];
            $duration = $elem['duration'];
            $booking = new Booking($startTime,(int)$duration,(int)$hallId);
            $this->bookingController->addIfNotExists($booking);            
           
        }
        //echo "Success";        
    }
    
}
?>
