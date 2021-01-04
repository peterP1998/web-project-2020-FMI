<?php

class Building{

    private string $name;
    private int $capacity;

    public function __construct( string $name, int $capacity) {
        $this->name = $name;
        $this->capacity = $capacity;
    }

    public static function withArray( $array ) {
        $name = $array["name"];
        $capacity = $array["capacity"];
        return new self($name, $capacity);
    }

    public function getName() : string {
        return $this->name;
    }

    public function getCapacity(): int {
        return $this->capacity;
    }
}
?>
