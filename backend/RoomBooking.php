<?php

class RoomBooking implements JsonSerializable {

    private string $roomName;
    private DateTime $startTime;
    private float $durationInHours;

    public function __construct(string $roomName, DateTime $startTime, float $durationInHours) {
        $this->roomName = $roomName;
        $this->startTime = $startTime;
        $this->durationInHours = $durationInHours;
    }

    public function jsonSerialize() {
        return ['RoomName' => $this -> roomName,
                'StartTime' => $this -> startTime -> format(Constants::TIME_FORMAT),
                'DurationInHours' => $this -> durationInHours];
    }

    public function getRoomName() {
        return $this->roomName;
    }
    
    public function getStartTime() {
        return $this->startTime->format(Constants::TIME_FORMAT);
    }
    
    public function getDurationInHours() {
        return $this->durationInHours;
    }
    
}
?>
