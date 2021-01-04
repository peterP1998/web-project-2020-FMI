<?php

    spl_autoload_register(function($className){
        require_once $className . '.php';
    });

    date_default_timezone_set(Constants::SOFIA_TIME_ZONE);


    $format = 'd/m/Y';

    $fmi = new BuildingBookings("FMI");
    $fmi->addRoomBooking(date_create_from_format($format, '23/10/1998'),"204", new DateTime(), 1.5);
    $fmi->addRoomBooking(date_create_from_format($format, '23/10/1998'),"505", new DateTime(), 2.0);
    $fmi->addRoomBooking(new DateTime(),"603", new DateTime(), 3.5);

    $fhf = new BuildingBookings("FHF");
    $fhf->addRoomBooking(date_create_from_format($format, '12/5/2008'),"100", new DateTime(), 0.5);
    $fhf->addRoomBooking(date_create_from_format($format, '23/10/2008'),"120", new DateTime(), 3.0);

    Configuration::exportToJSON('export.json', array($fmi, $fhf));

    Configuration::importFromJSON('export.json');
?>