create table waiters
(
    id serial not null primary key,
    name text
);
create table weekdays
(
    id serial not null primary key,
    dayofweek text,
    weekdayid int,
);
create table tblshift
(
    id serial not null primary key,
    waiternameid int,
    weekdayid int,
    FOREIGN key weekdayid REFERENCES weekdayid(id) ,
    FOREIGN key (waiternameid) REFERENCES waiters(id)
)
INSERT INTO weekdays( [dayofweek])VALUES    ( "Monday")
INSERT INTO weekdays
    ( [dayofweek])
VALUES
    ( "Tuesday")
INSERT INTO weekdays
    ([dayofweek])
VALUES
    ( "Wednesday")
INSERT INTO weekdays
    ( [dayofweek])
VALUES
    ( "Thursday")
INSERT INTO weekdays
    ([dayofweek] )
VALUES
    ( "Friday")
    