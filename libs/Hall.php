<?php

class Hall{

    private int $id;

    private string $name;

    private int $capacity;

    private int $buildingId;

    public function __construct(string $name, int $capacity,int $buildingId) {
        $this->name = $name;
        $this->capacity = $capacity;
        $this->buildingId=$buildingId;
    }

    public function getBuildingId() : string {
        return $this->buildingId;
    }

    public function getName() : string {
        return $this->name;
    }

    public function getCapacity(): int {
        return $this->capacity;
    }
}
?>
