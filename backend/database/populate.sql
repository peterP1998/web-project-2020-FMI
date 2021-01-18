USE webproject;

INSERT INTO building (name,capacity,latitude,longitude) VALUES ('FMI', 800,32.43242,32.545353);
INSERT INTO building (name,capacity,latitude,longitude) VALUES ('Rektorat', 1000,14.53253,88.321342);
INSERT INTO building (name,capacity,latitude,longitude) VALUES ('FHF', 900,23.32131,76.75894);
INSERT INTO building (name,capacity,latitude,longitude) VALUES ('Stopanski', 600,25.54353,28.42342);

INSERT INTO hall (name,capacity,building_name,floor) VALUES ('204',25,'FMI',2);
INSERT INTO hall (name,capacity,building_name,floor) VALUES ('300',200,'FMI',3);

INSERT INTO hall (name,capacity,building_name,floor) VALUES ('101',100,'FHF',1);
INSERT INTO hall (name,capacity,building_name,floor) VALUES ('200',220,'FHF',2);

INSERT INTO hall (name,capacity,building_name,floor) VALUES ('510',80,'Rektorat',5);
INSERT INTO hall (name,capacity,building_name,floor) VALUES ('412',190,'Rektorat',4);

INSERT INTO hall (name,capacity,building_name,floor) VALUES ('43',25,'Stopanski',2);
INSERT INTO hall (name,capacity,building_name,floor) VALUES ('126',30,'Stopanski',3);


#FMI
INSERT INTO booking (start_time, duration, hall_id) VALUES ('2021-01-08 14:15:00', 2, 1); 
INSERT INTO booking (start_time, duration, hall_id) VALUES ('2021-01-09 18:00:00', 1, 1);
INSERT INTO booking (start_time, duration, hall_id) VALUES ('2021-01-19 15:00:00', 3, 2);

#FHF
INSERT INTO booking (start_time, duration, hall_id) VALUES ('2021-02-20 10:15:00', 1, 3); 
INSERT INTO booking (start_time, duration, hall_id) VALUES ('2021-02-05 11:00:00', 2, 4);
INSERT INTO booking (start_time, duration, hall_id) VALUES ('2021-01-21 12:15:00', 2, 4);

#REKTORAT
INSERT INTO booking (start_time, duration, hall_id) VALUES ('2021-01-13 09:15:00', 1, 5); 
INSERT INTO booking (start_time, duration, hall_id) VALUES ('2021-02-21 16:00:00', 2, 6);
INSERT INTO booking (start_time, duration, hall_id) VALUES ('2021-01-18 13:30:00', 2, 5);

#STOPANSKI
INSERT INTO booking (start_time, duration, hall_id) VALUES ('2021-01-04 08:00:00', 4, 7); 
INSERT INTO booking (start_time, duration, hall_id) VALUES ('2021-02-01 08:00:00', 1, 7);
INSERT INTO booking (start_time, duration, hall_id) VALUES ('2021-01-14 14:30:00', 3, 8);

