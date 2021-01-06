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
}
?>
