<?php
declare(strict_types=1);

include('../database/DBConnector.php');

class ExportController{

    public function exportDatabase():array{
        $connection = DBConnector::getInstance()->getConnection();
        $statement = $connection->prepare("SELECT building.id as building_id,hall.id as hall_id,booking.id as booking_id,building.name as building_name,hall.name as hall_name,building.capacity as building_capacity,hall.capacity as hall_capacity,booking.start_time,booking.duration FROM `building` INNER  JOIN `hall` on hall.building_name=building.name INNER JOIN `booking` on booking.hall_id=hall.id");
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }
    
}
?>
