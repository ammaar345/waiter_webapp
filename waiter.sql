create table waiters
( id serial not null primary key,
    name text
);
create table weekdays
(  id serial not null primary key,
  dayofweek text);
create table tblshift
(id serial not null primary key,
    waiternameid int,
    weekdayid int,
    FOREIGN key (waiternameid) REFERENCES waiters(id),
    FOREIGN key (weekdayid) REFERENCES weekdays(id) 
)
INSERT INTO weekdays( [dayofweek])VALUES    ( "Monday")
INSERT INTO weekdays  ( [dayofweek])VALUES  ( "Tuesday")
INSERT INTO weekdays  ([dayofweek])VALUES   ( "Wednesday")
INSERT INTO weekdays  ( [dayofweek])VALUES   ( "Thursday")
INSERT INTO weekdays   ([dayofweek] )VALUEs    ( "Friday")