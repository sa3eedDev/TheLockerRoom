
let express = require('express') // Include ExpressJS
let app = express() // Create an ExpressJS app
let bodyParser = require('body-parser'); // Middleware
let flash = require('express-flash'); //flash messages to the user
let session = require('express-session'); //session for login

let cookieParser = require('cookie-parser')

let connection  = require('./lib/database'); //db connection

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static(__dirname + '/public')); //main folder for webpages
app.set('view engine', 'ejs'); //to use ejs on express
app.use(flash()); //enable flash on the server
app.use(cookieParser('123456cat'));
app.use(session({ 
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

// Route to Homepage
app.get('/', (req, res) => {
  res.render(__dirname + '/public/homepage');
});

// Route to Login Page
app.get('/login', (req, res) => {
  res.render(__dirname + '/public/login');
});

//Route to Signup
app.get('/signup', (req, res) => {
    res.render(__dirname + '/public/signup');
  });
app.get('/chat', (req, res) => {
    res.render(__dirname + '/public/chat');
})

//login request
app.post('/login', (req, res) => {
  // Insert Login Code Here
  let username = req.body.username;
  let password = req.body.password;
  connection.query('SELECT * FROM player WHERE userName = ? AND passwd = ?', [username, password], function(err, rows, fields) {
    if(err) throw err
    // check if user is avaliable
    if (rows.length <= 0) {
    req.flash('error', 'Please enter the correct email and Password!')
    res.redirect('/login')
    }
    else { // if user found
    // render to views/user/edit.ejs template file
    req.session.loggedin = true;
    req.session.name = username;
    module.exports = {username};
    console.log(rows);
    res.redirect(`/`);
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
    let gender = req.body.gender;

    //make an array of the user infromation
    let newPlayer = [firstName,lastName, username,email,phone,"photo",gender, password];
    //Check if username or email in the database already
    connection.query('SELECT * FROM player WHERE userName = ? OR email = ?', [username,email], function(err, rows, fields) {
      if(err) throw err
      // if user is found
      if (rows.length > 0) {
        //if email is found in the database send a message
        if (email == rows[0]["email"]){
          req.flash('error', 'This email has been used before, please use a different one!')
        }
        else{ //if username is found in the database send a message
          req.flash('error', 'This username has been used before, please use a different one!')
        }
      // resend to the page
      res.redirect('/signup')
      }
      else { // if it is new user
      // render to views/user/edit.ejs template file
        //insert new user data in the database
        connection.query('insert into player (firstName, lastName,userName,email,phoneNumber,profilePicture,gender,passwd) values (?,?,?,?,?,?,?,?)', newPlayer, function(err, result) {
          if(err){
            res.redirect("/signup")
          }
          // if user not found
          // if (result.length <= 0) {
          // // req.flash('error', '')
          // res.redirect('/login')
          // }
          else { // if user found
          // req.session.loggedin = true;
          // req.session.name = username;
          res.redirect('/login');
          }
        })
      }
    })
    
  });
  //logout process
  app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  });

const port = 3000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));



//chat server 
const io = require('socket.io')(3001)

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

console.log("started the chat server");

