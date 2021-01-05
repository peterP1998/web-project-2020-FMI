<?php
declare(strict_types=1);
class BuildingController{

   public function addNewBuilding(Building $building): bool {

        try {
            $connection = DBConnector::getInstance()->getConnection();

            $insertStatement = $connection->prepare("INSERT INTO `building` (name, capacity) VALUES (?,?)");
            $data = array($building->getName(), $building->getCapacity());

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
   public function getAllBuildings():array{
     $connection = DBConnector::getInstance()->getConnection();
     $statement = $connection->prepare("SELECT name FROM `building`");
     $statement->execute();
     $results = $statement->fetchAll(PDO::FETCH_ASSOC);
     return $results;
   }
}
?>
