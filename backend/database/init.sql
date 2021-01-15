create database if not exists webproject;
use webproject;

create table if not exists building(
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(256) NOT NULL Unique,
  latitude DECIMAL(9,7) NOT NULL,
  longitude DECIMAL(9,7) NOT NULL,
  capacity int NOT NULL
);

create table if not exists hall(
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(256) NOT NULL,
  capacity int NOT NULL,
  floor int NOT NULL,
  building_name varchar(256) NOT NULL,
  FOREIGN KEY (building_name) REFERENCES building(name)
);
create table if not exists booking(
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  start_time DATETIME  NOT NULL,
  duration int NOT NULL,
  hall_id int NOT NULL,
  FOREIGN KEY (hall_id) REFERENCES hall(id)
);
