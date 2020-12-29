<?php
declare(strict_types=1);
class HallController{
   public function addNewHall($input): bool {
       try {
        $connection = (new Db())->getDatabase();

        $selectStatement = $connection->prepare("
                SELECT id From `building` where
                name=?
        ");
        $building = array($input["building"]);
        $selectStatement->execute($building);
        $resultSelect=$selectStatement->fetchColumn();
        printf($resultSelect);
        $insertStatement = $connection->prepare("
            INSERT INTO `hall` (name, capacity,building_id)
                    VALUES (?,?,?)
        ");
        $data = array($input["name"], $input["capacity"],$resultSelect);

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
