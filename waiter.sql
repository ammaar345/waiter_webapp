create table waiters
( id serial not null primary key,
    name text not null
);
create table weekdays
(  id serial not null primary key,
  dayofweek text not null);
create table tblshift
(id serial not null primary key,
    waiternameid int not null,
    weekdayid int not null,
    FOREIGN key (waiternameid) REFERENCES waiters(id),
    FOREIGN key (weekdayid) REFERENCES weekdays(id) 
);
INSERT INTO weekdays (dayofweek)VALUES    ('Monday');
INSERT INTO weekdays  ( dayofweek)VALUES  ('Tuesday');
INSERT INTO weekdays  (dayofweek)VALUES   ('Wednesday');
INSERT INTO weekdays  ( dayofweek)VALUES   ('Thursday');
INSERT INTO weekdays   (dayofweek)VALUEs    ('Friday');