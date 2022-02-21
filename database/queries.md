# Queries for The Locker Room

## friends 

#### Send Friend request:

`insert into friend_request (sender, receiver) VALUES ([SENDER NAME], [RECEIVER NAME])`

#### Accept the friend request:

going to be two lines one to insert data in the table the other one to delete the friend request.

insert:

 **Note: you need to do this twice one for for each user.**
`insert into friends (userName, friend) VALUES ([user name], [friend])`

remove friend request:
`delete from friend_request where sender=[username] and receiver=[friend]`

#### Search for a friend to add:

`select userName from player where userName='%[user input]%'`

#### Query all the user friends:

`select friend from friends where userName=[user]`


#### remove a friend from a friend list:

 **Note: you need to do this twice one for for each user.**
`delete from friends where userName=[user name] and friend=[friend]`

