<?php

class Hall{

    private string $name;
    private int $capacity;
    private int $buildingName;

    public function __construct(string $name, int $capacity,string $buildingName) {
        $this->name = $name;
        $this->capacity = $capacity;
        $this->buildingName=$buildingName;
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
}
?>
