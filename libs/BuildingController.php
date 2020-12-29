<?php
declare(strict_types=1);
class BuildingController{
   public function addNewBuilding(Building $building): bool {
        try {
            $connection = (new Db())->getDatabase();

            $insertStatement = $connection->prepare("
                INSERT INTO `building` (name, capacity)
                    VALUES (?,?)
            ");
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
}
?>
