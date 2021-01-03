<?php

class Configuration implements JsonSerializable {

    private array $buildingBookings;

    public static function importFromJSON(string $fileName) {
        $strJsonFileContents = file_get_contents($fileName);
        $decoded = json_decode($strJsonFileContents, true);
        $buildingBookings = Array();

        foreach($decoded as $elem){

            $buildingName = $elem['name'];
            $booking = new BuildingBookings($buildingName);
            $dayBookingsArray = $elem['dayBookings'];
            foreach($dayBookingsArray as $dayBooking){
                $dateAsString = $dayBooking['Date'];
                $date = date_create_from_format(Constants::DATE_FORMAT, $dateAsString);
                $roomsArray = $dayBooking['Rooms'];
                foreach($roomsArray as $room){
                    $roomName = $room['RoomName'];
                    $startTimeAsString = $room['StartTime'];
                    $duration = $room['DurationInHours'];
                    $startTime = date_create_from_format(Constants::TIME_FORMAT, $startTimeAsString);
                    $booking -> addRoomBooking($date, $roomName, $startTime, floatval($duration));
                    array_push($buildingBookings, $booking);
                }
            }
    
        }
        echo "Success";
        return $buildingBookings;
    }


    public static function exportToJSON(string $fileName, array $buildingBookings) {
        $fp = fopen($fileName,'w');
        fwrite($fp, json_encode($buildingBookings, JSON_PRETTY_PRINT));
        fclose($fp);
    }

    public function jsonSerialize() {
        return get_object_vars($this);
    }
}
?>