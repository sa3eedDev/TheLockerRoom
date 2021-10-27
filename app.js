
let express = require('express') // Include ExpressJS
let app = express() // Create an ExpressJS app
let bodyParser = require('body-parser'); // Middleware
var flash = require('express-flash');
var session = require('express-session');
let connection  = require('./lib/database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(session({ 
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

// Route to Homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route to Login Page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/log_in.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/createProfile.html');
  });

app.post('/login', (req, res) => {
  // Insert Login Code Here
  let username = req.body.username;
  let password = req.body.password;
  connection.query('SELECT * FROM player WHERE userName = ? AND passwd = ?', [username, password], function(err, rows, fields) {
    if(err) throw err
    // if user not found
    if (rows.length <= 0) {
    // req.flash('error', 'Please correct enter email and Password!')
    res.redirect('/login')
    }
    else { // if user found
    // render to views/user/edit.ejs template file
    req.session.loggedin = true;
    req.session.name = username;
    res.redirect('/');
    }
  })
  // res.sendFile(__dirname + '/public/header_navBar.html');
});

app.post('/signup', (req, res) => {
    // Insert Login Code Here
    
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let phone = req.body.phone;
    let dob = req.body.dob;
    let gender = "male";

    let newPlayer = [firstName,lastName, username,email,phone,"photo",gender, password];
    connection.query('insert into player (firstName, lastName,userName,email,phoneNumber,profilePicture,gender,passwd) values (?,?,?,?,?,?,?,?)', newPlayer, function(err, result) {
      if(err) throw err
      // if user not found
      if (result.length <= 0) {
      // req.flash('error', 'Please correct enter email and Password!')
      res.redirect('/login')
      }
      else { // if user found
      // render to views/user/edit.ejs template file
      // req.session.loggedin = true;
      // req.session.name = name;
      res.redirect('/login');
      }
    })
  });

const port = 3000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));