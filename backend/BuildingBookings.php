<?php

class BuildingBookings implements JsonSerializable {

    private string $name;
    private array $dayBookings;

    public function __construct($name) {
        $this->name = $name;
        $this->dayBookings = Array();
    }

    public function jsonSerialize() {
        return get_object_vars($this);
    }

    public function addRoomBooking(DateTime $date, string $roomName, DateTime $startTime, float $duration) {
        $dateAsString = $date->format(Constants::DATE_FORMAT);
        $roomBooking = new RoomBooking($roomName, $startTime, $duration);
        foreach ($this->dayBookings as $value) {
            if ($value->getDateAsString() == $dateAsString) {
                $value->addRoomBooking($roomBooking);
                return;
            }
        }
        $dayBooking = new DayBooking($date);
        $dayBooking->addRoomBooking($roomBooking);
        array_push($this->dayBookings, $dayBooking);
    }

    public function getName() {
        return $this->name;
    }

    public function getDayBookings() {
        return $this->dayBookings;
    }

}

?>