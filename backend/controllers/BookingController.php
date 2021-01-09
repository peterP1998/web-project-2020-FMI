<?php

declare(strict_types=1);

include_once('../database/DBConnector.php');
include_once('../domain/Booking.php');

class BookingController
{
    private $connection;

    public function __construct() {
        $this->connection = DBConnector::getInstance()->getConnection();
    }

    public function addNewBooking(Booking $booking): bool {
        try {
            $insertStatement =  $this->connection->prepare("INSERT INTO `booking` (start_time, duration,hall_id) VALUES (?,?,?)");
            $data = array($booking->getStartTime(), $booking->getDuration(), $booking->getHallId());
            $result = $insertStatement->execute($data);
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
        return $result;
    }

    public function existsBooking(Booking $booking): bool{
        $statement =  $this->connection ->prepare("SELECT * FROM `booking` where start_time=? and duration=? and hall_id=?");
        $data = array($booking->getStartTime(), $booking->getDuration(), $booking->getHallId());
        $statement->execute($data);
        $results = count($statement->fetchAll(PDO::FETCH_ASSOC));
        if ($results != 0) {
            return true;
        }
        return false;
    }

    public function addIfNotExists(Booking $booking){
        if (!$this->existsBooking($booking)) {
            $this->addNewBooking($booking);
        }
    }
}
?>