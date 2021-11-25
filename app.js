
let express = require('express') // Include ExpressJS
let app = express() // Create an ExpressJS app
let bodyParser = require('body-parser'); // Middleware
let flash = require('express-flash'); //flash messages to the user
let session = require('express-session'); //session for login

let cookieParser = require('cookie-parser')
let {
  login_TLR, signup_TLR
} = require("./handlers")
// let connection  = require('./lib/database'); //db connection

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
// app.get('/chat', (req, res) => {
//     res.render(__dirname + '/public/chat', {username: req.session.name});
// })

//login request
app.post('/login', login_TLR);

app.post('/signup', signup_TLR);


//logout process
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});


app.get('/chat', isLoggedIn, function (req, res) {
  // store userId on login into session or any global variable 
  res.redirect('/chat/'+req.session.name, {username: req.session.name}) 
});

app.get('/chat/:id', function (req, res) {
  var id = req.session.name
  
  res.render(__dirname + '/public/chat', {username: req.session.name})
  // res.render('./pages/profile.ejs', {user: id});  
})
 
app.get("*", (req, res) =>
res.status(404).json({
  status: 404,
  message: "There is a problem with your request!",
})
);
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

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if(req.session.loggedin){
    return next();
  }


  // if they aren't redirect them to the home page
  else{
    res.redirect('/login');
  }
}