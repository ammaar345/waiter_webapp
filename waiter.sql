drop table if EXISTS waiters,weekdays,tblshift;
create table waiters
(
    id serial not null primary key,
    name text not null--,
    -- days text not null
);
-- create table weekdaysname
-- (
--     id serial not null primary key,
--     weekdays text ,
--     waiterid int,
--     foreign key (waiterid) references waiters(id)
--     -- monday text not null,
--     -- tuesday text not null,
--     -- wednesday text not null,
--     -- thursday text not null,
--     -- friday text not null 
--     -- }
-- );

create table weekdays(
    id serial not null primary key,
    dayname text not null
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




-- INSERT INTO waiters
--     (name)
-- VALUES
--     ('Thabo');
-- INSERT INTO waiters
--     (name)
-- VALUES
--     ('Joe');
-- INSERT INTO waiters
--     (name)
-- VALUES
--     ('Ammaar');
-- INSERT INTO waiters
--     (name)
-- VALUES
--     ('Lucy');
-- INSERT INTO waiters
--     (name)
-- VALUES
--     ('Malikah');
-- INSERT INTO waiters
--     (name)
-- VALUES
--     ('Jenny');