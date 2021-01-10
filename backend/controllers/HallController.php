<?php

declare(strict_types=1);

include_once('../database/DBConnector.php');
include_once('../domain/Hall.php');

class HallController
{

    private $connection;

    public function __construct() {
        $this->connection = DBConnector::getInstance()->getConnection();
    }

    public function addNewHall(Hall $hall): bool {
        try {
            $insertStatement = $this->connection->prepare("INSERT INTO `hall` (name, capacity,building_name,floor) VALUES (?,?,?,?)");
            $data = array($hall->getName(), $hall->getCapacity(), $hall->getBuildingName(),$hall->getFloor());
            $result = $insertStatement->execute($data);
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
        return $result;
    }

    public function getAllHallsForBuilding($buildingName): array {
        $statement = $this->connection ->prepare("SELECT * FROM `hall` where building_name=?");
        $data = array($buildingName);
        $statement->execute($data);
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }

    public function checkBuildingCapacity($buildingName, $hallcap): bool {
        $results = $this->getAllHallsForBuilding($buildingName);
        $counter = 0;
        foreach ($results as $dhall) {
            $counter += $dhall["capacity"];
        }
        $cap = $this->getBuildingCapacity($buildingName);
        if ($cap < $counter + $hallcap) {
            return false;
        }
        return true;
    }

    public function getBuildingCapacity($buildingName): int {
        $statement = $this->connection ->prepare("SELECT capacity FROM `building` where name=?");
        $data = array($buildingName);
        $statement->execute($data);
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $cap = 0;
        foreach ($results as $dhall) {
            $cap = (int)reset($dhall);
        }
        return $cap;
    }

    public function checkForHallWithThisName($hallName, $buildingName): bool {
        $statement = $this->connection ->prepare("SELECT * FROM `hall` where name=? and building_name=?");
        $data = array($hallName, $buildingName);
        $statement->execute($data);
        $results = count($statement->fetchAll(PDO::FETCH_ASSOC));
        if ($results != 0) {
            return true;
        }
        return false;
    }

    public function addIfNotExists(Hall $hall) {
        $name = $hall->getName();
        $buildingName = $hall->getBuildingName();
        if (!$this->checkForHallWithThisName($name, $buildingName)) {
            $this->addNewHall($hall);
        }
        $statement = $this->connection ->prepare("SELECT id FROM `hall` where name=? and building_name=?");
        $data = array($name, $buildingName);
        $statement->execute($data);
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $result[0]["id"];
    }
}
