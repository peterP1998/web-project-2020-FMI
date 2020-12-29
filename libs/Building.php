<?php

class Building{

    private int $id;

    private string $name;

    private int $capacity;
    public function __construct( string $name, int $capacity) {
        $this->name = $name;
        $this->capacity = $capacity;
    }
    public static function withArray( $array ) {
        $instance = new self();
        $instance->name=$array["name"];
        $instance->capacity=$array["capacity"];
        return $instance;
    }

    public function getName() : string {
        return $this->name;
    }

    public function getCapacity(): int {
        return $this->capacity;
    }
}
?>
