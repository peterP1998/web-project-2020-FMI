<?php

declare(strict_types=1);

include_once('../database/DBConnector.php');
include_once('../domain/Building.php');

class BuildingController
{

    private $connection;

    public function __construct() {
        $this->connection = DBConnector::getInstance()->getConnection();
    }

    public function addNewBuilding(Building $building): bool {

        try {
            $insertStatement = $this->connection ->prepare("INSERT INTO `building` (name, capacity) VALUES (?,?)");
            $data = array($building->getName(), $building->getCapacity());

            $result = $insertStatement->execute($data);
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
        return $result;
    }

    public function getAllBuildings(): array {
        $sql = "Select name from `building`";
        $statement = $this->connection ->prepare($sql);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }

    public function checkForBuildingsWithThisName($name): bool {
        $statement = $this->connection ->prepare("SELECT * FROM `building` where name=?");
        $data = array($name);
        $statement->execute($data);
        $results = count($statement->fetchAll(PDO::FETCH_ASSOC));
        if ($results != 0) {
            return true;
        }
        return false;
    }

    public function addIfNotExists(Building $building)
    {
        $name = $building->getName();
        if (!$this->checkForBuildingsWithThisName($name)) {
            $this->addNewBuilding($building);
        }
    }
}
