let connection  = require('./lib/database'); //db connection

let login_TLR = async(req, res) =>{
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
      res.redirect(`/`);
      }
    })
};

let signup_TLR = async(req, res) => {
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
};


module.exports = {
    login_TLR,
    signup_TLR
};