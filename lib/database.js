
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost', // Replace with your host name
    user: 'test',      // Replace with your database username
    password: 'Saeed!@34',      // Replace with your database password
    database: 'the_locker_room' // // Replace with your database Name
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // var sql = "insert into player (firstName, lastName,userName,email,phoneNumber,profilePicture,gender,passwd) values ('saeed','binsalman','sa3eedgamer','ss111s28@yahoo.com','2064897489','lol','male','Saeed!@34')";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted");
  // });
});

module.exports = con; 