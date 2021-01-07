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
        $sql = "Select name from `building`";
        $statement = $connection->prepare($sql);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        
        return $results;
   }
   public function checkForBuildingsWithThisName($name):bool{
       $connection = DBConnector::getInstance()->getConnection();
       $statement = $connection->prepare("SELECT * FROM `building` where name=?");
       $data=array($name);
       $statement->execute($data);
       $results =count($statement->fetchAll(PDO::FETCH_ASSOC));
       if($results!=0){return true;}
       return false;
   }
}
?>
