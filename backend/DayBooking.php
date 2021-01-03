<?php

class DayBooking implements JsonSerializable {

    private DateTime $date;
    private array $roomBookings;

    public function __construct(DateTime $date) {
        $this->date = $date;
        $this->roomBookings = Array();
    }

    public function jsonSerialize() {
        return ['Date' => $this->date->format(Constants::DATE_FORMAT),
                'Rooms' => $this->roomBookings];
    }

    public function addRoomBooking(RoomBooking $booking){
        array_push($this->roomBookings, $booking);
    }

    public function getDateAsString() : string {
        return $this->date->format(Constants::DATE_FORMAT);
    }

}
?>
