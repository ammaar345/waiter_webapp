drop table if EXISTS shifts,waiters,weekdays;
create table waiters
(
    id serial not null primary key,
    name text not null
);
create table weekdays
(
    id serial not null primary key,
    dayname text not null
);
create table shifts
(
    id serial not null primary key,
    waiternameid int not null,
    weekdayid int not null,
    FOREIGN key (waiternameid) REFERENCES waiters(id),
    FOREIGN key (weekdayid) REFERENCES weekdays(id)
);
INSERT INTO weekdays
    (dayname)
VALUES
    ('Monday');
INSERT INTO weekdays
    ( dayname)
VALUES
    ('Tuesday');
INSERT INTO weekdays
    (dayname)
VALUES
    ('Wednesday');
INSERT INTO weekdays
    ( dayname)
VALUES
    ('Thursday');
INSERT INTO weekdays
    (dayname)
VALUEs
    ('Friday');


