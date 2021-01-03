<?php
declare(strict_types=1);
class HallController{

   public function addNewHall(Hall $hall): bool {


       try {
            $connection = DBConnector::getInstance()->getConnection();

            $selectStatement = $connection->prepare("SELECT id From `building` where name=?");
            $building = array($hall->getBuildingName());
            $selectStatement->execute($building);
            $resultSelect=$selectStatement->fetchColumn();
            printf($resultSelect);

            $insertStatement = $connection->prepare("INSERT INTO `hall` (name, capacity,building_id) VALUES (?,?,?)");
            $data = array($hall->getName(), $hall->getCapacity(), $resultSelect);

            $result = $insertStatement->execute($data);
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }

        if ($result === false) {
            // var_dump($insertStatement->errorInfo());
        }

        return $result;

}
}
?>
