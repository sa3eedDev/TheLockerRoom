drop database the_locker_room;
create database the_locker_room;

use the_locker_room;

create table player(
    idPlayer int AUTO_INCREMENT not null,
    firstName varchar(25) not null,
    lastName varchar(25) not null,
    userName varchar(25) not null,
    email varchar(50) not null,
    dob date not null,
    phoneNumber varchar(14) not null,
    profilePicture varchar(1024),
    gender varchar(5) not null,
    passwd varchar(1024) not null,
    primary key (idPlayer,email),
    UNIQUE key unique_email(email),
    UNIQUE key unique_userName(userName)
);

create table friends(
    userName varchar(25) not null,
    friend varchar(25) not null,
    foreign key (userName) references player(userName),
    primary key(userName, friend) 
);

create table friend_request(
    sender varchar(25),
    receiver varchar(25),
    foreign key (sender) references player (userName),
    primary key (sender, receiver)
);
