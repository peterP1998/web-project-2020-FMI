create database if not exists web-project;
use web-project;

create table if not exists building(
  id int NOT NULL PRIMARY KEY,
  name varchar(256) NOT NULL,
  capacity int NOT NULL
);

create table if not exists hall(
  id int NOT NULL PRIMARY KEY,
  name varchar(256) NOT NULL,
  capacity int NOT NULL,
  building_id int NOT NULL,
  FOREIGN KEY (building_id) REFERENCES building(id)
);
