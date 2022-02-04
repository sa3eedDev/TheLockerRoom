
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: '173.230.129.51', // Replace with your host name
    user: 'dbuser',      // Replace with your database username
    password: 'Password123#@!',      // Replace with your database password
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