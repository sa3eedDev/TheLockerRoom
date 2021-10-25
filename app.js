
const express = require('express') // Include ExpressJS
const app = express() // Create an ExpressJS app
const bodyParser = require('body-parser'); // Middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

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
  res.sendFile(__dirname + '/public/header_navBar.html');
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

    res.send(`Username: ${username} Password: ${password}`);
  });

const port = 3000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));