<?php

declare(strict_types=1);

include_once('../database/DBConnector.php');

class DBController
{

    private $connection;

    public function __construct() {
        $this->connection = DBConnector::getInstance()->getConnection();
    }

    public function deleteTablesContent(){
        try {
            $this->connection->beginTransaction();
            
            $this->connection->query('DELETE FROM booking');
            $this->connection->query('DELETE FROM hall');
            $this->connection->query('DELETE FROM building');
            
            $this->connection->commit();
        } catch (Throwable $e) {
            $this->connection->rollback();
            throw $e;
        }
    }

}

?>