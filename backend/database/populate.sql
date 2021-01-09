USE webproject;

INSERT INTO building (name,capacity) VALUES ('FMI', 800);
INSERT INTO building (name,capacity) VALUES ('Rektorat', 1000);
INSERT INTO building (name,capacity) VALUES ('FHF', 900);
INSERT INTO building (name,capacity) VALUES ('Stopanski', 600);

INSERT INTO hall (name,capacity,building_name) VALUES ('204',25,'FMI');
INSERT INTO hall (name,capacity,building_name) VALUES ('300',200,'FMI');

INSERT INTO hall (name,capacity,building_name) VALUES ('101',100,'FHF');
INSERT INTO hall (name,capacity,building_name) VALUES ('200',220,'FHF');

INSERT INTO hall (name,capacity,building_name) VALUES ('510',80,'Rektorat');
INSERT INTO hall (name,capacity,building_name) VALUES ('412',190,'Rektorat');

INSERT INTO hall (name,capacity,building_name) VALUES ('43',25,'Stopanski');
INSERT INTO hall (name,capacity,building_name) VALUES ('126',30,'Stopanski');


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

