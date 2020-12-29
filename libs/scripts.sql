CREATE Table building(
  id int NOT NULL PRIMARY KEY,
  name varchar(256) NOT NULL,
  capacity int NOT NULL
);

CREATE Table hall(
  id int NOT NULL PRIMARY KEY,
  name varchar(256) NOT NULL,
  capacity int NOT NULL,
  building_id int NOT NULL,
  FOREIGN KEY (building_id) REFERENCES building(id)
);
