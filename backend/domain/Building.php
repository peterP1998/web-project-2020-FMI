<?php

class Building{

    private string $name;
    private int $capacity;
    private float $latitude;
    private float $longitude;

    public function __construct( string $name, int $capacity,float $latitude,float $longitude) {
        $this->name = $name;
        $this->capacity = $capacity;
        $this->latitude=$latitude;
        $this->longitude=$longitude;
    }

    public static function withArray( $array ) {
        $name = $array["name"];
        $capacity = $array["capacity"];
        $latitude = $array["latitude"];
        $longitude = $array["longitude"];
        return new self($name, $capacity,$latitude,$longitude);
    }

    public function getName() : string {
        return $this->name;
    }
    public function getCapacity(): int {
        return $this->capacity;
    }
    public function getLatitude() : float {
        return $this->latitude;
    }
    public function getLongitude(): float {
        return $this->longitude;
    }
}
?>
