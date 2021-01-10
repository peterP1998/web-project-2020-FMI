<?php

class Hall{

    private string $name;
    private int $capacity;
    private string $buildingName;
    private int $floor;

    public function __construct(string $name, int $capacity,string $buildingName,int $floor) {
        $this->name = $name;
        $this->capacity = $capacity;
        $this->buildingName=$buildingName;
        $this->floor=$floor;
    }

    public function getBuildingName() : string {
        return $this->buildingName;
    }

    public function getName() : string {
        return $this->name;
    }

    public function getCapacity(): int {
        return $this->capacity;
    }

    public function getFloor() : int {
        return $this->floor;
    }
}
?>
