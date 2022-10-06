CREATE USER 'test'@'localhost' IDENTIFIED BY 'test';
GRANT ALL PRIVILEGES ON test.* to 'test'@'localhost';
FLUSH PRIVILEGES;

create database test;
use test;

create table user (
	userIdx int auto_increment,
	id varchar(20),
    pwd varchar(512),
    name varchar(20),
    
    primary key (userIdx)
);