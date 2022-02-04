drop database the_locker_room;
create database the_locker_room;

use the_locker_room;

create table player(
    idPlayer int AUTO_INCREMENT not null,
    firstName varchar(25),
    lastName varchar(25),
    userName varchar(25),
    email varchar(50),
    dob date,
    phoneNumber varchar(14),
    profilePicture varchar(1024),
    gender varchar(5),
    passwd varchar(1024),
    primary key (idPlayer,email),
    UNIQUE key unique_email(email, userName)
)

-- create table friends(
    

    
-- )


create table chat(
    
)