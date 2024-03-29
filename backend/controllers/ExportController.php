<?php
declare(strict_types=1);

include_once('../database/DBConnector.php');

class ExportController{

    public function exportDatabase():array{
        $connection = DBConnector::getInstance()->getConnection();
        $statement = $connection->prepare("SELECT building.name as building_name,hall.name as hall_name,building.capacity as building_capacity,hall.capacity as hall_capacity,hall.floor,booking.start_time,booking.duration,building.latitude,building.longitude FROM `building` INNER  JOIN `hall` on hall.building_name=building.name INNER JOIN `booking` on booking.hall_id=hall.id");
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }
    
}
?>
