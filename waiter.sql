drop table if EXISTS waiters,weekdays,tblshift;
create table waiters
(
    id serial not null primary key,
    name text not null
);
create table weekdays
(
    id serial not null primary key,
    dayofweek text not null
);
create table tblshift
(
    id serial not null primary key,
    waiternameid int not null,
    weekdayid int not null,
    FOREIGN key (waiternameid) REFERENCES waiters(id),
    FOREIGN key (weekdayid) REFERENCES weekdays(id)
);
INSERT INTO weekdays
    (dayofweek)
VALUES
    ('Monday');
INSERT INTO weekdays
    ( dayofweek)
VALUES
    ('Tuesday');
INSERT INTO weekdays
    (dayofweek)
VALUES
    ('Wednesday');
INSERT INTO weekdays
    ( dayofweek)
VALUES
    ('Thursday');
INSERT INTO weekdays
    (dayofweek)
VALUEs
    ('Friday');




INSERT INTO waiters
    (name)
VALUES
    ('Thabo');
INSERT INTO waiters
    (name)
VALUES
    ('Joe');
INSERT INTO waiters
    (name)
VALUES
    ('Ammaar');
INSERT INTO waiters
    (name)
VALUES
    ('Lucy');
INSERT INTO waiters
    (name)
VALUES
    ('Malikah');
INSERT INTO waiters
    (name)
VALUES
    ('Jenny');