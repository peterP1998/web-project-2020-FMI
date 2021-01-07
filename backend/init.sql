create database if not exists webproject;
use webproject;

create table if not exists building(
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(256) NOT NULL  Unique,
  capacity int NOT NULL
);

create table if not exists hall(
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(256) NOT NULL,
  capacity int NOT NULL,
  building_name varchar(256) NOT NULL,
  FOREIGN KEY (building_name) REFERENCES building(name)
);
create table if not exists booking(
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name DATETIME  NOT NULL,
  duration int NOT NULL,
  building_name varchar(256) NOT NULL,
  hall_name varchar(256) NOT NULL,
  FOREIGN KEY (building_name) REFERENCES building(name)
  FOREIGN KEY (hall_name) REFERENCES hall(name)
);
