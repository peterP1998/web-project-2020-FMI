<?php

class Booking {

    private string $startTime;
    private int $duration;
    private int $hallId;

    public function __construct(string $startTime, int $duration,int $hallId) {
        $this->startTime = $startTime;
        $this->duration = $duration;
        $this->hallId=$hallId;
    }

    public function getStartTime() : string {
        return $this->startTime;
    }

    public function getDuration() : int {
        return $this->duration;
    }

    public function getHallId(): int {
        return $this->hallId;
    }
}
?>
