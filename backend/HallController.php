<?php
declare(strict_types=1);
class HallController{

   public function addNewHall(Hall $hall): bool {

       try {
            $connection = DBConnector::getInstance()->getConnection();    
            $insertStatement = $connection->prepare("INSERT INTO `hall` (name, capacity,building_name) VALUES (?,?,?)");
            $data = array($hall->getName(), $hall->getCapacity(),$hall->getBuildingName());

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
    public function getAllHallsForBuilding($buildingName):array{
        $connection = DBConnector::getInstance()->getConnection();
        $statement = $connection->prepare("SELECT * FROM `hall` where building_name=?");
        $data=array($buildingName);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }
    public function checkBuildingCapacity($buildingName,$hallcap):bool{
       $results=$this->getAllHallsForBuilding($buildingName);
       $counter = 0;
       foreach ($results as $dhall) {
         $counter+=$dhall["capacity"];
       }
       $cap=$this->getBuildingCapacity($buildingName);
       if($cap<$counter+$hallcap){
           return false;
       }
       return true;
    }
    public function getBuildingCapacity($buildingName):int{
        $connection = DBConnector::getInstance()->getConnection();
        $statement = $connection->prepare("SELECT capacity FROM `building` where name=?");
        $data=array($buildingName);
        $statement->execute($data);
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $cap=0;
        foreach ($results as $dhall) {
            $cap=(int)reset($dhall);
        }
        return $cap;
    }
    public function checkForHallWithThisName($hallName,$buildingName):bool{
        $connection = DBConnector::getInstance()->getConnection();
        $statement = $connection->prepare("SELECT * FROM `hall` where name=? and building_name=?");
        $data=array($hallName,$buildingName);
        $statement->execute($data);
        $results =count($statement->fetchAll(PDO::FETCH_ASSOC));
        if($results!=0){return true;}
        return false;
    }
}
?>
